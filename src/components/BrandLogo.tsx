import React from 'react';
import { motion } from 'motion/react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
  darkText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  onClick,
  darkText = false
}) => {
  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl'
  };

  const taglineSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm'
  };

  return (
    <motion.div
      id="brandidge-logo"
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={`inline-flex flex-col select-none group ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="flex items-center leading-none">
        <span className={`font-black tracking-tight font-heading ${titleSizes[size]}`}>
          <span className="text-sky-400 transition-colors duration-200 group-hover:text-sky-300">brand</span>
          <span className={darkText ? 'text-slate-900' : 'text-white'}>idge</span>
        </span>
      </div>

      {showTagline && (
        <span className={`text-slate-400 font-mono tracking-wider font-medium mt-1 leading-tight ${taglineSizes[size]}`}>
          Bridging Brands to Growth.
        </span>
      )}
    </motion.div>
  );
};


