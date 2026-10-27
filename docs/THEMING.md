# Theming

Components never use raw colours. They use semantic classes (`bg-primary`, `text-muted-foreground`, `border-border`,
`bg-success-soft`…), which `src/styles.css` maps to CSS variables. A theme is a CSS file that sets those variables.

## The default theme

`themes/default.css`: MoA green (`--primary: #00843d`), the national gold as accent, slate neutrals, 4px corners,
and a `.dark` block for dark mode. It is built into `styles.css`.

## Dark mode

Add the `dark` class to `<html>` (or any parent). The `.dark` block of the theme takes over.

## Making a theme

Copy `src/themes/default.css` to `src/themes/<name>.css` and change the values. Keep every variable:

| Variable group                                                                        | Used for                         |
| ------------------------------------------------------------------------------------- | -------------------------------- |
| `--background` `--foreground` `--surface`                                             | page and text                    |
| `--primary` `--primary-hover` `--primary-foreground`                                  | the action colour                |
| `--secondary*` `--muted*` `--accent*`                                                 | quieter surfaces and accents     |
| `--destructive*`                                                                      | delete, reject, cancel           |
| `--border` `--input` `--ring`                                                         | lines, field borders, focus ring |
| `--success-soft*` `--info-soft*` `--warning-soft*` `--danger-soft*` `--neutral-soft*` | status chips                     |
| `--radius`                                                                            | corner rounding                  |
| `--font-sans`                                                                         | the typeface                     |

An app uses it by loading it after the styles:

```tsx
import '@moa-eth/moa-design-library/styles.css';
import '@moa-eth/moa-design-library/themes/<name>.css';
```
