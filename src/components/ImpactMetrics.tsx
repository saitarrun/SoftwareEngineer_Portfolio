import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Cpu, Code2, Layers, Server, Sparkles, Database } from 'lucide-react';

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
      num: '15K+',
      label: 'Daily Underwritings',
      detail: 'Automated Loan Processing',
      icon: Server,
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
    <div className="w-full py-6 my-8 border-y border-white/10 bg-zinc-950/60 backdrop-blur-md overflow-hidden relative select-none">
      {/* Side Vignette Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Infinite Seamless Scrolling Track */}
      <motion.div
        className="flex items-center gap-4 sm:gap-6 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedMetrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={`${m.label}-${idx}`}
              className="w-64 sm:w-72 p-4 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-amber-500/40 transition-all duration-300 shrink-0 group hover:bg-zinc-900/80"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {m.num}
                </span>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xs sm:text-sm font-bold text-zinc-200 tracking-wide truncate">
                {m.label}
              </div>
              <div className="text-[11px] text-zinc-500 font-mono leading-tight truncate mt-0.5">
                {m.detail}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
