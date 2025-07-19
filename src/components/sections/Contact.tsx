import React, { useState, ComponentType, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane, FaMapMarkerAlt } from 'react-icons/fa';
import ParticleBackground from '../ui/ParticleBackground';

// Helper function to cast the react-icons to ComponentType
const castIconToComponent = (icon: any): ComponentType<{}> => icon as ComponentType<{}>;

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Optimize form change handler with useCallback
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  }, []);
  
  // Email regex pattern - memoized
  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);
  
  // Optimize form submission with useCallback
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formState.name || !formState.email || !formState.message) {
      setFormError('Please fill out all required fields.');
      return;
    }
    
    // Email validation
    if (!emailRegex.test(formState.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    
    setFormError('');
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after submission
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      setIsSubmitting(false);
      setFormError('Something went wrong. Please try again later.');
    }
  }, [formState, emailRegex, setFormError, setIsSubmitting, setIsSubmitted, setFormState]);
  
  // Memoize animation variants to prevent recreation on every render
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }), []);
  
  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  }), []);

  // Memoize static data arrays
  const contactMethods = useMemo(() => [
    { 
      icon: castIconToComponent(FaEnvelope),
      iconClass: "text-2xl",
      title: 'Email',
      value: 'antonyvule@gmail.com',
      link: 'mailto:antonyvule@gmail.com',
    },
    { 
      icon: castIconToComponent(FaMapMarkerAlt),
      iconClass: "text-2xl",
      title: 'Location',
      value: 'Brisbane, Australia',
      link: null,
    },
  ], []);

  const socialLinks = useMemo(() => [
    { icon: castIconToComponent(FaLinkedin), link: 'https://linkedin.com/in/antonyvule', label: 'LinkedIn' },
    { icon: castIconToComponent(FaGithub), link: 'https://github.com/antonyvule', label: 'GitHub' },
  ], []);

  return (
    <section id="contact" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Subtle interactive background */}
      <ParticleBackground particleCount={25} mouseInteraction={true} className="opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-dark">Get In Touch</h2>
          <div className="w-24 h-1 bg-primary mx-auto my-4"></div>
          <p className="section-subtitle max-w-3xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? Let's connect!
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Social Links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-2xl font-bold mb-6"
              variants={itemVariants}
            >
              Contact Information
            </motion.h3>
            
            {/* Contact methods */}
            <motion.div 
              className="space-y-6 mb-12"
              variants={containerVariants}
            >
              {contactMethods.map((method, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                    <span className={method.iconClass}>{React.createElement(method.icon)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{method.title}</h4>
                    {method.link ? (
                      <a 
                        href={method.link} 
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <p className="text-gray-600">{method.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Social links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    aria-label={social.label}
                    className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {React.createElement(social.icon)}
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            {/* Animated decoration */}
            <div className="mt-12 relative">
              <motion.div
                className="w-64 h-64 rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 absolute -z-10"
                animate={{ 
                  scale: [1, 1.1, 1],
                  x: [0, 10, 0],
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{ top: '-2rem', left: '-2rem' }}
              />
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-xl p-8 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 z-0"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 z-0"></div>
              
              <motion.h3 
                className="text-2xl font-bold mb-6 relative z-10"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Send a Message
              </motion.h3>
              
              {isSubmitted ? (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 text-2xl">{React.createElement(castIconToComponent(FaPaperPlane))}</span>
                  </div>
                  <h4 className="text-xl font-bold text-green-600 mb-2">Message Sent!</h4>
                  <p className="text-gray-600">Thank you for reaching out. I'll get back to you shortly.</p>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  className="space-y-5 relative z-10"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {formError && (
                    <motion.div 
                      className="bg-red-50 border border-red-200 text-red-600 rounded-md p-3 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {formError}
                    </motion.div>
                  )}
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-primary text-white py-3 px-6 rounded-md font-medium transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-dark hover:shadow-lg'}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <motion.span 
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full inline-block mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ 
                              duration: 1, 
                              ease: "linear", 
                              repeat: Infinity 
                            }}
                          />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Send Message
                          <span className="ml-2">{React.createElement(castIconToComponent(FaPaperPlane))}</span>
                        </span>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
