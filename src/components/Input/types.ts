import type * as React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Shown above the field and read out with it */
  label?: string;
  /** Help under the field, e.g. the expected format */
  hint?: React.ReactNode;
  /** Synonym for hint used in RapidKit components */
  helperText?: React.ReactNode;
  /** Explanatory info text under the field */
  infoText?: React.ReactNode;
  /** Optional icon or button placed at the end of the input */
  endAdornment?: React.ReactNode;
  /** What is wrong with the value; marks the field invalid and replaces the hint */
  error?: string;
}
