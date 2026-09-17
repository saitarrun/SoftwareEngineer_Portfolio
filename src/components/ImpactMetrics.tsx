import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Cpu, Code2, Layers, Sparkles, Database } from 'lucide-react';

export const ImpactMetrics = () => {
  const metrics = [
    {
      num: '10K+',
      label: 'Production AI Queries',
      detail: 'FAISS & Gemini RAG pipelines',
      icon: Zap,
    },
    {
      num: '99.9%',
      label: 'Microservice Reliability',
      detail: 'AWS Cloud & Docker architecture',
      icon: ShieldCheck,
    },
    {
      num: '35%',
      label: 'Latency Reduction',
      detail: 'Async queue & DB optimization',
      icon: Cpu,
    },
    {
      num: '3+ YRS',
      label: 'Enterprise Engineering',
      detail: 'Full-stack & Distributed Systems',
      icon: Code2,
    },
    {
      num: '400K+',
      label: 'Lines Code Base RAG',
      detail: 'Vectorized Semantic Search',
      icon: Database,
    },
    {
      num: '98%',
      label: 'RAG Retrieval Accuracy',
      detail: 'LLM Contextual Grounding',
      icon: Sparkles,
    },
    {
      num: '250ms',
      label: 'Sync Latency SLO',
      detail: 'High-throughput API endpoints',
      icon: Layers,
    },
  ];

  // Duplicate array to enable seamless infinite continuous scroll loop
  const duplicatedMetrics = [...metrics, ...metrics];

  return (
    <div className="w-full py-4 my-6 border-y border-white/[0.08] bg-black/40 backdrop-blur-xl overflow-hidden relative select-none">
      {/* Side Vignette Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

      {/* Infinite Seamless Scrolling Track */}
      <motion.div
        className="flex items-center gap-3 sm:gap-4 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedMetrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={`${m.label}-${idx}`}
              className="w-48 sm:w-56 px-3.5 py-2.5 rounded-xl bg-zinc-950/70 border border-white/[0.08] hover:border-amber-500/30 transition-all duration-300 shrink-0 group hover:bg-zinc-900/60"
              style={{
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {m.num}
                </span>
                <div className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-zinc-300 tracking-wide truncate">
                {m.label}
              </div>
              <div className="text-[10px] text-zinc-500 font-mono leading-tight truncate mt-0.5">
                {m.detail}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
