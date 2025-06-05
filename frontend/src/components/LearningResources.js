import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, ExternalLink, Play, Award, Clock, Users } from 'lucide-react';

const LearningResources = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const courses = [
    {
      title: "The Complete Web Developer Course",
      provider: "Udemy",
      level: "Beginner to Advanced",
      duration: "40+ hours",
      rating: "4.8/5",
      price: "£89.99",
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b",
      description: "Master web development with HTML, CSS, JavaScript, React, Node.js, and more. Build 25+ projects.",
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
      link: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
      recommended: true
    },
    {
      title: "Full Stack Open",
      provider: "University of Helsinki",
      level: "Intermediate",
      duration: "13 weeks",
      rating: "4.9/5",
      price: "Free",
      image: "https://images.pexels.com/photos/4939645/pexels-photo-4939645.jpeg",
      description: "Deep dive into modern web application development with React, Redux, Node.js, MongoDB, GraphQL and TypeScript.",
      skills: ["React", "Redux", "Node.js", "GraphQL", "TypeScript", "Testing"],
      link: "https://fullstackopen.com/en/",
      recommended: true
    },
    {
      title: "Frontend Masters Bootcamp",
      provider: "Frontend Masters",
      level: "Beginner",
      duration: "20+ hours",
      rating: "4.7/5",
      price: "$39/month",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
      description: "Complete introduction to web development taught by industry experts. Hands-on projects included.",
      skills: ["HTML", "CSS", "JavaScript", "Git", "Command Line", "Responsive Design"],
      link: "https://frontendmasters.com/bootcamp/",
      recommended: false
    },
    {
      title: "freeCodeCamp",
      provider: "freeCodeCamp",
      level: "All Levels",
      duration: "300+ hours",
      rating: "4.8/5",
      price: "Free",
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b",
      description: "Comprehensive curriculum covering web development, data science, and machine learning with real projects.",
      skills: ["Web Development", "Data Science", "APIs", "Microservices", "Quality Assurance"],
      link: "https://www.freecodecamp.org/",
      recommended: true
    },
    {
      title: "JavaScript Algorithms and Data Structures",
      provider: "Codecademy",
      level: "Intermediate",
      duration: "25+ hours",
      rating: "4.6/5",
      price: "$15.99/month",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
      description: "Master JavaScript fundamentals and learn algorithms and data structures essential for technical interviews.",
      skills: ["JavaScript", "Algorithms", "Data Structures", "Problem Solving", "Big O Notation"],
      link: "https://www.codecademy.com/learn/introduction-to-javascript",
      recommended: false
    },
    {
      title: "The Odin Project",
      provider: "The Odin Project",
      level: "Beginner to Advanced",
      duration: "1000+ hours",
      rating: "4.9/5",
      price: "Free",
      image: "https://images.pexels.com/photos/4939645/pexels-photo-4939645.jpeg",
      description: "Open-source curriculum for learning web development. Project-based learning with a supportive community.",
      skills: ["Full Stack Development", "Ruby on Rails", "JavaScript", "React", "Git", "Databases"],
      link: "https://www.theodinproject.com/",
      recommended: true
    }
  ];

  const learningPaths = [
    {
      title: "Frontend Developer Path",
      description: "Master client-side development",
      steps: ["HTML & CSS Basics", "JavaScript Fundamentals", "React/Vue Framework", "Advanced CSS & Animations"],
      duration: "6-9 months",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "Full-Stack Developer Path",
      description: "Learn both frontend and backend",
      steps: ["Frontend Foundations", "Backend Development", "Databases", "Deployment & DevOps"],
      duration: "9-12 months",
      icon: <Award className="w-6 h-6" />
    },
    {
      title: "Career Changer Path",
      description: "Transition from another field",
      steps: ["Programming Basics", "Web Fundamentals", "Portfolio Building", "Job Search Preparation"],
      duration: "12-18 months",
      icon: <Users className="w-6 h-6" />
    }
  ];

  return (
    <section id="learning" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Learning <span className="text-blue-400">Resources</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Accelerate your web development journey with these carefully curated courses and learning paths. 
            We recommend these resources to help you build the skills needed for a successful career.
          </p>
        </motion.div>

        {/* Learning Paths */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">Recommended Learning Paths</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="text-blue-400 mb-4 flex justify-center">
                  {path.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-2 text-center">{path.title}</h4>
                <p className="text-gray-300 text-center mb-4">{path.description}</p>
                <div className="space-y-2 mb-4">
                  {path.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      {step}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2 text-cyan-400 text-sm font-medium">
                  <Clock size={16} />
                  {path.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Course Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">Featured Courses</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  
                  {/* Recommended Badge */}
                  {course.recommended && (
                    <div className="absolute top-4 right-4 bg-green-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      Recommended
                    </div>
                  )}
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.price}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-bold text-white leading-tight">{course.title}</h4>
                  </div>
                  
                  <p className="text-blue-400 text-sm font-medium mb-2">{course.provider}</p>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{course.description}</p>
                  
                  {/* Course Info */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div className="text-gray-300">
                      <span className="text-white font-medium">Level:</span> {course.level}
                    </div>
                    <div className="text-gray-300">
                      <span className="text-white font-medium">Duration:</span> {course.duration}
                    </div>
                    <div className="text-gray-300">
                      <span className="text-white font-medium">Rating:</span> {course.rating}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="text-white text-sm font-medium mb-2">You'll Learn:</p>
                    <div className="flex flex-wrap gap-1">
                      {course.skills.slice(0, 4).map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {course.skills.length > 4 && (
                        <span className="text-gray-400 text-xs px-2 py-1">
                          +{course.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Course
                    <ExternalLink size={16} />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Learning?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Take the first step towards your web development career. Choose a learning path that fits your goals 
            and start building the skills that will land you a job at Hot Beans Web.
          </p>
          <motion.button
            className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningResources;