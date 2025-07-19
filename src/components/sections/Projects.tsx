import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '../ui/ParticleBackground';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
}

const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Memoize projects array to prevent unnecessary re-creation on each render
  const projects: Project[] = useMemo(() => [
    {
      title: 'Azupay PayID Integration',
      description: 'Delivered a strategic, real-time payments integration for a key enterprise customer. This solution enabled real-time, low-cost receivables and required secure external API integration, backend design, test coverage, and deployment readiness.',
      technologies: ['ASP.NET', 'REST APIs', 'Kendo UI', 'TypeScript'],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
      githubUrl: '#',
      liveUrl: '#',
    },
    {
      title: 'AI Content Generator',
      description: 'Built an intelligent content generation platform using Azure OpenAI services, with infrastructure-as-code deployment using Bicep templates, CI/CD through GitHub Actions, and supporting automation scripts in PowerShell.',
      technologies: ['Azure OpenAI', 'Bicep', 'GitHub Actions', 'PowerShell'],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
      githubUrl: '#',
      liveUrl: '#',
    },
    {
      title: 'Activity Insight Feature',
      description: 'Developed a real-time insights solution that monitors and analyses user activities, utilising Azure CosmosDB for data storage, Azure Functions for serverless processing, and Kendo UI & MVVM for the interactive frontend experience.',
      technologies: ['.NET Core', 'Azure Functions', 'Azure CosmosDB'],
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
      githubUrl: '#',
      liveUrl: '#',
    },
    {
      title: 'GA4 Analytics Implementation',
      description: 'Led the GA4 analytics tracking initiative, improving data insight capabilities across multiple touchpoints by integrating Google Tag Manager and enhancing the Data Layer architecture for comprehensive user interaction tracking.',
      technologies: ['.NET Framework', 'TypeScript', 'Kendo UI', 'Google Analytics 4'],
      image: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      githubUrl: '#',
      liveUrl: '#',
    },
  ], []);

  // Memoize animation variants to prevent recreation on every render
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }), []);

  // Define animation variants
  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }), []);
  
  // Define transition for animations
  const appearTransition = useMemo(() => ({ duration: 0.6 }), []);
  
  // Optimize hover handling with useCallback
  const handleMouseEnter = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  return (
    <section id="projects" className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Add subtle interactive particles */}
      <ParticleBackground particleCount={30} mouseInteraction={true} className="opacity-40" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-white">Featured Projects</h2>
          <div className="w-24 h-1 bg-primary mx-auto my-4"></div>
          <p className="section-subtitle max-w-3xl mx-auto text-white font-medium">
            Highlighting some of my most impactful and innovative work
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="relative bg-white rounded-lg overflow-hidden shadow-lg group h-full"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={appearTransition}
              whileHover={{ 
                y: -12, 
                scale: 1.03, 
                boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)" 
              }}
              onHoverStart={() => setActiveIndex(index)}
              onHoverEnd={() => setActiveIndex(null)}
            >
              <div className="relative overflow-hidden aspect-video">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
                
                {/* Project image with zoom effect */}
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Floating tech badges */}
                <div className="absolute top-4 right-4 flex flex-wrap justify-end gap-2 z-20">
                  {project.technologies.slice(0, 2).map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="bg-primary text-white py-1 px-3 rounded-full text-xs font-medium"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * techIndex }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                
                {/* Project title */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                </div>
              </div>
              
              {/* Project details panel - always showing full content */}
              <motion.div 
                className="p-6 bg-white"
              >
                <p className="text-sm text-gray-700 mb-5">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="bg-gray-100 text-primary py-1 px-3 rounded-full text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * techIndex }}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "#0a66c2",
                        color: "white"
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                

              </motion.div>
              
              {/* Interactive hover effect */}
              <motion.div 
                className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
              />
              
              {/* Animated corner decorations with enhanced animations */}
              <motion.div 
                className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100"
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={activeIndex === index ? { 
                  width: [0, 20, 40], 
                  height: [0, 20, 40],
                  opacity: [0, 0.5, 1]
                } : { opacity: 0, width: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100"
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={activeIndex === index ? { 
                  width: [0, 20, 40], 
                  height: [0, 20, 40],
                  opacity: [0, 0.5, 1]
                } : { opacity: 0, width: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </motion.div>
        

        
        {/* Animated background decorations */}
        <div className="relative h-40 mt-16 overflow-hidden">
          <motion.div 
            className="absolute w-16 h-16 border-2 border-primary/20 rounded-full"
            animate={{
              x: [0, -100, -50, -200, 0],
              y: [0, 50, 100, 50, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ left: '10%', top: '20%' }}
          />
          
          <motion.div 
            className="absolute w-20 h-20 border-2 border-primary/20 rounded-full"
            animate={{
              x: [200, 100, 250, 150, 200],
              y: [50, 100, 50, 0, 50],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ right: '15%', bottom: '30%' }}
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
