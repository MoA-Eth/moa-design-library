import type * as React from 'react';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Heading of the card */
  title?: React.ReactNode;
  /** A line under the title */
  description?: React.ReactNode;
  /** Buttons or links at the right of the header */
  actions?: React.ReactNode;
  /** Buttons along the bottom, right-aligned */
  footer?: React.ReactNode;
}
