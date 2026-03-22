import { lazy, Suspense, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const HeroScene = lazy(() =>
    import('../three/HeroScene').then(m => ({ default: m.HeroScene }))
);

const FluidLetter = ({ char, index, isGradient = false }: { char: string, index: number, isGradient?: boolean }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 200, damping: 20 });
    const springY = useSpring(y, { stiffness: 200, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        if (Math.abs(distanceX) < 100 && Math.abs(distanceY) < 100) {
            x.set(distanceX * 0.2);
            y.set(distanceY * 0.2);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.span
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 100, rotate: index % 2 === 0 ? 10 : -10 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ 
                duration: 1.2, 
                delay: index * 0.03,
                ease: [0.22, 1, 0.36, 1] 
            }}
            style={{ 
                x: springX, 
                y: springY, 
                display: 'inline-block',
                ...(isGradient ? {
                    background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                } : {})
            }}
            className="cursor-default"
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    );
};

export const Hero = () => {
    const firstName = "Sai Tarrun";
    const lastName = "Pitta";

    return (
        <section id="about" className="relative overflow-hidden pt-20 grid-mesh">
            <Suspense fallback={null}>
                <HeroScene />
            </Suspense>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-6 pt-12 relative z-10">
                
                {/* Available Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-3 mb-12"
                >
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest w-fit"
                        style={{
                            background: 'rgba(255, 146, 73, 0.1)',
                            color: 'var(--primary)',
                            fontFamily: 'var(--font-label)',
                        }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse neon-glow" style={{ background: 'var(--primary-dim)' }} />
                        Available for work
                    </div>
                    <p className="text-sm font-medium" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)' }}>
                        Software Engineer based in<br />
                        <span className="text-white font-semibold">California</span>
                    </p>
                </motion.div>

                {/* Massive Kinetic Typography */}
                <div className="relative mb-8">
                    <h1
                        className="text-[16vw] md:text-[12vw] font-black leading-none tracking-tighter text-white whitespace-nowrap select-none flex flex-wrap"
                        style={{ lineHeight: 0.88, fontFamily: 'var(--font-display)' }}
                    >
                        {firstName.split("").map((char, index) => (
                            <FluidLetter key={index} char={char} index={index} />
                        ))}
                    </h1>
                    <div className="flex items-end gap-6 mt-1 overflow-hidden">
                        <h1
                            className="text-[16vw] md:text-[12vw] font-black leading-none tracking-tighter whitespace-nowrap select-none flex flex-wrap"
                            style={{
                                lineHeight: 0.88,
                                fontFamily: 'var(--font-display)',
                            }}
                        >
                            {lastName.split("").map((char, index) => (
                                <FluidLetter key={index} char={char} index={index + firstName.length} isGradient />
                            ))}
                        </h1>
                    </div>
                </div>

                {/* Tagline & CTA */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-10">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-base leading-relaxed max-w-md"
                        style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)' }}
                    >
                        Software engineer with 3+ years building production-scale backend systems and AI-driven applications. Specialized in deploying ML models, scalable APIs, and cloud-native infrastructure.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <a
                            href="#projects"
                            className="px-8 py-4 text-black font-bold text-sm rounded-full transition-all duration-300 hover:shadow-[0_0_20px_var(--primary-dim)] hover:-translate-y-0.5"
                            style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-container))' }}
                        >
                            See my work
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-4 text-white font-bold text-sm rounded-full border border-white/20 transition-all duration-300 hover:border-primary hover:text-primary backdrop-blur-sm"
                        >
                            Let's connect
                        </a>
                    </motion.div>
                </div>
            </div>
            
            <div className="h-6" />
        </section>
    );
};
