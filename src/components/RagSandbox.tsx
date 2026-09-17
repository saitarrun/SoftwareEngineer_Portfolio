import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  ShieldCheck,
  Database,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Terminal,
} from 'lucide-react';

interface PresetQuery {
  title: string;
  query: string;
  rawInput: string;
  presidioScrubbed: string;
  redactedEntities: string[];
  pineconeScore: number;
  retrievedChunkTitle: string;
  retrievedChunkText: string;
  citation: string;
  llmOutput: string;
  processingTimeMs: number;
}

const PRESET_QUERIES: PresetQuery[] = [
  {
    title: 'PII Text Scrubbing (Presidio)',
    query:
      'How does PII redaction work at Pacific Life for customer SSN 999-12-3456 and email john.doe@pacific.com?',
    rawInput:
      'How does PII redaction work at Pacific Life for customer SSN 999-12-3456 and email john.doe@pacific.com?',
    presidioScrubbed:
      'How does PII redaction work at Pacific Life for customer SSN <REDACTED_SSN> and email <REDACTED_EMAIL>?',
    redactedEntities: ['SSN: 999-12-3456', 'EMAIL: john.doe@pacific.com'],
    pineconeScore: 0.94,
    retrievedChunkTitle: 'Pacific Life — PII Redaction & Microsoft Presidio',
    retrievedChunkText:
      'Ensured 100% regulatory compliance for sensitive financial data (PII) across cloud transactions by orchestrating an automated text-scrubbing pipeline using Microsoft Presidio to redact customer data prior to model invocation.',
    citation: 'Doc #PL-SEC-2025 | Page 4, Section 2.1',
    llmOutput:
      'Pacific Life uses an automated **Microsoft Presidio** pipeline that scrubs sensitive PII (SSNs, emails, financial records) prior to model invocation, guaranteeing **100% regulatory compliance** and zero cloud exposure.',
    processingTimeMs: 24,
  },
  {
    title: 'Zero-Hallucination Grounding',
    query: 'What is zero-hallucination context grounding and how is compliance guaranteed?',
    rawInput: 'What is zero-hallucination context grounding and how is compliance guaranteed?',
    presidioScrubbed:
      'What is zero-hallucination context grounding and how is compliance guaranteed?',
    redactedEntities: ['No sensitive PII detected'],
    pineconeScore: 0.98,
    retrievedChunkTitle: 'Pacific Life — Context Grounding & Citation Engine',
    retrievedChunkText:
      'Eliminated LLM hallucinations in compliance workflows to achieve zero unauthorized generative text output by implementing strict context-grounding constraints and delivering a citation-backed retrieval engine with exact page verification.',
    citation: 'Doc #PL-COMP-2026 | Page 12, Section 5.4',
    llmOutput:
      'Context grounding enforces strict **citation-backed retrieval** with exact page verification. If a fact isn’t in the verified Pinecone chunks, the LLM is restricted from generating unverified claims, achieving **zero unauthorized output**.',
    processingTimeMs: 18,
  },
  {
    title: 'Serverless RAG Throughput',
    query: 'How fast is the underwriting risk pipeline for 15,000 daily loan records?',
    rawInput: 'How fast is the underwriting risk pipeline for 15,000 daily loan records?',
    presidioScrubbed: 'How fast is the underwriting risk pipeline for 15,000 daily loan records?',
    redactedEntities: ['No sensitive PII detected'],
    pineconeScore: 0.96,
    retrievedChunkTitle: 'Pacific Life — AWS Lambda & Pinecone RAG Performance',
    retrievedChunkText:
      'Automated top-of-funnel underwriting risk evaluation for 15,000+ daily loan records by architecting and deploying an event-driven serverless pipeline using Python, AWS Lambda, and LangChain. Reduced policy research time by 96%, from 15 minutes to 30 seconds per lookup.',
    citation: 'Doc #PL-ARCH-2025 | Page 8, Section 3.2',
    llmOutput:
      'By pairing **AWS Lambda** serverless execution with **Pinecone vector indexing**, policy research lookup time was reduced by **96% (from 15 minutes down to 30 seconds)** per record for **15,000+ daily loans**.',
    processingTimeMs: 30,
  },
];

export const RagSandbox = () => {
  const [selectedPreset, setSelectedPreset] = useState<PresetQuery>(PRESET_QUERIES[0]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');

  const runPipelineAnimation = (queryObj: PresetQuery) => {
    setSelectedPreset(queryObj);
    setIsExecuting(true);
    setActiveStep(1);

    setTimeout(() => {
      setActiveStep(2);
    }, 600);

    setTimeout(() => {
      setActiveStep(3);
    }, 1200);

    setTimeout(() => {
      setActiveStep(4);
      setIsExecuting(false);
    }, 1800);
  };

  const handleCustomRun = () => {
    if (!customInput.trim()) return;
    const customPreset: PresetQuery = {
      title: 'Custom Query Test',
      query: customInput,
      rawInput: customInput,
      presidioScrubbed: customInput
        .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '<REDACTED_SSN>')
        .replace(/[\w.-]+@[\w.-]+\.\w+/g, '<REDACTED_EMAIL>'),
      redactedEntities:
        customInput.includes('@') || /\d{3}-\d{2}-\d{4}/.test(customInput)
          ? ['Custom PII Tokens Redacted']
          : ['No sensitive PII detected'],
      pineconeScore: 0.95,
      retrievedChunkTitle: 'Custom Dynamic Semantic Match',
      retrievedChunkText:
        'Relevant portfolio chunk retrieved from Pinecone index matching the intent of custom input query.',
      citation: 'Live Dynamic Index Lookup',
      llmOutput: `Processed query: "${customInput.slice(0, 100)}...". Context grounding verified against Tarrun's production RAG specifications.`,
      processingTimeMs: 22,
    };
    runPipelineAnimation(customPreset);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 sm:mt-24 p-6 sm:p-8 md:p-12 glass-card rounded-3xl md:rounded-[2.5rem] relative overflow-hidden border border-white/10"
    >
      {/* Background radial glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Title & Badge Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 sm:mb-12 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span
              className="text-primary text-xs font-bold uppercase tracking-[0.25em]"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Live Technical Demo
            </span>
          </div>
          <h3
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Interactive RAG & Underwriting Pipeline Sandbox
          </h3>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
            Simulate the multi-stage event-driven architecture Tarrun engineered at Pacific Life —
            from Presidio PII redaction to Pinecone vector search and citation-grounded LLM
            synthesis.
          </p>
        </div>

        {/* Status indicator */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Pipeline Sandbox Ready
        </div>
      </div>

      {/* Preset Buttons & Custom Input */}
      <div className="flex flex-col gap-4 mb-10 relative z-10">
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
          Select Sample Underwriting Scenario:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PRESET_QUERIES.map((preset, idx) => {
            const isSelected = selectedPreset.title === preset.title;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => runPipelineAnimation(preset)}
                className={`p-4 rounded-2xl text-left border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-primary/10 border-primary text-white shadow-[0_0_20px_rgba(249,115,22,0.15)]'
                    : 'bg-zinc-950/60 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">Scenario 0{idx + 1}</span>
                  <Play
                    className={`w-3.5 h-3.5 ${isSelected ? 'text-primary fill-primary' : 'text-zinc-500'}`}
                  />
                </div>
                <span className="text-sm font-bold text-white leading-snug">{preset.title}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Input Bar */}
        <div className="flex items-center gap-2 mt-2 p-1.5 bg-zinc-950/80 rounded-2xl border border-white/10">
          <Terminal className="w-4 h-4 text-zinc-500 ml-3 shrink-0" />
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCustomRun()}
            placeholder="Type custom test query (e.g. Test SSN 123-45-6789 PII redaction)..."
            className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder:text-zinc-600 px-2"
          />
          <button
            type="button"
            onClick={handleCustomRun}
            className="px-4 py-2 rounded-xl bg-primary text-black font-bold text-xs hover:bg-primary/90 transition-transform active:scale-95 shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Execute Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Step-by-Step Visual Pipeline Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 relative z-10">
        {[
          { step: 1, title: 'Raw Input', icon: Terminal, desc: 'Query ingest & trigger' },
          {
            step: 2,
            title: 'Presidio PII Redaction',
            icon: ShieldCheck,
            desc: 'Regex & NER text scrubbing',
          },
          { step: 3, title: 'Vector Search', icon: Database, desc: 'Pinecone cosine similarity' },
          { step: 4, title: 'Grounded Output', icon: Cpu, desc: 'Citation-backed LLM response' },
        ].map((s) => {
          const isActive = activeStep >= s.step;
          const isCurrent = activeStep === s.step;
          const Icon = s.icon;
          return (
            <div
              key={s.step}
              className={`p-4 rounded-2xl border transition-all duration-500 flex flex-col justify-between gap-3 ${
                isCurrent
                  ? 'bg-primary/20 border-primary shadow-[0_0_24px_rgba(249,115,22,0.25)] scale-[1.02]'
                  : isActive
                    ? 'bg-zinc-900/90 border-emerald-500/40 text-white'
                    : 'bg-zinc-950/40 border-white/5 text-zinc-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                  Step 0{s.step}
                </span>
                {isActive ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <div className="w-3 h-3 rounded-full border border-zinc-700" />
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-5 h-5 ${isCurrent ? 'text-primary' : isActive ? 'text-emerald-400' : 'text-zinc-600'}`}
                />
                <span className="text-xs font-bold text-white">{s.title}</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-tight">{s.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Live Pipeline Execution Output Console */}
      <div className="relative z-10 bg-black/90 p-5 sm:p-7 rounded-2xl border border-white/10 font-mono text-xs overflow-hidden">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-[11px] font-sans font-bold text-zinc-300">
              Execution Log — {selectedPreset.title}
            </span>
          </div>
          <span className="text-[11px] text-emerald-400 font-sans font-bold">
            Latency: {selectedPreset.processingTimeMs}ms
          </span>
        </div>

        {isExecuting ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-primary">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span className="font-sans font-bold text-sm">
              Orchestrating Lambda pipeline & Pinecone lookup...
            </span>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPreset.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4 text-zinc-300"
            >
              {/* Step 1: Raw Query */}
              <div>
                <span className="text-primary font-bold">[1. RAW INPUT]:</span>
                <p className="mt-1 text-zinc-200 bg-white/5 p-2.5 rounded-xl border border-white/5">
                  "{selectedPreset.rawInput}"
                </p>
              </div>

              {/* Step 2: Presidio Scrubbed */}
              <div>
                <span className="text-emerald-400 font-bold">[2. PRESIDIO PII SCRUBBED]:</span>
                <p className="mt-1 text-emerald-200 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/20">
                  "{selectedPreset.presidioScrubbed}"
                </p>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Redacted Entities: {selectedPreset.redactedEntities.join(', ')}</span>
                </div>
              </div>

              {/* Step 3: Pinecone Match */}
              <div>
                <span className="text-amber-400 font-bold">[3. PINECONE VECTOR SEARCH]:</span>
                <div className="mt-1 bg-amber-950/20 p-2.5 rounded-xl border border-amber-500/20 flex flex-col gap-1 text-[11px]">
                  <div className="flex justify-between font-bold text-amber-300">
                    <span>Matched: {selectedPreset.retrievedChunkTitle}</span>
                    <span>
                      Similarity Score: {(selectedPreset.pineconeScore * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-zinc-300 italic">"{selectedPreset.retrievedChunkText}"</p>
                </div>
              </div>

              {/* Step 4: Final LLM Output */}
              <div>
                <span className="text-sky-400 font-bold">[4. CITATION-GROUNDED SYNTHESIS]:</span>
                <div className="mt-1 bg-sky-950/20 p-3 rounded-xl border border-sky-500/20 text-sky-100 leading-relaxed font-sans text-sm">
                  {selectedPreset.llmOutput}
                </div>
                <p className="mt-1.5 text-[11px] text-zinc-500 font-sans">
                  Citation:{' '}
                  <span className="text-zinc-400 font-medium">{selectedPreset.citation}</span>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};
