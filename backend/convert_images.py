#!/usr/bin/env python3
import os
from PIL import Image
from pathlib import Path

def convert_to_jpeg(input_path, output_path, quality=90):
    """Convert image to JPEG format"""
    try:
        with Image.open(input_path) as img:
            # Convert RGBA or P mode to RGB
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            
            # Save as JPEG
            img.save(output_path, "JPEG", quality=quality, optimize=True)
            print(f"Converted {input_path} to {output_path}")
            return True
    except Exception as e:
        print(f"Error converting {input_path}: {e}")
        return False

def main():
    images_dir = Path("/app/backend/images")
    
    # List of image files to convert
    image_files = [
        "modern-building.jpg",
        "code-laptop.jpg", 
        "team-collaboration.jpg",
        "glowing-laptop.jpg",
        "chat-bubble.jpg"
    ]
    
    for image_file in image_files:
        input_path = images_dir / image_file
        if input_path.exists():
            # Create output filename with .jpeg extension
            output_name = input_path.stem + ".jpeg"
            output_path = images_dir / output_name
            
            convert_to_jpeg(input_path, output_path)
            
            # Remove original if conversion successful and it's not already .jpeg
            if output_path.exists() and input_path.suffix != ".jpeg":
                os.remove(input_path)
                print(f"Removed original {input_path}")
        else:
            print(f"File not found: {input_path}")

if __name__ == "__main__":
    main()