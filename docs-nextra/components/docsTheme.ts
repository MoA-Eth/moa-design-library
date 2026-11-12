import themesData from '../themes-data.json';

type TokenMap = Record<string, string>;

type ThemeDataEntry = {
  id: string;
  displayName: string;
  note: string;
  light: TokenMap;
  dark: TokenMap;
};

export type BuiltInThemeId = string;

export type ThemeOption = {
  id: BuiltInThemeId;
  label: string;
  note: string;
  light: TokenMap;
  dark: TokenMap;
};

export const THEME_OPTIONS: ThemeOption[] = (themesData as ThemeDataEntry[]).map((entry) => ({
  id: entry.id,
  label: entry.displayName,
  note: entry.note,
  light: entry.light,
  dark: entry.dark,
}));

const THEME_ID_SET = new Set(THEME_OPTIONS.map((option) => option.id));

export const THEME_STORAGE_KEY = 'moa-docs-theme';
export const THEME_CHANGE_EVENT = 'moa-docs-theme-change';
export const THEME_LINK_ID = 'moa-docs-theme-stylesheet';

export function isBuiltInThemeId(value: string | null): value is BuiltInThemeId {
  return value !== null && THEME_ID_SET.has(value);
}

export function getThemeStylesheetHref(theme: BuiltInThemeId): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return `${basePath}/themes/${theme}.css`;
}

export function resolveInitialTheme(): BuiltInThemeId {
  if (globalThis.localStorage === undefined) {
    return 'default';
  }

  const stored = globalThis.localStorage.getItem(THEME_STORAGE_KEY);
  return isBuiltInThemeId(stored) ? stored : 'default';
}

export function applyDocsTheme(theme: BuiltInThemeId): void {
  if (typeof document === 'undefined') {
    return;
  }

  const resolved = isBuiltInThemeId(theme) ? theme : 'default';
  const href = getThemeStylesheetHref(resolved);
  let link = document.getElementById(THEME_LINK_ID) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement('link');
    link.id = THEME_LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  if (link.getAttribute('href') !== href) {
    link.setAttribute('href', href);
  }
}

export function setDocsTheme(theme: BuiltInThemeId): void {
  const resolved = isBuiltInThemeId(theme) ? theme : 'default';
  applyDocsTheme(resolved);

  if (globalThis.localStorage !== undefined) {
    globalThis.localStorage.setItem(THEME_STORAGE_KEY, resolved);
  }

  if (globalThis.window !== undefined) {
    globalThis.window.dispatchEvent(new CustomEvent<BuiltInThemeId>(THEME_CHANGE_EVENT, { detail: resolved }));
  }
}

export function initializeDocsTheme(): BuiltInThemeId {
  const initial = resolveInitialTheme();
  applyDocsTheme(initial);
  return initial;
}
