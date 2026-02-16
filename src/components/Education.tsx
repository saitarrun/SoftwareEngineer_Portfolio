import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { GraduationCap } from 'lucide-react';

export const Education = () => {
    return (
        <Section id="education" title="Education">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <GlassCard className="p-8 hover:border-slate-300 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between mb-4 md:items-start">
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-slate-900">California State University, Fullerton</h3>
                            <p className="text-lg font-medium text-slate-800">Master of Science, Computer Science</p>
                        </div>
                        <div className="mt-2 md:mt-0 flex items-center gap-2 text-sm text-slate-700 bg-slate-100/50 px-3 py-1 rounded-full w-fit">
                            <Calendar className="w-4 h-4" /> Aug 2024 – May 2026
                        </div>
                    </div>
                    <div>
                        <p className="text-slate-800 leading-relaxed mb-2">
                            <span className="font-semibold">Relevant Coursework:</span> Advanced Algorithms, Distributed Systems, Cloud Computing, System Design, Machine Learning
                        </p>
                        <p className="text-sm text-slate-600">Fullerton, CA</p>
                    </div>
                </GlassCard>
            </motion.div>
        </Section>
    );
};

function Calendar(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
    )
}
