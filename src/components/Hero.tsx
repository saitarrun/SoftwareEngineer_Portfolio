import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

const HeroScene = lazy(() =>
    import('../three/HeroScene').then(m => ({ default: m.HeroScene }))
);

const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '6+', label: 'Projects Shipped' },
    { value: '3', label: 'Companies' },
];

export const Hero = () => {
    return (
        <section id="about" className="relative overflow-hidden pt-20">

            {/* 3D Hero Scene */}
            <Suspense fallback={null}>
                <HeroScene />
            </Suspense>

            {/* Top band: badge + location + stats */}
            <div className="max-w-7xl mx-auto px-6 pt-12 flex flex-col md:flex-row md:items-start md:justify-between gap-6 relative z-10">

                {/* Left: badge + location */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-3"
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

                {/* Right: stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex gap-10 md:gap-16"
                >
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col">
                            <span className="text-4xl md:text-5xl font-black leading-none" style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>{stat.value}</span>
                            <span className="text-xs mt-1 leading-tight" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)' }}>{stat.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Massive name */}
            <div className="relative z-10 mt-4 overflow-hidden max-w-7xl mx-auto px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[16vw] md:text-[12vw] font-black leading-none tracking-tighter text-white whitespace-nowrap select-none"
                    style={{ lineHeight: 0.88, fontFamily: 'var(--font-display)' }}
                >
                    Sai Tarrun
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-end gap-6 mt-1"
                >
                    <h1
                        className="text-[16vw] md:text-[12vw] font-black leading-none tracking-tighter whitespace-nowrap select-none"
                        style={{
                            lineHeight: 0.88,
                            fontFamily: 'var(--font-display)',
                            background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Pitta
                    </h1>
                </motion.div>
            </div>

            {/* Bottom: tagline + CTA */}
            <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-10 relative z-10">
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
                    className="flex items-center gap-4"
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
                        className="px-8 py-4 font-medium text-sm rounded-full transition-all duration-300 ghost-border hover:text-white group"
                        style={{ color: 'var(--on-surface-variant)' }}
                    >
                        Let's talk
                    </a>
                </motion.div>
            </div>

            {/* Section spacer */}
            <div className="h-6" style={{ background: 'linear-gradient(to bottom, transparent, var(--surface-container-low))' }} />
        </section>
    );
};
