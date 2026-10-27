# Architecture

```
src/
  index.ts                 the one public entry: exports components, types, cn, version
  styles.css               Tailwind, the semantic classes, base styles  → dist/index.css (styles.css)
  themes/                  theme files (CSS variables)                  → dist/themes/*
  lib/utils.ts             cn(): joins classes, later Tailwind classes win
  components/
    ui/                    building blocks (Radix + Tailwind), not exported
    <Name>/                a public component:
      <Name>.tsx             the component
      types.ts               its props
      styles.ts              its class variants
      index.ts               what the folder exports
      <Name>.test.tsx        its tests
ai/contracts/              one JSON contract per component, for AI coding tools
docs/                      component, theming and contribution guides
scripts/                   build helpers and the contract check
```

- **Build**: Vite library mode, ES modules, one file per module (`preserveModules`) so apps keep only what they use;
  `vite-plugin-dts` writes the types. Dependencies and React stay imports.
- **Styles**: Tailwind CSS 4 compiles the classes used in `src/` into `dist/index.css`.
- **Quality**: ESLint, Prettier, Vitest with Testing Library; Husky runs lint-staged on commit and commitlint on the message.
- **Releases**: Changesets turns change notes into versions and the CHANGELOG; CI publishes to GitHub Packages.
