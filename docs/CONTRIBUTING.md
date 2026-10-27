# Contributing

1. Branch from `main`.
2. Make the change. A new component gets its folder under `src/components/<Name>/` with its tests, and is added to
   `src/index.ts`, `ai/contracts/` and `docs/COMPONENTS.md` (see [AGENTS.md](../AGENTS.md) for the checklist).
3. Add a changeset: `pnpm changeset` (patch: a fix, minor: something new, major: a breaking change).
4. Check: `pnpm validate:contracts && pnpm lint && pnpm typecheck && pnpm test && pnpm build`.
5. Commit with a Conventional Commit message (`feat(button): …`, `fix(input): …`) and open a pull request.
6. A maintainer reviews. On merge to `main`, CI opens a "Version packages" pull request; merging it publishes the release.

Rules for every component: accessible with keyboard and screen reader, forwards its ref, accepts `className`,
uses only theme colours, has tests, and its wording is short plain English.
