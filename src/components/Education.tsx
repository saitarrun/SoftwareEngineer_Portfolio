import { motion } from 'framer-motion';

export const Education = () => {
    return (
        <section id="education" className="py-8">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-6 flex items-end justify-between border-b border-white/[0.06] pb-4"
                >
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Education</h2>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-[100px_1fr] gap-6 md:gap-10 items-start border-b border-white/[0.06] pb-10 group hover:border-[#F97316]/20 transition-colors duration-300"
                >
                    {/* Number */}
                    <span className="text-5xl font-black text-[#F97316]/20 group-hover:text-[#F97316]/50 transition-colors duration-300 leading-none">
                        01
                    </span>

                    <div>
                        <h3 className="text-2xl font-black text-white group-hover:text-[#F97316] transition-colors duration-300 mb-3">
                            California State University, Fullerton
                        </h3>
                        <div className="flex flex-wrap gap-4 mb-4">
                            <span className="text-xs text-white/80 font-medium bg-white/[0.08] border border-white/[0.12] px-3 py-1.5 rounded-full whitespace-nowrap">
                                Aug 2024 – May 2026
                            </span>
                            <span className="text-xs text-white/80 font-medium bg-white/[0.08] border border-white/[0.12] px-3 py-1.5 rounded-full whitespace-nowrap">
                                Fullerton, CA
                            </span>
                        </div>
                        <p className="text-white/90 font-medium mb-4">Master of Science, Computer Science</p>
                        <p className="text-white/90 text-lg leading-relaxed mb-3">
                            <span className="text-white/90 font-semibold">Achievements:</span> Published peer-reviewed IEEE conference paper: "Hardware Trojan Detection with Machine Learning and Power Side-Channels: A Post-Deployment Analysis" (IEEE CNS 2025)
                        </p>
                        <p className="text-white/90 text-lg leading-relaxed">
                            <span className="text-white/90 font-semibold">Coursework:</span> Advanced Algorithms, Cloud Computing, System Design, Machine Learning, Artificial Intelligence
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
