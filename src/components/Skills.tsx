import { motion } from 'framer-motion';
import { Code2, Database, Layout, Terminal } from 'lucide-react';

const skillGroups = [
    {
        num: '01',
        title: "Backend Core",
        icon: <Terminal className="w-6 h-6" />,
        skills: ["Python", "FastAPI", "Django", "Go", "Java", "Spring Boot", "gRPC", "Redis"]
    },
    {
        num: '02',
        title: "ML & AI Systems",
        icon: <Database className="w-6 h-6" />,
        skills: ["TensorFlow", "PyTorch", "LLMs", "RAG", "LangChain", "Vector DBs", "Cuda"]
    },
    {
        num: '03',
        title: "Cloud & DevOps",
        icon: <Code2 className="w-6 h-6" />,
        skills: ["AWS", "Kubernetes", "Docker", "Terraform", "Kafka", "PostgreSQL", "CI/CD", "Prometheus"]
    },
    {
        num: '04',
        title: "Frontend & Tooling",
        icon: <Layout className="w-6 h-6" />,
        skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Three.js", "Redux", "Vite"]
    }
];

export const Skills = () => {
    return (
        <section id="skills" className="py-32 bg-surface-container-lowest">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-6xl md:text-9xl font-black text-on-surface tracking-tighter uppercase mb-4" style={{ fontFamily: 'var(--font-display)' }}>Technical Stack</h2>
                    <p className="text-primary-dim text-lg md:text-xl font-bold uppercase tracking-[0.5em]" style={{ fontFamily: 'var(--font-label)' }}>Engineered for Performance</p>
                </motion.div>
 
                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 gap-10">
                    {skillGroups.map((group, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
                            className={`group p-10 md:p-14 rounded-[2.5rem] bg-surface-container-low hover:bg-surface-container ghost-border transition-all duration-500 hover:-translate-y-1 ${index % 2 !== 0 ? 'md:mt-12' : ''}`}
                        >
                            <div className="flex items-start justify-between mb-10">
                                <div>
                                    <span className="text-primary-dim text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block" style={{ fontFamily: 'var(--font-label)' }}>{group.num} / Technical Module</span>
                                    <h3 className="text-3xl md:text-5xl font-black text-on-surface" style={{ fontFamily: 'var(--font-display)' }}>{group.title}</h3>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center border border-white/05 text-primary/40 group-hover:text-primary transition-colors">
                                    {group.icon}
                                </div>
                            </div>
 
                            <div className="flex flex-wrap gap-2.5">
                                {group.skills.map(skill => (
                                    <span
                                        key={skill}
                                        className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant bg-surface-container-highest rounded-lg border border-white/05 hover:border-primary/30 hover:text-primary transition-all duration-300"
                                        style={{ fontFamily: 'var(--font-label)' }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
