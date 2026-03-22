import { motion } from 'framer-motion';

const services = [
    {
        num: '01',
        title: 'Programming Languages',
        desc: 'Python, Java, JavaScript, SQL, C++, TypeScript',
        tags: ['Python', 'Java', 'JavaScript', 'SQL', 'C++', 'TypeScript'],
    },
    {
        num: '02',
        title: 'Frontend Development',
        desc: 'React, Next.js, HTML5/CSS3, Tailwind CSS, Material UI',
        tags: ['React', 'Next.js', 'Tailwind CSS', 'Material UI'],
    },
    {
        num: '03',
        title: 'Backend & APIs',
        desc: 'Spring Boot, Node.js, FastAPI, Django, gRPC, GraphQL, REST APIs, Microservices',
        tags: ['Spring Boot', 'Node.js', 'FastAPI', 'gRPC', 'GraphQL'],
    },
    {
        num: '04',
        title: 'Data & Caching',
        desc: 'Redis, PostgreSQL, MongoDB, DynamoDB, Elasticsearch, Kafka, RabbitMQ',
        tags: ['Redis', 'PostgreSQL', 'MongoDB', 'Kafka', 'Elasticsearch'],
    },
    {
        num: '05',
        title: 'Cloud & Infrastructure',
        desc: 'AWS (EC2, Lambda, RDS, S3, DynamoDB, API Gateway), GCP, Azure, Docker, Kubernetes',
        tags: ['AWS', 'GCP', 'Docker', 'Kubernetes'],
    },
    {
        num: '06',
        title: 'DevOps & Observability',
        desc: 'Terraform, Jenkins, GitHub Actions, Prometheus, Grafana, Splunk',
        tags: ['Terraform', 'GitHub Actions', 'Prometheus', 'Grafana', 'Splunk'],
    },
    {
        num: '07',
        title: 'Machine Learning & AI',
        desc: 'TensorFlow, PyTorch, Langchain, LLMs (GPT-4, Claude), RAG Systems, Feature Engineering',
        tags: ['TensorFlow', 'PyTorch', 'Langchain', 'LLMs', 'RAG'],
    },
    {
        num: '08',
        title: 'Testing & Quality Assurance',
        desc: 'Pytest, Selenium, Performance Testing, Performance Optimization, Postman, Debugging',
        tags: ['Pytest', 'Selenium', 'Postman', 'Performance Testing'],
    },
    {
        num: '09',
        title: 'Compliance & Security',
        desc: 'SOC 2, Role-Based Access Control (RBAC), ISO 27001, OAuth 2.0, JWT, OWASP',
        tags: ['SOC 2', 'RBAC', 'OAuth 2.0', 'JWT', 'OWASP'],
    },
];

export const Skills = () => {
    return (
        <section id="skills" className="py-8">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-6 flex items-end justify-between border-b border-white/[0.06] pb-4"
                >
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Expertise</h2>
                    </div>
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
                                <p className="text-white/90 text-lg leading-relaxed">{svc.desc}</p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 max-w-[200px] justify-end">
                                {svc.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-2.5 py-1 text-xs text-white/80 border border-white/[0.08] rounded-full bg-white/[0.03] group-hover:border-[#F97316]/30 group-hover:text-white/80 transition-all duration-300"
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
