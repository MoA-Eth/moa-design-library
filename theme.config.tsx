import type { DocsThemeConfig } from 'nextra-theme-docs';
import { SiteHeader } from './docs-nextra/components/SiteHeader';
import { MODE_STORAGE_KEY } from './docs-nextra/components/siteTheme';

const config: DocsThemeConfig = {
  darkMode: true,
  head: () => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

    return (
      <>
        <title>MoA Design Library Documentation</title>
        <link rel="icon" href={`${basePath}/favicon.svg`} type="image/svg+xml" />
      </>
    );
  },
  sidebar: {
    autoCollapse: false,
    defaultMenuCollapseLevel: 99,
    toggleButton: false,
  },
  navbar: {
    component: SiteHeader as NonNullable<DocsThemeConfig['navbar']>['component'],
  },
  nextThemes: {
    storageKey: MODE_STORAGE_KEY,
    defaultTheme: 'light',
  },
  docsRepositoryBase: 'https://github.com/MoA-Eth/moa-design-library/tree/main',
  footer: {
    content: 'Ministry of Agriculture (MoA-Eth) — Design Library',
  },
};

export default config;
