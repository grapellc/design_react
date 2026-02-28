#!/usr/bin/env node
/**
 * Audit docs: React section structure and non-English (Korean/Cyrillic) in MDX and examples.
 * Run from examples/docs: node scripts/audit-docs.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

const HANGUL_REGEX = /[\uAC00-\uD7A3]/;
const CYRILLIC_REGEX = /[\u0400-\u04FF]/;

function findFiles(dir, ext, list = []) {
  if (!existsSync(dir)) return list;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) findFiles(full, ext, list);
    else if (name.endsWith(ext)) list.push(full);
  }
  return list;
}

function* linesWithNonLatin(filePath, regex, label) {
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (regex.test(lines[i])) {
      yield { path: filePath, line: i + 1, text: lines[i].trim().slice(0, 80), label };
    }
  }
}

const root = process.cwd();
const contentDir = join(root, 'content');
const srcDir = join(root, 'src');

const reactMetaPath = join(contentDir, 'react', 'meta.json');
const expectedTopLevel = [
  'index',
  '---Getting Started---',
  '...getting-started',
  '...components',
  '---Stackflow---',
  '...stackflow',
  '---Developer Tools---',
  '...developer-tools',
  '---Updates---',
  '...updates',
  '---Migration---',
  '...migration',
];

let hasError = false;

console.log('=== Structure audit (React) ===');
if (existsSync(reactMetaPath)) {
  const meta = JSON.parse(readFileSync(reactMetaPath, 'utf8'));
  const pages = meta.pages || [];
  const missing = expectedTopLevel.filter((p) => !pages.includes(p));
  if (missing.length) {
    console.error('Missing top-level entries in content/react/meta.json:', missing);
    hasError = true;
  } else {
    console.log('content/react/meta.json has expected top-level structure.');
  }
} else {
  console.error('content/react/meta.json not found');
  hasError = true;
}

console.log('\n=== Non-English (Hangul/Korean) in content ===');
const mdxFiles = findFiles(contentDir, '.mdx');
const koreanInContent = [];
for (const file of mdxFiles) {
  for (const item of linesWithNonLatin(file, HANGUL_REGEX, 'Hangul')) {
    koreanInContent.push(item);
  }
}
if (koreanInContent.length) {
  console.log(`Found ${koreanInContent.length} line(s) with Hangul/Korean in MDX (report only, translate incrementally):`);
  for (const { path, line, text } of koreanInContent.slice(0, 15)) {
    const short = path.replace(root, '');
    console.log(`  ${short}:${line}  ${text}...`);
  }
  if (koreanInContent.length > 15) console.log(`  ... and ${koreanInContent.length - 15} more`);
} else {
  console.log('No Hangul/Korean found in MDX content.');
}

console.log('\n=== Non-English in example/registry TSX ===');
const tsxInSrc = findFiles(srcDir, '.tsx');
const koreanInTsx = [];
for (const file of tsxInSrc) {
  for (const item of linesWithNonLatin(file, HANGUL_REGEX, 'Hangul')) {
    koreanInTsx.push(item);
  }
}
if (koreanInTsx.length) {
  console.log(`Found ${koreanInTsx.length} line(s) with Hangul/Korean in TSX (report only, translate incrementally):`);
  for (const { path, line, text } of koreanInTsx.slice(0, 15)) {
    const short = path.replace(root, '');
    console.log(`  ${short}:${line}  ${text}...`);
  }
  if (koreanInTsx.length > 15) console.log(`  ... and ${koreanInTsx.length - 15} more`);
} else {
  console.log('No Hangul/Korean found in example/registry TSX.');
}

console.log('\n=== Cyrillic (e.g. Mongolian) check ===');
let cyrillicCount = 0;
for (const file of mdxFiles) {
  for (const item of linesWithNonLatin(file, CYRILLIC_REGEX, 'Cyrillic')) {
    cyrillicCount++;
    if (cyrillicCount <= 10) {
      const short = item.path.replace(root, '');
      console.log(`  ${short}:${item.line}  ${item.text}...`);
    }
  }
}
for (const file of tsxInSrc) {
  for (const item of linesWithNonLatin(file, CYRILLIC_REGEX, 'Cyrillic')) {
    cyrillicCount++;
    if (cyrillicCount <= 10) {
      const short = item.path.replace(root, '');
      console.log(`  ${short}:${item.line}  ${item.text}...`);
    }
  }
}
if (cyrillicCount) {
  console.log(`Total lines with Cyrillic: ${cyrillicCount}`);
} else {
  console.log('No Cyrillic found.');
}

console.log('\nAudit complete. Fix structure errors; translate remaining Korean/Cyrillic as needed.');
process.exit(hasError ? 1 : 0);
