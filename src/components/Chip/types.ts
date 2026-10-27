import type * as React from 'react';

/** Status colours describe a state, never an action: success (done, in store), info, warning (waiting), danger (rejected), neutral */
export type ChipTone = 'success' | 'info' | 'warning' | 'danger' | 'neutral';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: ChipTone;
  /** Icon before the text */
  icon?: React.ReactNode;
  /** A small dot of the tone's colour before the text, for a quieter status */
  dot?: boolean;
}
