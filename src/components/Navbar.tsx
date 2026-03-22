import { motion } from 'framer-motion';
import { Linkedin, Github, Menu } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
            style={{
                background: 'rgba(10, 15, 30, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#F97316] flex items-center justify-center">
                        <span className="text-white text-xs font-black">S</span>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="font-black text-base text-white tracking-tight">Sai Tarrun Pitta</span>
                        <span className="text-[10px] uppercase tracking-widest text-white/30 mt-0.5">Software Engineer</span>
                    </div>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#experience" className="text-sm font-medium text-white/50 hover:text-white transition-colors">Experience</a>
                    <a href="#projects" className="text-sm font-medium text-white/50 hover:text-white transition-colors">Projects</a>
                    <a href="#skills" className="text-sm font-medium text-white/50 hover:text-white transition-colors">Skills</a>
                    <a href="#contact" className="text-sm font-medium text-white/50 hover:text-white transition-colors">Contact</a>
                </div>

                {/* Right: socials + resume */}
                <div className="flex items-center gap-4">
                    <a href="https://github.com/saitarrun" target="_blank" rel="noopener noreferrer"
                        className="hidden md:flex text-white/40 hover:text-white transition-colors">
                        <Github className="w-4 h-4" />
                    </a>
                    <a href="https://linkedin.com/in/saitarrunpitta" target="_blank" rel="noopener noreferrer"
                        className="hidden md:flex text-white/40 hover:text-white transition-colors">
                        <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                        <span className="px-4 py-2 bg-[#F97316] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#FB923C] transition-all duration-200">
                            Resume
                        </span>
                    </a>
                    <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white/60 hover:text-white">
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-white/[0.06] px-6 py-4 flex flex-col gap-4" style={{ background: 'rgba(10,15,30,0.95)' }}>
                    <a href="#experience" className="text-sm text-white/60 hover:text-white" onClick={() => setMenuOpen(false)}>Experience</a>
                    <a href="#projects" className="text-sm text-white/60 hover:text-white" onClick={() => setMenuOpen(false)}>Projects</a>
                    <a href="#skills" className="text-sm text-white/60 hover:text-white" onClick={() => setMenuOpen(false)}>Skills</a>
                    <a href="#contact" className="text-sm text-white/60 hover:text-white" onClick={() => setMenuOpen(false)}>Contact</a>
                </div>
            )}
        </motion.nav>
    );
};
