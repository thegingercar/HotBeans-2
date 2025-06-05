import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, Linkedin, Mail, Code, Palette, Database } from 'lucide-react';

const TeamProfiles = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const developers = [
    {
      name: "Abdina Jama",
      role: "Senior Consultant",
      specialization: "Project Leadership",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      bio: "Experienced consultant leading projects in Milton Keynes. Passionate about delivering exceptional client solutions and mentoring junior developers.",
      skills: ["Project Management", "Client Relations", "Strategic Planning", "Team Leadership"],
      icon: <Code className="w-5 h-5" />,
      journey: "Leading development initiatives in Milton Keynes",
      location: "Milton Keynes, UK",
      social: {
        github: "#",
        linkedin: "#",
        email: "abdina@hotbeansweb.com"
      }
    },
    {
      name: "Abunina Haider",
      role: "Project Manager",
      specialization: "Full-Stack Development",
      image: "https://images.pexels.com/photos/7652465/pexels-photo-7652465.jpeg",
      bio: "Project manager with strong technical background, ensuring seamless delivery of web solutions for clients across Buckinghamshire.",
      skills: ["Node.js", "React", "MongoDB", "Agile Management"],
      icon: <Database className="w-5 h-5" />,
      journey: "Managing cutting-edge projects in Milton Keynes",
      location: "Milton Keynes, UK",
      social: {
        github: "#",
        linkedin: "#",
        email: "abunina@hotbeansweb.com"
      }
    },
    {
      name: "Zulkera Joe",
      role: "Technical Lead",
      specialization: "Frontend Architecture",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      bio: "Technical lead specializing in modern frontend technologies, driving innovation in user experience design for Milton Keynes businesses.",
      skills: ["React", "TypeScript", "UI/UX Design", "Technical Architecture"],
      icon: <Palette className="w-5 h-5" />,
      journey: "Innovating frontend solutions in Milton Keynes",
      location: "Milton Keynes, UK",
      social: {
        github: "#",
        linkedin: "#",
        email: "zulkera@hotbeansweb.com"
      }
    }
  ];

  return (
    <section id="team" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Meet Our <span className="text-green-400">Professional Team</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Based in Milton Keynes, UK - Get to know our talented professionals who deliver 
            exceptional web solutions for businesses across Buckinghamshire and beyond.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {developers.map((dev, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-green-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Profile Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={dev.image}
                  alt={dev.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                
                {/* Specialization Badge */}
                <div className="absolute top-4 right-4 bg-green-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                  {dev.icon}
                  {dev.specialization}
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{dev.name}</h3>
                <p className="text-green-400 font-medium mb-2">{dev.role}</p>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{dev.bio}</p>
                
                {/* Location */}
                <div className="bg-slate-700/30 rounded-lg p-3 mb-4">
                  <p className="text-green-400 text-sm font-medium">📍 {dev.location}</p>
                  <p className="text-cyan-400 text-xs">{dev.journey}</p>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-white text-sm font-medium mb-2">Key Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {dev.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="bg-green-600/20 text-green-300 px-2 py-1 rounded text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-4 pt-4 border-t border-slate-700/50">
                  <motion.a
                    href={dev.social.github}
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={18} />
                  </motion.a>
                  <motion.a
                    href={dev.social.linkedin}
                    className="text-gray-400 hover:text-green-400 transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin size={18} />
                  </motion.a>
                  <motion.a
                    href={`mailto:${dev.social.email}`}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Mail size={18} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Join Our Team?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Start your journey with Hot Beans Web and become part of our growing family of passionate developers.
            </p>
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Open Positions
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamProfiles;