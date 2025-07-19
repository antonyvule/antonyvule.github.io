import React from 'react';
import { IconType, IconBaseProps } from 'react-icons';

interface IconProps {
  icon: IconType;
  className?: string;
}

// This component works as a wrapper for react-icons to fix TypeScript issues
const Icon: React.FC<IconProps> = ({ icon, className = '' }) => {
  // Hack to work around TypeScript issues with react-icons
  const IconComponent = icon as React.FC<IconBaseProps>;
  return <IconComponent className={className} />;
};

export default Icon;
