import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { UiButton } from '../ui/button';
import { spinnerClass } from './styles';
import type { ButtonProps } from './types';

/**
 * A button. One primary button per page or dialog, for its main action; others are secondary or outline.
 * While `loading`, it shows a spinner, is disabled and tells assistive technology it is busy.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, leftIcon, rightIcon, asChild = false, disabled, children, ...props }, ref) => {
    // A child element (asChild) keeps its own content: icons and spinner can't be added around it
    if (asChild) {
      return (
        <UiButton ref={ref} variant={variant} size={size} asChild {...props}>
          {children}
        </UiButton>
      );
    }
    return (
      <UiButton ref={ref} variant={variant} size={size} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
        {loading ? <Loader2 className={spinnerClass} aria-hidden="true" /> : leftIcon}
        {children}
        {!loading && rightIcon}
      </UiButton>
    );
  },
);
Button.displayName = 'Button';
