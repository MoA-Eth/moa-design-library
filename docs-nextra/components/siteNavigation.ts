export type SiteNavigationItem = {
  title: string;
  href: string;
  external?: boolean;
};

export const SITE_NAV_ITEMS: SiteNavigationItem[] = [
  { title: 'Installation', href: '/INSTALLATION/' },
  { title: 'Components', href: '/components/' },
  { title: 'Flows', href: '/flows/' },
  { title: 'Theming', href: '/THEMING/' },
  { title: 'Architecture', href: '/ARCHITECTURE/' },
  { title: 'Contributing', href: '/CONTRIBUTING/' },
];
