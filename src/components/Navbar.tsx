import { motion } from 'framer-motion';
import { Linkedin, Github, Menu } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-50 glass-nav"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-container))' }}>
                        <span className="text-black text-xs font-black">S</span>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="font-black text-base text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Sai Tarrun Pitta</span>
                        <span className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)' }}>Software Engineer</span>
                    </div>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {['Experience', 'Projects', 'Skills', 'Contact'].map(item => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium transition-all duration-200 hover:text-white" style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)' }}>
                            {item}
                        </a>
                    ))}
                </div>

                {/* Right: socials + resume */}
                <div className="flex items-center gap-4">
                    <a href="https://github.com/saitarrun" target="_blank" rel="noopener noreferrer"
                        className="hidden md:flex hover:text-white transition-colors" style={{ color: 'var(--on-surface-variant)' }}>
                        <Github className="w-4 h-4" />
                    </a>
                    <a href="https://linkedin.com/in/saitarrunpitta" target="_blank" rel="noopener noreferrer"
                        className="hidden md:flex hover:text-white transition-colors" style={{ color: 'var(--on-surface-variant)' }}>
                        <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                        <span className="px-5 py-2 text-black text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 hover:shadow-[0_0_15px_#fb7800]" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-container))' }}>
                            Resume
                        </span>
                    </a>
                    <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden hover:text-white" style={{ color: 'var(--on-surface-variant)' }}>
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden px-6 py-10 flex flex-col gap-8 bg-surface/80 backdrop-blur-[20px] border-b border-white/10">
                    {['Experience', 'Projects', 'Skills', 'Contact'].map(item => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="text-sm hover:text-white transition-colors" style={{ color: 'var(--on-surface-variant)' }} onClick={() => setMenuOpen(false)}>
                            {item}
                        </a>
                    ))}
                </div>
            )}
        </motion.nav>
    );
};
