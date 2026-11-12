import {
  THEME_LINK_ID,
  THEME_OPTIONS as DOCS_THEME_OPTIONS,
  THEME_STORAGE_KEY as DOCS_THEME_STORAGE_KEY,
  applyDocsTheme,
  setDocsTheme,
} from './docsTheme';

export const THEME_IDS = DOCS_THEME_OPTIONS.map(({ id }) => id);

export const THEME_OPTIONS = DOCS_THEME_OPTIONS.map(({ id, label }) => ({
  value: id,
  label,
}));

export const THEME_STORAGE_KEY = DOCS_THEME_STORAGE_KEY;
export const MODE_STORAGE_KEY = 'moa:landing-mode';
export const RUNTIME_THEME_LINK_ID = THEME_LINK_ID;

export const PREVIEW_MESSAGE_SET_THEME = 'moa:set-theme';
export const PREVIEW_MESSAGE_READY = 'moa:preview-ready';

export const resolveStoredThemeId = (): string => {
  if (globalThis.localStorage === undefined) {
    return 'default';
  }

  const storedTheme = globalThis.localStorage.getItem(THEME_STORAGE_KEY);
  return storedTheme && THEME_IDS.includes(storedTheme) ? storedTheme : 'default';
};

export type PreviewThemeBroadcastPayload = Readonly<{
  themeId?: string;
  mode?: 'light' | 'dark';
}>;

export const broadcastToPreviewIframes = (payload: PreviewThemeBroadcastPayload): void => {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }

  const iframes = document.querySelectorAll<HTMLIFrameElement>('iframe[data-moa-preview="true"]');

  iframes.forEach((iframe) => {
    try {
      iframe.contentWindow?.postMessage({ type: PREVIEW_MESSAGE_SET_THEME, ...payload }, window.location.origin);
    } catch {
      // Cross-origin or detached frames are not addressable; ignore.
    }
  });
};

export const broadcastModeToPreviewIframes = (mode: 'light' | 'dark'): void => {
  broadcastToPreviewIframes({ mode });
};

export const applyRuntimeThemeStylesheet = (themeId: string): void => {
  if (typeof document === 'undefined') {
    return;
  }

  const resolvedTheme = THEME_IDS.includes(themeId) ? themeId : 'default';
  setDocsTheme(resolvedTheme);
  broadcastToPreviewIframes({ themeId: resolvedTheme });
};

export const syncRuntimeThemeOnly = (themeId: string): void => {
  applyDocsTheme(themeId);
};
