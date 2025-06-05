import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, MapPin, Bot } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Pre-written responses for UK-focused Hot Beans Web
  const predefinedResponses = [
    {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
      responses: [
        "Hello! Welcome to Hot Beans Web, Milton Keynes' premier web development company. How can I assist you today?",
        "Hi there! Thanks for visiting Hot Beans Web. We're based in Milton Keynes and serve clients across the UK. What can I help you with?",
        "Good day! I'm here to help you with any questions about our web development services in Milton Keynes. How may I assist you?"
      ]
    },
    {
      keywords: ['job', 'career', 'work', 'apply', 'position', 'vacancy', 'employment'],
      responses: [
        "Great to hear you're interested in joining our Milton Keynes team! We regularly have openings for web developers at all levels. You can apply through our application form on this website, or upload your CV using our upload feature.",
        "We're always looking for talented developers to join our team in Milton Keynes! Check out our current job specifications on this page, and don't hesitate to submit your application.",
        "Hot Beans Web offers excellent career opportunities in Milton Keynes. We focus on training and developing UK-based talent. Would you like information about our current openings?"
      ]
    },
    {
      keywords: ['location', 'where', 'address', 'milton keynes', 'office'],
      responses: [
        "We're proudly based in Milton Keynes, Buckinghamshire, UK. Our team serves clients throughout the UK from our Milton Keynes headquarters.",
        "Hot Beans Web is located in Milton Keynes, in the heart of Buckinghamshire. We've chosen Milton Keynes for its excellent transport links and vibrant tech community.",
        "Our office is in Milton Keynes, UK. We love being part of the growing tech scene in Buckinghamshire and serving businesses across the United Kingdom."
      ]
    },
    {
      keywords: ['services', 'what do you do', 'web development', 'website'],
      responses: [
        "Hot Beans Web specializes in cutting-edge web development services for UK businesses. We create responsive websites, web applications, and provide ongoing support from our Milton Keynes base.",
        "We're a full-service web development company based in Milton Keynes. Our services include website design, web applications, e-commerce solutions, and digital transformation for UK businesses.",
        "From our Milton Keynes office, we deliver premium web development services including React applications, backend development, and complete digital solutions for companies across the UK."
      ]
    },
    {
      keywords: ['team', 'staff', 'who', 'abdina', 'abunina', 'zulkera'],
      responses: [
        "Our talented team in Milton Keynes includes Abdina Jama (Senior Consultant), Abunina Haider (Project Manager), and Zulkera Joe (Technical Lead). They bring years of experience in UK web development.",
        "You can meet our team on this website! Abdina Jama leads our consultancy services, Abunina Haider manages our projects, and Zulkera Joe heads our technical development - all based here in Milton Keynes.",
        "Our Milton Keynes team is led by experienced professionals: Abdina Jama, Abunina Haider, and Zulkera Joe. They're passionate about delivering excellent web solutions for UK businesses."
      ]
    },
    {
      keywords: ['price', 'cost', 'quote', 'budget'],
      responses: [
        "Our pricing is competitive within the UK market. Each project is unique, so we provide customized quotes based on your specific requirements. Contact us for a free consultation and quote.",
        "We offer fair, transparent pricing for all our web development services. Based in Milton Keynes, we understand UK business needs and price accordingly. Let's discuss your project for an accurate quote.",
        "Pricing varies depending on project scope and requirements. As a Milton Keynes-based company, we offer excellent value for money. Contact our team for a detailed quote."
      ]
    },
    {
      keywords: ['contact', 'phone', 'email', 'reach'],
      responses: [
        "You can reach us through this chat, by email, or visit us in Milton Keynes! Our team is available during UK business hours to discuss your web development needs.",
        "We're easily contactable here in Milton Keynes. Use this chat for quick questions, or check our website for detailed contact information. We'd love to hear about your project!",
        "Get in touch with our Milton Keynes team through multiple channels. This chat is perfect for initial queries, and our team can arrange face-to-face meetings for UK-based clients."
      ]
    },
    {
      keywords: ['cv', 'upload', 'resume', 'document'],
      responses: [
        "Perfect! You can upload your CV directly on this webpage using our secure upload feature. We accept PDF, DOC, DOCX, and TXT files. Our Milton Keynes team reviews all applications promptly.",
        "Our CV upload system is available right here on the website. Just drag and drop your CV or click to select files. We process all applications from our Milton Keynes office.",
        "Great question! You'll find our CV upload feature on this page. Upload your CV and any supporting documents - our team in Milton Keynes will review your application and get back to you."
      ]
    }
  ];

  const defaultResponses = [
    "That's a great question! Our team in Milton Keynes would be happy to help you with that. Feel free to contact us directly for more detailed information.",
    "Thanks for your interest in Hot Beans Web! For specific queries, our Milton Keynes team can provide detailed assistance. Don't hesitate to reach out!",
    "I'd be happy to help! For more detailed information about our services in Milton Keynes, please feel free to contact our team directly.",
    "Interesting question! Our experienced team in Milton Keynes can provide you with comprehensive information about that topic."
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isNameSet && messages.length === 0) {
      // Add welcome message when name is set
      const welcomeMessage = {
        id: 'welcome',
        user_name: 'Hot Beans Assistant',
        message: `Hello ${userName}! Welcome to Hot Beans Web, Milton Keynes. I'm here to help you with information about our services, job opportunities, and anything else you'd like to know about our UK-based web development company. How can I assist you today?`,
        timestamp: new Date().toISOString(),
        message_type: 'bot'
      };
      setMessages([welcomeMessage]);
    }
  }, [isNameSet, userName]);

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Find matching response based on keywords
    for (const responseGroup of predefinedResponses) {
      if (responseGroup.keywords.some(keyword => lowerMessage.includes(keyword))) {
        const randomResponse = responseGroup.responses[Math.floor(Math.random() * responseGroup.responses.length)];
        return randomResponse;
      }
    }
    
    // Return default response if no keywords match
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now().toString(),
        user_name: userName,
        message: newMessage,
        timestamp: new Date().toISOString(),
        message_type: 'user'
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      setIsTyping(true);
      
      // Simulate bot typing and response
      setTimeout(() => {
        setIsTyping(false);
        const botResponse = {
          id: (Date.now() + 1).toString(),
          user_name: 'Hot Beans Assistant',
          message: getBotResponse(newMessage),
          timestamp: new Date().toISOString(),
          message_type: 'bot'
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
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

  const quickQuestions = [
    "Tell me about job opportunities",
    "What services do you offer?",
    "Where are you located?",
    "How can I upload my CV?",
    "Tell me about your team"
  ];

  const handleQuickQuestion = (question) => {
    setNewMessage(question);
    setTimeout(() => sendMessage(), 100);
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
            className="absolute bottom-16 right-0 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold flex items-center">
                    <Bot className="w-4 h-4 mr-2" />
                    Hot Beans Assistant
                  </h3>
                  <div className="flex items-center text-sm opacity-90">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>Milton Keynes, UK</span>
                  </div>
                </div>
                <div className="w-3 h-3 rounded-full bg-green-300"></div>
              </div>
              <p className="text-sm opacity-90 mt-1">UK-based web development experts</p>
            </div>

            {!isNameSet ? (
              /* Name Input */
              <div className="p-6 flex flex-col justify-center flex-1">
                <div className="text-center mb-4">
                  <User className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <h4 className="text-lg font-semibold text-gray-800">Welcome to Hot Beans Web!</h4>
                  <p className="text-sm text-gray-600">Milton Keynes' premier web development company</p>
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
                        <p className="text-xs font-semibold mb-1 opacity-75 flex items-center">
                          {msg.message_type === 'bot' && <Bot className="w-3 h-3 mr-1" />}
                          {msg.user_name}
                        </p>
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-50 mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-left mb-3"
                    >
                      <div className="inline-block bg-white text-gray-800 border border-gray-200 px-3 py-2 rounded-lg">
                        <p className="text-xs font-semibold mb-1 opacity-75 flex items-center">
                          <Bot className="w-3 h-3 mr-1" />
                          Hot Beans Assistant
                        </p>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Quick Questions */}
                  {messages.length === 1 && !isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4"
                    >
                      <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                      <div className="space-y-2">
                        {quickQuestions.map((question, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickQuestion(question)}
                            className="block w-full text-left text-xs bg-green-50 hover:bg-green-100 text-green-700 px-2 py-1 rounded border border-green-200 transition-colors"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Ask about our services, jobs, or location..."
                      className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      onKeyPress={handleKeyPress}
                      disabled={isTyping}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={isTyping}
                      className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 transition-colors flex items-center disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
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