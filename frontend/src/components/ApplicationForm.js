import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, FileText, Code, Award, 
  ArrowRight, ArrowLeft, Check, Upload, Link as LinkIcon 
} from 'lucide-react';
import Navigation from './Navigation';
import SecretButtons from './SecretButtons';
import SecretJokesArea from './SecretJokesArea';
import SecretCrazyWebsite from './SecretCrazyWebsite';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    
    // Position & Experience
    position: '',
    experience: '',
    availability: '',
    salary: '',
    
    // Skills & Portfolio
    skills: [],
    portfolio: '',
    github: '',
    linkedin: '',
    
    // Additional Information
    motivation: '',
    projects: '',
    references: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showJokes, setShowJokes] = useState(false);
  const [showCrazyWebsite, setShowCrazyWebsite] = useState(false);

  const steps = [
    { number: 1, title: 'Personal Info', icon: <User size={20} /> },
    { number: 2, title: 'Position & Experience', icon: <Award size={20} /> },
    { number: 3, title: 'Skills & Portfolio', icon: <Code size={20} /> },
    { number: 4, title: 'Tell Us More', icon: <FileText size={20} /> }
  ];

  const positions = [
    'Junior Frontend Developer',
    'Junior Full-Stack Developer',
    'Web Development Intern',
    'UI/UX Developer Trainee'
  ];

  const skillOptions = [
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular',
    'Node.js', 'Python', 'PHP', 'MongoDB', 'SQL', 'Git', 'Docker', 'AWS'
  ];

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email';
        }
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        break;
      case 2:
        if (!formData.position) newErrors.position = 'Please select a position';
        if (!formData.experience) newErrors.experience = 'Please describe your experience';
        if (!formData.availability) newErrors.availability = 'Please specify your availability';
        break;
      case 3:
        if (formData.skills.length === 0) newErrors.skills = 'Please select at least one skill';
        if (!formData.portfolio && !formData.github) {
          newErrors.portfolio = 'Please provide either a portfolio link or GitHub profile';
        }
        break;
      case 4:
        if (!formData.motivation) newErrors.motivation = 'Please tell us why you want to join';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
    if (errors.skills) {
      setErrors(prev => ({ ...prev, skills: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    navigate('/application-success');
  };

  const renderStep1 = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white font-medium mb-2">First Name *</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border ${
              errors.firstName ? 'border-red-500' : 'border-slate-600'
            } text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none transition-colors`}
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Last Name *</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border ${
              errors.lastName ? 'border-red-500' : 'border-slate-600'
            } text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none transition-colors`}
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="block text-white font-medium mb-2">Email Address *</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border ${
            errors.email ? 'border-red-500' : 'border-slate-600'
          } text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none transition-colors`}
          placeholder="your.email@example.com"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-white font-medium mb-2">Phone Number *</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border ${
            errors.phone ? 'border-red-500' : 'border-slate-600'
          } text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none transition-colors`}
          placeholder="+44 7123 456789"
        />
        {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-white font-medium mb-2">Address</label>
        <textarea
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none transition-colors resize-none"
          placeholder="Your address (optional)"
          rows="3"
        />
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-white font-medium mb-2">Position Applying For *</label>
        <select
          value={formData.position}
          onChange={(e) => handleInputChange('position', e.target.value)}
          className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border ${
            errors.position ? 'border-red-500' : 'border-slate-600'
          } text-white focus:border-indigo-500 focus:outline-none transition-colors`}
        >
          <option value="">Select a position</option>
          {positions.map(position => (
            <option key={position} value={position}>{position}</option>
          ))}
        </select>
        {errors.position && <p className="text-red-400 text-sm mt-1">{errors.position}</p>}
      </div>

      <div>
        <label className="block text-white font-medium mb-2">Experience Level *</label>
        <textarea
          value={formData.experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
          className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border ${
            errors.experience ? 'border-red-500' : 'border-slate-600'
          } text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none transition-colors resize-none`}
          placeholder="Describe your web development experience, education, bootcamps, or self-learning journey..."
          rows="4"
        />
        {errors.experience && <p className="text-red-400 text-sm mt-1">{errors.experience}</p>}
      </div>

      <div>
        <label className="block text-white font-medium mb-2">Availability *</label>
        <select
          value={formData.availability}
          onChange={(e) => handleInputChange('availability', e.target.value)}
          className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border ${
            errors.availability ? 'border-red-500' : 'border-slate-600'
          } text-white focus:border-indigo-500 focus:outline-none transition-colors`}
        >
          <option value="">Select availability</option>
          <option value="immediately">Available Immediately</option>
          <option value="2weeks">2 Weeks Notice</option>
          <option value="1month">1 Month Notice</option>
          <option value="negotiable">Negotiable</option>
        </select>
        {errors.availability && <p className="text-red-400 text-sm mt-1">{errors.availability}</p>}
      </div>

      <div>
        <label className="block text-white font-medium mb-2">Expected Salary (Annual)</label>
        <select
          value={formData.salary}
          onChange={(e) => handleInputChange('salary', e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:border-indigo-500 focus:outline-none transition-colors"
        >
          <option value="">Select salary range</option>
          <option value="18k-22k">£18,000 - £22,000</option>
          <option value="22k-28k">£22,000 - £28,000</option>
          <option value="28k-35k">£28,000 - £35,000</option>
          <option value="35k+">£35,000+</option>
        </select>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-white font-medium mb-2">Technical Skills *</label>
        <p className="text-gray-400 text-sm mb-4">Select all technologies you're familiar with</p>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {skillOptions.map(skill => (
            <motion.button
              key={skill}
              type="button"
              onClick={() => handleSkillToggle(skill)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                formData.skills.includes(skill)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {skill}
            </motion.button>
          ))}
        </div>
        {errors.skills && <p className="text-red-400 text-sm mt-2">{errors.skills}</p>}
      </div>

      <div>
        <label className="block text-white font-medium mb-2">Portfolio Website</label>
        <input
          type="url"
          value={formData.portfolio}
          onChange={(e) => handleInputChange('portfolio', e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none transition-colors"
          placeholder="https://yourportfolio.com"
        />
      </div>

      <div>
        <label className="block text-white font-medium mb-2">GitHub Profile</label>
        <input
          type="url"
          value={formData.github}
          onChange={(e) => handleInputChange('github', e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none transition-colors"
          placeholder="https://github.com/yourusername"
        />
        {errors.portfolio && <p className="text-red-400 text-sm mt-1">{errors.portfolio}</p>}
      </div>

      <div>
        <label className="block text-white font-medium mb-2">LinkedIn Profile</label>
        <input
          type="url"
          value={formData.linkedin}
          onChange={(e) => handleInputChange('linkedin', e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none transition-colors"
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-white font-medium mb-2">Why do you want to join Hot Beans Web? *</label>
        <textarea
          value={formData.motivation}
          onChange={(e) => handleInputChange('motivation', e.target.value)}
          className={`w-full px-4 py-3 rounded-lg bg-slate-700/50 border ${
            errors.motivation ? 'border-red-500' : 'border-slate-600'
          } text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none transition-colors resize-none`}
          placeholder="Tell us what motivates you to work with us and how you see yourself contributing to our team..."
          rows="4"
        />
        {errors.motivation && <p className="text-red-400 text-sm mt-1">{errors.motivation}</p>}
      </div>

      <div>
        <label className="block text-white font-medium mb-2">Tell us about your projects</label>
        <textarea
          value={formData.projects}
          onChange={(e) => handleInputChange('projects', e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none transition-colors resize-none"
          placeholder="Describe some projects you've worked on, challenges you've overcome, or technologies you're excited to learn..."
          rows="4"
        />
      </div>

      <div>
        <label className="block text-white font-medium mb-2">References</label>
        <textarea
          value={formData.references}
          onChange={(e) => handleInputChange('references', e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none transition-colors resize-none"
          placeholder="Professional or educational references (optional)"
          rows="3"
        />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join Our <span className="text-indigo-400">Development Team</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Take the first step towards your web development career with Hot Beans Web
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= step.number
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-600 text-slate-400'
                  }`}>
                    {currentStep > step.number ? <Check size={20} /> : step.icon}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 md:w-32 h-0.5 transition-all duration-300 ${
                      currentStep > step.number ? 'bg-indigo-600' : 'bg-slate-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-4">
              {steps.map(step => (
                <div key={step.number} className="text-center">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-white' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8"
          >
            <AnimatePresence mode="wait">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <motion.button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentStep === 1
                    ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
                whileHover={currentStep > 1 ? { scale: 1.02 } : {}}
                whileTap={currentStep > 1 ? { scale: 0.98 } : {}}
              >
                <ArrowLeft size={20} />
                Previous
              </motion.button>

              {currentStep < 4 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-xl transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next
                  <ArrowRight size={20} />
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-8 py-3 rounded-lg font-medium hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <Check size={20} />
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
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

export default ApplicationForm;