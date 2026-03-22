import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
    Database, 
    Layout, 
    Terminal, 
    Server, 
    Cloud, 
    Activity, 
    Brain, 
    Shield, 
    Lock 
} from 'lucide-react';
import { useRef } from 'react';

const SkillCard = ({ group, index }: { group: any, index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    
    // Mouse tracking for magnetic effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
                rotateX, 
                rotateY,
                transformStyle: "preserve-3d" 
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
            className="group p-8 md:p-10 rounded-[2rem] bg-surface-container-low/40 ghost-border hover:bg-surface-container-low transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(255,146,73,0.1)] h-full"
        >
            <div style={{ transform: "translateZ(30px)" }}>
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <span className="text-primary-dim text-[10px] font-bold uppercase tracking-[0.4em] mb-3 block" style={{ fontFamily: 'var(--font-label)' }}>{group.num} / Technical Module</span>
                        <h3 className="text-2xl md:text-3xl font-black text-on-surface" style={{ fontFamily: 'var(--font-display)' }}>{group.title}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-surface-container-highest/60 backdrop-blur-md flex items-center justify-center border border-white/05 text-primary/40 group-hover:text-primary transition-colors">
                        {group.icon}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill: string) => (
                        <motion.span
                            key={skill}
                            whileHover={{ 
                                scale: 1.08, 
                                borderColor: "rgba(255, 146, 73, 0.5)", 
                                color: "rgba(255, 146, 73, 1)",
                                backgroundColor: "rgba(255, 146, 73, 0.05)"
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="px-4 py-2 text-[9px] font-bold uppercase tracking-[0.15em] text-on-surface-variant bg-surface-container-highest/40 rounded-lg border border-white/05 cursor-default backdrop-blur-sm"
                            style={{ fontFamily: 'var(--font-label)' }}
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const skillGroups = [
    {
        num: '01',
        title: "Programming Languages",
        icon: <Terminal className="w-6 h-6" />,
        skills: ["Python", "Java", "JavaScript", "SQL", "C++", "TypeScript"]
    },
    {
        num: '02',
        title: "Frontend Development",
        icon: <Layout className="w-6 h-6" />,
        skills: ["React", "Next.js", "HTML5/CSS3", "Tailwind CSS", "Material UI"]
    },
    {
        num: '03',
        title: "Backend & APIs",
        icon: <Server className="w-6 h-6" />,
        skills: ["Spring Boot", "Node.js", "FastAPI", "Django", "gRPC", "GraphQL", "REST APIs", "Microservices"]
    },
    {
        num: '04',
        title: "Data & Caching",
        icon: <Database className="w-6 h-6" />,
        skills: ["Redis", "PostgreSQL", "MongoDB", "DynamoDB", "Elasticsearch", "Kafka", "RabbitMQ"]
    },
    {
        num: '05',
        title: "Cloud & Infrastructure",
        icon: <Cloud className="w-6 h-6" />,
        skills: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Lambda", "S3", "API Gateway"]
    },
    {
        num: '06',
        title: "DevOps & Observability",
        icon: <Activity className="w-6 h-6" />,
        skills: ["Terraform", "Jenkins", "GitHub Actions", "Prometheus", "Grafana", "Splunk"]
    },
    {
        num: '07',
        title: "Machine Learning & AI",
        icon: <Brain className="w-6 h-6" />,
        skills: ["TensorFlow", "PyTorch", "Langchain", "LLMs", "RAG Systems", "Feature Engineering"]
    },
    {
        num: '08',
        title: "Testing & QA",
        icon: <Shield className="w-6 h-6" />,
        skills: ["Pytest", "Selenium", "Performance Testing", "Optimization", "Postman", "Debugging"]
    },
    {
        num: '09',
        title: "Compliance & Security",
        icon: <Lock className="w-6 h-6" />,
        skills: ["SOC 2", "RBAC", "ISO 27001", "OAuth 2.0", "JWT", "OWASP"]
    }
];

export const Skills = () => {
    return (
        <section id="skills" className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-6xl md:text-9xl font-black text-on-surface tracking-tighter uppercase mb-4" style={{ fontFamily: 'var(--font-display)' }}>Technical Stack</h2>
                    <p className="text-primary-dim text-lg md:text-xl font-bold uppercase tracking-[0.5em]" style={{ fontFamily: 'var(--font-label)' }}>Engineered for Performance</p>
                </motion.div>
 
                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillGroups.map((group, index) => (
                        <SkillCard key={index} group={group} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
