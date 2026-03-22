import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
    {
        num: '01',
        title: "LLM-Powered Knowledge Retrieval Platform",
        tech: "LLMs · RAG · Vector DB · Semantic Search",
        description: "A high-performance RAG platform built with premium UI, semantic search indexing, and real-time feedback cycles. Optimized for retrieval accuracy and low-latency document processing.",
        link: "https://github.com/saitarrun/LLM-Powered-Knowledge-Retrieval-Platform"
    },
    {
        num: '02',
        title: "Brain Tumor Prediction & Big Data Pipeline",
        tech: "TensorFlow · Apache Spark · GCP · OpenCV",
        description: "An end-to-end distributed ML pipeline for MRI scan classification. Leverages big data processing with Spark and cloud-native inference on GCP to achieve clinical-grade tumor detection.",
        link: "https://github.com/saitarrun/Brain-Tumor-Prediction-Using-Machine-Learning-and-Big-Data"
    },
    {
        num: '03',
        title: "Serverless Deployment Platform",
        tech: "AWS · Docker · Kafka · PostgreSQL · Redis",
        description: "Scalable, self-hosted deployment engine inspired by Vercel. Features real-time log collection with Kafka, persistent analytics with ClickHouse, and containerized orchestration via AWS ECS.",
        link: "https://github.com/saitarrun/Serverless-Deployment-Platform"
    },
    {
        num: '04',
        title: "Monolith to Microservices Migration",
        tech: "Node.js · FastAPI · Redis · System Design",
        description: "Architectural transformation of a legacy monolith into a modern, event-driven microservices ecosystem. Implements the Strangler pattern for zero-downtime migration and high scalability.",
        link: "https://github.com/saitarrun/Monolith-to-microservices"
    },
];

export const Projects = () => {
    return (
        <section id="projects" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-5xl md:text-8xl font-black text-on-surface tracking-tighter uppercase" style={{ fontFamily: 'var(--font-display)' }}>Selected Projects</h2>
                </motion.div>
 
                {/* Projects list */}
                <div className="flex flex-col gap-24">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
                            className={`group grid md:grid-cols-[120px_1fr_auto] gap-8 md:gap-20 items-center p-10 md:p-14 rounded-[2.5rem] transition-all duration-700 bg-surface-container-low/40 hover:bg-surface-container-low ghost-border w-full md:max-w-[90%] lg:max-w-[85%] ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}
                        >
                            {/* Number */}
                            <span className="text-6xl md:text-8xl font-black text-primary/10 group-hover:text-primary/30 transition-colors duration-500 leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                                {project.num}
                            </span>
 
                            {/* Content */}
                            <div>
                                <p className="text-primary-dim text-[10px] font-bold uppercase tracking-[0.4em] mb-4" style={{ fontFamily: 'var(--font-label)' }}>{project.tech}</p>
                                <h3 className="text-3xl md:text-5xl font-black text-on-surface mb-6 transition-all duration-500 group-hover:translate-x-2" style={{ fontFamily: 'var(--font-display)' }}>
                                    <span className="group-hover:text-gradient leading-[1.1] inline-block">{project.title}</span>
                                </h3>
                                <p className="text-on-surface-variant text-xl leading-relaxed max-w-2xl" style={{ fontFamily: 'var(--font-body)' }}>{project.description}</p>
                            </div>
 
                            {/* Arrow link */}
                            <div className="md:pl-8">
                                <a
                                    href={project.link}
                                    className="w-20 h-20 rounded-full ghost-border flex items-center justify-center text-on-surface-variant group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 transition-all duration-500 group-hover:rotate-45"
                                >
                                    <ArrowUpRight className="w-10 h-10" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
