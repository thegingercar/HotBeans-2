import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code, Mail, Phone, MapPin, Github, Linkedin, Twitter, 
  ExternalLink, Heart, ArrowUp 
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'About Us', href: '#company' },
    { name: 'Our Team', href: '#team' },
    { name: 'Careers', href: '#careers' },
    { name: 'Learning Resources', href: '#learning' },
  ];

  const services = [
    { name: 'Web Development', href: '#' },
    { name: 'E-commerce Solutions', href: '#' },
    { name: 'Digital Transformation', href: '#' },
    { name: 'Consulting', href: '#' },
  ];

  const learningLinks = [
    { name: 'Full Stack Open', href: 'https://fullstackopen.com/en/', external: true },
    { name: 'freeCodeCamp', href: 'https://www.freecodecamp.org/', external: true },
    { name: 'The Odin Project', href: 'https://www.theodinproject.com/', external: true },
    { name: 'Frontend Masters', href: 'https://frontendmasters.com/', external: true },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-800 to-slate-900 border-t border-slate-700/50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-400 p-2 rounded-lg">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                Hot Beans <span className="text-indigo-400">Web</span>
              </span>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Empowering the next generation of web developers through innovative training, 
              mentorship, and exciting career opportunities.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail size={16} className="text-indigo-400" />
                <a href="mailto:careers@hotbeansweb.com" className="hover:text-white transition-colors">
                  careers@hotbeansweb.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone size={16} className="text-indigo-400" />
                <span>+44 20 7123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={16} className="text-indigo-400" />
                <span>London, United Kingdom</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/apply"
                  className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2"
                >
                  Apply Now
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-indigo-400 transition-colors duration-200"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Learning Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Learning Resources</h3>
            <ul className="space-y-3">
              {learningLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : "_self"}
                    rel={link.external ? "noopener noreferrer" : ""}
                    className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    {link.name}
                    {link.external && <ExternalLink size={14} />}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-indigo-500/30 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Journey?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our growing team of passionate developers and help us build the future of web development.
          </p>
          <Link to="/apply">
            <motion.button
              className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Today
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-700/50 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© 2024 Hot Beans Web. Made with</span>
              <Heart size={16} className="text-red-400" />
              <span>by</span>
              <motion.span 
                className="text-indigo-400 font-medium cursor-pointer hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  // Secret easter egg in the footer!
                  const messages = [
                    "🎉 You found the footer secret!",
                    "✨ Abdi is a coding wizard!",
                    "🚀 Click the eye button for more magic!",
                    "💻 Hot Beans Web rocks!",
                    "🎭 Try Ctrl+Shift+J or K!"
                  ];
                  alert(messages[Math.floor(Math.random() * messages.length)]);
                }}
              >
                Abdi Jama
              </motion.span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={20} />
              </motion.a>
            </div>

            {/* Scroll to Top */}
            <motion.button
              onClick={scrollToTop}
              className="text-gray-400 hover:text-white transition-colors p-2"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;