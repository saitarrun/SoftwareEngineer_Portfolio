import { motion } from 'framer-motion';

const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '6+', label: 'Projects Shipped' },
    { value: '3', label: 'Companies' },
];

export const Hero = () => {
    return (
        <section id="about" className="min-h-screen relative overflow-hidden pt-20">

            {/* Top band: badge + location + stats */}
            <div className="max-w-7xl mx-auto px-6 pt-12 flex flex-col md:flex-row md:items-start md:justify-between gap-6">

                {/* Left: badge + location */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-3"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#F97316]/30 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold uppercase tracking-widest w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
                        Available for work
                    </div>
                    <p className="text-white/50 text-sm font-medium">
                        Software Engineer based in<br />
                        <span className="text-white/80 font-semibold">California</span>
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
                            <span className="text-4xl md:text-5xl font-black text-[#F97316] leading-none">{stat.value}</span>
                            <span className="text-xs text-white/40 mt-1 leading-tight">{stat.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Massive name */}
            <div className="relative mt-4 overflow-hidden">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[18vw] md:text-[14vw] font-black leading-none tracking-tighter text-white whitespace-nowrap px-4 select-none"
                    style={{ lineHeight: 0.88 }}
                >
                    Sai Tarrun
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-end gap-6 px-4 mt-1"
                >
                    <h1
                        className="text-[18vw] md:text-[14vw] font-black leading-none tracking-tighter whitespace-nowrap select-none"
                        style={{
                            lineHeight: 0.88,
                            background: 'linear-gradient(135deg, #F97316, #FB923C)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Pitta
                    </h1>

                    {/* Profile image floated right inside the name row */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="hidden md:block ml-auto mb-2 shrink-0"
                    >
                        <div className="relative w-44 h-56 group">
                            <div className="absolute inset-0 bg-[#F97316]/20 rounded-2xl blur-xl" />
                            <img
                                src="/profile.jpg"
                                alt="Sai Tarrun Pitta"
                                className="w-full h-full object-cover object-top rounded-2xl relative z-10"
                                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom: tagline + CTA */}
            <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-16">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-white/70 text-base leading-relaxed max-w-md"
                >
                    Building high-concurrency distributed systems and cloud-native architecture.
                    Specializing in low-latency backend services with Java, Python & gRPC.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center gap-4"
                >
                    <a
                        href="#projects"
                        className="px-8 py-4 bg-[#F97316] text-white font-bold text-sm rounded-full hover:bg-[#FB923C] transition-all duration-300 shadow-lg hover:shadow-[#F97316]/30 hover:shadow-xl hover:-translate-y-0.5"
                    >
                        See my work
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-4 border border-white/10 text-white/60 font-medium text-sm rounded-full hover:border-white/30 hover:text-white transition-all duration-300"
                    >
                        Let's talk
                    </a>
                </motion.div>
            </div>

            {/* Divider line */}
            <div className="border-t border-white/[0.06]" />
        </section>
    );
};
