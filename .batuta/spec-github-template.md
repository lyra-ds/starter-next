# Spec — Turn starter-next into a public GitHub template (2026-08-05)

## Goal

Make this repo a GitHub template repository that public Lyra DS users can use
to bootstrap new Next.js projects ("Use this template" button, and by
extension `npx create-next-app -e <repo-url>`).

## Decisions (closed with the user)

- **Audience:** public Lyra DS users.
- **Mechanism:** GitHub template repo. No custom CLI, no setup script, no
  `{{PLACEHOLDER}}` tokens — the repo must always run as-is (`pnpm dev`
  straight after clone). Personalization happens via a post-clone checklist
  in the README (approach A).
- **Content:** the current demo (`components/starter-demo.tsx` — theme toggle
  + live white-label rebranding) stays as the home page, untouched. Users
  delete it when they start building.

## Scope — 7 items

1. **ESLint + Prettier.** `eslint-config-next` + `prettier`. Scripts:
   `lint`, `format`, `format:check`. Configs at repo root, minimal — no
   custom rule packs.
2. **Vitest.** `vitest` + `@testing-library/react` + jsdom environment.
   One example test for `starter-demo`: renders, and toggling theme works.
   Script: `test`. This also unblocks the TDD methodology in
   `.batuta/profile.md` (update its `Test:` line to `pnpm test` as part of
   this work).
3. **CI.** `.github/workflows/ci.yml`: on push/PR — pnpm install (with
   cache), `lint`, `format:check`, `test`, `build`. Single job, Node LTS.
4. **LICENSE.** MIT, current year, Lyra DS.
5. **README rewrite.** English. Sections: what this template is; "Use this
   template" as the primary path (clone as fallback); quickstart; **"After
   cloning" checklist** — rename `name` in `package.json`, edit `metadata`
   in `app/layout.tsx`, replace brands in `app/brand.css`, delete the demo
   when ready; short white-label explanation (the 4 CSS vars); links to
   Lyra DS docs/packages.
6. **Metadata.** Export `metadata` (title/description) from
   `app/layout.tsx` with generic starter values; the README checklist points
   at it.
7. **Mark as template.** Settings → Template repository on GitHub — manual
   step for the owner, documented in the README (or repo notes), not
   automatable from here.

## Out of scope (YAGNI)

Custom CLI (`create-lyra-app`), post-clone setup script, extra pages/routes,
Storybook, changesets/versioning, i18n. The demo composition itself is not
modified.

## Verification

- `pnpm lint`, `pnpm format:check`, `pnpm test`, `pnpm build` all pass
  locally and in CI.
- Fresh-clone smoke check: `pnpm install && pnpm dev` renders the demo with
  working theme toggle and brand switching.
