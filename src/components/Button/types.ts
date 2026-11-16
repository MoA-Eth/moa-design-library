import type * as React from 'react';
import type {
  AccessConfig,
  AccessMatch,
  AccessResolver,
  AccessRule,
} from '@lib/access-types';

export const ButtonVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE: 'outline',
  OUTLINED: 'outline',
  GHOST: 'ghost',
  DESTRUCTIVE: 'destructive',
  LINK: 'link',
  ICON: 'icon',
  DEFAULT: 'primary',
  Default: 'primary',
  Primary: 'primary',
  Outlined: 'outline',
  Outline: 'outline',
  Destructive: 'destructive',
  Ghost: 'ghost',
  Link: 'link',
  Icon: 'icon',
} as const;

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export type ButtonAccessMode = 'action';
export type ButtonAccessMatch = AccessMatch;
export type ButtonAccessRule = AccessRule<ButtonAccessMode>;
export type ButtonAccessConfig = AccessConfig<ButtonAccessMode>;
export type ButtonAccessDeniedBehavior = 'hide' | 'disable';
export type ButtonAccessResolver = AccessResolver<
  ButtonAccessMode,
  ButtonAccessRule
>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
  /** Button label alternative to children */
  label?: string;
  /** Optional access configuration */
  access?: ButtonAccessConfig;
  /** Optional access resolver function */
  canAccess?: ButtonAccessResolver;
  /** Optional behavior when access is denied */
  accessDeniedBehavior?: ButtonAccessDeniedBehavior;
}
