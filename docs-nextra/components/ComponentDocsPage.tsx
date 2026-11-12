import { type JSX } from 'react';
import Link from 'next/link';
import { ComponentExampleTabs, type ComponentExampleId } from './ComponentExampleTabs';
import { DocsCodePreview } from './DocsCodePreview';

type PropDoc = Readonly<{
  name: string;
  description: string;
}>;

type ComponentDoc = Readonly<{
  title: string;
  summary: string;
  highlights: readonly string[];
  importCode: string;
  keyProps: readonly PropDoc[];
  accessibility: string;
  guidance: readonly string[];
}>;

const COMPONENT_DOCS: Record<ComponentExampleId, ComponentDoc> = {
  button: {
    title: 'Button',
    summary:
      'Runs an action, or (with asChild) styles a router link as a button. Use one primary button per page or dialog for its main action.',
    highlights: ['6 semantic variants', 'Loading spinner + aria-busy', 'asChild Radix Slot'],
    importCode: "import { Button } from '@moa-eth/moa-design-library';",
    keyProps: [
      {
        name: 'variant',
        description: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link' (default: 'primary').",
      },
      {
        name: 'size',
        description: "'sm' | 'md' | 'lg' | 'icon' (default: 'md').",
      },
      {
        name: 'loading',
        description: 'Replaces the leading icon with a spinner, disables clicks, and sets aria-busy.',
      },
      {
        name: 'leftIcon / rightIcon',
        description: 'Optional icons placed before or after the button label.',
      },
      {
        name: 'asChild',
        description: 'Renders the single child (e.g. an <a> or Next Link) with button styling.',
      },
    ],
    accessibility:
      'Icon-only buttons (size="icon") must include an aria-label. Loading buttons expose aria-busy="true" and suppress duplicate submissions.',
    guidance: [
      'Reserve destructive buttons strictly for actions that delete, reject, or cancel records.',
      'Write concise verb labels ("Save", "Approve Receipt", "Reject") rather than generic text.',
    ],
  },
  input: {
    title: 'Input',
    summary: 'A single-line form field with a connected label, helper hint, and accessible inline validation error message.',
    highlights: ['Linked label + aria-describedby', 'Accessible error alerts', 'Disabled & numeric support'],
    importCode: "import { Input } from '@moa-eth/moa-design-library';",
    keyProps: [
      {
        name: 'label',
        description: 'Visible label rendered above the field and associated via htmlFor.',
      },
      {
        name: 'hint',
        description: 'Helper copy displayed below the input when no error is active.',
      },
      {
        name: 'error',
        description: 'Marks the input aria-invalid, announces role="alert", and replaces the hint.',
      },
      {
        name: '...inputProps',
        description: 'Forwards standard HTML <input> attributes (type, value, onChange, disabled, etc.).',
      },
    ],
    accessibility:
      'Label, hint, and error message are automatically wired via generated IDs and aria-describedby so screen readers announce context together.',
    guidance: [
      'Always provide a label; use placeholder strictly for format examples.',
      'Write errors as one actionable sentence stating what is wrong and how to fix it.',
    ],
  },
  chip: {
    title: 'Chip',
    summary:
      'A non-interactive status badge used to surface state ("In store", "Pending verification", "Rejected") with semantic soft tokens.',
    highlights: ['5 semantic status tones', 'Optional status dot', 'Leading icon slot'],
    importCode: "import { Chip } from '@moa-eth/moa-design-library';",
    keyProps: [
      {
        name: 'tone',
        description: "'success' | 'info' | 'warning' | 'danger' | 'neutral' (default: 'neutral').",
      },
      {
        name: 'dot',
        description: 'Renders a small decorative status dot colored with currentColor before the text.',
      },
      {
        name: 'icon',
        description: 'Optional leading icon element before the label.',
      },
      {
        name: '...spanProps',
        description: 'Forwards standard <span> attributes and className overrides.',
      },
    ],
    accessibility: 'Decorative dots carry aria-hidden="true". Color only supports the written status label; never rely on color alone.',
    guidance: [
      'Chips represent static status — never turn a Chip into a clickable button or filter toggle.',
      'Keep labels concise (one to three words).',
    ],
  },
  card: {
    title: 'Card',
    summary:
      'A structured panel grouping related fields or summaries with an optional header title, description, header actions, and footer.',
    highlights: ['Named landmark region', 'Header action slot', 'Aligned footer actions'],
    importCode: "import { Card } from '@moa-eth/moa-design-library';",
    keyProps: [
      {
        name: 'title',
        description: 'Optional heading; when supplied, turns the card into an accessible named region.',
      },
      {
        name: 'description',
        description: 'Supporting subtitle rendered directly beneath the card title.',
      },
      {
        name: 'actions',
        description: 'Slot aligned to the right side of the header (status Chip, compact Buttons).',
      },
      {
        name: 'footer',
        description: 'Right-aligned bottom bar for primary or secondary card actions.',
      },
    ],
    accessibility: 'Cards with a title automatically set role="region" and aria-labelledby pointing to the card heading.',
    guidance: [
      'Give a card a clear title whenever multiple cards appear on the same screen.',
      'Keep footer buttons scoped only to actions belonging to that card.',
    ],
  },
};

export function ComponentDocsPage({ component }: Readonly<{ component: ComponentExampleId }>): JSX.Element {
  const doc = COMPONENT_DOCS[component];
  const installCode = 'pnpm add @moa-eth/moa-design-library';

  return (
    <article className="component-doc-page">
      <header className="component-doc-hero">
        <p className="component-doc-hero__eyebrow">MoA UI Component</p>
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
          <h2>Installation</h2>
          <p>Install the package from GitHub Packages in your MoA application.</p>
        </div>
        <DocsCodePreview code={installCode} language="bash" />
      </section>

      <section className="component-doc-section">
        <div className="component-doc-section__header">
          <h2>Usage</h2>
          <p>Import directly from the package root entrypoint.</p>
        </div>
        <DocsCodePreview code={doc.importCode} language="tsx" />
      </section>

      <section className="component-doc-section">
        <div className="component-doc-section__header">
          <h2>Examples</h2>
          <p>Interact with the live component preview, test responsive widths, or copy the TSX source.</p>
        </div>
        <ComponentExampleTabs component={component} />
      </section>

      <section className="component-doc-section" id="api-reference">
        <div className="component-doc-section__header">
          <h2>API Reference</h2>
          <p>Core props supported by {doc.title}.</p>
        </div>

        <div className="component-doc-api-table-wrap">
          <table className="component-doc-api-table">
            <thead>
              <tr>
                <th scope="col">Prop</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {doc.keyProps.map((prop) => (
                <tr key={prop.name}>
                  <td>{prop.name}</td>
                  <td>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="component-doc-note-grid">
        <section className="component-doc-note-card">
          <h2>Accessibility</h2>
          <p>{doc.accessibility}</p>
        </section>

        <section className="component-doc-note-card">
          <h2>Usage Rules</h2>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-muted-foreground">
            {doc.guidance.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}

export function ComponentDocsIndexPage(): JSX.Element {
  const entries = (Object.keys(COMPONENT_DOCS) as ComponentExampleId[]).map((slug) => ({
    slug,
    ...COMPONENT_DOCS[slug],
  }));

  return (
    <article className="component-doc-page">
      <header className="component-doc-hero">
        <p className="component-doc-hero__eyebrow">Component library</p>
        <h1>Components</h1>
        <p className="component-doc-hero__summary">
          Accessible, theme-driven React primitives built for Ministry of Agriculture (MoA) web applications. Every component includes an
          interactive preview, responsive width checks, and an AI contract under <code>ai/contracts/components/</code>.
        </p>
      </header>

      <section className="component-doc-section">
        <div className="component-doc-prop-grid">
          {entries.map((entry) => (
            <Link key={entry.slug} href={`/components/${entry.slug}/`} className="component-doc-prop-card component-doc-prop-card--link">
              <h3>{entry.title}</h3>
              <p>{entry.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
