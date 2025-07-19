import { MotionValue } from "framer-motion";

export interface Particle {
  x: number;
  y: number;
  xVelocity: number;
  yVelocity: number;
  size: number;
  color: string;
  opacity: number;
}

export const generateParticles = (count: number, canvasWidth: number, canvasHeight: number): Particle[] => {
  const particles: Particle[] = [];
  
  // Enhanced color palette with more vibrant blues
  const colors = ['#0a66c2', '#0077B5', '#004d77', '#0099e5', '#00a0dc', '#33b1ff'];
  
  for (let i = 0; i < count; i++) {
    // More variation in particle sizes for visual interest
    const size = Math.random() * 4 + 1;
    
    // Slightly increased opacity range for better visibility
    const opacity = Math.random() * 0.6 + 0.2;
    
    particles.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      xVelocity: (Math.random() - 0.5) * 1.0, // Slightly faster movement
      yVelocity: (Math.random() - 0.5) * 1.0,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity,
    });
  }
  
  return particles;
};

export const updateParticles = (
  particles: Particle[], 
  canvasWidth: number, 
  canvasHeight: number,
  mouseX?: MotionValue<number>,
  mouseY?: MotionValue<number>
): Particle[] => {
  return particles.map((particle) => {
    let { x, y, xVelocity, yVelocity, size, color, opacity } = particle;
    
    // Update position based on velocity
    x += xVelocity;
    y += yVelocity;
    
    // If mouse position is provided, add subtle attraction/repulsion
    if (mouseX && mouseY) {
      const mouseXVal = mouseX.get();
      const mouseYVal = mouseY.get();
      
      if (mouseXVal && mouseYVal) {
        const dx = mouseXVal - x;
        const dy = mouseYVal - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          // Push particles away from mouse with subtle force
          const angle = Math.atan2(dy, dx);
          xVelocity -= Math.cos(angle) * 0.1;
          yVelocity -= Math.sin(angle) * 0.1;
        }
      }
    }
    
    // Limit velocity
    const maxVelocity = 1;
    xVelocity = Math.max(-maxVelocity, Math.min(maxVelocity, xVelocity));
    yVelocity = Math.max(-maxVelocity, Math.min(maxVelocity, yVelocity));
    
    // Boundary check and bounce
    if (x <= 0 || x >= canvasWidth) {
      xVelocity = -xVelocity * 0.9;
      x = x <= 0 ? 1 : canvasWidth - 1;
    }
    
    if (y <= 0 || y >= canvasHeight) {
      yVelocity = -yVelocity * 0.9;
      y = y <= 0 ? 1 : canvasHeight - 1;
    }
    
    // Small random velocity changes for organic movement
    if (Math.random() > 0.97) {
      xVelocity += (Math.random() - 0.5) * 0.2;
      yVelocity += (Math.random() - 0.5) * 0.2;
    }
    
    return {
      x,
      y,
      xVelocity,
      yVelocity,
      size,
      color,
      opacity,
    };
  });
};

export const drawParticles = (
  ctx: CanvasRenderingContext2D, 
  particles: Particle[], 
  canvasWidth: number, 
  canvasHeight: number
) => {
  // Clear canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  // Draw particles
  particles.forEach((particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = particle.opacity;
    ctx.fill();
    ctx.closePath();
  });
  
  // Draw connections between close particles
  ctx.globalAlpha = 0.15;
  ctx.strokeStyle = '#0a66c2';
  ctx.lineWidth = 0.5;
  
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) { 
        // Draw connections between close particles with opacity based on distance
        const opacity = 0.25 * (1 - distance / 150); 
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.globalAlpha = opacity;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
  
  ctx.globalAlpha = 1;
};

// Helper function to throttle events
function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
  let inThrottle = false;
  let lastArgs: any[] | null = null;
  
  return ((...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      lastArgs = null;
      
      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          func(...lastArgs);
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  }) as T;
}

export const createParticleAnimation = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  count: number = 50,
  mouseInteraction: boolean = false
) => {
  if (!canvasRef.current) return { cleanup: () => {} };
  
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d', { alpha: true });
  
  if (!ctx) return { cleanup: () => {} };
  
  // Set canvas dimensions to match parent
  const resizeCanvas = () => {
    const parent = canvas.parentElement;
    if (parent) {
      const devicePixelRatio = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      
      // Set display size (css pixels)
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Set actual size in memory (scaled to account for extra pixel density)
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      
      // Normalize coordinate system to use css pixels
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }
  };
  
  resizeCanvas();
  
  // Initialize particles
  let particles = generateParticles(count, canvas.width, canvas.height);
  
  // Mouse interaction with throttling for performance
  let mouseX = 0;
  let mouseY = 0;
  
  let mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
  
  if (mouseInteraction) {
    mouseMoveHandler = throttle((e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }, 16); // Limit to roughly 60fps
    
    canvas.addEventListener('mousemove', mouseMoveHandler);
  }
  
  // Use a fixed timestamp to maintain consistent animation speed
  let lastTime = performance.now();
  const fps = 60;
  const interval = 1000 / fps;
  
  // Animation loop
  const animationId = requestAnimationFrame(function animate(timestamp) {
    // Throttle frame rate for performance
    const elapsed = timestamp - lastTime;
    
    if (elapsed > interval) {
      lastTime = timestamp - (elapsed % interval);
      
      particles = updateParticles(particles, canvas.width, canvas.height, 
        mouseInteraction ? { get: () => mouseX } as MotionValue<number> : undefined,
        mouseInteraction ? { get: () => mouseY } as MotionValue<number> : undefined
      );
      drawParticles(ctx, particles, canvas.width, canvas.height);
    }
    
    requestAnimationFrame(animate);
  });
  
  // Handle resize with throttling
  const throttledResize = throttle(resizeCanvas, 100);
  window.addEventListener('resize', throttledResize);
  
  // Cleanup
  return {
    cleanup: () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', throttledResize);
      if (mouseInteraction && mouseMoveHandler) {
        canvas.removeEventListener('mousemove', mouseMoveHandler);
      }
    }
  };
};

const particlesUtil = {
  generateParticles,
  updateParticles,
  drawParticles,
  createParticleAnimation
};

export default particlesUtil;
