import React, { ComponentType, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

// Helper function to cast the react-icons to ComponentType
const castIconToComponent = (icon: any): ComponentType<{}> => icon as ComponentType<{}>;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Memoize social links to prevent recreation on every render
  const socialLinks = useMemo(() => [
    { icon: castIconToComponent(FaLinkedin), link: 'https://linkedin.com/in/antonyvule', label: 'LinkedIn' },
    { icon: castIconToComponent(FaGithub), link: 'https://github.com/antonyvule', label: 'GitHub' },
  ], []);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-2">Antony Vu Le</h3>
            <p className="text-gray-400">Senior Software Engineer</p>
          </motion.div>
          
          <motion.div
            className="flex gap-4 mt-6 md:mt-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all duration-300"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "#0a66c2"
                }}
                whileTap={{ scale: 0.9 }}
              >
                {React.createElement(social.icon)}
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        <motion.hr 
          className="my-8 border-gray-800"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="text-center md:text-left text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            © {currentYear} Antony Vu Le. All rights reserved.
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-end mt-4 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <a href="#home" className="text-gray-400 hover:text-primary transition-colors text-sm">Home</a>
            <a href="#about" className="text-gray-400 hover:text-primary transition-colors text-sm">About</a>
            <a href="#skills" className="text-gray-400 hover:text-primary transition-colors text-sm">Skills</a>
            <a href="#experience" className="text-gray-400 hover:text-primary transition-colors text-sm">Experience</a>
            <a href="#projects" className="text-gray-400 hover:text-primary transition-colors text-sm">Projects</a>
            <a href="#certifications" className="text-gray-400 hover:text-primary transition-colors text-sm">Certifications</a>
            <a href="#contact" className="text-gray-400 hover:text-primary transition-colors text-sm">Contact</a>
          </motion.div>
        </div>

        {/* Professional message */}
        <motion.div 
          className="text-center text-gray-400 text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>Passionate about building scalable, cloud-ready solutions with over 10 years of full-stack development experience</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
