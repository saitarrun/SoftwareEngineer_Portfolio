import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
    {
        num: '01',
        title: "LLM-Powered Knowledge Retrieval Platform",
        tech: "LLMs · RAG · Semantic Search · Vector DB",
        description: "Developed a RAG-based application using LLMs, semantic search, and vector retrieval, improving answer relevance by 25% and reducing manual search time by 40%. Optimized retrieval latency through document chunking and vector database indexing, cutting response times by 30%.",
        link: "#"
    },
    {
        num: '02',
        title: "Event-Driven E-Commerce Modernization",
        tech: "Django · FastAPI · Strangler Pattern · Microservices",
        description: "Migrated a Django monolith to FastAPI microservices using the Strangler pattern, demonstrating zero-downtime migration, improved modularity, and scalable service design.",
        link: "#"
    },
];

export const Projects = () => {
    return (
        <section id="projects" className="py-8">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-6 flex items-end justify-between border-b border-white/[0.06] pb-4"
                >
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Projects</h2>
                    </div>
                </motion.div>

                {/* Projects list */}
                <div className="space-y-0">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.07 }}
                            className="group border-b border-white/[0.06] py-8 grid md:grid-cols-[100px_1fr_auto] gap-6 md:gap-10 items-center hover:border-[#F97316]/20 transition-colors duration-300"
                        >
                            {/* Number */}
                            <span className="text-5xl font-black text-[#F97316]/20 group-hover:text-[#F97316]/50 transition-colors duration-300 leading-none">
                                {project.num}
                            </span>

                            {/* Content */}
                            <div>
                                <div className="flex flex-wrap items-center gap-3 mb-1">
                                    <h3 className="text-xl font-black text-white group-hover:text-[#F97316] transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                </div>
                                <p className="text-[#F97316]/50 text-xs font-semibold uppercase tracking-wide mb-2">{project.tech}</p>
                                <p className="text-white/90 text-lg leading-relaxed">{project.description}</p>
                            </div>

                            {/* Arrow link */}
                            {project.link !== '#' && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:border-[#F97316] group-hover:text-[#F97316] group-hover:bg-[#F97316]/10 transition-all duration-300 shrink-0"
                                >
                                    <ArrowUpRight className="w-5 h-5" />
                                </a>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
