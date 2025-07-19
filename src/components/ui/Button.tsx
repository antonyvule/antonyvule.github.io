import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../utils/ThemeContext';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
  // Simple ReactNode type for icon
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  icon,
  ...props
}) => {
  const { theme } = useTheme();
  
  // Size classes
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };
  
  // Variant classes with dark mode support
  const variantClasses = {
    primary: theme === 'dark' 
      ? 'bg-dark-primary hover:bg-blue-500 text-white' 
      : 'bg-primary hover:bg-blue-700 text-white',
    secondary: theme === 'dark'
      ? 'bg-dark-secondary hover:bg-blue-400 text-white'
      : 'bg-secondary hover:bg-blue-600 text-white',
    outline: theme === 'dark'
      ? 'bg-transparent border-2 border-dark-primary text-dark-primary hover:bg-dark-primary hover:text-white'
      : 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
  };
  
  // No need to extract props as we're now using a simple interface
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type || 'button'}
      aria-label={props.ariaLabel}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        font-medium rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          theme === 'dark' ? 'focus:ring-dark-primary focus:ring-offset-dark-bg' : 'focus:ring-primary focus:ring-offset-white'
        } 
        flex items-center justify-center gap-2
        ${className}
      `}
    >
      {icon && <span className="inline-block">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;
