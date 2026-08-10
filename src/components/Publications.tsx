import { Section } from './ui/Section';
import { GlassCard } from './ui/GlassCard';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';


export const Publications = () => {
  return (
    <Section id="publications" title="Publications">
      <div className="grid grid-cols-1 gap-8 items-start max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="https://ieeexplore.ieee.org/document/11195049"
            target="_blank"
            rel="noopener noreferrer"
            className="block group focus-visible:ring-2 focus-visible:ring-primary rounded-card-lg outline-none"
          >

            <GlassCard className="p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-[0_0_30px_rgba(255,146,73,0.1)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold shrink-0 border border-primary/20">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                      IEEE CNS 2025
                    </span>
                    <h3 className="font-black text-xl md:text-2xl text-on-surface group-hover:text-primary transition-colors mt-1 leading-snug">
                      Hardware Trojan Detection with Machine Learning and Power Side-Channels: A Post-Deployment Analysis
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start md:self-center text-on-surface-variant group-hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10 shrink-0">
                  <span>IEEE Xplore</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-primary-dim font-medium uppercase tracking-wider">
                  Ashwin Koshy John, Sai Tarrun Pitta, Jaya Dofe, Jai Gopal Pandey
                </p>
                <div className="h-px bg-white/5 w-full" />
                <p className="text-on-surface-variant text-base leading-relaxed">
                  Introduced an optimized methodology for post-deployment detection of dormant hardware Trojans in integrated circuits using machine learning on raw power side-channel traces. By testing on an Artix FPGA running an AES-128 cryptographic core, the approach achieved a 98% Trojan detection accuracy using Random Forest and 97% using KNN classifiers, significantly reducing preprocessing requirements and noise sensitivity.
                </p>
              </div>
            </GlassCard>
          </a>
        </motion.div>
      </div>
    </Section>
  );
};

