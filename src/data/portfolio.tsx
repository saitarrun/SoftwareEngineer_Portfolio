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

export const projects: Project[] = [
  {
    num: '01',
    title: 'LLM-Powered Knowledge Retrieval Platform',
    tech: 'LangChain · Pinecone · FastAPI · React · TypeScript',
    description:
      'Distributed full-stack knowledge retrieval platform with semantic search, vector indexing, and NLP-driven query matching. Improved information retrieval accuracy by 25% and reduced user search time by 40%.',
    link: 'https://github.com/saitarrun/LLM-Powered-Knowledge-Retrieval-Platform',
  },
  {
    num: '02',
    title: 'Production Portfolio & Personal Website',
    tech: 'React · Vite · Tailwind · TypeScript · Vercel',
    description:
      'Performance-optimized portfolio with security-first engineering, responsive design, and comprehensive code quality tooling. Features TypeScript strict mode, ESLint security rules, Prettier formatting, and git pre-commit/pre-push hooks.',
    link: 'https://github.com/saitarrun/SoftwareEngineer_Portfolio',
  },
  {
    num: '03',
    title: 'Event-Driven E-Commerce Modernization',
    tech: 'Node.js · Kafka · PostgreSQL · Docker · Kubernetes',
    description:
      'Monolith-to-microservices migration using Strangler pattern with REST APIs and event-driven design. Enables zero-downtime canary deployments, service-level isolation, and scalable order, payment, and inventory workflows.',
    link: 'https://github.com/saitarrun/Event-Driven-Architecture',
  },
  {
    num: '04',
    title: 'Brain Tumor Detection Pipeline',
    tech: 'TensorFlow · Apache Spark · GCP · OpenCV',
    description:
      'End-to-end distributed ML pipeline for MRI scan classification. Leverages Spark for big data processing and cloud-native inference on GCP to achieve clinical-grade tumor detection accuracy.',
    link: 'https://github.com/saitarrun/Brain-Tumor-Prediction-Using-Machine-Learning-and-Big-Data',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    num: '01',
    title: 'Programming Languages',
    icon: <Terminal className="w-6 h-6" />,
    skills: ['Python', 'Java', 'JavaScript', 'SQL', 'C++', 'TypeScript'],
  },
  {
    num: '02',
    title: 'Frontend Development',
    icon: <Layout className="w-6 h-6" />,
    skills: ['React', 'Next.js', 'HTML5/CSS3', 'Tailwind CSS', 'Material UI'],
  },
  {
    num: '03',
    title: 'Backend & APIs',
    icon: <Server className="w-6 h-6" />,
    skills: [
      'Spring Boot',
      'Node.js',
      'FastAPI',
      'Django',
      'gRPC',
      'GraphQL',
      'REST APIs',
      'Microservices',
    ],
  },
  {
    num: '04',
    title: 'Data & Caching',
    icon: <Database className="w-6 h-6" />,
    skills: ['Redis', 'PostgreSQL', 'MongoDB', 'DynamoDB', 'Elasticsearch', 'Kafka', 'RabbitMQ'],
  },
  {
    num: '05',
    title: 'Cloud & Infrastructure',
    icon: <Cloud className="w-6 h-6" />,
    skills: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Lambda', 'S3', 'API Gateway'],
  },
  {
    num: '06',
    title: 'DevOps & Observability',
    icon: <Activity className="w-6 h-6" />,
    skills: ['Terraform', 'Jenkins', 'GitHub Actions', 'Prometheus', 'Grafana', 'Splunk'],
  },
  {
    num: '07',
    title: 'Machine Learning & AI',
    icon: <Brain className="w-6 h-6" />,
    skills: ['TensorFlow', 'PyTorch', 'Langchain', 'LLMs', 'RAG Systems', 'Feature Engineering'],
  },
  {
    num: '08',
    title: 'Testing & QA',
    icon: <Shield className="w-6 h-6" />,
    skills: ['Pytest', 'Selenium', 'Performance Testing', 'Optimization', 'Postman', 'Debugging'],
  },
  {
    num: '09',
    title: 'Compliance & Security',
    icon: <Lock className="w-6 h-6" />,
    skills: ['SOC 2', 'RBAC', 'ISO 27001', 'OAuth 2.0', 'JWT', 'OWASP'],
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
];
