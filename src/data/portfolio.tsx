import {
  Database,
  Layout,
  Terminal,
  Server,
  Cloud,
  Activity,
  Brain,
  Shield,
  Lock,
} from 'lucide-react';

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
    role: 'Software Engineer Intern',
    period: 'Jun 2025 - Mar 2026',
    location: 'Newport Beach, CA',
    description: [
      'Built a serverless loan-triage service for commercial and residential underwriting that processed 15,000+ daily records using Python, AWS Lambda, and LangChain, reducing manual review across underwriting workflows.',
      'Reduced loan-policy research time by 96%, from 15 minutes of manual lookup to 30 seconds, by building a citation-backed policy-retrieval service with LangChain and Pinecone.',
      'Reduced manual address-processing effort by 75% by developing a Python and ESRI REST API geospatial enrichment pipeline that standardized addresses and generated coordinates for regional analysis.',
    ],
  },
  {
    num: '02',
    company: 'California State University, Fullerton',
    role: 'Software Developer',
    period: 'Sep 2024 - May 2025',
    location: 'Fullerton, CA',
    description: [
      'Built a FastAPI-based university knowledge-search platform indexing 15,000+ documents across enrollment guides, academic calendars, student handbooks, and IT support resources, enabling semantic, citation-backed search.',
      'Reduced median response latency for repeated queries by 70% by implementing Redis-based semantic caching that reused responses for semantically similar requests.',
      'Routed up to 70% of low-complexity queries to quantized open-source LLMs by developing an intent-aware model-routing service that reserved commercial LLM APIs for higher-complexity requests.',
    ],
  },
  {
    num: '03',
    company: 'Uber',
    role: 'Software Engineer',
    period: 'Aug 2023 - Jul 2024',
    location: 'Hyderabad, India',
    description: [
      'Reduced checkout timeout rates by 8% during peak traffic by implementing Redis-backed distributed session caching for Uber Eats cart and checkout workflows.',
      'Reduced Uber Eats order-history page load time by 22% by optimizing nested SQL queries and eliminating redundant joins across transactional order tables in Amazon RDS.',
      'Reduced regional checkout-configuration retrieval latency by 12% by optimizing Docstore data access and refactoring AWS Lambda request-routing workflows.',
      "Delivered reusable, accessible React and TypeScript components with Uber's Base Web design system, reducing rendering defects by 14% across global Uber Eats cart and checkout experiences.",
    ],
  },
  {
    num: '04',
    company: 'Cognizant',
    role: 'Software Engineer Intern',
    period: 'Jan 2023 - Jun 2023',
    location: 'Hyderabad, India',
    description: [
      'Engineered a customer-engagement scoring service for a B2B SaaS platform using Python and scikit-learn, achieving 87% recall and contributing to a 12% reduction in customer churn.',
      'Secured high-traffic e-commerce payment APIs by implementing OpenID Connect, JWT authentication, role-based access control, and Spring Security.',
      'Engineered SQL-based customer-analytics workflows and 2 normalized reporting tables in collaboration with 3 business stakeholders and 2 engineers, enabling churn segmentation, campaign tracking, and retention analysis.',
    ],
  },
];

export const projects: Project[] = [
  {
    num: '01',
    title: 'Semantic Code Intelligence Platform',
    tech: 'Python · RAG · BM25 · Dense Vector Search · Cross-Encoder Reranking',
    description:
      'Local-first code intelligence platform indexing 50,000+ lines of code, combining dense-vector search, BM25, and Cross-Encoder reranking to deliver sub-second retrieval with file-path and line-level citations.',
    link: 'https://github.com/saitarrun',
  },
  {
    num: '02',
    title: 'Open-SWE Open-Source Contributor',
    tech: 'Open-SWE · Docker · LLM Providers · Sandbox Integration',
    description:
      "Delivered 5 merged pull requests to LangChain's Open-SWE framework by implementing Docker sandbox integration and extending compatibility across multiple large language model providers.",
    link: 'https://github.com/langchain-ai/open-swe',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    num: '01',
    title: 'Programming Languages',
    icon: <Terminal className="w-6 h-6" />,
    skills: ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'HTML', 'CSS'],
  },
  {
    num: '02',
    title: 'Frontend Development',
    icon: <Layout className="w-6 h-6" />,
    skills: ['React.js', 'Base Web', 'HTML', 'CSS', 'TypeScript'],
  },
  {
    num: '03',
    title: 'Backend & APIs',
    icon: <Server className="w-6 h-6" />,
    skills: [
      'Spring Boot',
      'FastAPI',
      'Node.js',
      'Express.js',
      'REST APIs',
      'Microservices',
      'Distributed Systems',
    ],
  },
  {
    num: '04',
    title: 'Databases & Retrieval',
    icon: <Database className="w-6 h-6" />,
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Pinecone', 'pgvector', 'BM25'],
  },
  {
    num: '05',
    title: 'Cloud & Infrastructure',
    icon: <Cloud className="w-6 h-6" />,
    skills: ['AWS', 'AWS Lambda', 'Amazon RDS', 'Docker', 'Terraform', 'Infrastructure as Code'],
  },
  {
    num: '06',
    title: 'DevOps & Systems',
    icon: <Activity className="w-6 h-6" />,
    skills: ['GitHub Actions', 'CI/CD', 'Linux', 'System Design', 'Performance Testing'],
  },
  {
    num: '07',
    title: 'Machine Learning & AI',
    icon: <Brain className="w-6 h-6" />,
    skills: ['LangChain', 'RAG', 'scikit-learn', 'Cross-Encoder Reranking', 'Dense-Vector Search'],
  },
  {
    num: '08',
    title: 'Testing & Engineering',
    icon: <Shield className="w-6 h-6" />,
    skills: ['Unit Testing', 'Performance Testing', 'Data Structures', 'Algorithms', 'Git'],
  },
  {
    num: '09',
    title: 'Security & Identity',
    icon: <Lock className="w-6 h-6" />,
    skills: ['OpenID Connect', 'SAML', 'JWT', 'Spring Security', 'RBAC'],
  },
];

export const education: Education[] = [
  {
    num: '01',
    school: 'California State University, Fullerton',
    degree: 'Master of Science, Computer Science',
    period: 'Aug 2024 – May 2026',
    location: 'Fullerton, CA',
    description: [
      'Published peer-reviewed IEEE conference paper: "Hardware Trojan Detection with Machine Learning and Power Side-Channels: A Post-Deployment Analysis" (IEEE CNS 2025)',
      'Coursework: Advanced Algorithms, Cloud Computing, System Design, Machine Learning, Artificial Intelligence',
    ],
  },
  {
    num: '02',
    school: 'GITAM University',
    degree: 'Bachelor of Technology, Computer Science',
    period: 'Jun 2023',
    location: 'India',
    description: [
      'Coursework: Software Engineering Fundamentals, Object Oriented Programming, Cybersecurity, CyberForensics, Database Management Systems.',
    ],
  },
];
