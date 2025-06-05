import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, MapPin } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8001";
const WS_URL = BACKEND_URL.replace(/^https?:\/\//, 'wss://');

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && isNameSet) {
      // Fetch existing messages
      fetchMessages();
      
      // Initialize WebSocket connection
      const ws = new WebSocket(`${WS_URL}/ws/chat`);
      
      ws.onopen = () => {
        console.log('Connected to chat');
        setSocket(ws);
        setIsConnected(true);
      };
      
      ws.onmessage = (event) => {
        const messageData = JSON.parse(event.data);
        setMessages(prev => {
          // Avoid duplicates
          const exists = prev.some(msg => msg.id === messageData.id);
          if (exists) return prev;
          return [...prev, messageData];
        });
      };
      
      ws.onclose = () => {
        console.log('Disconnected from chat');
        setSocket(null);
        setIsConnected(false);
      };
      
      return () => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      };
    }
  }, [isOpen, isNameSet]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/chat/messages`);
      const data = await response.json();
      setMessages(data);
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
      if (!isNameSet) {
        setName();
      } else {
        sendMessage();
      }
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
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full p-4 shadow-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Live Chat Support</h3>
                  <div className="flex items-center text-sm opacity-90">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>Milton Keynes, UK</span>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-300' : 'bg-red-300'}`}></div>
              </div>
              <p className="text-sm opacity-90 mt-1">We're here to help!</p>
            </div>

            {!isNameSet ? (
              /* Name Input */
              <div className="p-6 flex flex-col justify-center flex-1">
                <div className="text-center mb-4">
                  <User className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <h4 className="text-lg font-semibold text-gray-800">Welcome to our chat!</h4>
                  <p className="text-sm text-gray-600">Based in Milton Keynes, serving the UK</p>
                </div>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                  onKeyPress={handleKeyPress}
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
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  {messages.length === 0 && (
                    <div className="text-center text-gray-500 text-sm">
                      <p>Welcome to Hot Beans Web support!</p>
                      <p>How can we help you today?</p>
                    </div>
                  )}
                  {messages.map((msg, index) => (
                    <motion.div
                      key={msg.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-3 ${msg.user_name === userName ? 'text-right' : 'text-left'}`}
                    >
                      <div className={`inline-block max-w-xs px-3 py-2 rounded-lg ${
                        msg.user_name === userName 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}>
                        <p className="text-xs font-semibold mb-1 opacity-75">{msg.user_name}</p>
                        <p className="text-sm">{msg.message}</p>
                        {msg.timestamp && (
                          <p className="text-xs opacity-50 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
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
                      className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 transition-colors flex items-center"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  {!isConnected && (
                    <p className="text-red-500 text-xs mt-1">Connecting...</p>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;