import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, Mail, Calendar, ArrowRight } from 'lucide-react';
import SecretButtons from './SecretButtons';
import SecretJokesArea from './SecretJokesArea';
import SecretCrazyWebsite from './SecretCrazyWebsite';

const ApplicationSuccess = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [showJokes, setShowJokes] = useState(false);
  const [showCrazyWebsite, setShowCrazyWebsite] = useState(false);

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Confetti animation particles
  const confettiColors = ['#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                left: `${Math.random() * 100}%`,
                top: '-10px',
              }}
              initial={{ y: -10, opacity: 1, rotate: 0 }}
              animate={{
                y: window.innerHeight + 10,
                opacity: 0,
                rotate: 360,
                x: [0, Math.random() * 200 - 100],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                ease: "easeOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full shadow-2xl">
            <CheckCircle size={64} className="text-white" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Application
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-600 bg-clip-text text-transparent">
              Submitted!
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Thank you for applying to Hot Beans Web! We're excited to review your application 
            and will be in touch soon.
          </p>
        </motion.div>

        {/* Success Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">What happens next?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="bg-slate-700/30 rounded-xl p-6"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-blue-400 mb-3 flex justify-center">
                <Mail size={32} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email Confirmation</h3>
              <p className="text-gray-300 text-sm">
                You'll receive a confirmation email within the next hour with your application details.
              </p>
            </motion.div>

            <motion.div
              className="bg-slate-700/30 rounded-xl p-6"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="text-cyan-400 mb-3 flex justify-center">
                <Calendar size={32} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Review Process</h3>
              <p className="text-gray-300 text-sm">
                Our team will review your application within 3-5 business days.
              </p>
            </motion.div>

            <motion.div
              className="bg-slate-700/30 rounded-xl p-6"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="text-green-400 mb-3 flex justify-center">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Next Steps</h3>
              <p className="text-gray-300 text-sm">
                If shortlisted, we'll contact you to schedule an interview and coding challenge.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="space-y-4"
        >
          <p className="text-lg text-gray-300 mb-6">
            While you wait, feel free to explore more about our company and team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home size={20} />
                Back to Home
              </motion.button>
            </Link>

            <motion.button
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Follow Up
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 text-gray-400"
        >
          <p className="text-sm">
            Have questions? Contact us at{' '}
            <a href="mailto:careers@hotbeansweb.com" className="text-blue-400 hover:text-blue-300 transition-colors">
              careers@hotbeansweb.com
            </a>
          </p>
        </motion.div>

        {/* Celebration Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <div className="text-6xl opacity-20">🎉</div>
        </motion.div>
      </div>
      
      {/* Secret Buttons */}
      <SecretButtons 
        onShowJokes={() => setShowJokes(true)}
        onShowCrazyWebsite={() => setShowCrazyWebsite(true)}
      />
      
      <SecretJokesArea 
        isOpen={showJokes} 
        onClose={() => setShowJokes(false)} 
      />
      
      <SecretCrazyWebsite 
        isOpen={showCrazyWebsite} 
        onClose={() => setShowCrazyWebsite(false)} 
      />
    </div>
  );
};

export default ApplicationSuccess;