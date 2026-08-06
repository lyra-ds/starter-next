# Batuta profile — lyra-ds/starter-next

Stack template: `templates/nextjs.md` (Next.js app — Lyra DS consumer starter)

## Answers (onboarding 2026-08-05, mirrored from ../blade)

- Stack: Next.js ^16.2 + React 19 + TypeScript 5.9, pnpm. Consumer of Lyra DS
  (`@lyra-ds/react` ^0.4, `@lyra-ds/styles` ^0.4), fonts via @fontsource
  (Plus Jakarta Sans, JetBrains Mono).
- Methodology: TDD; conventional commits; trunk-based.
- Test: `pnpm test` (vitest, jsdom)
- Build: `pnpm build`
- Lint: none (no ESLint/Prettier configured)
  Execution: sequential
  Worktree: medium+
  Install: pnpm install
  Runtime: compozy

## Project constraints

- This starter is a public showcase for Lyra DS: minimal by design. Keep the
  dependency footprint small; every addition must earn its place.
- White-label branding works through only 4 CSS vars: `--brand`,
  `--brand-contrast`, `--brand-radius`, `--brand-font` (see `app/brand.css`).
- Planned direction (discussed 2026-08-05, not yet spec'd): turn this starter
  into a template for public Lyra DS users to bootstrap new Next.js projects.

## Project map

Tiny repo (9 tracked files, single commit as of onboarding 2026-08-05):

- `app/layout.tsx` — root layout: imports `@lyra-ds/styles`, @fontsource
  fonts, `brand.css`; wraps children in ThemeProvider.
- `app/page.tsx` — single page rendering the demo composition.
- `app/brand.css` — white-label brands (`[data-brand="atlas"|"moss"]`) via
  the 4 brand CSS vars.
- `app/icon.svg` — favicon.
- `components/starter-demo.tsx` — the settings demo built with Lyra React
  components (theme toggle + live rebranding).
- `package.json` / `pnpm-lock.yaml` / `tsconfig.json` — pnpm, strict TS,
  scripts: dev/build/start only.
- `README.md` — quickstart + what the starter demonstrates.

Sibling repos that matter: `../lyra` (main DS repo — styles + react packages,
source of truth for component API), `../blade` (Laravel/Blade port),
`../starter-vite` (Vite twin of this starter).
