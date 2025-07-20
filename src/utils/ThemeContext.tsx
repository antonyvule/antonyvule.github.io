import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Check if user has a preferred color scheme or previously saved preference
  const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';
    
    try {
      // Check for saved preference in localStorage
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        return savedTheme;
      }
      
      // Check for system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (error) {
      console.error('Error accessing browser APIs:', error);
    }
    
    // Default to light
    return 'light';
  };

  const [theme, setTheme] = useState<Theme>('light');

  // Initialize theme after mount to avoid hydration mismatch
  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  // Update body class and localStorage when theme changes
  useEffect(() => {
    // Skip if not in browser environment
    if (typeof window === 'undefined' || !document || !document.documentElement) {
      return;
    }
    
    try {
      document.documentElement.classList.remove('light-mode', 'dark-mode');
      document.documentElement.classList.add(`${theme}-mode`);
      
      // Apply theme to html tag for Tailwind dark mode
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Save to localStorage
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
