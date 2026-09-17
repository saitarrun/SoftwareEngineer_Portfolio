import { Database, Terminal, Server, Cloud, Brain, Shield } from 'lucide-react';

export interface Experience {
  num: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Project {
  num: string;
  title: string;
  tech: string;
  description: string;
  link: string;
}

export interface SkillGroup {
  num: string;
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

export interface Education {
  num: string;
  school: string;
  degree: string;
  period: string;
  location: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    num: '01',
    company: 'Pacific Life',
    role: 'Software Engineer',
    period: 'Jun 2025 - Apr 2026',
    location: 'Newport Beach, CA',
    description: [
      'Automated top-of-funnel underwriting risk evaluation for 15,000+ daily loan records by architecting and deploying an event-driven, serverless pipeline using Python, AWS Lambda, and LangChain.',
      'Reduced policy research time by 96%, from 15 minutes to 30 seconds per lookup, by engineering a production-grade Retrieval-Augmented Generation (RAG) pipeline using Pinecone for high-performance semantic search.',
      'Ensured 100% regulatory compliance for sensitive financial data (PII) across cloud transactions by orchestrating an automated text-scrubbing pipeline using Microsoft Presidio to redact customer data prior to model invocation.',
      'Eliminated LLM hallucinations in compliance workflows to achieve zero unauthorized generative text output by implementing strict context-grounding constraints and delivering a citation-backed retrieval engine with exact page verification.',
      'Transformed unstructured financial PDFs into deterministic business actions across three distinct triage categories by designing structured data extraction layers using LangChain and Pydantic to automatically route, flag, or escalate applications.',
      'Enforced zero-data-loss resiliency across data pipelines during third-party API rate limits and failures by integrating Amazon SQS Dead Letter Queues (DLQ) and implementing exponential backoff with jitter retry logic.',
      'Hardened system security infrastructure to achieve absolute isolation of customer data by implementing least-privilege AWS IAM execution policies and enforcing AWS KMS encryption at rest and in transit.',
    ],
  },
  {
    num: '02',
    company: 'California State University, Fullerton',
    role: 'Graduate Software Developer',
    period: 'Oct 2024 - Jun 2025',
    location: 'Fullerton, CA',
    description: [
      'Achieved 40% helpdesk ticket deflection and 98% retrieval accuracy by engineering a citation-backed student resource platform using Python, FastAPI, ChatGPT Edu, and RAG, indexing 10,000+ institutional documents.',
      'Reduced median response latency by 70% and minimized redundant API calls across production endpoints by implementing a Redis semantic caching layer integrated with REST APIs and automated terminal agents.',
      'Reduced LLM operational costs by routing 82% of low-complexity requests to locally hosted, quantized open-source models through an intent-aware model-routing service, bypassing premium API calls for routine queries.',
      'Processed 3,000+ weekly bookings with zero double-booking errors across 15+ high-demand campus spaces by developing a backend reservation engine using Express and JavaScript with conflict-detection logic.',
      'Reduced peak-hour campus congestion by 40% for a student population of 25,000+ users by building a real-time occupancy platform using React, Node.js, and WebSockets to stream live capacity metrics across gyms, study rooms, and parking lots.',
    ],
  },
  {
    num: '03',
    company: 'Accenture',
    role: 'Software Engineer',
    period: 'Aug 2022 - Jul 2024',
    location: 'Hyderabad, India',
    description: [
      'Developed and maintained core REST endpoints and Kafka consumers using Java 17 and Spring Boot, contributing directly to a 250ms inventory synchronization latency SLO for a high-volume retail data platform.',
      'Implemented robust exception handling and validation rules within Spring Integration and Spring Batch pipelines, capturing and filtering out 95% of malformed transaction records prior to production database ingestion.',
      'Streamlined CI/CD pipelines to support a 35% boost in deployment velocity by containerizing services using Docker, updating GitHub Actions deployment files, and modifying modular Terraform infrastructure configurations.',
      'Built centralized observability workflows that cut incident triage time by 30%, configuring custom Splunk dashboards and AWS CloudWatch alerts to flag microservice error spikes and database pool degradation early.',
      'Owned feature ticket execution and integration testing in an Agile environment, collaborating with senior engineers and stakeholders to ensure system stability and support high-concurrency peak traffic during Black Friday events.',
    ],
  },
  {
    num: '04',
    company: 'Accenture',
    role: 'Software Engineer Co-Op',
    period: 'Jan 2022 - Jul 2022',
    location: 'Hyderabad, India',
    description: [
      'Implemented 5+ backend REST API endpoints using Java and Spring Boot, improving transaction processing and data validation across core enterprise services while applying secure request handling and relational SQL validation.',
      'Resolved 8+ production-critical defects by debugging REST APIs, optimizing SQL validation scripts, and troubleshooting backend integration issues across enterprise application workflows.',
      'Contributed to technical documentation by documenting API contracts, system workflows, and architectural decisions while participating in Agile/Scrum sprint planning, daily stand-ups, code reviews, and retrospectives.',
    ],
  },
];

export const projects: Project[] = [
  {
    num: '01',
    title: 'DevForge-AI',
    tech: 'TypeScript · Node.js · Claude Code · Agentic SDLC Orchestrator',
    description:
      'An agentic SDLC orchestrator featuring 10 role-specific agents (PM, UX, Architect, Security, etc.) automating the complete build-to-operate delivery pipeline across structured feedback loops and quality gates.',
    link: 'https://github.com/saitarrun/devforge-ai',
  },
  {
    num: '02',
    title: 'SDLC AI Workflow',
    tech: 'Claude Code Plugin · JavaScript · Custom Commands · Knowledge Skills',
    description:
      'A comprehensive development plugin featuring 20 role-specific agents, 12 knowledge skills, and 8 commands configured to automate complex software engineering lifecycles and pipeline iterations.',
    link: 'https://github.com/saitarrun/sdlc-ai-workflow',
  },
  {
    num: '03',
    title: 'Apple Music MCP Server',
    tech: 'TypeScript · Model Context Protocol (MCP) · Apple Music API · macOS JXA · REST · Smart Caching',
    description:
      'High-efficiency Model Context Protocol (MCP) server for Apple Music featuring dual native macOS JXA and cloud REST engines, cross-platform chart discovery, async batching, and sub-millisecond cached lookups.',
    link: 'https://github.com/saitarrun/apple-music-mcp',
  },
  {
    num: '04',
    title: 'Rent Application',
    tech: 'Solidity · Ethereum · React · Vite · Node.js · Prisma',
    description:
      'Decentralized property management and rental agreement portal featuring smart contract rent collection, digital leases, secure e-signatures, and tenant repair workflows.',
    link: 'https://github.com/saitarrun/Rent_Application',
  },
  {
    num: '05',
    title: 'Agentic Context Compression Framework',
    tech: 'TypeScript · Node.js · LLM Context Optimization · Agentic Systems',
    description:
      'A Headroom-inspired context management framework that dynamically summarizes, prunes, and consolidates agent history and tool logs to prevent token rot and minimize api costs during long sessions.',
    link: 'https://github.com/saitarrun/agentic_context_compression_framework',
  },
  {
    num: '06',
    title: 'Semantic Code Intelligence Platform',
    tech: 'Python · FAISS · BM25 · Cross-Encoders · React · FastAPI',
    description:
      'A hybrid code-retrieval platform indexing 406K+ lines across 2,464 files (38K+ semantic chunks) leveraging FAISS dense retrieval, BM25 lexical search, Cross-Encoder reranking, and decoupled FastAPI microservices with exact source symbol citations.',
    link: 'https://github.com/saitarrun',
  },
  {
    num: '07',
    title: 'Open-SWE Open-Source Contributor',
    tech: 'Python · Docker · LLM Tool Calling · Sandbox Runtimes',
    description:
      'Expanded autonomous software engineering runtime across 5 merged pull requests by implementing secure Docker sandbox execution environments and multi-provider LLM API adapters.',
    link: 'https://github.com/langchain-ai/open-swe',
  },
  {
    num: '08',
    title: 'OpenClaw Open-Source Contributor',
    tech: 'OpenClaw · TypeScript · Node.js · Exa.ai API · Neural Web Search',
    description:
      'Contributed Exa.ai neural search provider integration to OpenClaw. Debugged and resolved configuration regression issues related to local dotenv parsing safety.',
    link: 'https://github.com/saitarrun/openclaw',
  },
  {
    num: '09',
    title: 'LLM-Powered Knowledge Retrieval Platform',
    tech: 'Python · FastAPI · Pinecone · LangChain · Vector DB',
    description:
      'High-performance knowledge retrieval platform featuring custom document parsing, dense embeddings vectorization, semantic caching, and citation-backed Q&A loops.',
    link: 'https://github.com/saitarrun/LLM-Powered-Knowledge-Retrieval-Platform',
  },
  {
    num: '10',
    title: 'Sanctuary Personal Therapist',
    tech: 'Python · LLMs · Speech-to-Text · AI Agents · Conversational AI',
    description:
      'Voice-enabled personal therapeutic assistant utilizing sentiment classification models, speech recognition, and empathetic response synthesis pipelines.',
    link: 'https://github.com/saitarrun/Sanctuary-Personal-Therapist.git',
  },
  {
    num: '11',
    title: 'DeepGesture',
    tech: 'Python · PyTorch · Computer Vision · Deep Learning · Real-time Inference',
    description:
      'Convolutional neural network model designed for high-accuracy, real-time hand gesture recognition and camera control triggers.',
    link: 'https://github.com/saitarrun/DeepGesture',
  },
  {
    num: '12',
    title: 'ANPR Computer Vision',
    tech: 'Python · OpenCV · YOLO · PyTesseract · OCR',
    description:
      'Automated Number Plate Recognition system combining YOLO-based object detection bounding boxes with PyTesseract OCR engines for high-speed capture.',
    link: 'https://github.com/saitarrun/ANPR_ComputerVision',
  },
  {
    num: '13',
    title: 'Brain Tumor Prediction System',
    tech: 'Python · Machine Learning · Big Data · Spark · Deep Learning',
    description:
      'Distributed machine learning pipeline built on Apache Spark processing large MRI medical imaging datasets to detect and predict brain tumor formations.',
    link: 'https://github.com/saitarrun/Brain-Tumor-Prediction-Using-Machine-Learning-and-Big-Data',
  },
  {
    num: '14',
    title: 'Xploit404',
    tech: 'Python · Penetration Testing · Network Security · Security Auditing',
    description:
      'A penetration testing toolkit designed for network security scanning, vulnerability identification, and automated security auditing operations.',
    link: 'https://github.com/saitarrun/Xploit404',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    num: '01',
    title: 'Programming Languages',
    icon: <Terminal className="w-6 h-6" />,
    skills: ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'C++', 'HTML5', 'CSS3'],
  },
  {
    num: '02',
    title: 'Backend & Frameworks',
    icon: <Server className="w-6 h-6" />,
    skills: [
      'Spring Boot',
      'FastAPI',
      'Node.js',
      'Express',
      'Next.js',
      'React.js',
      'Redux',
      'Tailwind CSS',
    ],
  },
  {
    num: '03',
    title: 'Distributed Systems & Data',
    icon: <Database className="w-6 h-6" />,
    skills: [
      'REST APIs',
      'Microservices',
      'GraphQL',
      'gRPC',
      'PostgreSQL',
      'MySQL',
      'Redis',
      'Amazon RDS',
    ],
  },
  {
    num: '04',
    title: 'AI & LLM Engineering',
    icon: <Brain className="w-6 h-6" />,
    skills: [
      'RAG',
      'Vector Search (FAISS)',
      'Cross-Encoder Reranking',
      'LangChain',
      'AI Agents',
      'Tool Calling',
    ],
  },
  {
    num: '05',
    title: 'Cloud & DevOps',
    icon: <Cloud className="w-6 h-6" />,
    skills: [
      'AWS',
      'AWS Lambda',
      'Amazon RDS',
      'Kubernetes',
      'Docker',
      'Terraform',
      'CI/CD',
      'GitHub Actions',
    ],
  },
  {
    num: '06',
    title: 'Observability & Testing',
    icon: <Shield className="w-6 h-6" />,
    skills: [
      'Prometheus',
      'Grafana',
      'OpenTelemetry',
      'Splunk',
      'JUnit',
      'Mockito',
      'Jest',
      'TDD',
      'Agile/Scrum',
    ],
  },
];

export const education: Education[] = [
  {
    num: '01',
    school: 'California State University, Fullerton',
    degree: 'Master of Science in Computer Science',
    period: 'Aug 2024 - May 2026',
    location: 'Fullerton, CA',
    description: [
      'Published peer-reviewed IEEE conference paper: "Hardware Trojan Detection with Machine Learning and Power Side-Channels: A Post-Deployment Analysis" (IEEE CNS 2025)',
      'Coursework: Advanced Algorithms, Cloud Computing, System Design, Machine Learning, Artificial Intelligence, Distributed Systems',
    ],
  },
];
