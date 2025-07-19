import React, { useEffect, useState, ComponentType, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaNodeJs, FaAws, FaDocker, FaGitAlt, 
  FaDatabase, FaCode, FaDesktop, FaMicrochip, FaCloud, FaMicrosoft
} from 'react-icons/fa';
import { SiDotnet, SiTypescript, SiJavascript, SiSharp } from 'react-icons/si';

interface FloatingIcon {
  id: number;
  Icon: ComponentType<{}>;
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  direction: number;
  color: string;
  opacity: number;
}

interface FloatingIconsProps {
  count?: number;
  className?: string;
}

const iconsList = [
  FaReact, FaNodeJs, FaAws, FaDocker, FaGitAlt,
  FaDatabase, FaCode, FaDesktop, FaMicrochip, FaCloud,
  SiDotnet, FaMicrosoft, SiSharp, SiTypescript, SiJavascript
];

const colorsList = [
  'text-blue-500', 'text-green-500', 'text-yellow-500', 
  'text-red-500', 'text-purple-500', 'text-indigo-500',
  'text-pink-500', 'text-teal-500', 'text-orange-500', 'text-cyan-500'
];

// Helper function to cast the react-icons to ComponentType
const castIconToComponent = (icon: any): ComponentType<{}> => icon as ComponentType<{}>;

const FloatingIcons: React.FC<FloatingIconsProps> = ({ count = 15, className = '' }) => {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);
  
  // Memoize the icon and color arrays to prevent recreation on each render
  const icons = useMemo(() => iconsList, []);
  const colors = useMemo(() => colorsList, []);
  
  // Use useCallback to memoize the random icon generator function
  const generateRandomIcons = useCallback(() => {
    const newIcons: FloatingIcon[] = [];
    
    for (let i = 0; i < count; i++) {
      const randomIcon = castIconToComponent(icons[Math.floor(Math.random() * icons.length)]);
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      newIcons.push({
        id: i,
        Icon: randomIcon,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 20 + Math.random() * 30,
        rotation: Math.random() * 360,
        speed: 0.5 + Math.random() * 2,
        direction: Math.random() > 0.5 ? 1 : -1,
        color: randomColor,
        opacity: 0.3 + Math.random() * 0.4
      });
    }
    
    return newIcons;
  }, [count, colors, icons]);
  
  useEffect(() => {
    // Generate random icons
    setFloatingIcons(generateRandomIcons());
  }, [generateRandomIcons]);
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {floatingIcons.map((icon) => (
        <motion.div
          key={icon.id}
          className={`absolute ${icon.color}`}
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            opacity: icon.opacity,
            fontSize: `${icon.size}px`,
          }}
          animate={{
            x: [0, icon.direction * 40, 0],
            y: [0, icon.direction * -30, 0],
            rotate: [0, icon.rotation, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: icon.speed * 5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <icon.Icon />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
