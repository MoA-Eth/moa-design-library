import * as React from 'react';
import { UiInput } from '../ui/input';
import { UiLabel } from '../ui/label';
import { cn } from '../../lib/utils';
import type { InputProps } from './types';

/**
 * A text field with its label, a hint and an error. The label, hint and error are tied to the field,
 * so a screen reader reads them together; an error marks the field invalid.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ id, label, hint, error, className, ...props }, ref) => {
  const generated = React.useId();
  const inputId = id ?? generated;
  const messageId = `${inputId}-message`;
  const message = error ?? hint;
  return (
    <div className="grid w-full gap-1.5">
      {label && <UiLabel htmlFor={inputId}>{label}</UiLabel>}
      <UiInput
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={className}
        {...props}
      />
      {message && (
        <p
          id={messageId}
          role={error ? 'alert' : undefined}
          className={cn('text-[11px]', error ? 'font-medium text-destructive' : 'text-muted-foreground')}
        >
          {message}
        </p>
      )}
    </div>
  );
});
Input.displayName = 'Input';
