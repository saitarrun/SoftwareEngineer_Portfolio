import React from 'react';
import { motion } from 'framer-motion';

export const Education = () => {
    return (
        <section id="education" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 flex items-end justify-between border-b border-white/[0.06] pb-8"
                >
                    <div>
                        <p className="text-[#F97316] text-xs font-bold uppercase tracking-widest mb-2">Academic Background</p>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Education</h2>
                    </div>
                    <span className="hidden md:block text-white/10 text-8xl font-black select-none">EDU</span>
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
                            <span className="text-xs text-white/30 font-medium bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-full whitespace-nowrap">
                                Aug 2024 – May 2026
                            </span>
                            <span className="text-xs text-white/30 font-medium bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-full whitespace-nowrap">
                                Fullerton, CA
                            </span>
                        </div>
                        <p className="text-white/50 font-medium mb-4">Master of Science, Computer Science</p>
                        <p className="text-white/30 text-sm leading-relaxed">
                            <span className="text-white/50 font-semibold">Relevant Coursework:</span> Advanced Algorithms, Distributed Systems, Cloud Computing, System Design, Machine Learning
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
