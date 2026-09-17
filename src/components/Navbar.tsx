import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, Menu, X, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { MagneticElement } from './MagneticElement';

interface NavbarProps {
  onOpenResume?: () => void;
  onOpenCommandPalette?: () => void;
}

export const Navbar = ({ onOpenResume, onOpenCommandPalette }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollYProgress } = useScroll();

  const navItems = [
    'About',
    'Experience',
    'Education',
    'Projects',
    'Skills',
    'Publications',
    'Contact',
  ];

  // Scroll spy active section tracker logic with RAF throttling to prevent layout thrashing
  useEffect(() => {
    let ticking = false;
    const sections = [
      'hero',
      'experience',
      'education',
      'projects',
      'skills',
      'publications',
      'contact',
    ];

    const updateActiveSection = () => {
      const triggerPoint = 200;
      let currentSection = 'hero';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
          currentSection = sectionId;
          break;
        }
      }

      setActiveSection(currentSection === 'hero' ? 'about' : currentSection);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateActiveSection();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Frosted Glassmorphic background layer */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'rgba(12, 12, 12, 0.65)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37), inset 0 -1px 0 rgba(255, 255, 255, 0.05)',
        }}
      />

      {/* Sleek Scroll-driven Reading Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-600 via-primary to-amber-300 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
            }}
          >
            <span className="text-black text-xs font-black">T</span>
          </div>
          <div className="flex flex-col leading-none shrink-0">
            <span
              className="font-black text-sm sm:text-base text-white tracking-tight whitespace-nowrap shrink-0"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Tarrun Pitta
            </span>
            <span
              className="text-[9px] uppercase tracking-widest mt-0.5 whitespace-nowrap"
              style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)' }}
            >
              Software Engineer
            </span>
          </div>
        </div>

        {/* Desktop Nav - Absolutely Centered */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-3 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => {
            const isCurrent = activeSection === item.toLowerCase();
            return (
              <MagneticElement key={item}>
                <a
                  href={item.toLowerCase() === 'about' ? '#hero' : `#${item.toLowerCase()}`}
                  className={`text-xs xl:text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-orange-500 rounded-full px-3 py-1.5 outline-none relative whitespace-nowrap`}
                  style={{
                    color: isCurrent ? 'var(--primary)' : 'var(--on-surface-variant)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {item}
                  {isCurrent && (
                    <>
                      {/* Active underline indicator with glowing drop shadow */}
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full z-10 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                        transition={{ type: 'spring', stiffness: 140, damping: 20, mass: 0.5 }}
                      />
                      {/* Ambient background glow */}
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute inset-0 bg-primary/10 blur-[4px] rounded-lg -z-10 border border-primary/20"
                        transition={{ type: 'spring', stiffness: 140, damping: 20, mass: 0.5 }}
                      />
                    </>
                  )}
                </a>
              </MagneticElement>
            );
          })}
        </div>

        {/* Right: search + socials + resume */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            aria-label="Open Spotlight Search"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-amber-500/40 hover:bg-white/10 text-zinc-400 hover:text-white transition-all text-xs outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline text-zinc-300">Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-zinc-400 bg-black/40 rounded border border-white/10 font-mono">
              ⌘K
            </kbd>
          </button>

          <a
            href="https://github.com/saitarrun"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hidden md:flex hover:text-orange-400 focus-visible:ring-2 focus-visible:ring-orange-500 rounded transition-colors duration-200 outline-none p-1.5"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/tarrunpitta"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="hidden md:flex hover:text-orange-400 focus-visible:ring-2 focus-visible:ring-orange-500 rounded transition-colors duration-200 outline-none p-1.5"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {onOpenResume ? (
            <button
              type="button"
              onClick={onOpenResume}
              aria-label="Open Resume Viewer"
              className="outline-none"
            >
              <span className="px-3.5 py-1.5 text-xs font-semibold rounded-full border border-orange-500/40 bg-orange-500/10 text-orange-400 hover:bg-orange-500 hover:text-black transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm shadow-orange-500/10">
                Resume
              </span>
            </button>
          ) : (
            <a
              href="/TarrunPitta_SoftwareEngineer_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="px-3.5 py-1.5 text-xs font-semibold rounded-full border border-orange-500/40 bg-orange-500/10 text-orange-400 hover:bg-orange-500 hover:text-black transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm shadow-orange-500/10">
                Resume
              </span>
            </a>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="md:hidden hover:text-white focus-visible:ring-2 focus-visible:ring-orange-500 rounded transition-colors outline-none w-11 h-11 -mr-2 flex items-center justify-center cursor-pointer"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5 text-white" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu drawer with smooth spring animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-4 sm:gap-6 border-b border-white/10 overflow-hidden"
            style={{
              background: 'rgba(12, 12, 12, 0.94)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            }}
          >
            {[
              'About',
              'Experience',
              'Education',
              'Projects',
              'Skills',
              'Publications',
              'Contact',
            ].map((item) => (
              <a
                key={item}
                href={item.toLowerCase() === 'about' ? '#hero' : `#${item.toLowerCase()}`}
                className="text-sm font-medium hover:text-white transition-colors duration-200 py-2 px-3 -mx-3 rounded focus-visible:ring-2 focus-visible:ring-orange-500 outline-none min-h-[44px] flex items-center"
                style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)' }}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                if (onOpenResume) onOpenResume();
                else window.open('/TarrunPitta_SoftwareEngineer_Resume.pdf', '_blank');
              }}
              className="text-sm font-bold text-primary hover:text-primary-dim transition-colors py-2 px-3 -mx-3 rounded flex items-center gap-2 min-h-[44px] text-left"
            >
              <span>📄 View Resume PDF</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
