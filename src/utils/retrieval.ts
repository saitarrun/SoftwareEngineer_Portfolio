export interface KnowledgeChunk {
  id: string;
  topic: string;
  title: string;
  text: string;
}

const STOP_WORDS = new Set([
  'about',
  'all',
  'also',
  'and',
  'are',
  'can',
  'did',
  'does',
  'for',
  'from',
  'get',
  'got',
  'has',
  'have',
  'his',
  'how',
  'its',
  'let',
  'like',
  'make',
  'more',
  'not',
  'now',
  'one',
  'our',
  'out',
  'own',
  'sai',
  'say',
  'she',
  'some',
  'tell',
  'than',
  'that',
  'the',
  'them',
  'then',
  'there',
  'they',
  'this',
  'use',
  'was',
  'what',
  'when',
  'who',
  'why',
  'will',
  'with',
  'you',
  'your',
  'tarrun',
  'pitta',
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

// ── LangChain Semantic Expansion Maps ──────────────────────────────────────────
const SEMANTIC_CLUSTERS: Record<string, string[]> = {
  ai: [
    'artificial',
    'intelligence',
    'machine',
    'learning',
    'ml',
    'rag',
    'llm',
    'langchain',
    'faiss',
    'vector',
    'reranking',
    'embeddings',
  ],
  cloud: [
    'aws',
    'lambda',
    'rds',
    'kubernetes',
    'k8s',
    'docker',
    'terraform',
    'infrastructure',
    'serverless',
    'devops',
    'cicd',
  ],
  backend: [
    'spring',
    'boot',
    'fastapi',
    'nodejs',
    'express',
    'rest',
    'api',
    'microservices',
    'distributed',
    'postgresql',
    'redis',
    'sql',
  ],
  experience: [
    'pacific',
    'life',
    'accenture',
    'csuf',
    'fullerton',
    'research',
    'work',
    'job',
    'role',
  ],
  education: ['university', 'degree', 'master', 'bachelor', 'gitam', 'college'],
  projects: ['semantic', 'code', 'intelligence', 'open-swe', 'open', 'swe', 'apple', 'mcp'],
};

function expandTokens(tokens: string[]): string[] {
  const set = new Set(tokens);
  for (const token of tokens) {
    for (const [cluster, terms] of Object.entries(SEMANTIC_CLUSTERS)) {
      if (terms.includes(token) || cluster === token) {
        terms.forEach((t) => set.add(t));
      }
    }
  }
  return Array.from(set);
}

export function scoreChunk(chunk: KnowledgeChunk, queryTokens: string[]): number {
  if (queryTokens.length === 0) return 0;
  const filterStop = queryTokens.filter((t) => !STOP_WORDS.has(t));
  const tokensToUse = filterStop.length > 0 ? filterStop : queryTokens;
  const expandedQuery = expandTokens(tokensToUse);

  const titleTokens = tokenize(chunk.title);
  const textTokens = tokenize(chunk.text);
  const titleSet = new Set(titleTokens);
  const textSet = new Set(textTokens);

  let score = 0;
  for (const token of expandedQuery) {
    const isDirectQueryToken = tokensToUse.includes(token);
    const weight = isDirectQueryToken ? 1.0 : 0.4;

    if (titleSet.has(token)) {
      score += 2.5 * weight;
    } else if (textSet.has(token)) {
      score += 1.0 * weight;
    }
  }

  return score / Math.max(tokensToUse.length, 1);
}

export function retrieveChunks(
  query: string,
  chunks: KnowledgeChunk[],
  topK = 4
): KnowledgeChunk[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return chunks.slice(0, topK);

  const scored = chunks
    .map((chunk) => ({ chunk, score: scoreChunk(chunk, queryTokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return [];
  return scored.slice(0, topK).map(({ chunk }) => chunk);
}
