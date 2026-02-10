import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { Calendar } from 'lucide-react';

const experiences = [
    {
        company: "Germania Farm Mutual Insurance Association",
        role: "Software Engineer Intern",
        period: "May 2025 – Dec 2025",
        location: "Remote",
        description: [
            "Designed and implemented Claim Intel, an AI-driven claims risk analytics platform with Angular and React dashboards, reducing average claim triage time by 35% and saving ~5 minutes per claim by surfacing actionable risk signals.",
            "Scaled the platform to support up to 50 adjusters processing up to 5,000 claims/week by integrating RESTful services and real-time updates into responsive UI workflows, improving throughput and triage consistency during peak volume.",
            "Improved dashboard performance by 30% by building reusable UI components, optimizing client-side rendering, and hardening data-fetch pipelines using TypeScript, HTML5, and CSS3, reducing time-to-insight for claim reviewers.",
            "Reduced regression cycles by 40% by implementing automated UI regression suites and CI validation gates using Selenium and JUnit, lowering defect escape rate by up to 25% and reducing hotfixes by up to 3 per release in an Agile Scrum environment."
        ]
    },
    {
        company: "Accenture",
        role: "Software Engineer",
        period: "Jan 2022 – May 2024",
        location: "Hyderabad, India",
        description: [
            "Engineered secure backend services for high-frequency payments and wallet operations using Node.js REST and gRPC microservices, sustaining up to 1,000 transactions per minute and processing up to 2M transactions/day.",
            "Achieved 99.9% availability by deploying containerized services on AWS EKS, implementing Kafka-based event-driven processing and Redis caching to improve resiliency, reducing incident pages by up to 25% and decreasing MTTR by 30%.",
            "Reduced end-to-end transaction latency by 20% through batching, cache strategy, and data-structure efficiency, plus observability-led tuning with Prometheus and Grafana, reducing payment timeouts by up to 40% and improving transaction success rate by up to 50 bps.",
            "Reduced AWS infrastructure costs by 35% per month by right-sizing EKS workloads and optimizing cache utilization while maintaining SLA adherence and peak-load performance."
        ]
    },
    {
        company: "Cognizant Technology Solutions",
        role: "Software Engineer",
        period: "Feb 2021 – Jan 2022",
        location: "Hyderabad, India",
        description: [
            "Developed Spring Boot REST APIs for core workflows with authentication and CRUD services backed by MySQL on AWS, reducing response time by 30% and improved p95 latency to ~150 ms through query optimization and efficient in-memory data handling.",
            "Strengthened release engineering by implementing CI/CD pipelines and containerized AWS deployments, reducing deployment duration from ~60 minutes to ~10 minutes and minimizing environment drift and manual deployment failures.",
            "Supported up to 300 internal users across up to 25 workflows by stabilizing service behavior across environments and devices, improving operational reliability for day-to-day execution.",
            "Improved security and reliability by enforcing role-based UI access controls, validating and sanitizing inputs, and implementing secure API patterns, reducing access-related defects by up to 50% and cutting production UI incidents by up to 25%."
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
