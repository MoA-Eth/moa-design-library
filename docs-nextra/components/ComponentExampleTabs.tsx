import { useState, type JSX } from 'react';
import Link from 'next/link';
import { ExternalLink, Laptop, Smartphone, Tablet } from 'lucide-react';
import { ExampleTabs } from './ExampleTabs';
import { COMPONENT_EXAMPLE_RENDERERS, type ComponentExampleId } from '../registry/components';
import { EXAMPLE_CODE } from '../registry/generated/exampleCode';

type PreviewViewport = 'desktop' | 'laptop' | 'tablet' | 'mobile';
type CopyState = 'idle' | 'done' | 'error';

const VIEWPORT_OPTIONS: Array<{
  id: Exclude<PreviewViewport, 'desktop'>;
  label: string;
  shortLabel: string;
  Icon: typeof Smartphone;
}> = [
  { id: 'mobile', label: 'Mobile preview (390px)', shortLabel: 'SM', Icon: Smartphone },
  { id: 'tablet', label: 'Tablet preview (768px)', shortLabel: 'MD', Icon: Tablet },
  { id: 'laptop', label: 'Laptop preview (1024px)', shortLabel: 'LG', Icon: Laptop },
];

function getCopyLabel(state: CopyState): string {
  if (state === 'done') return 'Copied';
  if (state === 'error') return 'Failed';
  return 'Copy';
}

export type { ComponentExampleId };

export function ComponentExampleTabs({ component }: Readonly<{ component: ComponentExampleId }>): JSX.Element {
  const [viewport, setViewport] = useState<PreviewViewport>('desktop');
  const [copyState, setCopyState] = useState<CopyState>('idle');

  const Preview = COMPONENT_EXAMPLE_RENDERERS[component];
  const generated = EXAMPLE_CODE[component] ?? { code: '', html: '' };

  async function copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(generated.code);
      setCopyState('done');
    } catch {
      setCopyState('error');
    }
    setTimeout(() => setCopyState('idle'), 1500);
  }

  const viewportControls = (
    <div className="component-example-tabs__viewport-group" role="group" aria-label="Preview viewport">
      {VIEWPORT_OPTIONS.map(({ id, label, shortLabel, Icon }) => {
        const isActive = viewport === id;
        const nextLabel = isActive ? 'Switch to desktop preview' : label;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={isActive}
            aria-label={nextLabel}
            title={nextLabel}
            className={`component-example-tabs__viewport-toggle ${isActive ? 'is-active' : ''}`}
            onClick={() => setViewport((current) => (current === id ? 'desktop' : id))}
          >
            <Icon size={13} aria-hidden="true" />
            <span className="component-example-tabs__viewport-toggle-label">{shortLabel}</span>
          </button>
        );
      })}
      <Link
        href={`/preview/components/${component}/`}
        target="_blank"
        rel="noreferrer"
        className="component-example-tabs__viewport-toggle"
        title="Open isolated preview"
        aria-label="Open isolated preview in new tab"
      >
        <ExternalLink size={12} aria-hidden="true" />
      </Link>
    </div>
  );

  const previewSlot = (
    <div
      className={`component-example-tabs__preview component-example-tabs__preview--${component} ${
        viewport !== 'desktop' ? `component-example-tabs__preview--sim component-example-tabs__preview--sim-${viewport}` : ''
      }`}
    >
      {viewport !== 'desktop' ? (
        <div className={`component-example-tabs__sim-frame component-example-tabs__sim-frame--${viewport}`}>
          <Preview />
        </div>
      ) : (
        <Preview />
      )}
    </div>
  );

  const codeSlot = (
    <div className="component-example-tabs__code-viewer">
      <button type="button" className="component-example-tabs__copy-btn" onClick={() => void copyCode()} aria-label="Copy code snippet">
        {getCopyLabel(copyState)}
      </button>

      <div className="component-example-tabs__code-scroll component-example-tabs__code-block">
        {generated.html ? (
          <div className="component-example-tabs__shiki" dangerouslySetInnerHTML={{ __html: generated.html }} />
        ) : (
          <pre>
            <code>{generated.code}</code>
          </pre>
        )}
      </div>
    </div>
  );

  return (
    <div className="component-example-tabs-host">
      <ExampleTabs previewSlot={previewSlot} codeSlot={codeSlot} rightControls={viewportControls} />
    </div>
  );
}
