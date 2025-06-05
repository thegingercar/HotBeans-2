
import requests
import sys
import json
import os
import time
from datetime import datetime

class HotBeansAPITester:
    def __init__(self, base_url):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, files=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'} if not files else {}
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                if files:
                    response = requests.post(url, data=data, files=files)
                else:
                    response = requests.post(url, json=data, headers=headers)

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                result = {"name": name, "status": "PASS", "details": f"Status: {response.status_code}"}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                result = {"name": name, "status": "FAIL", "details": f"Expected {expected_status}, got {response.status_code}"}
            
            self.test_results.append(result)
            
            try:
                return success, response.json() if response.text else {}
            except json.JSONDecodeError:
                return success, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({"name": name, "status": "ERROR", "details": str(e)})
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "api",
            200
        )
        if success:
            print(f"Response message: {response.get('message', 'No message')}")
        return success

    def test_chat_messages(self):
        """Test fetching chat messages"""
        success, response = self.run_test(
            "Get Chat Messages",
            "GET",
            "api/chat/messages",
            200
        )
        if success:
            print(f"Retrieved {len(response)} chat messages")
        return success

    def test_file_upload(self, file_path, file_name=None):
        """Test file upload functionality"""
        if not os.path.exists(file_path):
            print(f"❌ Test file not found: {file_path}")
            self.test_results.append({
                "name": "CV Upload", 
                "status": "ERROR", 
                "details": f"Test file not found: {file_path}"
            })
            return False
            
        with open(file_path, 'rb') as f:
            file_content = f.read()
            
        files = {'file': (file_name or os.path.basename(file_path), file_content, 'text/plain')}
        data = {'uploaded_by': 'test_user'}
        
        success, response = self.run_test(
            "CV Upload",
            "POST",
            "api/upload/cv",
            200,
            data=data,
            files=files
        )
        
        if success:
            print(f"File uploaded successfully: {response.get('original_name', 'Unknown')}")
        
        return success

    def test_get_uploads(self):
        """Test fetching uploaded files"""
        success, response = self.run_test(
            "Get Uploaded Files",
            "GET",
            "api/uploads",
            200
        )
        if success:
            print(f"Retrieved {len(response)} uploaded files")
        return success

    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*50)
        print(f"📊 TEST SUMMARY: {self.tests_passed}/{self.tests_run} tests passed")
        print("="*50)
        
        for result in self.test_results:
            status_icon = "✅" if result["status"] == "PASS" else "❌"
            print(f"{status_icon} {result['name']}: {result['status']} - {result['details']}")
        
        print("="*50)
        return self.tests_passed == self.tests_run

def create_test_file():
    """Create a test file for upload testing"""
    test_file_path = "/tmp/test_cv.txt"
    with open(test_file_path, "w") as f:
        f.write("This is a test CV file for Hot Beans Web application testing.\n")
        f.write(f"Created at: {datetime.now().isoformat()}\n")
        f.write("Name: Test User\n")
        f.write("Email: test@example.com\n")
        f.write("Skills: Python, JavaScript, React, FastAPI\n")
    return test_file_path

def main():
    # Get backend URL from environment or use the one from frontend .env
    backend_url = os.environ.get('BACKEND_URL')
    
    if not backend_url:
        try:
            with open('/app/frontend/.env', 'r') as f:
                for line in f:
                    if line.startswith('REACT_APP_BACKEND_URL='):
                        backend_url = line.strip().split('=', 1)[1].strip('"\'')
                        break
        except Exception as e:
            print(f"Error reading frontend .env file: {e}")
    
    if not backend_url:
        print("❌ Backend URL not found. Please set BACKEND_URL environment variable.")
        return 1
    
    print(f"🔗 Using backend URL: {backend_url}")
    
    # Setup
    tester = HotBeansAPITester(backend_url)
    
    # Run tests
    print("\n🚀 Starting Hot Beans Web API Tests...\n")
    
    # Test root endpoint
    tester.test_root_endpoint()
    
    # Test chat messages endpoint
    tester.test_chat_messages()
    
    # Test file upload
    test_file_path = create_test_file()
    tester.test_file_upload(test_file_path)
    
    # Test getting uploads
    tester.test_get_uploads()
    
    # Print summary
    success = tester.print_summary()
    
    # Clean up
    if os.path.exists(test_file_path):
        os.remove(test_file_path)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())
