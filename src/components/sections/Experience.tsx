import React, { ComponentType, useMemo } from 'react';
import { motion } from 'framer-motion';
import FloatingIcons from '../ui/FloatingIcons';
import { FaBriefcase, FaBuilding, FaCalendarAlt } from 'react-icons/fa';

// Helper function to cast the react-icons to ComponentType
const castIconToComponent = (icon: any): ComponentType<{}> => icon as ComponentType<{}>;

interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
}

const Experience: React.FC = () => {
  // Memoize experiences array to prevent unnecessary re-creation on each render
  const experiences: ExperienceItem[] = useMemo(() => [
    {
      period: 'Apr 2025 - Present',
      title: 'Software Engineer',
      company: 'Advantive (Brisbane, Australia · Remote)',
      description: 'Currently working as a Software Engineer at Advantive following the acquisition of Commerce Vision in April 2025, expanding the reach and capabilities of our eCommerce platform.',
      technologies: ['C# / .NET', 'Azure', 'TypeScript', 'Cloud Services', 'Azure DevOps'],
    },
    {
      period: 'Sep 2018 - Mar 2025',
      title: 'Software Engineer',
      company: 'Commerce Vision (Brisbane, Australia · Hybrid)',
      description: 'Designed, developed, and maintained Commerce Vision\'s fully integrated eCommerce platform supporting both B2B and B2C customers. Developed core features, collaborated with cross-functional teams, maintained integration engines, and drove continuous improvement through modern engineering practices.',
      technologies: ['C# / .NET', 'ASP.NET MVC', 'TypeScript', 'SQL Server', 'Azure', 'Bicep', 'Kendo UI', 'REST APIs', 'Azure OpenAI'],
    },
    {
      period: 'Jul 2015 - Aug 2018',
      title: 'Software Developer',
      company: 'TASS.web (Brisbane, Australia · On-site)',
      description: 'Maintained and enhanced existing web applications while developing new features across multiple products. Implemented, tested, and refactored code to optimize performance, collaborated with specification writers, communicated with cross-functional teams, and contributed actively in Agile environments.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap', 'SQL Server', 'ColdFusion', 'REST APIs', 'Git', 'SVN'],
    },
    {
      period: 'Dec 2014 - Jun 2015',
      title: 'Software Developer Intern',
      company: 'Christie Digital Systems (Brisbane, Australia)',
      description: 'Designed and delivered a digital quoting tool to streamline collaboration between the sales, design, and customer teams, accelerating the quoting and design process and improving overall workflow efficiency.',
      technologies: ['Java', 'NetBeans', 'MySQL', 'Google Cloud Platform', 'ERM'],
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

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        type: "spring" as const, 
        stiffness: 100,
        damping: 12
      },
    },
  }), []);

  return (
    <section id="experience" className="py-20 relative overflow-hidden dark:bg-gray-900">
      {/* Add floating technology icons in the background */}
      <FloatingIcons count={10} className="opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-dark dark:text-white">Work Experience</h2>
          <div className="w-24 h-1 bg-primary mx-auto my-4"></div>
          <p className="section-subtitle max-w-3xl mx-auto dark:text-gray-300">
            Over a decade of professional software development experience
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline vertical line */}
          <motion.div 
            className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-200"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ top: 0 }}
          ></motion.div>

          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                className="relative"
                variants={itemVariants}
              >
                {/* Timeline dot */}
                <motion.div 
                  className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-md z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                    delay: index * 0.2
                  }}
                ></motion.div>

                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:ml-auto' : 'md:pl-12'}`}>
                  <motion.div 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl"
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <div className="flex items-center mb-4 text-primary dark:text-blue-400">
                      <span className="mr-2">{React.createElement(castIconToComponent(FaCalendarAlt))}</span>
                      <span className="font-semibold">{exp.period}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-1 dark:text-white">{exp.title}</h3>
                    
                    <div className="flex items-center mb-3 text-gray-600 dark:text-gray-300">
                      <span className="mr-2">{React.createElement(castIconToComponent(FaBuilding))}</span>
                      <span>{exp.company}</span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="bg-gray-100 dark:bg-gray-700 text-primary dark:text-blue-300 py-1 px-3 rounded-full text-sm font-medium"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + (techIndex * 0.1) }}
                          whileHover={{ 
                            scale: 1.1,
                            backgroundColor: "#0a66c2", // Explicit primary color for better contrast
                            color: "white"
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Animated career progression indicator */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block relative">
              <motion.div 
                className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary text-white"
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(10, 102, 194, 0.4)",
                    "0 0 0 20px rgba(10, 102, 194, 0)",
                    "0 0 0 0 rgba(10, 102, 194, 0)"
                  ],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <span className="text-2xl">{React.createElement(castIconToComponent(FaBriefcase))}</span>
              </motion.div>
              <h4 className="mt-4 font-bold text-lg">Professional Growth</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Continuous learning and career advancement
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
