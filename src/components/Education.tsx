import { motion } from 'framer-motion';

const education = [
    {
        num: '01',
        school: "California State University, Fullerton",
        degree: "Master of Science, Computer Science",
        period: "Aug 2024 – May 2026",
        location: "Fullerton, CA",
        description: [
            "Published peer-reviewed IEEE conference paper: “Hardware Trojan Detection with Machine Learning and Power Side-Channels: A Post-Deployment Analysis” (IEEE CNS 2025)",
            "Coursework: Advanced Algorithms, Cloud Computing, System Design, Machine Learning, Artificial Intelligence"
        ]
    },
    {
        num: '02',
        school: "Kakatiya Institute of Technology and Science",
        degree: "Bachelor of Technology in CSE",
        period: "Aug 2018 – May 2022",
        location: "Warangal, India",
        description: [
            "Core computer science foundation with emphasis on algorithms, data structures, and database management systems."
        ]
    }
];

export const Education = () => {
    return (
        <section id="education" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-5xl md:text-8xl font-black text-on-surface tracking-tighter uppercase" style={{ fontFamily: 'var(--font-display)' }}>Education</h2>
                </motion.div>
 
                {/* Education list */}
                <div className="flex flex-col gap-10">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
                            className="grid md:grid-cols-[100px_1fr] gap-8 md:gap-16 items-start p-10 md:p-14 rounded-[2.5rem] bg-surface-container-low ghost-border hover:bg-surface-container transition-all duration-500"
                        >
                            {/* Number */}
                            <span className="text-6xl md:text-7xl font-black text-primary/20 group-hover:text-primary transition-colors duration-500 pt-2" style={{ fontFamily: 'var(--font-display)' }}>
                                {edu.num}
                            </span>
 
                            {/* Content */}
                            <div>
                                <div className="flex flex-wrap items-baseline gap-4 mb-6">
                                    <h3 className="text-3xl md:text-5xl font-black text-on-surface" style={{ fontFamily: 'var(--font-display)' }}>
                                        {edu.school}
                                    </h3>
                                    <span className="text-primary-dim font-bold text-lg uppercase tracking-[0.2em] opacity-80" style={{ fontFamily: 'var(--font-label)' }}>{edu.degree}</span>
                                </div>
 
                                <div className="flex flex-wrap gap-3 mb-10">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] px-5 py-2.5 rounded-lg bg-surface-container-high text-on-surface-variant border border-white/05" style={{ fontFamily: 'var(--font-label)' }}>
                                        {edu.period}
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] px-5 py-2.5 rounded-lg bg-surface-container-high text-on-surface-variant border border-white/05" style={{ fontFamily: 'var(--font-label)' }}>
                                        {edu.location}
                                    </span>
                                </div>
 
                                <div className="space-y-4 max-w-4xl">
                                    {(Array.isArray(edu.description) ? edu.description : [edu.description]).map((item, i) => (
                                        <p key={i} className="text-xl text-on-surface-variant leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{item}</p>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
