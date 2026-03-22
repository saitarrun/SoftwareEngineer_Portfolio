import { motion } from 'framer-motion';

const experiences = [
    {
        num: '01',
        company: "Pacific Life",
        role: "Software Engineer Intern",
        period: "May 2025 – Dec 2025",
        location: "Newport Beach, CA",
        description: [
            "Created TensorFlow risk-scoring inference service on AWS Lambda and API Gateway, reducing claims triage time from 3 hours to 45 minutes (75% improvement) and saving 20 hours weekly.",
            "Integrated ML inference into event-driven Kafka pipeline achieving < 100ms latency for risk updates on 5,000+ weekly claims; enabled 50 concurrent users without queueing delays.",
            "Designed and implemented RAG-enabled document retrieval system using semantic search and LLM inference over 50K+ internal policy documents; reduced lookup time by 50%.",
            "Built TypeScript API aggregation layer with Redis distributed caching, reducing dashboard load time from 4 seconds to 2 seconds (50%) and API p99 latency from 300ms to 210ms.",
            "Built LangGraph multi-agent system with human-in-the-loop checkpoints, achieving 98% automation success and 30% reduction in failed claims processing.",
        ]
    },
    {
        num: '02',
        company: "Accenture",
        role: "Software Development Engineer",
        period: "Jul 2022 – Jun 2024",
        location: "Hyderabad, India",
        description: [
            "Engineered a gRPC-based wallet service with distributed locking for a payment platform processing 2M+ daily transactions, helping maintain high availability and reliable concurrent transaction handling.",
            "Optimized AWS infrastructure through EKS right-sizing and Redis caching, reducing cloud spend by 35% ($15K/month).",
            "Optimized PostgreSQL indexes and query plans to reduce p95 latency by 18% across high-throughput transaction services, improving median query time from 450ms to 180ms.",
            "Drove reliability improvements by defining SLOs and implementing Prometheus and Splunk alerting, reducing MTTR by 25% for business-critical services and improving incident triage efficiency.",
        ]
    },
    {
        num: '03',
        company: "Cognizant",
        role: "Software Engineer",
        period: "May 2021 – Apr 2022",
        location: "Hyderabad, India",
        description: [
            "Improved PostgreSQL query performance and resolved lock contention in Spring Boot services, reducing API latency by 52% (2.5s to 1.2s) and lowering p99 latency by 30%.",
            "Integrated scikit-learn churn prediction model into retention dashboards, contributing to 12% churn reduction.",
            "Built REST APIs exposing real-time churn predictions for 5,000+ customers, enabling proactive retention operations and supporting faster data-driven intervention by customer success teams.",
            "Implemented RBAC and input validation, remediating 40+ high-severity vulnerabilities for clean security audit.",
            "Standardized CI/CD with Docker and GitHub Actions, reducing release lead time by 50% and enabling daily deployments.",
        ]
    }
];

export const Experience = () => {
    return (
        <section id="experience" className="py-10" style={{ background: 'var(--surface-container-low)' }}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 pb-4"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Experience</h2>
                </motion.div>

                {/* Experience list */}
                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group grid md:grid-cols-[100px_1fr] gap-6 md:gap-10 items-start p-8 rounded-2xl transition-all duration-300"
                            style={{ background: 'var(--surface-container)' }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'var(--surface-container-high)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'var(--surface-container)';
                            }}
                        >
                            {/* Number */}
                            <span className="text-5xl font-black leading-none transition-colors duration-300" style={{ color: 'rgba(255, 146, 73, 0.2)', fontFamily: 'var(--font-display)' }}>
                                {exp.num}
                            </span>

                            {/* Content */}
                            <div>
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <h3 className="text-2xl font-black text-white group-hover:text-[--primary] transition-colors duration-300" style={{ fontFamily: 'var(--font-display)' }}>
                                        {exp.company}
                                    </h3>
                                    <span style={{ color: 'var(--on-surface-variant)' }}>·</span>
                                    <span className="text-sm font-medium" style={{ color: 'var(--on-surface-variant)' }}>{exp.role}</span>
                                </div>

                                {/* Period + Location */}
                                <div className="flex flex-wrap gap-3 mb-4">
                                    <span className="text-xs font-medium px-3 py-1.5 rounded-md whitespace-nowrap" style={{ background: 'var(--surface-container-highest)', color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)' }}>
                                        {exp.period}
                                    </span>
                                    <span className="text-xs font-medium px-3 py-1.5 rounded-md whitespace-nowrap" style={{ background: 'var(--surface-container-highest)', color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)' }}>
                                        {exp.location}
                                    </span>
                                </div>

                                <ul className="mt-4 space-y-3">
                                    {exp.description.map((item, i) => (
                                        <li key={i} className="flex gap-3 text-lg leading-relaxed" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)' }}>
                                            <span className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0" style={{ background: 'var(--primary-dim)', boxShadow: '0 0 6px var(--primary-dim)' }} />
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
