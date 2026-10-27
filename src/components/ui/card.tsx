import * as React from 'react';
import { cn } from '../../lib/utils';

export const UiCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('rounded-control border border-border bg-background text-foreground shadow-xs', className)} {...props} />
));
UiCard.displayName = 'UiCard';

export const UiCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-start justify-between gap-3 border-b border-border px-4 py-3', className)} {...props} />
));
UiCardHeader.displayName = 'UiCardHeader';

export const UiCardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h3 ref={ref} className={cn('text-sm font-bold text-foreground', className)} {...props} />,
);
UiCardTitle.displayName = 'UiCardTitle';

export const UiCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('px-4 py-3 text-[13px]', className)} {...props} />
));
UiCardContent.displayName = 'UiCardContent';

export const UiCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center justify-end gap-2 border-t border-border px-4 py-3', className)} {...props} />
));
UiCardFooter.displayName = 'UiCardFooter';
