import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';

export const Contact = () => {
    return (
        <section id="contact" className="py-32 bg-surface-container-low">
            <div className="max-w-7xl mx-auto px-6">
                {/* CTA Block */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-[3rem] overflow-hidden mb-32 p-12 md:p-24 bg-surface-container-high ghost-border group"
                >
                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-primary font-bold uppercase tracking-[0.4em] mb-6 block" style={{ fontFamily: 'var(--font-label)' }}>Available for projects</span>
                            <h2 className="text-6xl md:text-8xl font-black text-on-surface leading-[0.9] tracking-tighter uppercase mb-8" style={{ fontFamily: 'var(--font-display)' }}>
                                Let's architect <br />
                                <span className="text-gradient">the future.</span>
                            </h2>
                            <p className="text-on-surface-variant text-xl leading-relaxed max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
                                Currently looking for Software Engineer roles where I can build high-performance distributed systems and AI-powered solutions.
                            </p>
                        </div>
 
                        <div className="flex flex-col gap-6 lg:items-end">
                            <a 
                                href="mailto:contact@example.com"
                                className="flex items-center gap-4 px-10 py-8 bg-primary text-on-primary font-black uppercase tracking-widest rounded-3xl hover:bg-primary-fixed hover:neon-glow transition-all duration-500 hover:-translate-y-1 group/btn w-full lg:w-fit text-center justify-center"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                <Mail className="w-6 h-6" />
                                Start a Conversation
                                <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                            
                            <div className="flex gap-4">
                                <a href="#" className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center border border-white/05 hover:border-primary/50 hover:text-primary transition-all duration-300">
                                    <Github className="w-6 h-6" />
                                </a>
                                <a href="#" className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center border border-white/05 hover:border-primary/50 hover:text-primary transition-all duration-300">
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>
 
                    {/* Visual Flare */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-700" />
                </motion.div>
 
                {/* Footer Metadata */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/05">
                    <div className="flex items-center gap-10">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/40 mb-1" style={{ fontFamily: 'var(--font-label)' }}>Design Strategy</span>
                            <span className="text-on-surface-variant font-medium text-xs">The Neon Architect v1.0</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/40 mb-1" style={{ fontFamily: 'var(--font-label)' }}>Engineered By</span>
                            <span className="text-on-surface-variant font-medium text-xs">Tarun Pitta</span>
                        </div>
                    </div>
                    <p className="text-on-surface-variant/40 text-[10px] uppercase tracking-[0.2em] font-medium" style={{ fontFamily: 'var(--font-label)' }}>
                        © 2026 / SMU MSCS
                    </p>
                </div>
            </div>
        </section>
    );
};
