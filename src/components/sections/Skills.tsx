import React, { ComponentType, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaDatabase, FaServer, FaCloud, FaTasks, FaRocket } from 'react-icons/fa';

interface SkillCategory {
  title: string;
  icon: ComponentType<{}>;
  skills: string[];
  color: string;
}

const Skills: React.FC = () => {
  // Helper function to cast the react-icons to ComponentType
  const castIconToComponent = (icon: any): ComponentType<{}> => icon as ComponentType<{}>;
  
  // Memoize skill categories to prevent unnecessary re-creation on each render
  const skillCategories: SkillCategory[] = useMemo(() => [
    {
      title: 'Backend Development',
      icon: castIconToComponent(FaServer),
      skills: ['C#', '.NET Framework 4+', '.NET Core', 'ASP.NET Core', 'ASP.NET (MVC, Web API)', 'REST APIs'],
      color: 'bg-blue-600',
    },
    {
      title: 'Frontend Development',
      icon: castIconToComponent(FaCode),
      skills: ['HTML5', 'CSS3', 'TypeScript', 'JavaScript', 'jQuery', 'Kendo UI & MVVM'],
      color: 'bg-green-600',
    },
    {
      title: 'Database',
      icon: castIconToComponent(FaDatabase),
      skills: ['SQL', 'T-SQL', 'SQL Server'],
      color: 'bg-yellow-600',
    },
    {
      title: 'DevOps & Cloud',
      icon: castIconToComponent(FaCloud),
      skills: [
        'Azure Cloud Services',
        'Infrastructure as Code (Bicep, YAML)',
        'Git & GitHub',
        'Azure DevOps',
        'GitHub Actions'
      ],
      color: 'bg-purple-600',
    },
    {
      title: 'AI & Tools',
      icon: castIconToComponent(FaRocket),
      skills: ['Azure OpenAI', 'GitHub Copilot', 'Windsurf', 'ChatGPT'],
      color: 'bg-red-600',
    },

    {
      title: 'Practices & Methods',
      icon: castIconToComponent(FaTasks),
      skills: ['Automated Testing', 'Agile (Scrum & Kanban)', 'CI/CD', 'API-First Development', 'Atlassian Suite (Jira, Confluence)'],
      color: 'bg-indigo-600',
    },
  ], []);
  
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
      transition: { type: 'spring' as const, stiffness: 100 },
    },
  }), []);

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title mb-4">Technical Skills</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Over 10 years of specialised expertise in full-stack development with Microsoft technologies
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className={`${category.color} h-2 w-full`}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`${category.color} bg-opacity-20 p-3 rounded-full mr-4`}>
                    <span className="text-xl">
                      {React.createElement(category.icon)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li 
                      key={skillIndex}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * skillIndex }}
                      viewport={{ once: true }}
                    >
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                      <span>{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
