import * as React from 'react';
import { cn } from '../../lib/utils';
import { chipVariants, dotClass } from './styles';
import type { ChipProps } from './types';

function resolveIconNode(icon: React.ReactNode | unknown): React.ReactNode {
  if (!icon) return null;
  if (React.isValidElement(icon)) return icon;
  if (typeof icon === 'function' || (typeof icon === 'object' && icon !== null && ('$$typeof' in icon || 'render' in icon))) {
    return React.createElement(icon as any, { className: 'h-3.5 w-3.5' });
  }
  return icon as React.ReactNode;
}

/** A short status label, e.g. "In store", "Pending", "Rejected". The words carry the meaning; the colour only supports it. */
export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ tone = 'neutral', icon, dot = false, className, children, label, variant: _variant, size: _size, ...props }, ref) => (
    <span ref={ref} className={cn(chipVariants({ tone }), className)} {...props}>
      {dot && <span className={dotClass} aria-hidden="true" />}
      {resolveIconNode(icon)}
      {children ?? label}
    </span>
  ),
);
Chip.displayName = 'Chip';
