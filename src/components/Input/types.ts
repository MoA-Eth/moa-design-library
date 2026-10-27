import type * as React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Shown above the field and read out with it */
  label?: string;
  /** Help under the field, e.g. the expected format */
  hint?: React.ReactNode;
  /** What is wrong with the value; marks the field invalid and replaces the hint */
  error?: string;
}
