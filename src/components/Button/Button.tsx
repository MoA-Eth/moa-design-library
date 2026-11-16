import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { UiButton } from '../ui/button';
import { spinnerClass } from './styles';
import type { ButtonProps } from './types';

function resolveIconNode(icon: React.ReactNode | unknown): React.ReactNode {
  if (!icon) return null;
  if (React.isValidElement(icon)) return icon;
  if (typeof icon === 'function' || (typeof icon === 'object' && icon !== null && ('$$typeof' in icon || 'render' in icon))) {
    return React.createElement(icon as any, { className: 'h-4 w-4' });
  }
  return icon as React.ReactNode;
}

/**
 * A button. One primary button per page or dialog, for its main action; others are secondary or outline.
 * While `loading`, it shows a spinner, is disabled and tells assistive technology it is busy.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, leftIcon, rightIcon, asChild = false, disabled, children, label, access: _access, canAccess: _canAccess, accessDeniedBehavior: _adb, ...props }, ref) => {
    const uiVariant = (variant === 'primary' ? 'default' : variant) as any;
    const uiSize = (size === 'md' ? 'default' : size) as any;
    // A child element (asChild) keeps its own content: icons and spinner can't be added around it
    if (asChild) {
      return (
        <UiButton ref={ref} variant={uiVariant} size={uiSize} asChild {...props}>
          {children ?? label}
        </UiButton>
      );
    }
    return (
      <UiButton ref={ref} variant={uiVariant} size={uiSize} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
        {loading ? <Loader2 className={spinnerClass} aria-hidden="true" /> : resolveIconNode(leftIcon)}
        {children ?? label}
        {!loading && resolveIconNode(rightIcon)}
      </UiButton>
    );
  },
);
Button.displayName = 'Button';
