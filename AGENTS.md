# Guide for AI coding tools

Read this before building screens with `@moa-eth/moa-design-library` or changing the library.

## Using the library in an app

- Import components only from `@moa-eth/moa-design-library`; styles from `@moa-eth/moa-design-library/styles.css`;
  themes from `@moa-eth/moa-design-library/themes/<name>.css`. Never from `dist/` or `src/`.
- Before using a component, read its contract in `ai/contracts/components/<Name>.json`: its props, examples and rules.
  Follow the rules there (e.g. one primary Button per page; every Input has a label).
- Use a library component instead of writing a new button, field, status label or panel.
- Use the theme's semantic classes (`bg-primary`, `text-muted-foreground`, `bg-success-soft`…), never raw colours,
  so the app follows the theme and dark mode.
- Wording: short, plain English. Buttons are verbs (Save, Submit for approval). Errors say what is wrong and how to fix it.

## Changing the library

- Each public component has its own folder `src/components/<Name>/`: `<Name>.tsx`, `types.ts`, `styles.ts`,
  `index.ts`, `<Name>.test.tsx`. Building blocks shared by components live in `src/components/ui/`.
- A new or changed public component also updates: `src/index.ts`, `ai/contracts/index.json`,
  `ai/contracts/components/<Name>.json`, `docs/COMPONENTS.md`, and a changeset (`pnpm changeset`).
- Every component: forwards its ref, accepts `className` (merged with `cn`), works with keyboard and screen readers, and has tests.
- Colours come only from theme variables (`src/themes/*.css`) through the classes in `src/styles.css`.
- Before finishing: `pnpm validate:contracts && pnpm lint && pnpm typecheck && pnpm test && pnpm build`.
- Commits follow Conventional Commits (`feat:`, `fix:`, `docs:`…).
