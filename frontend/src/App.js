import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import { useDropzone } from 'react-dropzone';
import io from 'socket.io-client';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Replace http with ws for WebSocket connection
const WS_URL = BACKEND_URL.replace(/^https?:\/\//, 'wss://');

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      // Fetch existing messages
      fetchMessages();
      
      // Initialize WebSocket connection
      const ws = new WebSocket(`${WS_URL}/ws/chat`);
      
      ws.onopen = () => {
        console.log('Connected to chat');
        setSocket(ws);
      };
      
      ws.onmessage = (event) => {
        const messageData = JSON.parse(event.data);
        setMessages(prev => [...prev, messageData]);
      };
      
      ws.onclose = () => {
        console.log('Disconnected from chat');
        setSocket(null);
      };
      
      return () => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      };
    }
  }, [isOpen]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API}/chat/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && socket && socket.readyState === WebSocket.OPEN) {
      const messageData = {
        user_name: userName,
        message: newMessage,
        message_type: 'user'
      };
      
      socket.send(JSON.stringify(messageData));
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const setName = () => {
    if (userName.trim()) {
      setIsNameSet(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full p-4 shadow-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-110"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">Live Chat Support</h3>
            <p className="text-sm opacity-90">We're here to help!</p>
          </div>

          {!isNameSet ? (
            /* Name Input */
            <div className="p-4 flex flex-col justify-center flex-1">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">Welcome to our chat!</h4>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                onKeyPress={(e) => e.key === 'Enter' && setName()}
              />
              <button
                onClick={setName}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
              >
                Start Chat
              </button>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div key={index} className={`mb-3 ${msg.user_name === userName ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block max-w-xs px-3 py-2 rounded-lg ${
                      msg.user_name === userName 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-800'
                    }`}>
                      <p className="text-xs font-semibold mb-1">{msg.user_name}</p>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const CVUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    setUploading(true);
    
    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('uploaded_by', 'website_user');
      
      try {
        const response = await axios.post(`${API}/upload/cv`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        alert(`File "${file.name}" uploaded successfully!`);
        fetchUploadedFiles();
      } catch (error) {
        console.error('Upload error:', error);
        alert(`Error uploading "${file.name}". Please try again.`);
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
      const response = await axios.get(`${API}/uploads`);
      setUploadedFiles(response.data.slice(0, 5)); // Show only last 5 uploads
    } catch (error) {
      console.error('Error fetching uploads:', error);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl p-8 shadow-2xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">CV & Document Upload</h2>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-300 hover:border-green-400'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="mb-4">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        
        {uploading ? (
          <p className="text-blue-600 font-semibold">Uploading...</p>
        ) : isDragActive ? (
          <p className="text-green-600 font-semibold">Drop the files here ...</p>
        ) : (
          <div>
            <p className="text-gray-600 mb-2">Drag 'n' drop your CV or documents here, or click to select files</p>
            <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX, TXT files</p>
          </div>
        )}
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Uploads</h3>
          <p className="text-sm text-gray-600 mb-3">📍 Serving Milton Keynes and across the UK</p>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{file.original_name}</span>
                <span className="text-sm text-gray-500">
                  {(file.file_size / 1024).toFixed(1)} KB
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  useEffect(() => {
    const helloWorldApi = async () => {
      try {
        const response = await axios.get(`${API}/`);
        console.log(response.data.message);
      } catch (e) {
        console.error(e, `errored out requesting / api`);
      }
    };

    helloWorldApi();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url("https://images.unsplash.com/photo-1488590528505-98d2b5aba04b")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="text-center text-white z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to Milton Keynes
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400"> Professional</span> Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Based in Milton Keynes, UK - Experience seamless communication and document management with our advanced chat support and CV upload system.
          </p>
          <div className="space-x-4">
            <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        className="py-20 relative"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url("https://images.unsplash.com/photo-1531297484001-80022131f5a1")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for professional communication and document management
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Chat Feature */}
            <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-green-500 to-teal-600 p-3 rounded-full mr-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Real-Time Chat Support</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Get instant help with our real-time chat system. Connect with our support team 24/7 for immediate assistance with any questions or concerns.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Instant messaging
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  24/7 availability
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Professional support team
                </li>
              </ul>
            </div>

            {/* CV Upload Section */}
            <CVUpload />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        className="py-20 relative"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1519389950473-47ba0277781c")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Milton Keynes Professional Services
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-12">
            Our platform combines cutting-edge technology with user-friendly design to deliver 
            an exceptional experience for professional communication and document management in Milton Keynes and across the UK. 
            Whether you're uploading important documents or seeking immediate support through our chat system, 
            we've got you covered.
          </p>
          
          {/* Team Section */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">AJ</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Abdina Jama</h3>
              <p className="text-gray-300">Senior Consultant</p>
              <p className="text-sm text-gray-400 mt-2">Milton Keynes, UK</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">AH</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Abunina Haider</h3>
              <p className="text-gray-300">Project Manager</p>
              <p className="text-sm text-gray-400 mt-2">Milton Keynes, UK</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">ZJ</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Zulkera Joe</h3>
              <p className="text-gray-300">Technical Lead</p>
              <p className="text-sm text-gray-400 mt-2">Milton Keynes, UK</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Milton Keynes Professional Services</h3>
              <p className="text-gray-400">
                Your trusted partner for professional communication and document management solutions in Milton Keynes and across the UK.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                📍 Based in Milton Keynes, Buckinghamshire, UK
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Our Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Real-time Chat Support</li>
                <li>CV & Document Upload</li>
                <li>Professional Consultation</li>
                <li>UK-Based Support Team</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Our Team</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Abdina Jama - Senior Consultant</li>
                <li>Abunina Haider - Project Manager</li>
                <li>Zulkera Joe - Technical Lead</li>
              </ul>
              <p className="text-gray-400 mt-4">
                Use our chat widget for instant support or upload your documents through our secure upload system.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Milton Keynes Professional Services. All rights reserved.</p>
            <p className="text-sm mt-2">Based in Milton Keynes, Buckinghamshire, United Kingdom</p>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
