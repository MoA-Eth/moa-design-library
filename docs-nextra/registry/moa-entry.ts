// Docs-only re-export of @moa-eth/moa-design-library's public surface.
// Mirrors src/index.ts without the `import './styles.css'` side-effect because Next.js
// Pages Router only allows global CSS imports in pages/_app.jsx.
export { Button } from '../../src/components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from '../../src/components/Button';
export { Input } from '../../src/components/Input';
export type { InputProps } from '../../src/components/Input';
export { Chip } from '../../src/components/Chip';
export type { ChipProps, ChipTone } from '../../src/components/Chip';
export { Card } from '../../src/components/Card';
export type { CardProps } from '../../src/components/Card';

export { cn } from '../../src/lib/utils';

export const version: string = typeof __MOA_DESIGN_LIBRARY_VERSION__ !== 'undefined' ? __MOA_DESIGN_LIBRARY_VERSION__ : '0.0.0';
