import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLowPower: boolean;
}

export const useDeviceDetect = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLowPower: false,
  });

  useEffect(() => {
    const checkDevice = () => {
      // Get window width
      const width = window.innerWidth;
      
      // Basic device type detection based on screen width
      const isMobile = width <= 767;
      const isTablet = width >= 768 && width <= 1024;
      const isDesktop = width > 1024;
      
      // Simple performance detection
      // This is a crude approximation - in a production app, you might want to use more sophisticated detection
      const isLowPower = isMobile || 
        // Check if the device is likely low power based on user agent
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          navigator.userAgent.toLowerCase()
        );
      
      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isLowPower,
      });
    };

    // Initial check
    checkDevice();
    
    // Re-check on resize
    window.addEventListener('resize', checkDevice);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return deviceInfo;
};

export default useDeviceDetect;
