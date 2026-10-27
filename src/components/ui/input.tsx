import * as React from 'react';
import { cn } from '../../lib/utils';

export const UiInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-9 w-full rounded-control border border-input bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground transition-colors',
        'hover:border-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary',
        'disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive',
        className,
      )}
      {...props}
    />
  ),
);
UiInput.displayName = 'UiInput';
