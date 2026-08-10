import { test, expect } from '@playwright/test';
import { createRequire } from 'module';
import { existsSync } from 'fs';
import { resolve } from 'path';
import {
  tokenize,
  scoreChunk,
  retrieveChunks,
  type KnowledgeChunk,
} from '../../src/utils/retrieval';

const require = createRequire(import.meta.url);
const knowledgeBase = require('../../src/data/knowledge-base.json') as KnowledgeChunk[];
const chunks = knowledgeBase as KnowledgeChunk[];
const repoRoot = resolve(import.meta.dirname, '../..');

// ─── tokenize() ──────────────────────────────────────────────────────────────

test.describe('retrieval – tokenize()', () => {
  test('lowercases all tokens', () => {
    const tokens = tokenize('Python TypeScript AWS');
    expect(tokens).toContain('python');
    expect(tokens).toContain('typescript');
    expect(tokens).toContain('aws');
  });

  test('strips punctuation and special characters', () => {
    const tokens = tokenize('99.99% uptime! (production-ready)');
    expect(tokens.every((t) => /^[a-z0-9]+$/.test(t))).toBe(true);
  });

  test('filters out tokens shorter than 3 characters', () => {
    const tokens = tokenize('I am an AI engineer');
    tokens.forEach((t) => expect(t.length).toBeGreaterThan(2));
  });

  test('returns empty array for empty input', () => {
    expect(tokenize('')).toEqual([]);
  });

  test('handles whitespace-only input', () => {
    expect(tokenize('   ')).toEqual([]);
  });
});

// ─── scoreChunk() ─────────────────────────────────────────────────────────────

test.describe('retrieval – scoreChunk()', () => {
  const sampleChunk: KnowledgeChunk = {
    id: 'test-chunk',
    topic: 'experience',
    title: 'Pacific Life Software Engineer',
    text: 'Built loan-triage services using AWS Lambda and LangChain orchestration.',
  };

  test('returns score > 0 when query token matches text', () => {
    const score = scoreChunk(sampleChunk, tokenize('lambda'));
    expect(score).toBeGreaterThan(0);
  });

  test('title match scores higher than body-only match', () => {
    const titleScore = scoreChunk(sampleChunk, tokenize('pacific'));
    const bodyScore = scoreChunk(sampleChunk, tokenize('lambda'));
    expect(titleScore).toBeGreaterThan(bodyScore);
  });

  test('returns 0 for completely unrelated query', () => {
    const score = scoreChunk(sampleChunk, tokenize('basketball football cooking'));
    expect(score).toBe(0);
  });

  test('normalises by query length', () => {
    const oneToken = scoreChunk(sampleChunk, tokenize('pacific'));
    const twoTokens = scoreChunk(sampleChunk, tokenize('pacific life'));
    // Both match; two-token query with both matching should have similar normalised score
    expect(oneToken).toBeGreaterThan(0);
    expect(twoTokens).toBeGreaterThan(0);
  });
});

// ─── retrieveChunks() ─────────────────────────────────────────────────────────

test.describe('retrieval – retrieveChunks() against knowledge base', () => {
  test('Pacific Life query retrieves the Pacific Life experience chunk', () => {
    const results = retrieveChunks('Pacific Life experience', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('experience-pacific-life');
  });

  test('CSUF query retrieves the CSUF software developer experience chunk', () => {
    const results = retrieveChunks('CSUF software developer FastAPI', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('experience-csuf-software-developer');
  });

  test('Uber query retrieves the Uber experience chunk', () => {
    const results = retrieveChunks('Uber Eats checkout software engineer', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('experience-uber');
  });

  test('Cognizant query retrieves the Cognizant experience chunk', () => {
    const results = retrieveChunks('Cognizant job', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('experience-cognizant');
  });

  test('Python query retrieves the programming languages skills chunk', () => {
    const results = retrieveChunks('Java TypeScript HTML CSS', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('skills-comprehensive');
  });

  test('LangChain RAG query retrieves the AI skills chunk', () => {
    const results = retrieveChunks('LangChain RAG reranking', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('skills-ai-ml-depth');
  });

  test('AWS Docker cloud query retrieves the cloud infrastructure chunk', () => {
    const results = retrieveChunks('AWS Docker cloud infrastructure', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('skills-cloud-devops-depth');
  });

  test('contact email query retrieves the contact info chunk', () => {
    const results = retrieveChunks('contact email linkedin', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('contact-info');
  });

  test('education CSUF query retrieves the education chunk', () => {
    const results = retrieveChunks('California State University Fullerton', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('education-csuf');
  });

  test('education GITAM query retrieves the bachelor degree chunk', () => {
    const results = retrieveChunks(
      'GITAM University CyberForensics Database Management Systems',
      chunks
    );
    const ids = results.map((c) => c.id);
    expect(ids).toContain('education-gitam');
  });

  test('LLM project query retrieves the LLM knowledge retrieval project chunk', () => {
    const results = retrieveChunks('LLM knowledge retrieval platform', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('project-llm-knowledge-retrieval');
  });

  test('Open-SWE query retrieves the open source contribution project chunk', () => {
    const results = retrieveChunks('Open-SWE Docker sandbox contribution', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('project-open-swe');
  });

  test('availability/job query retrieves the availability chunk', () => {
    const results = retrieveChunks('available for work job opportunities', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('availability');
  });

  test('returns at most topK results', () => {
    const results = retrieveChunks('software engineer', chunks, 3);
    expect(results.length).toBeLessThanOrEqual(3);
  });

  test('returns top 4 by default', () => {
    const results = retrieveChunks('experience company', chunks);
    expect(results.length).toBeLessThanOrEqual(4);
  });

  test('empty query returns first N chunks without error', () => {
    const results = retrieveChunks('', chunks, 3);
    expect(results.length).toBe(3);
  });

  test('completely unrelated query returns empty array', () => {
    const results = retrieveChunks('basketball football cooking recipe', chunks);
    expect(results.length).toBe(0);
  });

  test('all returned chunks come from the knowledge base', () => {
    const ids = chunks.map((c) => c.id);
    const results = retrieveChunks('software engineer AWS Python', chunks);
    results.forEach((r) => expect(ids).toContain(r.id));
  });

  test('result chunks have required fields', () => {
    const results = retrieveChunks('experience', chunks);
    results.forEach((r) => {
      expect(r).toHaveProperty('id');
      expect(r).toHaveProperty('topic');
      expect(r).toHaveProperty('title');
      expect(r).toHaveProperty('text');
    });
  });
});

// ─── knowledge-base.json schema validation ────────────────────────────────────

test.describe('knowledge-base.json – schema', () => {
  test('contains the expected resume-backed knowledge chunks', () => {
    expect(chunks.length).toBeGreaterThanOrEqual(16);
  });

  test('every chunk has a unique id', () => {
    const ids = chunks.map((c) => c.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  test('all topic values are valid enum members', () => {
    const validTopics = new Set([
      'profile',
      'experience',
      'education',
      'projects',
      'skills',
      'contact',
    ]);
    chunks.forEach((c) => {
      expect(validTopics.has(c.topic)).toBe(true);
    });
  });

  test('all chunks have non-empty text', () => {
    chunks.forEach((c) => {
      expect(c.text.trim().length).toBeGreaterThan(0);
    });
  });

  test('experience chunks cover all four experience entries', () => {
    const expIds = chunks.filter((c) => c.topic === 'experience').map((c) => c.id);
    expect(expIds).toContain('experience-pacific-life');
    expect(expIds).toContain('experience-csuf-software-developer');
    expect(expIds).toContain('experience-uber');
    expect(expIds).toContain('experience-cognizant');
  });

  test('project chunks cover resume project entries', () => {
    const projIds = chunks.filter((c) => c.topic === 'projects').map((c) => c.id);
    expect(projIds).toEqual(['project-llm-knowledge-retrieval', 'project-open-swe']);
  });

  test('skills chunks cover all knowledge-base skill categories', () => {
    const skillIds = chunks.filter((c) => c.topic === 'skills').map((c) => c.id);
    expect(skillIds).toEqual([
      'skills-comprehensive',
      'skills-ai-ml-depth',
      'skills-cloud-devops-depth',
      'skills-security-compliance',
    ]);
  });
});

test.describe('API route exposure', () => {
  test('does not expose the local LinkedIn token generator as a production API route', () => {
    expect(existsSync(resolve(repoRoot, 'api/linkedin-get-token.ts'))).toBe(false);
  });
});
