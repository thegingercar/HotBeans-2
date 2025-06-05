import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Users, Award, BookOpen, ArrowRight, ChevronDown } from 'lucide-react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import CompanyProfile from './CompanyProfile';
import TeamProfiles from './TeamProfiles';
import JobSpecifications from './JobSpecifications';
import LearningResources from './LearningResources';
import Footer from './Footer';
import SecretJokesArea from './SecretJokesArea';
import SecretCrazyWebsite from './SecretCrazyWebsite';
import SecretButtons from './SecretButtons';
import ChatWidget from './ChatWidget';
import CVUploadWidget from './CVUploadWidget';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showJokes, setShowJokes] = useState(false);
  const [showCrazyWebsite, setShowCrazyWebsite] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Secret keyboard combinations
    const handleKeyDown = (event) => {
      // Ctrl + Shift + J for jokes
      if (event.ctrlKey && event.shiftKey && event.key === 'J') {
        event.preventDefault();
        setShowJokes(true);
      }
      
      // Ctrl + Shift + K for crazy website
      if (event.ctrlKey && event.shiftKey && event.key === 'K') {
        event.preventDefault();
        setShowCrazyWebsite(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <Navigation />
      <HeroSection />
      <CompanyProfile />
      <TeamProfiles />
      
      {/* CV Upload Section */}
      <section id="cv-upload" className="py-20 bg-gradient-to-b from-slate-800 to-green-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Submit Your <span className="text-green-400">CV & Documents</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Upload your CV and supporting documents to start your journey with Hot Beans Web in Milton Keynes.
            </p>
          </motion.div>
          
          <CVUploadWidget />
        </div>
      </section>
      
      <JobSpecifications />
      <LearningResources />
      <Footer />
      
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
      
      {/* Chat Widget */}
      <ChatWidget />
    </motion.div>
  );
};

export default Home;