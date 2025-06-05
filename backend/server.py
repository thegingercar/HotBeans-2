from fastapi import FastAPI, APIRouter, WebSocket, WebSocketDisconnect, UploadFile, File, HTTPException
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import json
import aiofiles
from PIL import Image
import io

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create images and uploads directories
images_dir = ROOT_DIR / "images"
uploads_dir = ROOT_DIR / "uploads"
images_dir.mkdir(exist_ok=True)
uploads_dir.mkdir(exist_ok=True)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Mount static files
app.mount("/images", StaticFiles(directory=str(images_dir)), name="images")
app.mount("/uploads", StaticFiles(directory=str(uploads_dir)), name="uploads")

# WebSocket connection manager for real-time chat
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_name: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    message_type: str = "user"  # "user" or "admin"

class ChatMessageCreate(BaseModel):
    user_name: str
    message: str
    message_type: str = "user"

class UploadedFile(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    original_name: str
    saved_name: str
    file_path: str
    file_size: int
    file_type: str
    uploaded_by: str
    upload_timestamp: datetime = Field(default_factory=datetime.utcnow)

class JobApplication(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    # Personal Information
    firstName: str
    lastName: str
    email: str
    phone: str
    address: Optional[str] = ""
    
    # Position & Experience
    position: str
    experience: str
    availability: str
    salary: Optional[str] = ""
    
    # Skills & Portfolio
    skills: List[str]
    portfolio: Optional[str] = ""
    github: Optional[str] = ""
    linkedin: Optional[str] = ""
    
    # Additional Information
    motivation: str
    projects: Optional[str] = ""
    references: Optional[str] = ""
    
    # Metadata
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "pending"  # pending, reviewing, approved, rejected

# Chat WebSocket endpoint
@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            
            # Save message to database
            chat_message = ChatMessage(**message_data)
            await db.chat_messages.insert_one(chat_message.dict())
            
            # Broadcast to all connected clients
            await manager.broadcast(data)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Hot Beans Web - Enhanced API with Chat & Upload Support"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Chat API endpoints
@api_router.post("/chat/message", response_model=ChatMessage)
async def create_chat_message(message: ChatMessageCreate):
    chat_message = ChatMessage(**message.dict())
    await db.chat_messages.insert_one(chat_message.dict())
    return chat_message

@api_router.get("/chat/messages", response_model=List[ChatMessage])
async def get_chat_messages(limit: int = 50):
    messages = await db.chat_messages.find().sort("timestamp", -1).limit(limit).to_list(limit)
    return [ChatMessage(**msg) for msg in reversed(messages)]

# File Upload API endpoints
@api_router.post("/upload/cv")
async def upload_cv(file: UploadFile = File(...), uploaded_by: str = "anonymous"):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    # Validate file type
    allowed_types = ['application/pdf', 'application/msword', 
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'text/plain']
    
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="File type not allowed. Please upload PDF, DOC, DOCX, or TXT files.")
    
    # Generate unique filename
    file_extension = file.filename.split('.')[-1] if '.' in file.filename else 'txt'
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = uploads_dir / unique_filename
    
    # Save file
    async with aiofiles.open(file_path, 'wb') as f:
        content = await file.read()
        await f.write(content)
    
    # Save file info to database
    uploaded_file = UploadedFile(
        original_name=file.filename,
        saved_name=unique_filename,
        file_path=str(file_path),
        file_size=len(content),
        file_type=file.content_type,
        uploaded_by=uploaded_by
    )
    
    await db.uploaded_files.insert_one(uploaded_file.dict())
    
    return {
        "message": "CV uploaded successfully",
        "file_id": uploaded_file.id,
        "original_name": uploaded_file.original_name,
        "file_size": uploaded_file.file_size
    }

@api_router.get("/uploads", response_model=List[UploadedFile])
async def get_uploaded_files():
    files = await db.uploaded_files.find().sort("upload_timestamp", -1).to_list(100)
    return [UploadedFile(**file) for file in files]

@api_router.post("/upload/image")
async def upload_image(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    # Validate image type
    allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="File type not allowed. Please upload image files.")
    
    # Read and process image
    content = await file.read()
    
    # Convert to JPEG format
    image = Image.open(io.BytesIO(content))
    if image.mode in ("RGBA", "P"):
        image = image.convert("RGB")
    
    # Generate unique filename
    unique_filename = f"{uuid.uuid4()}.jpeg"
    file_path = images_dir / unique_filename
    
    # Save as JPEG
    image.save(file_path, "JPEG", quality=90, optimize=True)
    
    return {
        "message": "Image uploaded and converted to JPEG successfully",
        "filename": unique_filename,
        "url": f"/images/{unique_filename}"
    }

# Job Application API endpoints
@api_router.post("/job-applications", response_model=JobApplication)
async def submit_job_application(application: JobApplication):
    """Submit a new job application"""
    application_dict = application.dict()
    await db.job_applications.insert_one(application_dict)
    return application

@api_router.get("/job-applications", response_model=List[JobApplication])
async def get_job_applications():
    """Get all job applications (admin endpoint)"""
    applications = await db.job_applications.find().sort("submitted_at", -1).to_list(100)
    return [JobApplication(**app) for app in applications]

@api_router.get("/job-applications/{application_id}", response_model=JobApplication)
async def get_job_application(application_id: str):
    """Get a specific job application"""
    application = await db.job_applications.find_one({"id": application_id})
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    return JobApplication(**application)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
