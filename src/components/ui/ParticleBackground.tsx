import React, { useRef, useEffect, memo } from 'react';
import { createParticleAnimation } from '../../utils/particles';
import { useDeviceDetect } from '../../utils/useDeviceDetect';

interface ParticleBackgroundProps {
  particleCount?: number;
  mouseInteraction?: boolean;
  className?: string;
}

// Using memo to prevent unnecessary re-renders
const ParticleBackground: React.FC<ParticleBackgroundProps> = memo(({ 
  particleCount = 50,
  mouseInteraction = true,
  className = "",
}) => {
  const { isMobile, isTablet, isLowPower } = useDeviceDetect();
  
  // Adjust particle count based on device capability
  const adjustedParticleCount = isLowPower ? Math.floor(particleCount * 0.4) : 
                               isMobile ? Math.floor(particleCount * 0.6) : 
                               isTablet ? Math.floor(particleCount * 0.8) : 
                               particleCount;
  
  // Disable mouse interaction on mobile devices for better performance
  const shouldEnableMouseInteraction = mouseInteraction && !isLowPower;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Only proceed if canvas exists
    if (!canvasRef.current) return;
    
    // Create a function that wraps our animation handler to handle null safely
    const setupAnimation = () => {
      if (!canvasRef.current) return { cleanup: () => {} };
      return createParticleAnimation(
        { current: canvasRef.current } as React.RefObject<HTMLCanvasElement>,
        adjustedParticleCount,
        shouldEnableMouseInteraction
      );
    };
    
    const { cleanup } = setupAnimation();
      
    // Cleanup when component unmounts
    return cleanup;
  }, [adjustedParticleCount, shouldEnableMouseInteraction]);
  
  return (
    <canvas 
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full z-0 ${className}`}
    />
  );
}, (prevProps, nextProps) => {
  // Custom comparison function to prevent unnecessary rerenders
  return prevProps.particleCount === nextProps.particleCount && 
    prevProps.mouseInteraction === nextProps.mouseInteraction &&
    prevProps.className === nextProps.className;
});

export default ParticleBackground;
