import { useCallback, useEffect, useState, type JSX } from 'react';
import { Github, Moon, Palette, Sun } from 'lucide-react';
import { useTheme } from 'nextra-theme-docs';
import {
  MODE_STORAGE_KEY,
  THEME_OPTIONS,
  applyRuntimeThemeStylesheet,
  broadcastModeToPreviewIframes,
  resolveStoredThemeId,
} from './siteTheme';
import { THEME_CHANGE_EVENT, type BuiltInThemeId } from './docsTheme';

const resolveDocumentMode = (): 'light' | 'dark' => {
  if (typeof document === 'undefined') {
    return 'light';
  }

  const root = document.documentElement;
  if (root.classList.contains('dark') || root.dataset.theme === 'dark' || root.dataset.colorMode === 'dark') {
    return 'dark';
  }

  if (globalThis.localStorage !== undefined) {
    const stored = globalThis.localStorage.getItem(MODE_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
  }

  return 'light';
};

const applyDocumentMode = (mode: 'light' | 'dark'): void => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  root.classList.toggle('dark', mode === 'dark');
  root.dataset.theme = mode;
  root.dataset.colorMode = mode;

  if (globalThis.localStorage !== undefined) {
    globalThis.localStorage.setItem(MODE_STORAGE_KEY, mode);
  }
};

export function SiteHeaderExtras(): JSX.Element {
  const [themeId, setThemeId] = useState('default');
  const [fallbackMode, setFallbackMode] = useState<'light' | 'dark'>('light');
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
    setThemeId(resolveStoredThemeId());
    setFallbackMode(resolveDocumentMode());

    const handleThemeEvent = (event: Event) => {
      const detail = (event as CustomEvent<BuiltInThemeId>).detail;
      if (detail) {
        setThemeId(detail);
      }
    };

    globalThis.addEventListener(THEME_CHANGE_EVENT, handleThemeEvent);
    return () => globalThis.removeEventListener(THEME_CHANGE_EVENT, handleThemeEvent);
  }, []);

  const handleThemeChange = useCallback((nextThemeId: string) => {
    setThemeId(nextThemeId);
    applyRuntimeThemeStylesheet(nextThemeId);
  }, []);

  const hasResolvedMode = resolvedTheme === 'dark' || resolvedTheme === 'light';
  const currentMode = isMounted ? (hasResolvedMode ? resolvedTheme : fallbackMode) : 'light';
  const isDarkMode = currentMode === 'dark';

  const handleModeToggle = useCallback(() => {
    const nextMode: 'light' | 'dark' = isDarkMode ? 'light' : 'dark';
    setTheme(nextMode);
    applyDocumentMode(nextMode);
    setFallbackMode(nextMode);
    broadcastModeToPreviewIframes(nextMode);
  }, [isDarkMode, setTheme]);

  return (
    <div className="moa-site-header-tools">
      <label className="moa-theme-control" aria-label="Select documentation theme">
        <Palette className="moa-theme-option-icon" size={14} aria-hidden="true" />
        <select className="moa-theme-select" value={themeId} onChange={(event) => handleThemeChange(event.target.value)} aria-label="Theme">
          {THEME_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        className="moa-mode-toggle"
        onClick={handleModeToggle}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDarkMode ? 'Light mode' : 'Dark mode'}
      >
        {isDarkMode ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
      </button>

      <a
        className="moa-github-link"
        href="https://github.com/MoA-Eth/moa-design-library"
        target="_blank"
        rel="noreferrer"
        aria-label="MoA Design Library GitHub repository"
        title="GitHub"
      >
        <Github size={15} aria-hidden="true" />
      </a>
    </div>
  );
}
