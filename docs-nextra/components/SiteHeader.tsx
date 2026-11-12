import type { JSX } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SiteHeaderExtras } from './SiteHeaderExtras';
import { SITE_NAV_ITEMS } from './siteNavigation';

type RawNavItem = {
  title?: string;
  href?: string;
  route?: string;
  display?: string;
  type?: string;
  external?: boolean;
  withIndexPage?: boolean;
  firstChildRoute?: string;
  children?: unknown;
};

const normalizeNavItems = (items: RawNavItem[]) =>
  (items ?? [])
    .filter((item) => item && item.display !== 'hidden' && item.type !== 'menu')
    .map((item) => {
      let href = item.href || item.route || '#';
      if (item.children) {
        href = (item.withIndexPage ? item.route : item.firstChildRoute) || href;
      }
      return {
        href,
        title: item.title ?? '',
        external: Boolean(item.external),
      };
    })
    .filter((item) => item.href && item.title);

const normalizePath = (path: string) => {
  if (!path) return '/';
  const pathname = path.split('?')[0]?.split('#')[0] || '/';
  if (pathname === '/') return pathname;
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
};

export function SiteHeader({ items = [] }: { items?: RawNavItem[] }): JSX.Element {
  const router = useRouter();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const currentPath = normalizePath(router.asPath ?? router.pathname);
  const navItems = normalizeNavItems(items.length > 0 ? items : SITE_NAV_ITEMS);

  return (
    <header className="moa-topbar moa-site-header" aria-label="Site navigation">
      <Link className="moa-logo" href="/">
        <img className="moa-logo-icon" src={`${basePath}/moa-mark.svg`} alt="" width={22} height={22} aria-hidden="true" />
        <span className="moa-logo-name">MoA Design Library</span>
      </Link>

      <nav className="moa-topnav">
        {navItems.map((item) => {
          if (item.external) {
            return (
              <a key={item.href} className="moa-topnav-link" href={item.href} target="_blank" rel="noreferrer">
                {item.title}
              </a>
            );
          }

          const itemPath = normalizePath(item.href);
          const isActive = currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);

          return (
            <Link key={item.href} className={`moa-topnav-link${isActive ? ' is-active' : ''}`} href={item.href}>
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="moa-topbar-tools">
        <SiteHeaderExtras />
      </div>
    </header>
  );
}
