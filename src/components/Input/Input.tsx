import * as React from 'react';
import { UiInput } from '../ui/input';
import { UiLabel } from '../ui/label';
import { cn } from '../../lib/utils';
import type { InputProps } from './types';

/**
 * A text field with its label, a hint and an error. The label, hint and error are tied to the field,
 * so a screen reader reads them together; an error marks the field invalid.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      hint,
      helperText,
      infoText,
      error,
      required,
      className,
      endAdornment,
      ...props
    },
    ref,
  ) => {
    const generated = React.useId();
    const inputId = id ?? name ?? generated;
    const messageId = `${inputId}-message`;
    const message = error ?? helperText ?? hint ?? infoText;
    return (
      <div className="grid w-full gap-1.5">
        {label && (
          <UiLabel htmlFor={inputId}>
            {label}
            {required && <span className="text-destructive ml-0.5">*</span>}
          </UiLabel>
        )}
        <div className="relative flex items-center w-full">
          <UiInput
            ref={ref}
            id={inputId}
            name={name}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={message ? messageId : undefined}
            className={cn(endAdornment ? 'pr-9' : '', className)}
            {...props}
          />
          {endAdornment && (
            <div className="absolute right-2 flex items-center pointer-events-auto">
              {endAdornment}
            </div>
          )}
        </div>
        {message && (
          <p
            id={messageId}
            role={error ? 'alert' : undefined}
            className={cn(
              'text-[11px]',
              error ? 'font-medium text-destructive' : 'text-muted-foreground',
            )}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
