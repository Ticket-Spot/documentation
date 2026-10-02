import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const excluded = new Set(['node_modules', '.git', '.mintlify']);
const pages = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (excluded.has(entry.name)) return [];
    const target = path.join(dir, entry.name);
    return entry.isDirectory() ? pages(target) : entry.name.endsWith('.mdx') ? [target] : [];
  });

let count = 0;
const errors = [];
for (const file of pages(root)) {
  try {
    await compile(matter(fs.readFileSync(file, 'utf8')).content, {
      remarkPlugins: [remarkGfm],
    });
    count += 1;
  } catch (error) {
    errors.push(`${path.relative(root, file)}:${error.line || '?'}: ${error.message}`);
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Compiled ${count} MDX pages successfully.`);
}
