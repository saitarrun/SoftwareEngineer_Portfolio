import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { Github, ArrowUpRight } from 'lucide-react';
import { ShinyButton } from './ui/ShinyButton';

const projects = [
    {
        title: "Serverless Deployment Platform",
        tech: "TypeScript, AWS, Docker",
        description: "A scalable, self-hosted deployment platform inspired by Vercel. Automates builds and deployments with integrated analytics.",
        link: "https://github.com/saitarrun/Serverless-Deployment-Platform"
    },
    {
        title: "Malicious URL Detection",
        tech: "Python, Machine Learning, NLP",
        description: "Intelligent cybersecurity tool that leverages ML and NLP to automatically identify and classify phishing & malicious URLs.",
        link: "https://github.com/saitarrun/Malicious-URL-Detection-Application"
    },
    {
        title: "Patient Outreach Platform",
        tech: "React, Node.js, AWS",
        description: "Built a multi-tenant patient outreach platform on AWS using React and Node.js; reduced no-shows by up to 25% through automated, configurable appointment reminders.",
        link: "https://github.com/saitarrun/patient-outreach-platform"
    },
    {
        title: "HumanEdge AI",
        tech: "AI/LLM, React, Python",
        description: "Advanced AI-to-human text refinement platform offering tone and clarity control for professional communication.",
        link: "https://github.com/saitarrun/HumanEdge-AI-Application"
    },
    {
        title: "Brain Tumor Prediction",
        tech: "TensorFlow, Spark, GCP",
        description: "Cloud-based ML pipeline for detecting brain tumors from MRI scans. Leverages big data processing for high-accuracy predictions.",
        link: "https://github.com/saitarrun/Brain-Tumor-Prediction-Using-Machine-Learning-and-Big-Data"
    },
    {
        title: "Zero-Downtime Migration",
        tech: "Python, Node.js, AWS EKS, Kafka",
        description: "Led the migration of a legacy monolith to microservices on AWS EKS using the Strangler pattern, enabling zero-downtime cutover.",
        link: "#"
    }
];

export const Projects = () => {
    return (
        <Section id="projects" title="Projects">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <GlassCard key={index} className="flex flex-col h-full group p-8 hover:shadow-md transition-all duration-300">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-xs font-medium text-slate-700 mt-1 uppercase tracking-wider">{project.tech}</p>
                            </div>
                            {project.link !== "#" && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-slate-600 group-hover:text-slate-900 transition-colors">
                                    <ArrowUpRight className="w-5 h-5" />
                                </a>
                            )}
                        </div>

                        <p className="text-slate-800 text-sm leading-relaxed mb-6 flex-grow">
                            {project.description}
                        </p>

                        <div className="mt-auto">
                            {project.link !== "#" && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                    <ShinyButton variant="secondary" className="w-full text-xs py-2">
                                        <Github className="w-4 h-4" /> View Source
                                    </ShinyButton>
                                </a>
                            )}
                        </div>
                    </GlassCard>
                ))}
            </div>
        </Section>
    );
};
