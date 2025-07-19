import React from 'react';
import { useTheme } from '../../utils/ThemeContext';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import Icon from './Icon';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' 
          : 'bg-blue-100 hover:bg-blue-200 text-primary'
      } ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {theme === 'light' ? (
        <Icon icon={FaMoon} className="w-5 h-5" />
      ) : (
        <Icon icon={FaSun} className="w-5 h-5" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
