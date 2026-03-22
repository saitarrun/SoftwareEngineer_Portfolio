import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    // High-stiffness springs for "weightless" laser tracking
    const mouseX = useSpring(0, { stiffness: 1000, damping: 50 });
    const mouseY = useSpring(0, { stiffness: 1000, damping: 50 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (isHidden) setIsHidden(false);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = 
                target.tagName === 'A' || 
                target.tagName === 'BUTTON' || 
                target.closest('a') || 
                target.closest('button') ||
                target.closest('[role="button"]') ||
                target.classList.contains('group');

            setIsHovered(!!isInteractive);
        };

        const handleMouseOut = () => {
            setIsHidden(true);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseleave', handleMouseOut);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseleave', handleMouseOut);
        };
    }, [mouseX, mouseY, isHidden]);

    if (isHidden) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            {/* Outer Laser Bloom */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: isHovered ? 120 : 60,
                    height: isHovered ? 120 : 60,
                    opacity: isHovered ? 0.3 : 0.15,
                    scale: [1, 1.1, 1], // Subtle breathing
                }}
                transition={{ 
                    scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                    default: { type: 'spring', stiffness: 400, damping: 30 } 
                }}
                className="absolute rounded-full bg-primary/20 blur-[20px]"
            />

            {/* Inner Ring (Visual Focus) */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: isHovered ? 40 : 12,
                    height: isHovered ? 40 : 12,
                    borderColor: 'rgba(255, 146, 73, 0.4)',
                }}
                className="absolute border border-primary/30 rounded-full"
            />

            {/* Radiant Laser Core */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovered ? 2 : 1,
                    boxShadow: isHovered 
                        ? '0 0 25px 8px rgba(255, 146, 73, 0.8)' 
                        : '0 0 15px 4px rgba(255, 146, 73, 0.6)',
                }}
                className="absolute w-1 h-1 bg-white rounded-full"
            />
        </div>
    );
};
