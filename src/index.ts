// The styles are built into dist/index.css; apps load them once with `import '@moa-eth/moa-design-library/styles.css'`
import './styles.css';

export { Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';
export { Input } from './components/Input';
export type { InputProps } from './components/Input';
export { Chip } from './components/Chip';
export type { ChipProps, ChipTone } from './components/Chip';
export { Card } from './components/Card';
export type { CardProps } from './components/Card';

export { cn } from './lib/utils';

/** The version of the library in use */
export const version: string = __MOA_DESIGN_LIBRARY_VERSION__;
