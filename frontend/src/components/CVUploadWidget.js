import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle, AlertCircle, MapPin } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8001";

const CVUploadWidget = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const onDrop = async (acceptedFiles) => {
    setUploading(true);
    setUploadStatus(null);
    
    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('uploaded_by', 'website_user');
      
      try {
        const response = await fetch(`${BACKEND_URL}/api/upload/cv`, {
          method: 'POST',
          body: formData,
        });
        
        const result = await response.json();
        
        if (response.ok) {
          setUploadStatus({
            type: 'success',
            message: `File "${file.name}" uploaded successfully!`
          });
          fetchUploadedFiles();
        } else {
          setUploadStatus({
            type: 'error',
            message: result.detail || `Error uploading "${file.name}"`
          });
        }
      } catch (error) {
        console.error('Upload error:', error);
        setUploadStatus({
          type: 'error',
          message: `Error uploading "${file.name}". Please try again.`
        });
      }
    }
    
    setUploading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: true
  });

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/uploads`);
      const data = await response.json();
      setUploadedFiles(data.slice(0, 5)); // Show only last 5 uploads
    } catch (error) {
      console.error('Error fetching uploads:', error);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-green-200"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">CV & Document Upload</h2>
        <div className="flex items-center justify-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          <span>Serving Milton Keynes and across the UK</span>
        </div>
      </div>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragActive 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="mb-4">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
        </div>
        
        {uploading ? (
          <div className="flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full mr-2"
            />
            <p className="text-green-600 font-semibold">Uploading...</p>
          </div>
        ) : isDragActive ? (
          <p className="text-green-600 font-semibold">Drop the files here ...</p>
        ) : (
          <div>
            <p className="text-gray-600 mb-2">Drag 'n' drop your CV or documents here, or click to select files</p>
            <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX, TXT files</p>
          </div>
        )}
      </div>

      {/* Upload Status */}
      {uploadStatus && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-3 rounded-lg flex items-center ${
            uploadStatus.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {uploadStatus.type === 'success' ? (
            <CheckCircle className="w-5 h-5 mr-2" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-2" />
          )}
          <span className="text-sm">{uploadStatus.message}</span>
        </motion.div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Uploads</h3>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <span className="text-gray-700 font-medium">{file.original_name}</span>
                    <p className="text-xs text-gray-500">
                      {new Date(file.upload_timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {(file.file_size / 1024).toFixed(1)} KB
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CVUploadWidget;