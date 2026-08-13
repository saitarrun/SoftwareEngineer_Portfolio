import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  title?: string;
}

export const Section = ({ children, id, className = '', title }: SectionProps) => {
  return (
    <section id={id} className={`py-20 ${className}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-24 text-left text-on-surface tracking-tighter uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </motion.h2>
        )}
        {children}
      </div>
    </section>
  );
};
