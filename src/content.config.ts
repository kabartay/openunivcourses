import { defineCollection, reference } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';
import { universitySchema, courseFields } from './data/schema.mjs';

// The data lives in src/data/*.yaml and is validated here on every build. scripts/validate-data.mjs
// runs first and adds cross-file checks: known universities, logo files present, no duplicates.
const universities = defineCollection({
  loader: file('src/data/universities.yaml'),
  schema: universitySchema,
});

const courses = defineCollection({
  loader: file('src/data/courses.yaml'),
  schema: z.object({ ...courseFields, university: reference('universities') }).strict(),
});

export const collections = { universities, courses };
