import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Heart, Zap, Users } from 'lucide-react';

const CompanyProfile = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Innovation First",
      description: "We push boundaries and embrace cutting-edge technologies to deliver exceptional web solutions."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "People Focused",
      description: "Our team is our greatest asset. We invest in growth, learning, and creating an inclusive environment."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Rapid Growth",
      description: "Fast-paced environment where you'll accelerate your skills and advance your career quickly."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Culture",
      description: "We believe in teamwork, knowledge sharing, and supporting each other's success."
    }
  ];

  return (
    <section id="company" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-indigo-400">Hot Beans Web</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're a dynamic web development company passionate about creating exceptional digital experiences. 
            Founded with a vision to bridge the gap between innovative technology and creative design.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Company Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-r from-slate-800/50 to-indigo-900/30 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50">
              <h3 className="text-2xl font-bold text-white mb-4">Our Story</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Hot Beans Web started as a small team of passionate developers with a big dream: 
                to create web solutions that not only function flawlessly but also inspire and delight users.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Today, we're a growing company that combines technical excellence with creative innovation. 
                We specialize in modern web applications, e-commerce solutions, and digital transformation projects.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We're looking for talented developers who share our passion for clean code, user experience, 
                and continuous learning. Join us in shaping the future of web development.
              </p>
            </div>
          </motion.div>

          {/* Company Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src="https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg"
                alt="Hot Beans Web Office"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent"></div>
            </div>
            
            {/* Floating Stats */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-400">50+</div>
                <div className="text-sm text-gray-300">Projects Delivered</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">3+</div>
                <div className="text-sm text-gray-300">Years Growing</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">Our Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 text-center hover:border-indigo-500/50 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="text-indigo-400 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{value.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyProfile;