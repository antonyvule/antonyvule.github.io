import React from 'react';
import { useTheme } from '../../utils/ThemeContext';

const SkipToContent: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <a 
      href="#main-content" 
      className={`
        sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 
        focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 
        ${
          theme === 'dark' 
            ? 'focus:bg-dark-card focus:text-dark-text focus:ring-dark-primary' 
            : 'focus:bg-white focus:text-dark focus:ring-primary'
        }
      `}
    >
      Skip to content
    </a>
  );
};

export default SkipToContent;
