# Batuta profile — lyra-ds/starter-next

Stack: Next.js App Router / React / TypeScript; Vitest and ESLint; pnpm@11.18.0
Methodology: tests-after; Conventional Commits; feature branches and PRs to main
Test: pnpm test
Build: pnpm build
Install: pnpm install --frozen-lockfile
Lint: pnpm lint && pnpm format:check
Execution: sequential
Worktree: medium+
Worktree-home: cache
Template: templates/nextjs.md

## Conventions

- Follow the repository AGENTS.md and the published Lyra contracts; never invent component APIs.
- Preserve the existing white-label brand tokens, local fonts and framework conventions.
- Treat Lyra as the owner of component appearance and behavior; do not add local substitutes.
- Keep changes scoped and verify the repository CI commands before integration.

## Project map

Refreshed from local source on 2026-10-14.

`package.json` and pnpm-lock.yaml pin the application tools and Lyra peers.
`app/` owns App Router routes, layouts and global application styling.
`app/layout.tsx` imports shared fonts and Lyra CSS once.
`app/brand.css` owns the four existing white-label variables.
`app/page.tsx` composes the starter home surface.
`components/` owns local application compositions.
`components/starter-home.tsx` is the disposable starter demonstration.
Public UI primitives come from @lyra-ds/react.
Server Components remain the default.
Browser state and effects live in explicitly client-marked components.
`public/` holds static brand and application assets.
The starter uses Next build defaults without a committed next.config file.
`next-env.d.ts` is generated framework typing.
`tsconfig.json` owns strict types and generated Next type inputs.
`vitest.config.mts` configures React/jsdom tests.
`vitest.setup.ts` configures DOM testing support.
Component tests follow the existing colocated test naming.
`eslint.config.mjs` owns framework lint presets and global ignores.
`.prettierignore` excludes generated and conducting artifacts.
`.github/workflows/` owns required lint/test/build and publication automation.
`AGENTS.md` owns Next and public Lyra conventions.
Read the installed Next documentation before changing framework behavior.
Do not hand-edit .next/, out/ or node_modules/.
Regenerate lockfiles through the pinned package manager only.
`WORK.md` and .batuta/ own conducting state and task evidence.
