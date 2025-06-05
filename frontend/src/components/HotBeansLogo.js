import React from 'react';
import { motion } from 'framer-motion';

const HotBeansLogo = ({ className = "h-8 w-auto", showText = true }) => {
  return (
    <motion.div
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo Icon */}
      <div className="relative mr-3">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Coffee Bean Shape */}
          <motion.path
            d="M20 4C14 4 9 8.5 9 14.5C9 18 10.5 21 13 23C15.5 25 18 26 20 26C22 26 24.5 25 27 23C29.5 21 31 18 31 14.5C31 8.5 26 4 20 4Z"
            fill="url(#greenGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Coffee Bean Center Line */}
          <motion.path
            d="M20 6C20 6 17 12 20 18C23 12 20 6 20 6Z"
            fill="url(#whiteGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          
          {/* Hot Steam */}
          <motion.path
            d="M16 30C16 30 16 32 17 33C18 34 17 35 18 36"
            stroke="url(#steamGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.8, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          />
          
          <motion.path
            d="M20 30C20 30 20 32 21 33C22 34 21 35 22 36"
            stroke="url(#steamGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          />
          
          <motion.path
            d="M24 30C24 30 24 32 25 33C26 34 25 35 26 36"
            stroke="url(#steamGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            
            <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f3f4f6" stopOpacity="0.7" />
            </linearGradient>
            
            <linearGradient id="steamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 blur-xl"></div>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="text-xl font-bold bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">
            Hot Beans
          </span>
          <span className="text-sm text-gray-600 font-medium -mt-1">
            Web Solutions
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HotBeansLogo;