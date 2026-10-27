import * as React from 'react';
import { UiCard, UiCardContent, UiCardFooter, UiCardHeader, UiCardTitle } from '../ui/card';
import type { CardProps } from './types';

/** A panel grouping related content, with an optional title, description, header actions and footer */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ title, description, actions, footer, children, ...props }, ref) => {
  const titleId = React.useId();
  return (
    <UiCard ref={ref} role={title ? 'region' : undefined} aria-labelledby={title ? titleId : undefined} {...props}>
      {(title || description || actions) && (
        <UiCardHeader>
          <div className="min-w-0">
            {title && <UiCardTitle id={titleId}>{title}</UiCardTitle>}
            {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </UiCardHeader>
      )}
      {children !== undefined && children !== null && <UiCardContent>{children}</UiCardContent>}
      {footer && <UiCardFooter>{footer}</UiCardFooter>}
    </UiCard>
  );
});
Card.displayName = 'Card';
