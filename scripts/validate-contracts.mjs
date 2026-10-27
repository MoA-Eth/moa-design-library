// Every public component has an AI contract, and every contract names a component that is exported. Run before publishing.
import fs from 'node:fs';
import path from 'node:path';

const index = JSON.parse(fs.readFileSync('ai/contracts/index.json', 'utf8'));
const entry = fs.readFileSync('src/index.ts', 'utf8');
const exported = [...entry.matchAll(/export \{ (\w+) \} from '\.\/components\//g)].map((m) => m[1]);
const problems = [];

for (const name of exported) {
  if (!index.components.includes(name)) problems.push(`${name} is exported but has no entry in ai/contracts/index.json`);
  const file = path.join('ai/contracts/components', `${name}.json`);
  if (!fs.existsSync(file)) {
    problems.push(`${name} has no contract file ${file}`);
    continue;
  }
  const contract = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const key of ['name', 'import', 'purpose', 'props', 'usage', 'rules']) {
    if (!(key in contract)) problems.push(`${file} is missing "${key}"`);
  }
  if (contract.name !== name) problems.push(`${file} names "${contract.name}", expected "${name}"`);
}
for (const name of index.components) {
  if (!exported.includes(name)) problems.push(`ai/contracts/index.json lists ${name}, which src/index.ts does not export`);
}

if (problems.length) {
  console.error(problems.map((p) => `✗ ${p}`).join('\n'));
  process.exit(1);
}
console.log(`✓ ${exported.length} component contracts are complete`);
