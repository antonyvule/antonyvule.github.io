import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  } as const;
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <motion.h2 
            className="section-title text-dark"
            style={{ scale }}
          >
            About Me
          </motion.h2>
          <div className="w-24 h-1 bg-primary mx-auto my-4"></div>
          <motion.p className="section-subtitle max-w-3xl mx-auto">
            A passionate engineer with expertise in Microsoft technologies and cloud solutions
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p 
            className="text-lg mb-6 leading-relaxed"
            variants={itemVariants}
          >
            With over 10 years of experience delivering scalable, cloud-ready solutions, I bring deep full-stack development expertise, strong Microsoft technology skills, and a pragmatic, business-focused mindset to every project.
          </motion.p>
          
          <motion.p 
            className="text-lg mb-6 leading-relaxed"
            variants={itemVariants}
          >
            I've worked across B2B and B2C sectors, including education, e-commerce, and enterprise systems, building robust applications using .NET technologies and modern front-end frameworks. I'm passionate about writing clean, maintainable code, improving team efficiency, and solving real-world business challenges through technology.
          </motion.p>
          
          <motion.p 
            className="text-lg mb-6 leading-relaxed"
            variants={itemVariants}
          >
            I also have hands-on experience with DevOps, automation, and cloud services, leveraging GitHub Actions, Azure DevOps, and Infrastructure-as-Code (Bicep) to streamline delivery, increase reliability, and support scalable systems.
          </motion.p>
          
          <motion.p 
            className="text-lg leading-relaxed"
            variants={itemVariants}
          >
            I'm a strong advocate for modern engineering practices such as automated testing, Agile (Scrum & Kanban), and API-first development. I actively explore emerging tools like Azure OpenAI, GitHub Copilot, and Windsurf to drive AI-powered improvements across the development lifecycle.
          </motion.p>
        </motion.div>
        
        {/* Floating animated elements for visual interest */}
        <div className="relative h-40 mt-16 overflow-hidden">
          <motion.div 
            className="absolute w-16 h-16 bg-primary/10 rounded-full"
            animate={{
              x: [0, 100, 50, 200, 0],
              y: [0, 50, 100, 50, 0],
              scale: [1, 1.2, 1, 0.8, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ left: '10%', top: '20%' }}
          />
          
          <motion.div 
            className="absolute w-20 h-20 bg-secondary/10 rounded-full"
            animate={{
              x: [200, 100, 250, 150, 200],
              y: [50, 100, 50, 0, 50],
              scale: [0.8, 1, 1.2, 1, 0.8],
              rotate: [0, 180, 360, 180, 0],
            }}
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ right: '15%', bottom: '30%' }}
          />
          
          <motion.div 
            className="absolute w-12 h-12 bg-primary/10 rounded-full"
            animate={{
              x: [100, 200, 100, 0, 100],
              y: [0, 50, 100, 50, 0],
              scale: [1, 0.8, 1.2, 1, 1],
              rotate: [0, -90, -180, -270, -360],
            }}
            transition={{
              duration: 18,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ left: '40%', top: '10%' }}
          />
          
          <motion.div 
            className="absolute w-24 h-24 border-2 border-primary/30 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            style={{ left: '60%', top: '20%' }}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
