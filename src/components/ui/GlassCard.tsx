import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const GlassCard = ({ children, className = '', hoverEffect = false }: GlassCardProps) => {
    return (
        <motion.div
            whileHover={hoverEffect ? { scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' } : {}}
            className={`glass-card p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl ${className}`}
        >
            {children}
        </motion.div>
    );
};
