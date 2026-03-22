import { motion } from 'framer-motion';

const experiences = [
    {
        num: '01',
        company: "Pacific Life Insurance",
        role: "Software Engineer Intern",
        period: "May 2025 – Dec 2025",
        location: "Newport Beach, CA",
        description: [
            "Engineered a real-time risk inference engine using Python and XGBoost, reducing triage time by 35%.",
            "Architected high-throughput Kafka data pipelines to ingest and process 5,000+ weekly claims, maintaining sub-second data freshness for 50+ concurrent adjusters.",
            "Optimized API aggregation layers to reduce p99 latency by 30% via intelligent caching and reusable TypeScript components.",
            "Standardized automated testing across 5+ teams via a modular CI/CD framework, cutting time-to-production by 40%.",
        ]
    },
    {
        num: '02',
        company: "Accenture",
        role: "Software Engineer",
        period: "Jan 2022 – May 2024",
        location: "Hyderabad, India",
        description: [
            "Architected a high-concurrency gRPC wallet service, sustaining 99.9% availability and processing 2M+ daily transactions.",
            "Reduced monthly AWS spend by 35% by rightsizing EKS workloads and implementing multi-tier caching (local + Redis).",
            "Reduced end-to-end latency by 20% via request batching and PostgreSQL query tuning, eliminating 40% of timeout errors.",
            "Defined SLOs via Splunk and Prometheus, reducing MTTR by 25% for mission-critical financial services.",
        ]
    },
    {
        num: '03',
        company: "Cognizant",
        role: "Software Engineer",
        period: "Feb 2021 – Jan 2022",
        location: "Hyderabad, India",
        description: [
            "Optimized PostgreSQL performance for Spring Boot APIs, improving p99 latency by 30% for high-read workloads.",
            "Built CI/CD pipelines with GitHub Actions and Docker, enabling daily production deployments and reducing lead time by 50%.",
            "Improved API security via RBAC and OWASP-aligned input validation, reducing access-related vulnerabilities by 50%.",
        ]
    }
];

export const Experience = () => {
    return (
        <section id="experience" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 flex items-end justify-between border-b border-white/[0.06] pb-8"
                >
                    <div>
                        <p className="text-[#F97316] text-xs font-bold uppercase tracking-widest mb-2">Work History</p>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Experience</h2>
                    </div>
                    <span className="hidden md:block text-white/10 text-8xl font-black select-none">EXP</span>
                </motion.div>

                {/* Experience list */}
                <div className="space-y-0">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group border-b border-white/[0.06] py-10 grid md:grid-cols-[100px_1fr] gap-6 md:gap-10 items-start hover:border-[#F97316]/20 transition-colors duration-300"
                        >
                            {/* Number */}
                            <span className="text-5xl font-black text-[#F97316]/20 group-hover:text-[#F97316]/40 transition-colors duration-300 leading-none">
                                {exp.num}
                            </span>

                            {/* Content */}
                            <div>
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <h3 className="text-2xl font-black text-white group-hover:text-[#F97316] transition-colors duration-300">
                                        {exp.company}
                                    </h3>
                                    <span className="text-white/30 text-sm">·</span>
                                    <span className="text-white/50 text-sm font-medium">{exp.role}</span>
                                </div>

                                {/* Period + Location */}
                                <div className="flex flex-wrap gap-4 mb-4">
                                    <span className="text-xs text-white/60 font-medium bg-white/[0.08] border border-white/[0.12] px-3 py-1.5 rounded-full whitespace-nowrap">
                                        {exp.period}
                                    </span>
                                    <span className="text-xs text-white/60 font-medium bg-white/[0.08] border border-white/[0.12] px-3 py-1.5 rounded-full whitespace-nowrap">
                                        {exp.location}
                                    </span>
                                </div>

                                <ul className="mt-4 space-y-2">
                                    {exp.description.map((item, i) => (
                                        <li key={i} className="flex gap-3 text-white/50 text-sm leading-relaxed">
                                            <span className="w-1 h-1 rounded-full bg-[#F97316]/60 mt-2.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
