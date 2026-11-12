import { type JSX } from 'react';
import { ExampleTabs } from './ExampleTabs';
import { MultiFileCodePreview } from './MultiFileCodePreview';
import { PreviewFrame } from './PreviewFrame';
import { FLOW_EXAMPLE_FILES } from '../registry/generated/flowFiles';
import Model19ReceivingPreview from '../registry/flows/model19-receiving';

export type FlowExampleId = 'model19-receiving';

type FlowExample = Readonly<{
  defaultPath: string;
  render: () => JSX.Element;
}>;

const FLOW_EXAMPLES: Record<FlowExampleId, FlowExample> = {
  'model19-receiving': {
    defaultPath: 'Model19ReceivingPage.tsx',
    render: Model19ReceivingPreview,
  },
};

export const FLOW_EXAMPLE_IDS = Object.keys(FLOW_EXAMPLES) as FlowExampleId[];

export function FlowPreviewSurface({ flow }: Readonly<{ flow: FlowExampleId }>): JSX.Element {
  const Preview = FLOW_EXAMPLES[flow].render;
  return <Preview />;
}

export function FlowExampleTabs({ flow, previewSrc }: Readonly<{ flow: FlowExampleId; previewSrc: string }>): JSX.Element {
  const example = FLOW_EXAMPLES[flow];
  const files = FLOW_EXAMPLE_FILES[flow] ?? [];

  return (
    <ExampleTabs
      ariaLabel="Flow example tabs"
      previewPanelClassName="component-example-tabs__panel--flow"
      previewSlot={<PreviewFrame id={flow} previewSrc={previewSrc} titlePrefix="Flow Preview" iframeHeight="min(78vh, 620px)" />}
      codeSlot={<MultiFileCodePreview files={files} defaultPath={example.defaultPath} rootLabel={`flows/${flow}`} />}
    />
  );
}
