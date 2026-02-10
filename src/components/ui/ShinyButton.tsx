import React from 'react';
import { motion } from 'framer-motion';

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    className?: string;
}

export const ShinyButton = ({ children, className = '', variant = 'primary', ...props }: ShinyButtonProps) => {
    // Minimalist button styles for Light Theme
    const baseStyles = "relative px-8 py-3 rounded-full font-medium transition-all duration-300 overflow-hidden flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl",
        secondary: "bg-white text-slate-900 border border-slate-200 hover:border-slate-900 hover:bg-slate-50",
        outline: "border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};
