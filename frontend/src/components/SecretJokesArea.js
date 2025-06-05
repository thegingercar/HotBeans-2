import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Laugh, RefreshCw } from 'lucide-react';

const SecretJokesArea = ({ isOpen, onClose }) => {
  const [currentJoke, setCurrentJoke] = useState(0);
  
  const devJokes = [
    {
      setup: "Why do programmers prefer dark mode?",
      punchline: "Because light attracts bugs! 🐛"
    },
    {
      setup: "How many programmers does it take to change a light bulb?",
      punchline: "None. That's a hardware problem! 💡"
    },
    {
      setup: "Why don't programmers like nature?",
      punchline: "It has too many bugs and no wifi! 🌲"
    },
    {
      setup: "What's a programmer's favorite hangout place?",
      punchline: "Foo Bar! 🍻"
    },
    {
      setup: "Why did the developer go broke?",
      punchline: "Because he used up all his cache! 💰"
    },
    {
      setup: "What do you call a programmer from Finland?",
      punchline: "Nerdic! 🇫🇮"
    },
    {
      setup: "Why do Java developers wear glasses?",
      punchline: "Because they can't C#! 👓"
    },
    {
      setup: "How do you comfort a JavaScript bug?",
      punchline: "You console it! 🤗"
    },
    {
      setup: "What's the object-oriented way to become wealthy?",
      punchline: "Inheritance! 💎"
    },
    {
      setup: "Why did the web developer leave the restaurant?",
      punchline: "Because of the table layout! 🍽️"
    },
    {
      setup: "What do you call a sleeping bull at Hot Beans Web?",
      punchline: "A bulldozer! 😴"
    },
    {
      setup: "Why don't developers ever get tired?",
      punchline: "Because they're always getting REST! 😴"
    }
  ];

  const nextJoke = () => {
    setCurrentJoke((prev) => (prev + 1) % devJokes.length);
  };

  const randomJoke = () => {
    const randomIndex = Math.floor(Math.random() * devJokes.length);
    setCurrentJoke(randomIndex);
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentJoke(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-md rounded-2xl border border-purple-500/30 p-8 max-w-lg w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Laugh className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Secret Dev Jokes! 🤫
              </h2>
            </div>
            <motion.button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
          </div>

          {/* Joke Display */}
          <motion.div
            key={currentJoke}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 rounded-xl p-6 mb-6 min-h-[200px] flex flex-col justify-center"
          >
            <p className="text-lg text-purple-300 mb-4 leading-relaxed">
              {devJokes[currentJoke].setup}
            </p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl font-semibold text-white leading-relaxed"
            >
              {devJokes[currentJoke].punchline}
            </motion.p>
          </motion.div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={nextJoke}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next Joke
            </motion.button>
            
            <motion.button
              onClick={randomJoke}
              className="border-2 border-purple-500/50 text-purple-300 px-6 py-3 rounded-full font-semibold hover:bg-purple-500/10 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={16} />
              Random
            </motion.button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Joke {currentJoke + 1} of {devJokes.length} • Press <kbd className="bg-slate-700 px-2 py-1 rounded text-xs">Ctrl+Shift+J</kbd> to access this again!
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SecretJokesArea;