// Strict check of src/data/*.yaml, run before every build (npm run build) and in CI.
// Fails on unknown fields, non-https URLs, unknown universities, missing logo files, duplicate
// ids, ids shared with a university, and editions that would show the same button twice.
import { readFileSync, existsSync } from 'node:fs';
import yaml from 'js-yaml';
import { z } from 'astro/zod';
import { universitySchema, courseFields } from '../src/data/schema.mjs';

const load = (path) => yaml.load(readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'));
const problems = [];
const report = (where, msg) => problems.push(`${where}: ${msg}`);

const asList = (data, file) => {
  if (Array.isArray(data)) return data;
  report(file, 'must be a list of entries (each starting with "- id:")');
  return [];
};
const universities = asList(load('src/data/universities.yaml'), 'universities.yaml');
const courses = asList(load('src/data/courses.yaml'), 'courses.yaml');

const courseSchema = z.object({ ...courseFields, university: z.string() }).strict();
const check = (schema, entry, where) => {
  const r = schema.safeParse(entry);
  if (!r.success) for (const i of r.error.issues) report(where, `${i.path.join('.') || '(entry)'}: ${i.message}`);
};

const uniIds = new Set();
universities.forEach((u, i) => {
  const where = `universities.yaml #${i + 1} (${u?.id ?? 'no id'})`;
  check(universitySchema, u, where);
  if (uniIds.has(u?.id)) report(where, 'duplicate id');
  uniIds.add(u?.id);
  if (u?.logo && !existsSync(new URL(`../public/images/logos/${u.logo}`, import.meta.url))) report(where, `logo file public/images/logos/${u.logo} not found`);
});

const courseIds = new Set();
courses.forEach((c, i) => {
  const where = `courses.yaml #${i + 1} (${c?.id ?? 'no id'})`;
  check(courseSchema, c, where);
  if (courseIds.has(c?.id)) report(where, 'duplicate id');
  if (uniIds.has(c?.id)) report(where, `id "${c.id}" is also a university id (they share the page's anchors)`);
  courseIds.add(c?.id);
  if (c?.university && !uniIds.has(c.university)) report(where, `unknown university "${c.university}"`);
  const seen = new Set();
  (c?.editions ?? []).forEach((e, j) => {
    // Two editions with the same year, term and kind would show two identical buttons.
    const key = `${e?.year}|${e?.term ?? ''}|${e?.video ? 'video' : 'site'}`;
    if (seen.has(key)) report(where, `editions.${j}: same year, term and kind as an earlier edition (two identical "${e?.video ? 'YT' + String(e?.year).slice(-2) : e?.year}${e?.term ?? ''}" buttons)`);
    seen.add(key);
  });
});

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s) in src/data:\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
const editions = courses.reduce((n, c) => n + c.editions.length, 0);
console.log(`✓ src/data is valid: ${universities.length} universities, ${courses.length} courses, ${editions} editions`);
