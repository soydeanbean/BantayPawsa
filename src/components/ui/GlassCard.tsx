import { motion } from 'framer-motion';
import type { ReactNode, CSSProperties } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}

export default function GlassCard({ children, className = '', hover = true, onClick, style }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      whileTap={hover ? { scale: 0.99 } : undefined}
      onClick={onClick}
      className={`glass-card ${hover ? 'hoverable' : ''} ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}