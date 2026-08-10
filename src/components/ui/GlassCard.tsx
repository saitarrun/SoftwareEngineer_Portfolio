import React, { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard = ({ children, className = '', hoverEffect = false }: GlassCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track relative mouse position inside the card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // Generate dynamic background style
  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(249, 115, 22, 0.08), transparent 80%)`;


  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={hoverEffect ? { scale: 1.01 } : {}}
      className={`glass-card p-6 relative overflow-hidden group/card ${className}`}
    >
      {/* Spotlight overlay effect layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-0"
        style={{ background }}
      />
      
      {/* Content wrapper to keep it on top of spotlight */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

