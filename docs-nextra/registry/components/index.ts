import type { JSX } from 'react';
import { ButtonExample } from './button/ButtonExample';
import { CardExample } from './card/CardExample';
import { ChipExample } from './chip/ChipExample';
import { InputExample } from './input/InputExample';

export type ComponentExampleId = 'button' | 'input' | 'chip' | 'card';

export const COMPONENT_EXAMPLE_RENDERERS: Record<ComponentExampleId, () => JSX.Element> = {
  button: ButtonExample,
  input: InputExample,
  chip: ChipExample,
  card: CardExample,
};
