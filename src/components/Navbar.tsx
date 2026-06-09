import { motion } from 'framer-motion';
import { Github, Linkedin, Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';

const CYBER_LABEL = 'CYBER ACCESS GRANTED';
const SCRAMBLE_CHARS = '01#@$%&<>/\\[]{}ZXCVBNMASDFGHJKLQWERTY';
const CYBER_TRANSITION_MS = 1500;
const CYBER_FAILSAFE_MS = 3200;

const navItems = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  {
    label: 'Cybersecurity',
    href: 'https://cybersecurity-portfolio-blush-alpha.vercel.app/',
    external: true,
  },
  { label: 'Contact', href: '#contact' },
];

type NavItem = (typeof navItems)[number];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cyberTransitioning, setCyberTransitioning] = useState(false);
  const [scrambledLabel, setScrambledLabel] = useState(CYBER_LABEL);
  const navigationTimerRef = useRef<number | null>(null);
  const failsafeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (navigationTimerRef.current) window.clearTimeout(navigationTimerRef.current);
      if (failsafeTimerRef.current) window.clearTimeout(failsafeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!cyberTransitioning) return;

    let frame = 0;
    const totalFrames = 28;

    const interval = window.setInterval(() => {
      frame += 1;
      const resolvedCount = Math.floor((frame / totalFrames) * CYBER_LABEL.length);

      setScrambledLabel(
        CYBER_LABEL.split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < resolvedCount) return char;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('')
      );

      if (frame >= totalFrames) {
        window.clearInterval(interval);
        setScrambledLabel(CYBER_LABEL);
      }
    }, 42);

    return () => window.clearInterval(interval);
  }, [cyberTransitioning]);

  const handleNavClick = (event: MouseEvent, item: NavItem) => {
    if (item.label !== 'Cybersecurity') {
      setMenuOpen(false);
      return;
    }

    event.preventDefault();
    if (cyberTransitioning) return;

    setMenuOpen(false);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      window.location.assign(item.href);
      return;
    }

    setScrambledLabel(
      CYBER_LABEL.replace(
        /[A-Z]/g,
        () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      )
    );
    setCyberTransitioning(true);

    navigationTimerRef.current = window.setTimeout(() => {
      window.location.assign(item.href);
    }, CYBER_TRANSITION_MS);

    failsafeTimerRef.current = window.setTimeout(() => {
      window.location.replace(item.href);
      setCyberTransitioning(false);
    }, CYBER_FAILSAFE_MS);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 glass-nav"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div
              className="w-6 sm:w-7 h-6 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
              }}
            >
              <span className="text-black text-[10px] sm:text-xs font-black">S</span>
            </div>
            <div className="flex flex-col leading-none min-w-0">
              <span
                className="font-black text-xs sm:text-base text-white tracking-tight truncate"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Sai Tarrun Pitta
              </span>
              <span
                className="text-[8px] sm:text-[10px] uppercase tracking-widest mt-0.5"
                style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)' }}
              >
                Software Engineer
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={(event) => handleNavClick(event, item)}
                className="text-sm font-medium transition-all duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-orange-500 rounded px-2 py-1 outline-none"
                style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)' }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="https://github.com/saitarrun"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="hidden md:flex hover:text-white focus-visible:ring-2 focus-visible:ring-orange-500 rounded transition-colors outline-none p-2"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/saitarrunpitta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="hidden md:flex hover:text-white focus-visible:ring-2 focus-visible:ring-orange-500 rounded transition-colors outline-none p-2"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="/SaiTarrunPitta_Resume.html" target="_blank" rel="noopener noreferrer">
              <span
                className="px-3 sm:px-5 py-2 text-black text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 hover:shadow-[0_0_15px_#fb7800] focus-visible:ring-2 focus-visible:ring-orange-500 inline-flex items-center outline-none min-h-[44px]"
                style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
                }}
              >
                Resume
              </span>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="md:hidden hover:text-white focus-visible:ring-2 focus-visible:ring-orange-500 rounded transition-colors outline-none p-2 -mr-2"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-6 sm:gap-8 bg-surface/80 backdrop-blur-[20px] border-b border-white/10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="text-sm hover:text-white transition-colors py-2 px-3 -mx-3 rounded focus-visible:ring-2 focus-visible:ring-orange-500 outline-none min-h-[44px] flex items-center"
                style={{ color: 'var(--on-surface-variant)' }}
                onClick={(event) => handleNavClick(event, item)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </motion.nav>

      {cyberTransitioning && (
        <div className="cyber-transition" aria-hidden="true">
          <div className="cyber-transition__distortion" />
          <div className="cyber-transition__grid" />
          <div className="cyber-transition__content">
            <span>SECURE LINK INITIALIZED</span>
            <strong data-text={scrambledLabel}>{scrambledLabel}</strong>
            <div className="cyber-transition__loader" />
          </div>
        </div>
      )}
    </>
  );
};
