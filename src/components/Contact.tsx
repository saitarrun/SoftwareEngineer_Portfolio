import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { ShinyButton } from './ui/ShinyButton';
import { Mail, ArrowRight, Phone } from 'lucide-react';

export const Contact = () => {
    return (
        <Section id="contact" className="pb-12">
            <GlassCard className="max-w-4xl mx-auto text-center py-20 px-6 mb-20">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-slate-900 dark:text-white">
                    Interested in working together?
                </h2>
                <p className="text-xl text-slate-800 dark:text-slate-200 mb-10 max-w-2xl mx-auto font-light">
                    I'm currently available for new opportunities. Feel free to reach out.
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10 text-lg">
                    <a href="mailto:saitarrunpitta@gmail.com" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Mail className="w-5 h-5" /> saitarrunpitta@gmail.com
                    </a>
                    <a href="tel:+16577519260" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Phone className="w-5 h-5" /> +1 (657) 751-9260
                    </a>
                </div>
                <div className="flex justify-center gap-4">

                    <a href="/resume.pdf" download>
                        <ShinyButton variant="outline" className="text-lg px-8 py-4">
                            Download Resume <ArrowRight className="w-5 h-5" />
                        </ShinyButton>
                    </a>
                </div>
            </GlassCard>

            <footer className="text-center text-slate-600 dark:text-slate-400 text-sm border-t border-slate-200 dark:border-slate-800 pt-8">
                <p>© {new Date().getFullYear()} Sai Tarrun Pitta. All rights reserved.</p>
            </footer>
        </Section>
    );
};
