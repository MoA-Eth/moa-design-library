// Copies the theme files to dist/themes, so an app can load one: import '@moa-eth/moa-design-library/themes/default.css'
import fs from 'node:fs';
import path from 'node:path';

const from = path.resolve('src/themes');
const to = path.resolve('dist/themes');
fs.mkdirSync(to, { recursive: true });
const themes = fs.readdirSync(from).filter((file) => file.endsWith('.css') && file !== 'active.css');
for (const file of themes) fs.copyFileSync(path.join(from, file), path.join(to, file));
console.log(`Copied ${themes.length} theme(s) to dist/themes: ${themes.join(', ')}`);
