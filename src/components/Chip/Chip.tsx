import * as React from 'react';
import { cn } from '../../lib/utils';
import { chipVariants, dotClass } from './styles';
import type { ChipProps } from './types';

/** A short status label, e.g. "In store", "Pending", "Rejected". The words carry the meaning; the colour only supports it. */
export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ tone = 'neutral', icon, dot = false, className, children, ...props }, ref) => (
    <span ref={ref} className={cn(chipVariants({ tone }), className)} {...props}>
      {dot && <span className={dotClass} aria-hidden="true" />}
      {icon}
      {children}
    </span>
  ),
);
Chip.displayName = 'Chip';
