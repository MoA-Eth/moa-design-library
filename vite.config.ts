/// <reference types="vitest/config" />
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf8')) as {
  version?: string;
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

// Dependencies and peers stay imports in the build: the app that uses the library installs them once
const externalPackages = [
  ...Object.keys(packageJson.peerDependencies ?? {}),
  ...Object.keys(packageJson.dependencies ?? {}),
  'react/jsx-runtime',
];
const isExternal = (id: string) => externalPackages.some((dep) => id === dep || id.startsWith(`${dep}/`));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ['src'],
      exclude: ['**/*.test.ts', '**/*.test.tsx', 'src/test'],
      outDir: 'dist',
      entryRoot: 'src',
      insertTypesEntry: true,
    }),
  ],
  define: {
    __MOA_DESIGN_LIBRARY_VERSION__: JSON.stringify(packageJson.version ?? '0.0.0'),
  },
  publicDir: false,
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      cssFileName: 'index',
    },
    rollupOptions: {
      external: isExternal,
      output: {
        // One file per module, so an app's bundler keeps only the components it uses
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
