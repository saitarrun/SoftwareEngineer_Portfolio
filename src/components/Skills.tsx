import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';

const skills = {
    "Languages": ["Java (Multithreading, Spring Boot)", "Python (FastAPI, Django)", "SQL", "JavaScript (Node.js/React)"],
    "Databases": ["PostgreSQL (Performance Tuning)", "Redis (Caching)", "DynamoDB", "Schema Design"],
    "Systems": ["Microservices", "gRPC", "Event-Driven Design", "High Availability", "Load Balancing", "CAP Theorem"],
    "Cloud & DevOps": ["AWS (EKS, RDS, S3)", "Kubernetes", "Docker", "Terraform (IaC)", "Kafka", "GitHub Actions"],
    "Security & SRE": ["RBAC", "OWASP", "Threat Modeling", "Prometheus", "Splunk", "SLOs/SLIs", "Distributed Tracing"]
};

export const Skills = () => {
    return (
        <Section id="skills" title="Expertise">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(skills).map(([category, items], index) => (
                    <GlassCard key={index} className="p-6">
                        <h3 className="text-lg font-bold mb-4 text-slate-900 border-b border-slate-100 pb-2">
                            {category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {items.map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-800 hover:bg-slate-200 transition-colors cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </GlassCard>
                ))}
            </div>
        </Section>
    );
};
