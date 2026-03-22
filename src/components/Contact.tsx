import { Mail, Phone, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact = () => {
    return (
        <section id="contact" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                {/* Big CTA block */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden mb-20 p-12 md:p-20"
                    style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                    }}
                >
                    {/* Background orange glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F97316]/06 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
                        <div className="max-w-xl">
                            <p className="text-[#F97316] text-xs font-bold uppercase tracking-widest mb-4">Get In Touch</p>
                            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
                                Let's Build Something <span style={{
                                    background: 'linear-gradient(135deg, #F97316, #FB923C)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}>Exceptional</span>
                            </h2>
                            <p className="text-white/40 text-base leading-relaxed">
                                I'm currently available for new opportunities. Whether you have a question, a project in mind, or just want to connect — feel free to reach out.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 shrink-0">
                            <a
                                href="mailto:saitarrunpitta@gmail.com"
                                className="flex items-center gap-3 px-6 py-4 bg-[#F97316] text-white font-bold rounded-2xl hover:bg-[#FB923C] transition-all duration-300 shadow-lg hover:shadow-[#F97316]/30 hover:-translate-y-0.5 group"
                            >
                                <Mail className="w-5 h-5" />
                                <span>saitarrunpitta@gmail.com</span>
                                <ArrowUpRight className="w-4 h-4 ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                            <a
                                href="tel:+16577519260"
                                className="flex items-center gap-3 px-6 py-4 border border-white/10 text-white/60 font-medium rounded-2xl hover:border-[#F97316]/30 hover:text-white transition-all duration-300 group"
                            >
                                <Phone className="w-5 h-5" />
                                <span>+1 (657) 751-9260</span>
                                <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="border-t border-white/[0.06] pt-10 flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#F97316] flex items-center justify-center">
                            <span className="text-white text-[10px] font-black">S</span>
                        </div>
                        <span className="text-white/30 text-sm">© {new Date().getFullYear()} Sai Tarrun Pitta. All rights reserved.</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <a href="https://github.com/saitarrun" target="_blank" rel="noopener noreferrer"
                            className="text-white/30 hover:text-white transition-colors">
                            <Github className="w-4 h-4" />
                        </a>
                        <a href="https://linkedin.com/in/saitarrunpitta" target="_blank" rel="noopener noreferrer"
                            className="text-white/30 hover:text-white transition-colors">
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a href="/resume.pdf" download
                            className="px-4 py-2 bg-white/[0.05] border border-white/10 text-white/50 text-xs font-semibold rounded-lg hover:border-[#F97316]/30 hover:text-white transition-all duration-200">
                            Download Resume
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
