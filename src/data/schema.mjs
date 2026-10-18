// Schemas for src/data/*.yaml, shared by the Astro content config and scripts/validate-data.mjs.
// Objects are strict, so a typo such as `vidoe: true` fails the build instead of being ignored.
// The validation script adds the cross-file checks a schema cannot express (see that file).
import { z } from 'astro/zod';

export const TOPICS = [
  'machine-learning', 'deep-learning', 'nlp', 'computer-vision', 'reinforcement-learning',
  'generative-models', 'llms', 'learning-theory', 'math-for-ml', 'probabilistic-models',
  'healthcare', 'biology', 'creative-ai', 'ai-foundations', 'data-science', 'programming',
  'multimodal', 'mlops',
];
export const LEVELS = ['intro', 'intermediate', 'advanced'];
export const TERMS = ['S', 'F', 'W', 'U']; // Spring, Fall, Winter, Summer

const text = (min = 1) => z.string().trim().min(min);
const https = z.string().url().regex(/^https:\/\//, 'must start with https://');

export const universitySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: text(3),
  short: text(2),
  logo: z.string().regex(/^[\w.-]+\.(svg|png|jpg|webp)$/, 'a file name in public/images/logos/'),
  website: https,
}).strict();

export const editionSchema = z.object({
  year: z.number().int().min(1990).max(new Date().getFullYear() + 1),
  term: z.enum(TERMS).optional(),
  url: https,
  video: z.literal(true).optional(),   // omit for a course page; `video: true` for lecture videos
}).strict();

export const courseFields = {
  id: z.string().regex(/^[a-z0-9-]+$/),
  code: text().optional(),
  aliases: z.array(text()).min(1).optional(),
  title: text(3),
  description: text(20).max(150, 'at most 150 characters, so the card keeps its four-line layout'),
  topics: z.array(z.enum(TOPICS)).min(1).max(3).refine((t) => new Set(t).size === t.length, 'topics must not repeat'),
  level: z.enum(LEVELS),
  editions: z.array(editionSchema).min(1),
};
