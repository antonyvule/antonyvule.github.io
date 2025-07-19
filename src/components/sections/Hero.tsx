import React from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '../ui/ParticleBackground';
import Button from '../ui/Button';
import { FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import Icon from '../ui/Icon';

const Hero: React.FC = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden"
    >
      {/* Interactive particle background */}
      <ParticleBackground particleCount={70} mouseInteraction={true} />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary opacity-10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary opacity-10 blur-3xl"></div>
        
        {/* Additional floating elements */}
        {[...Array(15)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-primary opacity-70"
            animate={{
              x: [
                Math.random() * 100 - 50 + '%',
                Math.random() * 100 - 50 + '%',
                Math.random() * 100 - 50 + '%',
                Math.random() * 100 - 50 + '%',
              ],
              y: [
                Math.random() * 100 - 50 + '%',
                Math.random() * 100 - 50 + '%',
                Math.random() * 100 - 50 + '%',
                Math.random() * 100 - 50 + '%',
              ],
              scale: [0.5, 1.5, 0.8, 1.2],
              opacity: [0.3, 0.8, 0.4, 0.7],
            }}
            transition={{
              duration: 20 + Math.random() * 30,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 font-heading"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Antony Vu Le
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-4xl text-white mb-6 font-heading"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Senior Software Engineer
          </motion.h2>
          
          <motion.h2 
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Building Scalable, Cloud-Ready Solutions
          </motion.h2>
          
          <motion.p 
            className="text-md md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            With over 10 years of experience delivering robust applications and enterprise systems
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a href="#projects" aria-label="View my projects">
              <Button 
                variant="primary"
                icon={<Icon icon={FaProjectDiagram} />}
                aria-label="View my projects"
                size="md"
              >
                View Projects
              </Button>
            </a>
            <a href="#contact" aria-label="Contact me">
              <Button 
                variant="secondary"
                icon={<Icon icon={FaEnvelope} />}
                aria-label="Contact me"
                size="md"
              >
                Contact Me
              </Button>
            </a>
          </motion.div>
        </motion.div>
        

      </div>
    </section>
  );
};

export default Hero;
