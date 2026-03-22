import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface MagneticElementProps {
    children: React.ReactNode;
    className?: string;
    distance?: number;
}

export const MagneticElement = ({ children, className, distance = 0.4 }: MagneticElementProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const rectRef = useRef<DOMRect | null>(null);
    
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseEnter = () => {
        if (ref.current) {
            rectRef.current = ref.current.getBoundingClientRect();
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        if (!rectRef.current) return;
        const { left, top, width, height } = rectRef.current;
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * distance);
        y.set((clientY - centerY) * distance);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        rectRef.current = null;
    };

    return (
        <motion.div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
