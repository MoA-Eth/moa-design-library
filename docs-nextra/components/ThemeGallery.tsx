import { useEffect, useState, type JSX } from 'react';
import { THEME_CHANGE_EVENT, THEME_OPTIONS, initializeDocsTheme, setDocsTheme, type BuiltInThemeId } from './docsTheme';

const SWATCH_KEYS = [
  { key: 'primary', label: 'Primary' },
  { key: 'accent', label: 'Accent' },
  { key: 'surface', label: 'Surface' },
  { key: 'destructive', label: 'Destructive' },
  { key: 'success-soft', label: 'Success' },
  { key: 'warning-soft', label: 'Warning' },
  { key: 'info-soft', label: 'Info' },
  { key: 'danger-soft', label: 'Danger' },
] as const;

export function ThemeGallery(): JSX.Element {
  const [activeId, setActiveId] = useState<BuiltInThemeId>('default');
  const [darkPerCard, setDarkPerCard] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveId(initializeDocsTheme());

    const handle = (event: Event) => {
      setActiveId((event as CustomEvent<BuiltInThemeId>).detail);
    };

    globalThis.addEventListener(THEME_CHANGE_EVENT, handle);
    return () => globalThis.removeEventListener(THEME_CHANGE_EVENT, handle);
  }, []);

  const handleSelect = (id: BuiltInThemeId) => {
    setDocsTheme(id);
    if (typeof document !== 'undefined') {
      document.getElementById('theme-playground')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="moa-theme-gallery" aria-label="Theme gallery">
      <div className="moa-theme-gallery__grid">
        {THEME_OPTIONS.map((theme) => {
          const isActive = theme.id === activeId;
          const isDark = Boolean(darkPerCard[theme.id]);

          return (
            <div
              key={theme.id}
              data-moa-card-theme={theme.id}
              className={['moa-theme-card', isDark ? 'dark' : '', isActive ? 'moa-theme-card--active' : ''].filter(Boolean).join(' ')}
            >
              <div className="moa-theme-card__inner">
                <header className="moa-theme-card__head">
                  <button type="button" className="moa-theme-card__select" onClick={() => handleSelect(theme.id)} aria-pressed={isActive}>
                    <div className="moa-theme-card__name">{theme.label}</div>
                    <div className="moa-theme-card__note">{theme.note}</div>
                  </button>

                  <button
                    type="button"
                    className="moa-theme-card__mode"
                    onClick={() => setDarkPerCard((prev) => ({ ...prev, [theme.id]: !prev[theme.id] }))}
                    aria-pressed={isDark}
                  >
                    {isDark ? 'Dark' : 'Light'}
                  </button>
                </header>

                <div className="moa-theme-card__swatches">
                  {SWATCH_KEYS.map(({ key, label }) => (
                    <span
                      key={key}
                      className="moa-theme-card__swatch"
                      title={`${label}: var(--${key})`}
                      style={{ backgroundColor: `var(--${key})` }}
                    />
                  ))}
                </div>

                <div className="moa-theme-card__sample">
                  <span className="moa-theme-card__btn">Primary Action</span>
                  <span className="moa-theme-card__chip">In store</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
