import { motion } from 'framer-motion';
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillGroups.map((group, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
                            className="group p-8 md:p-10 rounded-[2rem] bg-surface-container-low hover:bg-surface-container ghost-border transition-all duration-500 hover:-translate-y-1"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div>
                                    <span className="text-primary-dim text-[10px] font-bold uppercase tracking-[0.4em] mb-3 block" style={{ fontFamily: 'var(--font-label)' }}>{group.num} / Technical Module</span>
                                    <h3 className="text-2xl md:text-3xl font-black text-on-surface" style={{ fontFamily: 'var(--font-display)' }}>{group.title}</h3>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center border border-white/05 text-primary/40 group-hover:text-primary transition-colors">
                                    {group.icon}
                                </div>
                            </div>
 
                            <div className="flex flex-wrap gap-2">
                                {group.skills.map(skill => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 text-[9px] font-bold uppercase tracking-[0.15em] text-on-surface-variant bg-surface-container-highest rounded-lg border border-white/05 hover:border-primary/30 hover:text-primary transition-all duration-300"
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
