import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ExperienceCard = ({ exp, index }: { exp: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
      className="group grid grid-cols-[60px_1fr] md:grid-cols-[100px_1fr] gap-6 md:gap-8 lg:gap-16 p-6 md:p-10 lg:p-14 rounded-[2.5rem] transition-all duration-700 bg-surface-container-low/40 ghost-border hover:bg-surface-container-low hover:border-primary/40 hover:shadow-[0_0_50px_rgba(255,146,73,0.1)] w-full relative h-full"
    >
      {/* Number Layer */}
      <div style={{ transform: 'translateZ(50px)' }} className="pt-2">
        <span
          className="text-6xl md:text-8xl font-black leading-none text-primary/10 group-hover:text-primary/30 transition-colors duration-500"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {exp.num}
        </span>
      </div>

      {/* Content Layer */}
      <div style={{ transform: 'translateZ(30px)' }}>
        <div className="flex flex-wrap items-baseline gap-4 mb-6">
          <h3
            className="text-3xl md:text-5xl font-black text-on-surface group-hover:text-primary transition-colors duration-500"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {exp.company}
          </h3>
          <span
            className="text-primary-dim font-bold text-lg uppercase tracking-[0.2em] opacity-80"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            {exp.role}
          </span>
        </div>

        {/* Period + Location Chips Layer */}
        <div className="flex flex-wrap gap-3 mb-10" style={{ transform: 'translateZ(40px)' }}>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-lg bg-surface-container-highest/60 text-on-surface-variant border border-white/05 backdrop-blur-md"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            {exp.period}
          </span>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-lg bg-surface-container-highest/60 text-on-surface-variant border border-white/05 backdrop-blur-md"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            {exp.location}
          </span>
        </div>

        <ul className="space-y-6 max-w-4xl">
          {exp.description.map((item: string, i: number) => (
            <li
              key={i}
              className="flex gap-6 text-lg leading-relaxed text-on-surface-variant group-hover:text-on-surface/90 transition-colors duration-500"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full mt-3 shrink-0 bg-primary neon-glow opacity-80" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const experiences = [
  {
    num: '01',
    company: 'Pacific Life',
    role: 'Software Engineer Intern',
    period: 'May 2025 – Dec 2025',
    location: 'Newport Beach, CA',
    description: [
      'Automated 98% of claims triage workflows by architecting a serverless ML/LLM service with AWS Lambda, Amazon API Gateway, TensorFlow, and LangChain multi-agent orchestration.',
      'Reduced claims processing time by 75% (3 hours → 45 minutes) and workflow failures by 30% by implementing human-in-the-loop validation checkpoints across ML/LLM triage decisions.',
      'Accelerated policy lookup by 98% and boosted claims processor productivity by 50% by engineering a secure RAG pipeline with LLM embeddings, Pinecone semantic search, source-cited responses, and access-controlled retrieval.',
      'Built TypeScript API aggregation layer with Redis distributed caching, reducing dashboard load time from 4 seconds to 2 seconds (50%) and API p99 latency from 300ms to 210ms.',
      'Integrated ML inference into event-driven Kafka pipeline achieving <100ms latency for risk updates on 5,000+ weekly claims with 99.99% reliability.',
    ],
  },
  {
    num: '02',
    company: 'Accenture',
    role: 'Software Engineer',
    period: 'Jul 2022 – Jun 2024',
    location: 'Hyderabad, India',
    description: [
      'Scaled a gRPC-based transaction microservice to process 2M+ daily transactions with 20K transactions/sec peak throughput and 99.99% uptime by implementing Protocol Buffers, idempotency keys, and Redis distributed locking.',
      'Led AWS cloud infrastructure optimization using Amazon EKS auto-scaling and Amazon ElastiCache connection pooling, reducing compute 50% and cloud spend 35% ($15K/month).',
      'Optimized SQL queries across distributed transaction systems using composite indexes and query refactoring, reducing latency 60% and database CPU usage 73%.',
      'Designed reliability architecture with Amazon CloudWatch, Prometheus, and Splunk monitoring pipelines with automated alerts, reducing MTTR by 25x for business-critical services.',
    ],
  },
  {
    num: '03',
    company: 'Cognizant',
    role: 'Software Engineer',
    period: 'May 2021 – Apr 2022',
    location: 'Hyderabad, India',
    description: [
      'Improved PostgreSQL query performance and resolved lock contention in Spring Boot services, reducing API latency by 52% (2.5s to 1.2s) and lowering p99 latency by 30%.',
      'Engineered ML churn prediction system using scikit-learn and TensorFlow with React dashboards across 50K customers, achieving 12% churn reduction and 87% forecast accuracy.',
      'Built REST APIs exposing real-time churn predictions for 5,000+ customers, enabling proactive retention operations and supporting faster data-driven intervention by customer success teams.',
      'Implemented RBAC and input validation, remediating 40+ high-severity vulnerabilities for clean security audit and ensuring compliance standards.',
      'Standardized CI/CD with Docker and GitHub Actions, reducing release lead time by 50% and enabling daily deployments.',
    ],
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2
            className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Experience
          </h2>
        </motion.div>

        {/* Experience grid: full width cards stacked vertically */}
        <div className="grid grid-cols-1 gap-12 md:gap-16">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
