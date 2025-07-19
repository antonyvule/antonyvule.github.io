import React, { useState, useEffect, ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme } from '../../utils/ThemeContext';

// Helper function to cast the react-icons to ComponentType
const castIconToComponent = (icon: any): ComponentType<{}> => icon as ComponentType<{}>;

const Header: React.FC = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? theme === 'dark'
            ? 'bg-dark-bg shadow-lg py-3' 
            : 'bg-white shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="logo"
        >
          <a 
            href="#home" 
            className={`font-heading text-2xl font-bold ${
              scrolled 
                ? theme === 'dark' 
                  ? 'text-dark-primary' 
                  : 'text-primary'
                : 'text-white'
            }`}
          >
            Antony Vu Le
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:block"
        >
          <ul className="flex space-x-8">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
              >
                <a
                  href={item.href}
                  className={`relative font-medium text-sm transition-colors duration-300 underline-effect ${
                    scrolled 
                      ? theme === 'dark'
                        ? 'text-dark-text hover:text-dark-primary' 
                        : 'text-dark hover:text-primary'
                      : 'text-white hover:text-gray-200'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${
                scrolled 
                  ? theme === 'dark' 
                    ? 'text-dark-text' 
                    : 'text-dark'
                  : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? 
                <span style={{ fontSize: '24px' }}>{React.createElement(castIconToComponent(FaTimes))}</span> : 
                <span style={{ fontSize: '24px' }}>{React.createElement(castIconToComponent(FaBars))}</span>
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${theme === 'dark' ? 'bg-dark-card' : 'bg-white'} shadow-lg overflow-hidden`}
          >
            <div className="container mx-auto px-4 py-4">
              <ul className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 * index }}
                  >
                    <a
                      href={item.href}
                      className={`block font-medium text-lg py-2 ${theme === 'dark' ? 'text-dark-text hover:text-dark-primary' : 'text-dark hover:text-primary'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
