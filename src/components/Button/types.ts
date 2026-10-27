import type * as React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary for the one main action of a page; secondary/outline beside it; destructive for delete or reject */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner and blocks clicks while the action runs */
  loading?: boolean;
  /** Icon before the label */
  leftIcon?: React.ReactNode;
  /** Icon after the label */
  rightIcon?: React.ReactNode;
  /** Render the child element (e.g. a router link) with the button's look */
  asChild?: boolean;
}
