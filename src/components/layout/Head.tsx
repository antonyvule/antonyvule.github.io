import React, { useEffect } from 'react';
import { useTheme } from '../../utils/ThemeContext';

interface HeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogUrl?: string;
}

const Head: React.FC<HeadProps> = ({
  title = 'Antony Vu Le - Senior Software Engineer',
  description = 'Portfolio of Antony Vu Le, a Senior Software Engineer specializing in building scalable, cloud-ready solutions.',
  keywords = ['software engineer', 'web development', 'cloud solutions', 'frontend', 'backend', 'fullstack'],
  ogImage = '/images/profile.jpg',
  ogUrl = 'https://antonyvule.github.io',
}) => {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Update the document title
    document.title = title;
    
    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    
    // Update Open Graph meta tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', ogImage);
    updateMetaTag('og:url', ogUrl);
    updateMetaTag('og:type', 'website');
    
    // Update Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    
    // Update theme color based on current theme
    updateMetaTag('theme-color', theme === 'dark' ? '#121212' : '#ffffff');
  }, [title, description, keywords, ogImage, ogUrl, theme]);
  
  // Helper function to update or create meta tags
  const updateMetaTag = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="${name}"]`) || 
              document.querySelector(`meta[property="${name}"]`);
              
    if (!meta) {
      meta = document.createElement('meta');
      if (name.startsWith('og:') || name.startsWith('twitter:')) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  };
  
  // This component doesn't render anything visible
  return null;
};

export default Head;
