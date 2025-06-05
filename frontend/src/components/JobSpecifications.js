import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Code, Briefcase, GraduationCap, Clock, MapPin, DollarSign, ArrowRight } from 'lucide-react';

const JobSpecifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const jobPositions = [
    {
      title: "Junior Frontend Developer",
      type: "Full-time",
      location: "Remote / London",
      salary: "£25,000 - £35,000",
      icon: <Code className="w-6 h-6" />,
      description: "Join our frontend team and build amazing user interfaces using modern technologies.",
      requirements: [
        "HTML, CSS, JavaScript fundamentals",
        "Experience with React or Vue.js",
        "Understanding of responsive design",
        "Basic knowledge of Git version control",
        "Portfolio of web development projects"
      ],
      preferred: [
        "TypeScript experience",
        "Tailwind CSS or SCSS",
        "Basic backend knowledge",
        "Figma or design tools familiarity"
      ],
      benefits: [
        "Mentorship program",
        "Learning budget £1,500/year",
        "Flexible working hours",
        "Health insurance",
        "Modern equipment provided"
      ]
    },
    {
      title: "Junior Full-Stack Developer",
      type: "Full-time",
      location: "Hybrid / London",
      salary: "£28,000 - £38,000",
      icon: <Briefcase className="w-6 h-6" />,
      description: "Work across the entire stack and contribute to both frontend and backend development.",
      requirements: [
        "JavaScript/TypeScript proficiency",
        "Experience with Node.js or Python",
        "Database knowledge (SQL/NoSQL)",
        "RESTful API understanding",
        "Version control with Git"
      ],
      preferred: [
        "React/Vue.js experience",
        "Express.js or FastAPI",
        "Docker basics",
        "Cloud platform knowledge (AWS/Azure)"
      ],
      benefits: [
        "Career progression path",
        "Learning budget £2,000/year",
        "Conference attendance",
        "Team building events",
        "Pension scheme"
      ]
    },
    {
      title: "Web Development Intern",
      type: "Internship",
      location: "London Office",
      salary: "£18,000 - £22,000",
      icon: <GraduationCap className="w-6 h-6" />,
      description: "Perfect for recent graduates or career changers looking to gain real-world experience.",
      requirements: [
        "Basic web development knowledge",
        "Completed coding bootcamp or relevant course",
        "Enthusiasm for learning",
        "Good communication skills",
        "Portfolio or personal projects"
      ],
      preferred: [
        "Computer Science degree or equivalent",
        "Any framework experience",
        "Understanding of web standards",
        "Problem-solving mindset"
      ],
      benefits: [
        "Structured learning program",
        "1-on-1 mentoring",
        "Potential full-time conversion",
        "Skills workshops",
        "Networking opportunities"
      ]
    }
  ];

  const generalRequirements = [
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Education",
      description: "Computer Science degree, coding bootcamp, or equivalent self-taught experience"
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Technical Skills",
      description: "Proficiency in web technologies and frameworks relevant to the position"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Experience",
      description: "0-2 years for junior positions, portfolio of projects demonstrating skills"
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: "Soft Skills",
      description: "Strong communication, teamwork, problem-solving, and eagerness to learn"
    }
  ];

  return (
    <section id="careers" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Career <span className="text-indigo-400">Opportunities</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover exciting opportunities to grow your web development career with us. 
            We offer comprehensive training and support for developers at all levels.
          </p>
        </motion.div>

        {/* Job Positions */}
        <div className="space-y-8 mb-20">
          {jobPositions.map((job, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-slate-800/50 to-slate-900/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-indigo-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Job Header */}
                  <div className="lg:w-1/3">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-indigo-400">
                        {job.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{job.title}</h3>
                        <p className="text-indigo-400 font-medium">{job.type}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin size={16} />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <DollarSign size={16} />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-6">{job.description}</p>
                    
                    <Link to="/apply">
                      <motion.button
                        className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Apply Now
                        <ArrowRight size={16} />
                      </motion.button>
                    </Link>
                  </div>

                  {/* Job Details */}
                  <div className="lg:w-2/3 grid md:grid-cols-3 gap-6">
                    {/* Requirements */}
                    <div className="bg-slate-700/30 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-3">Required Skills</h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="text-gray-300 text-sm flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Preferred */}
                    <div className="bg-slate-700/30 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-3">Preferred</h4>
                      <ul className="space-y-2">
                        {job.preferred.map((pref, prefIndex) => (
                          <li key={prefIndex} className="text-gray-300 text-sm flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                            {pref}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div className="bg-slate-700/30 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-3">Benefits</h4>
                      <ul className="space-y-2">
                        {job.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="text-gray-300 text-sm flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* General Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">General Requirements</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {generalRequirements.map((req, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 text-center hover:border-indigo-500/50 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="text-indigo-400 mb-4 flex justify-center">
                  {req.icon}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{req.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{req.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Application Process */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-indigo-500/30 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Apply?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our application process is straightforward: submit your application, complete a coding challenge, 
            and join us for an interview. We'll support you throughout the entire process.
          </p>
          <Link to="/apply">
            <motion.button
              className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Application
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default JobSpecifications;