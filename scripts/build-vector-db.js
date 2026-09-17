/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

function generateDenseEmbedding(title, text, topic) {
  const vec = new Float64Array(VECTOR_DIM);

  const titleWords = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const textWords = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const topicWords = topic
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  // Topic features
  for (const tw of topicWords) {
    const idx = fnv32(`topic:${tw}`) % VECTOR_DIM;
    vec[idx] += 3.0;
  }

  // Title subword n-grams (3.0 weight)
  for (const word of titleWords) {
    if (word.length < 2) continue;
    const ngrams = extractSubwordNgrams(word);
    for (const ng of ngrams) {
      const idx = fnv32(ng) % VECTOR_DIM;
      vec[idx] += 3.0;
    }
  }

  // Text subword n-grams (1.0 weight)
  for (const word of textWords) {
    if (word.length < 2) continue;
    const ngrams = extractSubwordNgrams(word);
    for (const ng of ngrams) {
      const idx = fnv32(ng) % VECTOR_DIM;
      vec[idx] += 1.0;
    }
  }

  // L2 Normalization
  let sumSq = 0;
  for (let i = 0; i < VECTOR_DIM; i++) {
    sumSq += vec[i] * vec[i];
  }
  const norm = Math.sqrt(sumSq) || 1.0;
  const normalized = new Array(VECTOR_DIM);
  for (let i = 0; i < VECTOR_DIM; i++) {
    normalized[i] = Number((vec[i] / norm).toFixed(6));
  }
  return normalized;
}

const kbPath = path.join(__dirname, '..', 'api', 'knowledge-base.json');
const outputPath = path.join(__dirname, '..', 'api', 'vector-store.json');

const kb = JSON.parse(fs.readFileSync(kbPath, 'utf8'));

const vectorRecords = kb.map((chunk) => {
  const embedding = generateDenseEmbedding(chunk.title, chunk.text, chunk.topic);
  return {
    id: chunk.id,
    topic: chunk.topic,
    title: chunk.title,
    text: chunk.text,
    vector: embedding,
    metadata: {
      charCount: chunk.text.length,
      wordCount: chunk.text.split(/\s+/).length,
      entity: chunk.id.split('-')[1] || chunk.topic,
    },
  };
});

fs.writeFileSync(outputPath, JSON.stringify(vectorRecords, null, 2), 'utf8');
console.log(
  `Successfully built vector store at ${outputPath} with ${vectorRecords.length} 384-dim dense vectors.`
);
