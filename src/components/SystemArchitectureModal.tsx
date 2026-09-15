import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Server, Database, Sparkles, Layers, ArrowRight, Activity } from 'lucide-react';

export const SystemArchitectureModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNode, setActiveNode] = useState<'frontend' | 'gateway' | 'ai' | 'vector' | 'cloud'>(
    'ai'
  );

  const nodes = [
    {
      id: 'frontend',
      title: 'React / Next.js Client',
      role: 'Presentation Layer',
      icon: Cpu,
      tech: ['TypeScript', 'Framer Motion', 'Tailwind', 'Lenis Smooth Scroll'],
      desc: 'Blazing fast, accessible UI with server-side generation, instant edge hydration, and glassmorphic micro-interactions.',
    },
    {
      id: 'gateway',
      title: 'API Gateway & Rate Limiter',
      role: 'Security & Traffic Routing',
      icon: Server,
      tech: ['Vercel Edge Functions', 'Express.js', 'JWT', 'Rate Limiting'],
      desc: 'Protects backend resources against abuse with IP-based bucket rate-limiting and secure CORS headers.',
    },
    {
      id: 'ai',
      title: 'Gemini LLM & RAG Engine',
      role: 'AI Intelligence Core',
      icon: Sparkles,
      tech: ['Google Gemini API', 'LangChain', 'Custom Prompt Engineering'],
      desc: 'Context-aware conversational intelligence retrieving structured portfolio knowledge in real-time streaming tokens.',
    },
    {
      id: 'vector',
      title: 'FAISS Vector Database',
      role: 'Semantic Knowledge Search',
      icon: Database,
      tech: ['FAISS Index', 'Sentence Transformers', 'Cosine Similarity'],
      desc: 'Sub-millisecond high-dimensional vector search matching recruiter queries with Tarrun’s exact engineering skills.',
    },
    {
      id: 'cloud',
      title: 'Distributed Cloud & Microservices',
      role: 'Infra & Orchestration',
      icon: Layers,
      tech: ['AWS EC2/S3', 'Docker', 'Kubernetes', 'CI/CD Pipelines'],
      desc: 'Resilient microservices architecture with containerized deployment and zero-downtime automated workflows.',
    },
  ];

  return (
    <>
      {/* Trigger Pill Button in Hero/Skills */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 hover:border-amber-500 text-amber-400 hover:bg-amber-500/20 transition-all text-xs font-bold uppercase tracking-wider outline-none cursor-pointer group shadow-[0_0_15px_rgba(245,158,11,0.15)]"
      >
        <Activity className="w-4 h-4 animate-pulse" />
        <span>View System Architecture</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden text-left"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-1">
                    System Architecture & Design
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Tarrun’s Microservices & AI Stack
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white bg-white/5 rounded-full border border-white/10"
                >
                  Close [ESC]
                </button>
              </div>

              {/* Node Graph Selector Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
                {nodes.map((node) => {
                  const Icon = node.icon;
                  const isSelected = activeNode === node.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveNode(node.id as typeof activeNode)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                          : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 mb-2 ${isSelected ? 'text-amber-400' : 'text-zinc-400'}`}
                      />
                      <span className="text-xs font-bold leading-snug line-clamp-2">
                        {node.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Node Detail Box */}
              {(() => {
                const current = nodes.find((n) => n.id === activeNode)!;
                const Icon = current.icon;
                return (
                  <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white leading-tight">
                          {current.title}
                        </h4>
                        <span className="text-xs text-amber-400 font-mono">{current.role}</span>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">{current.desc}</p>
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                      {current.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
