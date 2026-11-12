#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const themesDir = path.resolve(rootDir, 'src/themes');
const activeCssPath = path.resolve(themesDir, 'active.css');

const activeContent = fs.existsSync(activeCssPath) ? fs.readFileSync(activeCssPath, 'utf8') : '';
const activeMatch = activeContent.match(/@import\s+['"]\.\/([^'"]+)\.css['"]/);
const activeTheme = activeMatch?.[1] ?? 'default';

const themes = fs
  .readdirSync(themesDir)
  .filter((file) => file.endsWith('.css') && file !== 'active.css')
  .map((file) => file.replace(/\.css$/, ''))
  .sort((a, b) => (a === 'default' ? -1 : b === 'default' ? 1 : a.localeCompare(b)));

for (const id of themes) {
  const marker = id === activeTheme ? '*' : ' ';
  console.log(`${marker} ${id}`);
}
