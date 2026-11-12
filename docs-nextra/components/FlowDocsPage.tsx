import { type JSX } from 'react';
import Link from 'next/link';
import { FlowExampleTabs, type FlowExampleId } from './FlowExampleTabs';
import { withBasePath } from './withBasePath';

type FlowDoc = Readonly<{
  title: string;
  summary: string;
  highlights: readonly string[];
}>;

const FLOW_DOCS: Record<FlowExampleId, FlowDoc> = {
  'model19-receiving': {
    title: 'Model 19 Store Receiving',
    summary:
      'A reference Ministry of Agriculture warehouse voucher screen composing Card, Input, Chip, and Button inside an isolated responsive preview frame.',
    highlights: [
      'Composes Card, Input, Chip, and Button with MoA semantic tokens',
      'Runs inside an isolated static iframe synced via postMessage theme & mode bridge',
      'Includes inline voucher validation and approval state transition',
    ],
  },
};

export function FlowDocsPage({ flow }: Readonly<{ flow: FlowExampleId }>): JSX.Element {
  const doc = FLOW_DOCS[flow];
  const previewSrc = withBasePath(`/preview/flows/${flow}/`);

  return (
    <article className="component-doc-page">
      <header className="component-doc-hero">
        <p className="component-doc-hero__eyebrow">Composable MoA Flow</p>
        <h1>{doc.title}</h1>
        <p className="component-doc-hero__summary">{doc.summary}</p>
        <div className="component-doc-badges">
          {doc.highlights.map((item) => (
            <span key={item} className="component-doc-badge">
              {item}
            </span>
          ))}
        </div>
      </header>

      <section className="component-doc-section">
        <div className="component-doc-section__header">
          <h2>Interactive Preview</h2>
          <p>
            Resize the preview frame with presets or the drag handle, switch themes in the top navbar, or inspect the source files in the
            Code tab.
          </p>
        </div>
        <FlowExampleTabs flow={flow} previewSrc={previewSrc} />
      </section>
    </article>
  );
}

export function FlowDocsIndexPage(): JSX.Element {
  return (
    <article className="component-doc-page">
      <header className="component-doc-hero">
        <p className="component-doc-hero__eyebrow">Reference screens</p>
        <h1>Flows</h1>
        <p className="component-doc-hero__summary">
          Full-screen composition examples built exclusively from <code>@moa-eth/moa-design-library</code> components, rendered inside
          resizable isolated iframes.
        </p>
      </header>

      <section className="component-doc-section">
        <div className="component-doc-prop-grid">
          <Link href="/flows/model19-receiving/" className="component-doc-prop-card component-doc-prop-card--link">
            <h3>Model 19 Store Receiving</h3>
            <p>{FLOW_DOCS['model19-receiving'].summary}</p>
          </Link>
        </div>
      </section>
    </article>
  );
}
