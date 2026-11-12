import type { JSX } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { COMPONENT_EXAMPLE_RENDERERS, type ComponentExampleId } from '../../../docs-nextra/registry/components';
import { useDocsPreviewThemeBridge } from '../../../docs-nextra/components/usePreviewThemeBridge';

type ComponentPreviewRouteProps = Readonly<{
  component: ComponentExampleId;
}>;

const COMPONENT_IDS = Object.keys(COMPONENT_EXAMPLE_RENDERERS) as ComponentExampleId[];

export const getStaticPaths: GetStaticPaths = () => ({
  paths: COMPONENT_IDS.map((component) => ({ params: { component } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<ComponentPreviewRouteProps> = ({ params }) => {
  const component = params?.component as ComponentExampleId;
  return { props: { component } };
};

export default function ComponentPreviewRoute({ component }: ComponentPreviewRouteProps): JSX.Element {
  useDocsPreviewThemeBridge(component);
  const Preview = COMPONENT_EXAMPLE_RENDERERS[component];

  return (
    <div className="min-h-screen w-full bg-background p-6 text-foreground md:p-10">
      <div className="mx-auto max-w-4xl">
        <Preview />
      </div>
    </div>
  );
}
