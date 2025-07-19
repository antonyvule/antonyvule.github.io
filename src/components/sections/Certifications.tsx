import React, { ComponentType, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaCertificate, FaCalendarAlt, FaMicrosoft } from 'react-icons/fa';

// Helper function to cast the react-icons to ComponentType
const castIconToComponent = (icon: any): ComponentType<{}> => icon as ComponentType<{}>;

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl: string;
}

const Certifications: React.FC = () => {
  // Memoize certifications array to prevent unnecessary re-creation on each render
  const certifications: Certification[] = useMemo(() => [
    {
      title: 'Develop generative AI solutions with Azure OpenAI Service',
      issuer: 'Microsoft',
      date: 'Aug 2024',
      credentialId: 'A177F83307ADA295',
      credentialUrl: 'https://learn.microsoft.com/en-us/users/antonyvule/credentials/a177f83307ada295',
    },
    {
      title: 'Microsoft Certified: Azure Fundamentals',
      issuer: 'Microsoft',
      date: 'May 2025',
      credentialId: '1A7E70672D53CD1E',
      credentialUrl: 'https://learn.microsoft.com/en-us/users/antonyvule/credentials/1a7e70672d53cd1e',
    },
  ], []);

  // Memoize animation variants to prevent recreation on every render
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }), []);
  
  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    }
  }), []);

  return (
    <section id="certifications" className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-dark">Licenses & Certifications</h2>
          <div className="w-24 h-1 bg-primary mx-auto my-4"></div>
          <p className="section-subtitle max-w-3xl mx-auto">
            Professional certifications validating my expertise and skills
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {certifications.map((cert, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                variants={itemVariants}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start">
                  <div className="mr-4 mt-1 text-primary text-2xl">
                    {React.createElement(castIconToComponent(FaMicrosoft))}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{cert.title}</h3>
                    
                    <div className="flex items-center mb-2 text-gray-600">
                      <span className="mr-2 text-sm">{React.createElement(castIconToComponent(FaCertificate))}</span>
                      <span>{cert.issuer}</span>
                    </div>
                    
                    <div className="flex items-center mb-3 text-gray-600">
                      <span className="mr-2 text-sm">{React.createElement(castIconToComponent(FaCalendarAlt))}</span>
                      <span>Issued {cert.date}</span>
                    </div>
                    
                    <div className="text-gray-700 mb-3">
                      <span className="font-medium">Credential ID:</span> {cert.credentialId}
                    </div>
                    
                    <a 
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary-dark transition-colors font-medium"
                    >
                      View Credential
                      <span className="ml-1 text-xs">
                        {React.createElement(castIconToComponent(FaExternalLinkAlt))}
                      </span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
