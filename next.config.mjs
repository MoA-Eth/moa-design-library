import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nextra from 'nextra';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'));
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'moa-design-library';
const basePath = process.env.GITHUB_ACTIONS ? `/${repoName}` : '';
const shouldExport = process.env.GITHUB_ACTIONS === 'true' || process.env.NEXT_OUTPUT_EXPORT === 'true';

export default withNextra({
  ...(shouldExport ? { output: 'export' } : {}),
  basePath,
  assetPrefix: basePath || undefined,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  typescript: {
    tsconfigPath: './tsconfig.docs.json',
  },
  trailingSlash: true,
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.DefinePlugin({
        __MOA_DESIGN_LIBRARY_VERSION__: JSON.stringify(packageJson.version ?? '0.0.0'),
      }),
    );

    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@moa-eth/moa-design-library/styles.css': path.resolve(__dirname, 'src/styles.css'),
      '@moa-eth/moa-design-library/themes': path.resolve(__dirname, 'src/themes'),
      '@moa-eth/moa-design-library': path.resolve(__dirname, 'docs-nextra/registry/moa-entry.ts'),
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@ui': path.resolve(__dirname, 'src/components/ui'),
    };

    return config;
  },
});
