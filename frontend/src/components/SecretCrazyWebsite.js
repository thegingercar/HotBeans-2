import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Star, Heart, Rocket, Sparkles, Rainbow, Music } from 'lucide-react';

const SecretCrazyWebsite = ({ isOpen, onClose }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [particles, setParticles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Generate random particles
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 10 + 5,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        speed: Math.random() * 3 + 1,
      }));
      setParticles(newParticles);
    }
  }, [isOpen]);

  const scenes = [
    {
      title: "🌟 WELCOME TO THE MATRIX 🌟",
      subtitle: "You've discovered the secret dimension!",
      bgGradient: "from-pink-500 via-purple-500 to-indigo-500",
      textColor: "text-white"
    },
    {
      title: "🚀 SPACE ODYSSEY 🚀",
      subtitle: "Traveling through the digital cosmos!",
      bgGradient: "from-indigo-900 via-blue-500 to-cyan-400",
      textColor: "text-white"
    },
    {
      title: "🌈 RAINBOW DIMENSION 🌈",
      subtitle: "Colors beyond imagination!",
      bgGradient: "from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500",
      textColor: "text-white"
    },
    {
      title: "⚡ ENERGY VORTEX ⚡",
      subtitle: "Pure digital energy flowing!",
      bgGradient: "from-yellow-400 via-orange-500 to-red-600",
      textColor: "text-white"
    }
  ];

  const crazyMessages = [
    "🎉 YOU FOUND THE SECRET! 🎉",
    "🤯 MIND = BLOWN 🤯",
    "✨ MAGIC IS REAL ✨",
    "🎵 DANCE TO THE CODE 🎵",
    "🔥 THIS IS FIRE! 🔥",
    "🌟 STARLIGHT EXPRESS 🌟",
    "🎨 ART IN MOTION 🎨",
    "💫 COSMIC DEVELOPER 💫"
  ];

  const nextScene = () => {
    setCurrentScene((prev) => (prev + 1) % scenes.length);
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className={`fixed inset-0 z-50 bg-gradient-to-br ${scenes[currentScene].bgGradient} overflow-hidden`}
        style={{ backgroundSize: '400% 400%' }}
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'reverse'
          }}
          style={{
            background: `linear-gradient(-45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000)`,
            backgroundSize: '1000% 1000%'
          }}
        />

        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              left: particle.x,
              top: particle.y,
            }}
            animate={{
              y: [particle.y, particle.y - 200, particle.y],
              x: [particle.x, particle.x + 100, particle.x - 50, particle.x],
              scale: [1, 1.5, 0.8, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* Crazy Rotating Elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.5, 2, 0.5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {[<Star />, <Heart />, <Zap />, <Sparkles />, <Rocket />][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute top-8 right-8 text-white hover:text-red-400 p-4 bg-black/20 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={32} />
          </motion.button>

          {/* Music Toggle */}
          <motion.button
            onClick={toggleMusic}
            className="absolute top-8 left-8 text-white hover:text-yellow-400 p-4 bg-black/20 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
          >
            <Music size={32} />
          </motion.button>

          {/* Main Title */}
          <motion.h1
            key={currentScene}
            className={`text-6xl md:text-8xl font-bold mb-8 ${scenes[currentScene].textColor}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.6, duration: 1 }}
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6)',
              background: 'linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8)',
              backgroundSize: '800% 800%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {scenes[currentScene].title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            key={`subtitle-${currentScene}`}
            className="text-2xl md:text-4xl mb-12 text-white font-bold"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          >
            {scenes[currentScene].subtitle}
          </motion.p>

          {/* Crazy Messages Carousel */}
          <motion.div
            className="mb-12"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.p
              key={currentScene}
              className="text-xl md:text-2xl text-yellow-300 font-bold bg-black/30 px-6 py-3 rounded-full backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring", bounce: 0.8 }}
            >
              {crazyMessages[currentScene % crazyMessages.length]}
            </motion.p>
          </motion.div>

          {/* Interactive Buttons */}
          <div className="flex flex-wrap gap-6 justify-center">
            <motion.button
              onClick={nextScene}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:shadow-2xl transition-all duration-300"
              whileHover={{ 
                scale: 1.1, 
                boxShadow: '0 0 30px rgba(255,255,255,0.8)',
                rotate: [0, -5, 5, 0]
              }}
              whileTap={{ scale: 0.9 }}
              animate={{ 
                boxShadow: '0 0 30px rgba(147, 51, 234, 0.8)'
              }}
              transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
            >
              🌈 NEXT DIMENSION 🌈
            </motion.button>

            <motion.button
              onClick={() => setParticles(prev => [...prev, ...Array.from({ length: 20 }, (_, i) => ({
                id: prev.length + i,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 15 + 10,
                color: `hsl(${Math.random() * 360}, 80%, 60%)`,
                speed: Math.random() * 5 + 2,
              }))])}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              animate={{ 
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨ MORE MAGIC ✨
            </motion.button>
          </div>

          {/* Bottom Message */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-white text-lg font-bold bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm">
              🎮 Press <kbd className="bg-white/20 px-2 py-1 rounded text-sm">Ctrl+Shift+K</kbd> to access this madness! 🎮
            </p>
          </motion.div>
        </div>

        {/* Crazy Border Animation */}
        <motion.div
          className="absolute inset-0 border-8 border-white/50 rounded-3xl"
          animate={{
            borderColor: 'rgba(255,0,255,0.8)',
            borderWidth: '12px',
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default SecretCrazyWebsite;