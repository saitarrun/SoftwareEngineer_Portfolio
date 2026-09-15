import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { projects, type Project } from '../data/portfolio';

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<React.ElementRef<'a'>>(null);

  // Mouse tracking for magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Track absolute cursor coordinates inside the card for spotlight glow
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Magnetic tilt offsets
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);

    // Spotlight absolute coordinates
    spotX.set(mouseX);
    spotY.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Generate dynamic background style for spotlight overlay
  const spotlightBg = useMotionTemplate`radial-gradient(450px circle at ${spotX}px ${spotY}px, rgba(249, 115, 22, 0.08), transparent 80%)`;

  return (
    <motion.a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View GitHub repository for ${project.title}`}
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
      transition={{ delay: index * 0.08, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
      className="group flex flex-col justify-between p-7 sm:p-10 md:p-12 glass-card transition-all duration-500 h-full relative overflow-hidden group/project cursor-pointer no-underline block"
    >
      {/* Spotlight overlay effect layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover/project:opacity-100 transition-opacity duration-300 z-0"
        style={{ background: spotlightBg }}
      />

      <div className="relative z-10 flex flex-col">
        {/* Giant Number on top left */}
        <span
          style={{ transform: 'translateZ(40px)' }}
          className="text-6xl sm:text-7xl md:text-8xl font-black text-orange-950/40 dark:text-[#3d2a1d] group-hover:text-primary/30 transition-colors duration-500 leading-none mb-10 sm:mb-14 select-none"
          aria-hidden="true"
        >
          {project.num}
        </span>

        {/* Uppercase Dot-Separated Tech Stack */}
        <p
          style={{ transform: 'translateZ(25px)', fontFamily: 'var(--font-label)' }}
          className="text-[#ff7a00] text-[9px] sm:text-[11px] font-extrabold uppercase tracking-[0.25em] mb-3 sm:mb-4 leading-relaxed"
        >
          {project.tech.replace(/·/g, '•')}
        </p>

        {/* Title */}
        <h3
          style={{ transform: 'translateZ(35px)', fontFamily: 'var(--font-display)' }}
          className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight group-hover:text-primary transition-colors duration-300"
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{ transform: 'translateZ(20px)', fontFamily: 'var(--font-body)' }}
          className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed font-normal mb-8 sm:mb-12"
        >
          {project.description}
        </p>
      </div>

      {/* Circular Arrow Button + GitHub Text at bottom */}
      <div
        className="relative z-10 pt-4 flex items-center justify-between"
        style={{ transform: 'translateZ(45px)' }}
      >
        <span className="text-xs font-bold uppercase tracking-widest text-primary/80 group-hover:text-primary transition-colors flex items-center gap-2">
          View Repository{' '}
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1b1713] border border-white/10 flex items-center justify-center text-white/70 group-hover:border-primary/50 group-hover:text-primary group-hover:bg-[#ff7b04]/10 transition-all duration-300 group-hover:scale-105">
          <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-45 transition-transform duration-300" />
        </div>
      </div>
    </motion.a>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-16 md:mb-24"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-7xl font-black text-on-surface tracking-tighter uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Selected Projects
          </h2>
        </motion.div>

        {/* Desktop: 2-3 column grid | Mobile: single column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
