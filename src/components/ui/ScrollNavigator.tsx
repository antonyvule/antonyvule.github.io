import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollNavigator: React.FC = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavigator, setShowNavigator] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  
  // Define all section IDs in order using useMemo to prevent recreation on each render
  const sections = useMemo(() => [
    'home',
    'about',
    'skills',
    'experience', 
    'projects',
    'certifications',
    'contact'
  ], []);
  
  // Function to get the next or previous section
  const getAdjacentSection = (current: string, direction: 'up' | 'down'): string => {
    const currentIndex = sections.indexOf(current);
    if (currentIndex === -1) return 'home'; // Default to home if not found
    
    if (direction === 'down') {
      return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : sections[currentIndex];
    } else {
      return currentIndex > 0 ? sections[currentIndex - 1] : sections[currentIndex];
    }
  };
  
  // Handle scroll to determine current section and scroll direction
  useEffect(() => {
    const handleScroll = () => {
      // Determine scroll position
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      // Check if at top or bottom
      setIsAtTop(scrollY <= 10); // Small threshold for better UX
      setIsAtBottom(scrollY + windowHeight >= documentHeight - 10); // Small threshold for better UX
      
      // Determine scroll direction based on scroll position, but override at edges
      if (isAtTop) {
        setScrollDirection('down'); // At top, can only scroll down
      } else if (isAtBottom) {
        setScrollDirection('up'); // At bottom, can only scroll up
      } else {
        setScrollDirection(scrollY > lastScrollY ? 'down' : 'up'); // Normal case
      }
      
      setLastScrollY(scrollY);
      
      // Hide navigator while actively scrolling, then show it after a delay
      setShowNavigator(false);
      const timer = setTimeout(() => {
        setShowNavigator(true);
      }, 500);
      
      // Find current section by checking which section is most in view
      const sectionElements = sections.map(id => 
        document.getElementById(id)
      ).filter(Boolean);
      
      const viewportHeight = window.innerHeight;
      let maxVisibleSection = { id: 'home', visiblePercentage: 0 };
      
      sectionElements.forEach(section => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const visiblePercentage = (visibleHeight / section.clientHeight) * 100;
        
        if (visiblePercentage > maxVisibleSection.visiblePercentage) {
          maxVisibleSection = { id: section.id, visiblePercentage };
        }
      });
      
      setCurrentSection(maxVisibleSection.id);
      
      return () => clearTimeout(timer);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, sections, isAtTop, isAtBottom]);
  
  // Handle click to scroll to next/previous section
  const handleNavigatorClick = () => {
    // If at top, always scroll to next section regardless of scroll direction
    if (isAtTop) {
      const targetSectionId = getAdjacentSection(currentSection, 'down');
      const targetSection = document.getElementById(targetSectionId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    
    // If at bottom, always scroll to previous section regardless of scroll direction
    if (isAtBottom) {
      const targetSectionId = getAdjacentSection(currentSection, 'up');
      const targetSection = document.getElementById(targetSectionId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    
    // Normal case - use current scroll direction
    const targetSectionId = getAdjacentSection(currentSection, scrollDirection);
    const targetSection = document.getElementById(targetSectionId);
    
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <AnimatePresence>
      {showNavigator && (
        <motion.div
          className="fixed bottom-8 right-8 z-50 cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={handleNavigatorClick}
        >
          <motion.div 
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="mb-2 text-sm text-white bg-black/50 px-3 py-1 rounded-full">
              Scroll {scrollDirection === 'down' ? 'Down' : 'Up'}
            </span>
            <span className="bg-primary/30 rounded-full p-3 text-white hover:bg-primary/50 transition-all">
              {scrollDirection === 'down' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              )}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollNavigator;
