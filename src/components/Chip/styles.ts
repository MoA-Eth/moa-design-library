import { cva } from 'class-variance-authority';

export const chipVariants = cva(
  'inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-semibold leading-4 [&_svg]:size-3',
  {
    variants: {
      tone: {
        success: 'bg-success-soft text-success-soft-foreground border-success-soft-border',
        info: 'bg-info-soft text-info-soft-foreground border-info-soft-border',
        warning: 'bg-warning-soft text-warning-soft-foreground border-warning-soft-border',
        danger: 'bg-danger-soft text-danger-soft-foreground border-danger-soft-border',
        neutral: 'bg-neutral-soft text-neutral-soft-foreground border-neutral-soft-border',
      },
    },
    defaultVariants: { tone: 'neutral' },
  },
);

export const dotClass = 'size-1.5 rounded-full bg-current';
