// Checks every YouTube link in src/data/courses.yaml through YouTube's oEmbed endpoint.
// A deleted or private playlist still answers its page URL with HTTP 200, so a plain link
// checker can never see it break; oEmbed answers 4xx instead. Used by the weekly link check.
// Usage: node scripts/check-youtube.mjs [report.md]   (exit 1 if any link is broken)
import { readFileSync, writeFileSync } from 'node:fs';
import yaml from 'js-yaml';

const courses = yaml.load(readFileSync(new URL('../src/data/courses.yaml', import.meta.url), 'utf8'));
const links = courses.flatMap((c) =>
  c.editions.filter((e) => /^https:\/\/(www\.)?youtube\.com\//.test(e.url)).map((e) => ({ course: c.id, year: e.year, url: e.url })));

async function check({ url }) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`,
        { headers: { 'user-agent': 'Mozilla/5.0 (compatible; openunivcourses-link-check)' }, signal: AbortSignal.timeout(20000) });
      if (res.ok) return null;
      if (res.status === 401) return null;   // embedding disabled by the owner, but the playlist exists
      if (res.status >= 500 || res.status === 429) { await new Promise((r) => setTimeout(r, 2000 * attempt)); continue; }
      return `HTTP ${res.status}`;
    } catch (err) {
      if (attempt === 3) return `request failed (${err.name})`;
    }
  }
  return 'no answer after 3 attempts';
}

const broken = [];
for (let i = 0; i < links.length; i += 8) {
  const batch = links.slice(i, i + 8);
  const results = await Promise.all(batch.map(check));
  results.forEach((problem, j) => problem && broken.push({ ...batch[j], problem }));
}

const report = process.argv[2];
if (report) {
  const lines = broken.map((b) => `- [ ] \`${b.course}\` ${b.year}: ${b.url} (${b.problem})`);
  writeFileSync(report, broken.length ? `## YouTube links\n\n${lines.join('\n')}\n` : '');
}
console.log(`${links.length} YouTube links checked, ${broken.length} broken`);
for (const b of broken) console.log(`  ${b.course} ${b.year}: ${b.url} (${b.problem})`);
process.exit(broken.length ? 1 : 0);
