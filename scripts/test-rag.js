/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vectorStorePath = path.join(__dirname, '..', 'api', 'vector-store.json');
const vectorRecords = JSON.parse(fs.readFileSync(vectorStorePath, 'utf8'));

const VECTOR_DIM = 384;

function fnv32(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function extractSubwordNgrams(word, nMin = 3, nMax = 5) {
  const ngrams = [];
  const wrapped = `<${word.toLowerCase()}>`;
  for (let len = nMin; len <= nMax; len++) {
    for (let i = 0; i <= wrapped.length - len; i++) {
      ngrams.push(wrapped.slice(i, i + len));
    }
  }
  return ngrams;
}

function generateDenseQueryEmbedding(query) {
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
  const normalized = new Array(VECTOR_DIM);
  for (let i = 0; i < VECTOR_DIM; i++) {
    normalized[i] = vec[i] / norm;
  }
  return normalized;
}

function cosineSimilarity(vecA, vecB) {
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

function scoreBM25(queryTokens, textTokens, avgDocLen = 80) {
  const k1 = 1.2;
  const b = 0.75;
  const docLen = textTokens.length;
  const tfMap = new Map();
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

function hybridSearch(queryVector, queryTokens, topK = 3, rrfK = 60) {
  const denseHits = vectorRecords
    .map((record) => {
      const sim = cosineSimilarity(queryVector, record.vector);
      return { record, score: sim, denseScore: sim };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 15);

  const bm25Hits = vectorRecords
    .map((record) => {
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
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 15);

  const scoreMap = new Map();

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
      const existing = scoreMap.get(id);
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

const testQueries = ['accenture', 'accenture experience', 'pacific life', 'devforge', 'skills'];

console.log('=== RAG VECTOR DATABASE LIVE VERIFICATION ===\n');

function buildFallbackAnswer(query, chunks) {
  if (!chunks || chunks.length === 0) return 'No info';
  const topChunk = chunks[0];
  const secChunk = chunks[1];
  let answer = `**${topChunk.title}**: ${topChunk.text}`;
  if (secChunk && answer.length < 180) {
    answer += ` **${secChunk.title}**: ${secChunk.text}`;
  }
  if (answer.length > 297) {
    return answer.slice(0, 294).trim() + '...';
  }
  return answer;
}

for (const query of testQueries) {
  console.log(`🔍 Query: "${query}"`);

  const queryVec = generateDenseQueryEmbedding(query);
  const queryTokens = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  const hits = hybridSearch(queryVec, queryTokens, 3);
  const chunks = hits.map((h) => h.record);
  const answer = buildFallbackAnswer(query, chunks);

  console.log(`  Top Chunk: ${chunks[0].id} (${chunks[0].title})`);
  console.log(`  Synthesized Answer: ${answer}\n`);
  console.log('-'.repeat(75));
}
