import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
    {
        num: '01',
        title: "Serverless Deployment Platform",
        tech: "TypeScript · AWS · Docker",
        description: "A scalable, self-hosted deployment platform inspired by Vercel. Automates builds and deployments with integrated analytics.",
        link: "https://github.com/saitarrun/Serverless-Deployment-Platform"
    },
    {
        num: '02',
        title: "Malicious URL Detection",
        tech: "Python · Machine Learning · NLP",
        description: "Intelligent cybersecurity tool that leverages ML and NLP to automatically identify and classify phishing & malicious URLs.",
        link: "https://github.com/saitarrun/Malicious-URL-Detection-Application"
    },
    {
        num: '03',
        title: "Patient Outreach Platform",
        tech: "React · Node.js · AWS",
        description: "Multi-tenant patient outreach platform on AWS; reduced no-shows by up to 25% through automated appointment reminders.",
        link: "https://github.com/saitarrun/patient-outreach-platform"
    },
    {
        num: '04',
        title: "HumanEdge AI",
        tech: "AI/LLM · React · Python",
        description: "Advanced AI-to-human text refinement platform offering tone and clarity control for professional communication.",
        link: "https://github.com/saitarrun/HumanEdge-AI-Application"
    },
    {
        num: '05',
        title: "Brain Tumor Prediction",
        tech: "TensorFlow · Spark · GCP",
        description: "Cloud-based ML pipeline for detecting brain tumors from MRI scans using big data processing for high-accuracy predictions.",
        link: "https://github.com/saitarrun/Brain-Tumor-Prediction-Using-Machine-Learning-and-Big-Data"
    },
    {
        num: '06',
        title: "Zero-Downtime Migration",
        tech: "Python · Node.js · AWS EKS · Kafka",
        description: "Migration of a legacy monolith to microservices on AWS EKS using the Strangler pattern, enabling zero-downtime cutover.",
        link: "#"
    }
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
                    className="mb-16 flex items-end justify-between border-b border-white/[0.06] pb-8"
                >
                    <div>
                        <p className="text-[#F97316] text-xs font-bold uppercase tracking-widest mb-2">Selected Work</p>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Projects</h2>
                    </div>
                    <span className="hidden md:block text-white/10 text-8xl font-black select-none">PRJ</span>
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
                                <p className="text-white/70 text-sm leading-relaxed">{project.description}</p>
                            </div>

                            {/* Arrow link */}
                            {project.link !== '#' && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:border-[#F97316] group-hover:text-[#F97316] group-hover:bg-[#F97316]/10 transition-all duration-300 shrink-0"
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
