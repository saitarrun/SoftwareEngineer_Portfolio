import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const rawVectorStore = require('./vector-store.json') as VectorRecord[];

export interface VectorRecord {
  id: string;
  topic: string;
  title: string;
  text: string;
  vector: number[];
  metadata: {
    charCount: number;
    wordCount: number;
    entity: string;
  };
}

export interface SearchResult {
  record: VectorRecord;
  score: number;
  denseScore?: number;
  lexicalScore?: number;
}

const VECTOR_DIM = 384;

function fnv32(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function extractSubwordNgrams(word: string, nMin = 3, nMax = 5): string[] {
  const ngrams: string[] = [];
  const wrapped = `<${word.toLowerCase()}>`;
  for (let len = nMin; len <= nMax; len++) {
    for (let i = 0; i <= wrapped.length - len; i++) {
      ngrams.push(wrapped.slice(i, i + len));
    }
  }
  return ngrams;
}

export function generateDenseQueryEmbedding(query: string): number[] {
  const vec = new Float64Array(VECTOR_DIM);
  const words = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 2);

  for (const word of words) {
    const ngrams = extractSubwordNgrams(word);
    for (const ng of ngrams) {
      const idx = fnv32(ng) % VECTOR_DIM;
      vec[idx] += 1.5;
    }
  }

  let sumSq = 0;
  for (let i = 0; i < VECTOR_DIM; i++) {
    sumSq += vec[i] * vec[i];
  }
  const norm = Math.sqrt(sumSq) || 1.0;
  const normalized: number[] = new Array(VECTOR_DIM);
  for (let i = 0; i < VECTOR_DIM; i++) {
    normalized[i] = vec[i] / norm;
  }
  return normalized;
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  const len = Math.min(vecA.length, vecB.length);
  for (let i = 0; i < len; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// ── OpenRouter Embeddings Integration ──────────────────────────────────────────
export async function fetchOpenRouterEmbedding(
  text: string,
  apiKey: string
): Promise<number[] | null> {
  try {
    const res = await fetch('https://openrouter.ai/api/v1/embeddings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/text-embedding-3-small',
        input: text,
      }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: Array<{ embedding: number[] }> };
    if (json.data && json.data[0] && Array.isArray(json.data[0].embedding)) {
      return json.data[0].embedding;
    }
  } catch (err) {
    console.warn('OpenRouter embedding call failed, falling back to local dense vectorizer:', err);
  }
  return null;
}

// ── BM25 Lexical Scorer ────────────────────────────────────────────────────────
function scoreBM25(queryTokens: string[], textTokens: string[], avgDocLen = 80): number {
  const k1 = 1.2;
  const b = 0.75;
  const docLen = textTokens.length;
  const tfMap = new Map<string, number>();
  for (const t of textTokens) {
    tfMap.set(t, (tfMap.get(t) || 0) + 1);
  }

  let score = 0;
  for (const qt of queryTokens) {
    const tf = tfMap.get(qt) || 0;
    if (tf > 0) {
      const numerator = tf * (k1 + 1);
      const denominator = tf + k1 * (1 - b + b * (docLen / avgDocLen));
      score += numerator / denominator;
    }
  }
  return score;
}

// ── Vector Database Class ──────────────────────────────────────────────────────
export class VectorDatabase {
  private records: VectorRecord[];

  constructor(records: VectorRecord[] = rawVectorStore) {
    this.records = records;
  }

  public getAll(): VectorRecord[] {
    return this.records;
  }

  public searchDense(queryVector: number[], topK = 10): SearchResult[] {
    const scored = this.records.map((record) => {
      const sim = cosineSimilarity(queryVector, record.vector);
      return { record, score: sim, denseScore: sim };
    });
    return scored.sort((a, b) => b.score - a.score).slice(0, topK);
  }

  public searchBM25(queryTokens: string[], topK = 10): SearchResult[] {
    const scored = this.records.map((record) => {
      const textTokens = record.text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/);
      const titleTokens = record.title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/);

      const textScore = scoreBM25(queryTokens, textTokens);
      const titleScore = scoreBM25(queryTokens, titleTokens);
      const totalScore = textScore + titleScore * 2.5;

      return { record, score: totalScore, lexicalScore: totalScore };
    });
    return scored.sort((a, b) => b.score - a.score).slice(0, topK);
  }

  /**
   * Reciprocal Rank Fusion (RRF) Hybrid Search
   * Combines dense vector similarity ranks + lexical BM25 ranks
   */
  public hybridSearch(
    queryVector: number[],
    queryTokens: string[],
    topK = 6,
    rrfK = 60
  ): SearchResult[] {
    const denseHits = this.searchDense(queryVector, 15);
    const bm25Hits = this.searchBM25(queryTokens, 15);

    const scoreMap = new Map<
      string,
      { record: VectorRecord; rrfScore: number; denseScore: number; lexicalScore: number }
    >();

    denseHits.forEach((hit, rank) => {
      const id = hit.record.id;
      const rrf = 1.0 / (rrfK + (rank + 1));
      scoreMap.set(id, {
        record: hit.record,
        rrfScore: rrf,
        denseScore: hit.denseScore || 0,
        lexicalScore: 0,
      });
    });

    bm25Hits.forEach((hit, rank) => {
      const id = hit.record.id;
      const rrf = 1.0 / (rrfK + (rank + 1));
      if (scoreMap.has(id)) {
        const existing = scoreMap.get(id)!;
        existing.rrfScore += rrf;
        existing.lexicalScore = hit.lexicalScore || 0;
      } else {
        scoreMap.set(id, {
          record: hit.record,
          rrfScore: rrf,
          denseScore: 0,
          lexicalScore: hit.lexicalScore || 0,
        });
      }
    });

    const combined = Array.from(scoreMap.values())
      .map(({ record, rrfScore, denseScore, lexicalScore }) => ({
        record,
        score: rrfScore,
        denseScore,
        lexicalScore,
      }))
      .sort((a, b) => b.score - a.score);

    return combined.slice(0, topK);
  }

  /**
   * Diversity Reranking using Maximal Marginal Relevance (MMR)
   */
  public rerankMMR(searchResults: SearchResult[], topK = 5, lambda = 0.7): SearchResult[] {
    if (searchResults.length <= topK) return searchResults;

    const selected: SearchResult[] = [];
    const unselected = [...searchResults];

    // Pick top result first
    selected.push(unselected.shift()!);

    while (selected.length < topK && unselected.length > 0) {
      let bestMMR = -Infinity;
      let bestIdx = -1;

      for (let i = 0; i < unselected.length; i++) {
        const candidate = unselected[i];
        let maxSimilarityToSelected = 0;
        for (const s of selected) {
          const sim = cosineSimilarity(candidate.record.vector, s.record.vector);
          if (sim > maxSimilarityToSelected) maxSimilarityToSelected = sim;
        }

        const mmrScore = lambda * candidate.score - (1 - lambda) * maxSimilarityToSelected;
        if (mmrScore > bestMMR) {
          bestMMR = mmrScore;
          bestIdx = i;
        }
      }

      if (bestIdx >= 0) {
        selected.push(unselected.splice(bestIdx, 1)[0]);
      } else {
        break;
      }
    }

    return selected;
  }
}

export const defaultVectorDB = new VectorDatabase();
