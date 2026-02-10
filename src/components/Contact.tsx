import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { ShinyButton } from './ui/ShinyButton';
import { Mail, ArrowRight, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <Section id="contact" className="pb-12">
            <GlassCard className="max-w-4xl mx-auto text-center py-20 px-6 mb-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl md:text-5xl font-serif font-bold mb-6 text-black"
                    >
                        Interested in working together?
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-black mb-10 max-w-2xl mx-auto font-light"
                    >
                        I'm currently available for new opportunities. Feel free to reach out.
                    </motion.p>
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10 text-lg"
                    >
                        <a href="mailto:saitarrunpitta@gmail.com" className="flex items-center gap-2 text-black hover:text-blue-600 transition-colors">
                            <Mail className="w-5 h-5" /> saitarrunpitta@gmail.com
                        </a>
                        <a href="tel:+16577519260" className="flex items-center gap-2 text-black hover:text-blue-600 transition-colors">
                            <Phone className="w-5 h-5" /> +1 (657) 751-9260
                        </a>
                    </motion.div>
                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center gap-4"
                    >
                        <a href="/resume.pdf" download>
                            <ShinyButton variant="outline" className="text-lg px-8 py-4">
                                Download Resume <ArrowRight className="w-5 h-5" />
                            </ShinyButton>
                        </a>
                    </motion.div>
                </motion.div>
            </GlassCard>

            <footer className="text-center text-slate-600 dark:text-slate-400 text-sm border-t border-slate-200 dark:border-slate-800 pt-8">
                <p>© {new Date().getFullYear()} Sai Tarrun Pitta. All rights reserved.</p>
            </footer>
        </Section>
    );
};
