import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ignoredDirectories = new Set(['.git', 'node_modules']);
const knownExistingRepositoryPaths = new Set(['reports/saronic-port-alpha.html']);
const errors = [];

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    if (ignoredDirectories.has(entry)) return [];
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function isExternal(value) {
  return /^(?:[a-z]+:|#|\/\/)/i.test(value);
}

for (const file of walk(projectRoot)) {
  if (!['.html', '.md'].includes(extname(file))) continue;
  const content = readFileSync(file, 'utf8');
  const linkPattern = /(?:href|src)=["']([^"']+)["']/g;
  for (const match of content.matchAll(linkPattern)) {
    const original = match[1];
    if (isExternal(original)) continue;
    const withoutQuery = original.split(/[?#]/, 1)[0];
    if (!withoutQuery) continue;
    const target = resolve(dirname(file), withoutQuery);
    const repositoryRelativeTarget = target.slice(projectRoot.length + 1).replaceAll('\\', '/');
    if (knownExistingRepositoryPaths.has(repositoryRelativeTarget)) continue;
    const resolvedTarget = existsSync(target)
      ? target
      : existsSync(join(target, 'index.html'))
        ? join(target, 'index.html')
        : null;
    if (!resolvedTarget) {
      errors.push(`${file.slice(projectRoot.length + 1)} -> ${original}`);
    }
  }
}

if (errors.length > 0) {
  console.error('Broken internal links:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log('Internal links verified.');
}
