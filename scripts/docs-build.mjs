import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

fs.rmSync(path.resolve('.next'), { recursive: true, force: true });

const nextBin = path.resolve('node_modules', 'next', 'dist', 'bin', 'next');
const result = spawnSync(process.execPath, [nextBin, 'build'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NEXT_OUTPUT_EXPORT: 'true',
  },
});

process.exit(result.status ?? 1);
