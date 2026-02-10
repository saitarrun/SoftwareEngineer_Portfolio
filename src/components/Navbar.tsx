import { motion } from 'framer-motion';
import { Linkedin, Github } from 'lucide-react';

export const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-lg border-b border-white/20 shadow-sm transition-all duration-200"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo / Name */}
                <div className="flex flex-col">
                    <span className="font-bold text-xl tracking-tight text-[#1d1d1f] transition-colors">Sai Tarrun Pitta</span>
                    <span className="text-xs uppercase tracking-widest text-[#6e6e73] transition-colors">Software Engineer</span>
                </div>

                {/* Navigation Links & Socials */}
                <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-6">
                        <a href="#experience" className="text-sm font-medium text-[#1d1d1f] hover:text-[#06c] transition-colors">Experience</a>
                        <a href="#projects" className="text-sm font-medium text-[#1d1d1f] hover:text-[#06c] transition-colors">Projects</a>
                        <a href="#publications" className="text-sm font-medium text-[#1d1d1f] hover:text-[#06c] transition-colors">Publications</a>
                        <a href="#contact" className="text-sm font-medium text-[#1d1d1f] hover:text-[#06c] transition-colors">Contact</a>
                    </div>

                    <div className="w-px h-6 bg-black/10 hidden md:block transition-colors"></div>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/saitarrun"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1d1d1f] hover:text-[#06c] hover:scale-105 transition-all duration-200"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://linkedin.com/in/saitarrunpitta"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1d1d1f] hover:text-[#0077b5] hover:scale-105 transition-all duration-200"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>

                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hidden md:block">
                        <span className="px-4 py-2 bg-[#06c] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#0077ed] transition-all duration-200">
                            Resume
                        </span>
                    </a>
                </div>
            </div>
        </motion.nav >
    );
};
