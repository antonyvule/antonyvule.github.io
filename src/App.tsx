import React, { useEffect, Suspense, lazy } from 'react';
import { ThemeProvider } from './utils/ThemeContext';
// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Head from './components/layout/Head';
import SkipToContent from './components/ui/SkipToContent';
import ScrollNavigator from './components/ui/ScrollNavigator';

// Section Components - Using lazy loading for code splitting
// Hero and About are loaded immediately as they appear in the initial viewport
import Hero from './components/sections/Hero';
import About from './components/sections/About';
// Lazily load other sections as they'll be needed when scrolling
const Skills = lazy(() => import('./components/sections/Skills'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Certifications = lazy(() => import('./components/sections/Certifications'));
const Contact = lazy(() => import('./components/sections/Contact'));

// Loading spinner is defined inline in each Suspense component

function App() {
  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        const targetElement = document.querySelector(targetId || '');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          // Update URL but without the jump
          window.history.pushState(null, '', targetId);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <ThemeProvider>
      <div className="App bg-white dark:bg-dark-bg dark:text-dark-text transition-colors duration-300">
        <Head />
        <SkipToContent />
        <Header />
        
        <main id="main-content" tabIndex={-1}>
        {/* Load Hero and About immediately */}
        <Hero />
        <About />
        
        {/* Lazily load other sections with Suspense */}
        <Suspense fallback={<div className="flex justify-center items-center py-20">
          <div className="w-16 h-16 border-4 border-primary dark:border-dark-primary border-t-transparent rounded-full animate-spin"></div>
        </div>}>
          <Skills />
        </Suspense>
        
        <Suspense fallback={<div className="flex justify-center items-center py-20">
          <div className="w-16 h-16 border-4 border-primary dark:border-dark-primary border-t-transparent rounded-full animate-spin"></div>
        </div>}>
          <Experience />
        </Suspense>
        
        <Suspense fallback={<div className="flex justify-center items-center py-20">
          <div className="w-16 h-16 border-4 border-primary dark:border-dark-primary border-t-transparent rounded-full animate-spin"></div>
        </div>}>
          <Projects />
        </Suspense>
        
        <Suspense fallback={<div className="flex justify-center items-center py-20">
          <div className="w-16 h-16 border-4 border-primary dark:border-dark-primary border-t-transparent rounded-full animate-spin"></div>
        </div>}>
          <Certifications />
        </Suspense>
        
        <Suspense fallback={<div className="flex justify-center items-center py-20">
          <div className="w-16 h-16 border-4 border-primary dark:border-dark-primary border-t-transparent rounded-full animate-spin"></div>
        </div>}>
          <Contact />
        </Suspense>
        </main>
        
        <Footer />
        <ScrollNavigator />
      </div>
    </ThemeProvider>
  );
}

export default App;
