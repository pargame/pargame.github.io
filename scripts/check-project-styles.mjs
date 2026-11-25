// 프로젝트 페이지 스타일 일관성 검사 (npm run build 전에 실행)
//
// 원칙: 기본 스타일은 src/styles/projects/*.css 공용 파일에만 두고, 페이지의 <style>에는 그 페이지만의 특수화만 둔다.
// 1. 공용 CSS를 가져오는 페이지는 그 공용 선택자를 다시 정의할 수 없다.
//    특수화가 필요하면 새 클래스나 공용 CSS의 변수(예: --p-status)를 쓴다.
// 2. 같은 규칙(선택자 + 선언)이 두 페이지 이상의 <style>에 그대로 있으면 복사로 본다. 공용 CSS로 옮긴다.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';

const root = resolve(dirname(new URL(import.meta.url).pathname), '..');
const pagesDir = join(root, 'src/pages/learn/projects');
const sharedDir = join(root, 'src/styles/projects');

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.astro') ? [p] : [];
  });
}

function unglobal(s) {
  let out = '';
  let i = 0;
  for (;;) {
    const k = s.indexOf(':global(', i);
    if (k < 0) return out + s.slice(i);
    out += s.slice(i, k);
    let j = k + 8;
    let depth = 1;
    const start = j;
    while (depth) {
      if (s[j] === '(') depth++;
      else if (s[j] === ')') depth--;
      j++;
    }
    out += s.slice(start, j - 1);
    i = j;
  }
}

const norm = (s) => s.replace(/\s+/g, ' ').trim();
const normBody = (b) => b.split(';').map(norm).filter(Boolean).join('; ');

function parse(css, ctx = '') {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const rules = [];
  let i = 0;
  while (i < css.length) {
    const k = css.indexOf('{', i);
    if (k < 0) break;
    const sel = norm(css.slice(i, k));
    let depth = 0;
    let j = k;
    for (; j < css.length; j++) {
      if (css[j] === '{') depth++;
      else if (css[j] === '}' && --depth === 0) break;
    }
    const body = css.slice(k + 1, j);
    if (/^@(media|supports|container)/.test(sel)) rules.push(...parse(body, sel));
    else if (!sel.startsWith('@')) rules.push({ ctx, sel: norm(unglobal(sel)), body: normBody(body) });
    i = j + 1;
  }
  return rules;
}

const styleBlocks = (text) =>
  [...text.matchAll(/<style(?![^>]*is:global)[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');

const shared = new Map();
for (const name of readdirSync(sharedDir).filter((n) => n.endsWith('.css'))) {
  const keys = new Set(parse(readFileSync(join(sharedDir, name), 'utf8')).map((r) => `${r.ctx}|${r.sel}`));
  shared.set(name, keys);
}

const errors = [];
const seen = new Map();
for (const file of walk(pagesDir)) {
  const text = readFileSync(file, 'utf8');
  const rel = relative(root, file);
  const rules = parse(styleBlocks(text));
  const imports = [...text.matchAll(/import ['"][^'"]*styles\/projects\/([\w-]+\.css)['"]/g)].map((m) => m[1]);
  for (const name of imports) {
    const keys = shared.get(name);
    if (!keys) {
      errors.push(`${rel}: 없는 공용 CSS ${name}`);
      continue;
    }
    for (const r of rules) {
      if (keys.has(`${r.ctx}|${r.sel}`)) {
        errors.push(`${rel}: 공용 선택자 재정의 금지 "${r.sel}"${r.ctx ? ` (${r.ctx})` : ''} — ${name}의 변수나 새 클래스로 특수화하세요`);
      }
    }
  }
  for (const r of rules) {
    const sig = `${r.ctx}|${r.sel}|${r.body}`;
    if (!seen.has(sig)) seen.set(sig, new Set());
    seen.get(sig).add(rel);
  }
}
for (const [sig, files] of seen) {
  if (files.size > 1) {
    const [ctx, sel] = sig.split('|');
    errors.push(`복사된 규칙 "${sel}"${ctx ? ` (${ctx})` : ''}: ${[...files].join(', ')} — src/styles/projects/의 공용 CSS로 옮기세요`);
  }
}

if (errors.length) {
  console.error(`프로젝트 스타일 검사 실패 (${errors.length}건)\n` + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log('프로젝트 스타일 검사 통과');
