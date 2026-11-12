import { useEffect, useState, type JSX } from 'react';
import { Button, Card, Chip, Input } from '@moa-eth/moa-design-library';
import { THEME_CHANGE_EVENT, THEME_OPTIONS, initializeDocsTheme, setDocsTheme, type BuiltInThemeId } from './docsTheme';

const TOKEN_GROUPS = [
  {
    group: 'Brand & Surface',
    tokens: [
      { label: 'Background', token: '--background' },
      { label: 'Foreground', token: '--foreground' },
      { label: 'Surface', token: '--surface' },
      { label: 'Primary', token: '--primary' },
      { label: 'Primary Hover', token: '--primary-hover' },
      { label: 'Accent (Gold)', token: '--accent' },
      { label: 'Destructive', token: '--destructive' },
      { label: 'Border', token: '--border' },
    ],
  },
  {
    group: 'Status Soft Tokens',
    tokens: [
      { label: 'Success Soft', token: '--success-soft' },
      { label: 'Info Soft', token: '--info-soft' },
      { label: 'Warning Soft', token: '--warning-soft' },
      { label: 'Danger Soft', token: '--danger-soft' },
      { label: 'Neutral Soft', token: '--neutral-soft' },
    ],
  },
] as const;

export function ThemePlayground(): JSX.Element {
  const [activeId, setActiveId] = useState<BuiltInThemeId>('default');
  const [localDark, setLocalDark] = useState(false);
  const [sampleNo, setSampleNo] = useState('M19-2026-0412');

  useEffect(() => {
    setActiveId(initializeDocsTheme());

    const handle = (event: Event) => {
      setActiveId((event as CustomEvent<BuiltInThemeId>).detail);
    };

    globalThis.addEventListener(THEME_CHANGE_EVENT, handle);
    return () => globalThis.removeEventListener(THEME_CHANGE_EVENT, handle);
  }, []);

  return (
    <section id="theme-playground" className="moa-theme-playground" aria-label="Live theme playground">
      <div className="moa-theme-playground__header">
        <div className="moa-theme-playground__selector-row">
          <label htmlFor="playground-theme-select" className="moa-theme-playground__selector-label">
            Active theme
          </label>
          <select
            id="playground-theme-select"
            className="moa-theme-playground__selector"
            value={activeId}
            onChange={(event) => setDocsTheme(event.target.value)}
          >
            {THEME_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="moa-theme-playground__mode-toggle"
          aria-pressed={localDark}
          onClick={() => setLocalDark((prev) => !prev)}
        >
          {localDark ? 'Playground: Dark' : 'Playground: Light'}
        </button>
      </div>

      <div data-moa-card-theme={activeId} className={`moa-theme-playground__canvas ${localDark ? 'dark' : ''}`}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card
            title="Live Component Surface"
            description="Every component reads CSS variables directly."
            actions={
              <Chip tone="success" dot>
                Active
              </Chip>
            }
            footer={
              <>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save Entry</Button>
              </>
            }
          >
            <div className="grid gap-4">
              <Input
                label="Model 19 Reference"
                hint="Switch themes above to inspect borders, focus ring, and radius."
                value={sampleNo}
                onChange={(event) => setSampleNo(event.target.value)}
              />
              <div className="flex flex-wrap gap-2">
                <Chip tone="success" dot>
                  In store
                </Chip>
                <Chip tone="info">Verified</Chip>
                <Chip tone="warning" dot>
                  Pending
                </Chip>
                <Chip tone="danger">Rejected</Chip>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="secondary">
                  Secondary
                </Button>
                <Button size="sm" variant="destructive">
                  Reject
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid gap-4">
            {TOKEN_GROUPS.map((group) => (
              <div key={group.group} className="moa-token-group">
                <h3 className="moa-token-group__title">{group.group}</h3>
                <div className="moa-token-grid">
                  {group.tokens.map((item) => (
                    <div key={item.token} className="moa-token-row">
                      <span className="moa-token-row__swatch" style={{ backgroundColor: `var(${item.token})` }} />
                      <div>
                        <div className="moa-token-row__label">{item.label}</div>
                        <code className="moa-token-row__var">{item.token}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
