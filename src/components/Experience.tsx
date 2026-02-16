import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { Calendar } from 'lucide-react';

const experiences = [
    {
        company: "Pacific Life Insurance",
        role: "Software Engineer Intern",
        period: "May 2025 – Dec 2025",
        location: "Newport Beach, CA",
        description: [
            "Engineered a real-time risk inference engine using Python and XGBoost, reducing triage time by 35% by surfacing risk signals via systematized feature engineering.",
            "Architected high-throughput Kafka data pipelines to ingest and process 5,000+ weekly claims, optimizing consumer group rebalancing to maintain sub-second data freshness for 50+ concurrent adjusters.",
            "Optimized API aggregation layers to reduce p99 latency by 30%, implementing intelligent caching and reusable TypeScript components to support high-concurrency visualization.",
            "Standardized automated testing across 5+ teams by designing a modular framework integrated into CI/CD pipelines, cutting time-to-production by 40% and reducing defect escapes."
        ]
    },
    {
        company: "Accenture",
        role: "Software Engineer",
        period: "Jan 2022 – May 2024",
        location: "Hyderabad, India",
        description: [
            "Architected a high-concurrency gRPC wallet service using distributed locking and optimistic concurrency control, sustaining 99.9% availability during peak traffic and processing 2M+ daily transactions.",
            "Reduced monthly AWS spend by 35% by rightsizing EKS workloads and implementing multi-tier caching (local + Redis).",
            "Reduced end-to-end latency by 20% by implementing request batching and tuning PostgreSQL query execution plans, eliminating 40% of timeout errors.",
            "Defined SLOs and established observability via Splunk and Prometheus, reducing Mean Time To Resolution (MTTR) by 25% for mission-critical financial services."
        ]
    },
    {
        company: "Cognizant",
        role: "Software Engineer",
        period: "Feb 2021 – Jan 2022",
        location: "Hyderabad, India",
        description: [
            "Optimized PostgreSQL performance for Spring Boot APIs by addressing index fragmentation and lock contention, improving p99 latency by 30% for high-read workloads.",
            "Built CI/CD pipelines using GitHub Actions and Docker, enabling daily production deployments with standardized rollback and reducing release lead time by 50%.",
            "Improved API security by implementing RBAC and strict input validation aligned to OWASP guidance, reducing access-related vulnerabilities by 50%."
        ]
    }
];

export const Experience = () => {
    return (
        <Section id="experience" title="Experience">
            <div className="space-y-6">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <GlassCard className="p-8 hover:border-slate-300 transition-colors group">
                            <div className="flex flex-col md:flex-row justify-between mb-4 md:items-center">
                                <div>
                                    <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-purple-600 transition-colors">{exp.company}</h3>
                                    <p className="text-lg font-medium text-slate-800">{exp.role}</p>
                                </div>
                                <div className="mt-2 md:mt-0 flex items-center gap-2 text-sm text-slate-700 bg-slate-100/50 px-3 py-1 rounded-full w-fit">
                                    <Calendar className="w-4 h-4" /> {exp.period}
                                </div>
                            </div>
                            <ul className="space-y-2 mt-4">
                                {exp.description.map((item, i) => (
                                    <li key={i} className="flex gap-3 text-slate-800 leading-relaxed">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};
