import { motion } from 'framer-motion';

const services = [
    {
        num: '01',
        title: 'Languages & Frameworks',
        desc: 'Java (Multithreading, Spring Boot), Python (FastAPI, Django), SQL, JavaScript (Node.js / React)',
        tags: ['Java', 'Python', 'SQL', 'JavaScript', 'Spring Boot', 'FastAPI'],
    },
    {
        num: '02',
        title: 'Databases & Storage',
        desc: 'PostgreSQL (performance tuning, indexing), Redis (caching), DynamoDB, schema design for high-throughput workloads.',
        tags: ['PostgreSQL', 'Redis', 'DynamoDB', 'Schema Design'],
    },
    {
        num: '03',
        title: 'Distributed Systems',
        desc: 'Microservices, gRPC, event-driven design, high availability, load balancing, CAP theorem, distributed locking.',
        tags: ['Microservices', 'gRPC', 'Kafka', 'Event-Driven', 'Load Balancing'],
    },
    {
        num: '04',
        title: 'Cloud & DevOps',
        desc: 'AWS (EKS, RDS, S3), Kubernetes, Docker, Terraform (IaC), GitHub Actions CI/CD pipelines.',
        tags: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions'],
    },
    {
        num: '05',
        title: 'Security & SRE',
        desc: 'RBAC, OWASP threat modeling, Prometheus monitoring, Splunk observability, SLOs/SLIs, distributed tracing.',
        tags: ['RBAC', 'OWASP', 'Prometheus', 'Splunk', 'SLOs/SLIs'],
    },
];

export const Skills = () => {
    return (
        <section id="skills" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 flex items-end justify-between border-b border-white/[0.06] pb-8"
                >
                    <div>
                        <p className="text-[#F97316] text-xs font-bold uppercase tracking-widest mb-2">What I Do</p>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Expertise</h2>
                    </div>
                    <span className="hidden md:block text-white/10 text-8xl font-black select-none">SKL</span>
                </motion.div>

                {/* Services list */}
                <div className="space-y-0">
                    {services.map((svc, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            className="group border-b border-white/[0.06] py-8 grid md:grid-cols-[100px_1fr_auto] gap-6 md:gap-10 items-center hover:border-[#F97316]/20 transition-colors duration-300"
                        >
                            {/* Number */}
                            <span className="text-5xl font-black text-[#F97316]/20 group-hover:text-[#F97316]/50 transition-colors duration-300 leading-none">
                                {svc.num}
                            </span>

                            {/* Content */}
                            <div>
                                <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#F97316] transition-colors duration-300">
                                    {svc.title}
                                </h3>
                                <p className="text-white/50 text-sm leading-relaxed">{svc.desc}</p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 max-w-[200px] justify-end">
                                {svc.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-2.5 py-1 text-xs text-white/40 border border-white/[0.08] rounded-full bg-white/[0.03] group-hover:border-[#F97316]/30 group-hover:text-white/60 transition-all duration-300"
                                    >
                                        {tag}
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
