import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowRight, Shield, Copy, Check } from 'lucide-react';
import { useRef, useState } from 'react';
import { MagneticElement } from './MagneticElement';

export const Contact = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Mouse tracking for magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText('saitarrunpitta@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Clipboard fallback
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* CTA Block with 3D Tilt */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-card-lg overflow-hidden mb-24 p-12 md:p-16 glass-card group transition-all duration-700 hover:border-primary/40 hover:shadow-card-hover"

        >
          <div className="relative z-10 grid lg:grid-cols-2 gap-24 items-center">
            <div style={{ transform: 'translateZ(40px)' }}>
              <span
                className="text-primary font-bold uppercase tracking-[0.4em] mb-6 block"
                style={{ fontFamily: 'var(--font-label)' }}
              >
                Available for projects
              </span>
              <h2
                className="text-3xl sm:text-5xl md:text-8xl font-black text-on-surface leading-[0.9] tracking-tighter uppercase mb-8"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Let's architect <br />
                <span className="text-gradient">the future.</span>
              </h2>
              <p
                className="text-sm sm:text-base md:text-xl text-on-surface-variant leading-relaxed max-w-md"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Currently looking for Software Engineer roles where I can build high-performance
                distributed systems, cybersecurity solutions, and AI-powered platforms.
              </p>
            </div>

            <div className="flex flex-col gap-10 items-center w-full max-w-sm justify-self-center lg:justify-self-end">
              {/* Email row - matches social row width */}
              <div className="flex flex-row gap-4 items-center justify-between w-full">
                <MagneticElement className="flex-1">
                  <a
                    href="mailto:saitarrunpitta@gmail.com"
                    className="flex items-center justify-center gap-2 sm:gap-4 px-6 h-12 bg-primary text-on-primary font-black uppercase tracking-widest rounded-2xl hover:bg-primary-fixed hover:neon-glow transition-all duration-500 hover:-translate-y-1 group/btn w-full text-xs sm:text-sm shadow-[0_20px_40px_rgba(255,123,4,0.3)] focus-visible:ring-2 focus-visible:ring-white outline-none"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>saitarrunpitta@gmail.com</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform flex-shrink-0" />

                  </a>
                </MagneticElement>

                <MagneticElement>
                  <button
                    onClick={handleCopyEmail}
                    title="Copy email to clipboard"
                    className="w-12 h-12 rounded-2xl bg-surface-container-highest/60 backdrop-blur-md flex items-center justify-center border border-white/05 hover:border-primary/50 hover:text-primary transition-all duration-300 shadow-xl focus-visible:ring-2 focus-visible:ring-primary outline-none text-on-surface-variant relative overflow-hidden shrink-0"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.7, opacity: 0 }}
                          className="flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-emerald-500" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.7, opacity: 0 }}
                          className="flex items-center justify-center"
                        >
                          <Copy className="w-4 h-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </MagneticElement>
              </div>


                {/* Socials row - spans exact same max-width end to end */}
                <div className="flex flex-row justify-between w-full gap-4">
                  {[
                    {
                      icon: <Github className="w-6 h-6" />,
                      label: 'GitHub',
                      href: 'https://github.com/saitarrun',
                    },
                    {
                      icon: <Linkedin className="w-6 h-6" />,
                      label: 'LinkedIn',
                      href: 'https://linkedin.com/in/saitarrun',
                    },
                    {
                      icon: <Shield className="w-6 h-6" />,
                      label: 'TryHackMe',
                      href: 'https://tryhackme.com/p/TarrunXploit404',
                    },
                  ].map((social, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 group/social-wrapper flex-1">
                      <MagneticElement className="w-full">
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="w-full h-12 sm:h-14 rounded-2xl bg-surface-container-highest/60 backdrop-blur-md flex items-center justify-center border border-white/05 hover:border-primary/50 hover:text-primary transition-all duration-300 group/social shadow-xl focus-visible:ring-2 focus-visible:ring-primary outline-none"
                        >
                          {social.icon}
                        </a>
                      </MagneticElement>
                      <span
                        className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40 group-hover/social-wrapper:text-primary transition-colors duration-300 text-center"
                        style={{ fontFamily: 'var(--font-label)' }}
                      >
                        {social.label}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

          </div>

          {/* Visual Flare */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-700" />
        </motion.div>

        {/* Footer Metadata */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/05">
          <div className="flex items-center gap-10">
            <div className="flex flex-col">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/40 mb-1"
                style={{ fontFamily: 'var(--font-label)' }}
              >
                Engineered By
              </span>
              <span className="text-on-surface-variant font-medium text-xs text-center md:text-left">
                Tarun Pitta
              </span>
            </div>
          </div>
          <p
            className="text-on-surface-variant/40 text-[10px] uppercase tracking-[0.2em] font-medium"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            © 2026 / CSU Fullerton MSCS
          </p>
        </div>
      </div>
    </section>
  );
};
