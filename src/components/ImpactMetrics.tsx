import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Cpu, Code2 } from 'lucide-react';

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
  ];

  return (
    <div className="w-full py-6 sm:py-8 my-8 border-y border-white/10 bg-white/[0.015] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col space-y-1.5 p-4 rounded-2xl bg-zinc-950/60 border border-white/5 hover:border-amber-500/30 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {m.num}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-zinc-200 tracking-wide">
                  {m.label}
                </span>
                <span className="text-[11px] text-zinc-500 font-mono leading-tight">
                  {m.detail}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
