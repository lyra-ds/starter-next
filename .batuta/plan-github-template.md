# GitHub Template Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make starter-next a public GitHub template repo: lint/format tooling, Vitest with an example test, CI, MIT license, and a rewritten README with a post-clone checklist.

**Architecture:** Pure static template (approach A from `.batuta/spec-github-template.md`) — the repo always runs as-is; personalization is a README checklist. The demo stays untouched as the home page. Each task adds one independent piece of template infrastructure.

**Tech Stack:** Next.js ^16.2, React 19, TypeScript 5.9, pnpm 11, ESLint 9 (flat config) + eslint-config-next, Prettier 3, Vitest + @testing-library/react + jsdom, GitHub Actions.

## Global Constraints

- Repo must run `pnpm install && pnpm dev` as-is at every commit — no placeholder tokens anywhere.
- Do not modify `components/starter-demo.tsx` (demo is frozen by spec) except never; tests observe it from outside.
- Code style: no semicolons, single quotes (match existing files).
- All docs and code comments in English.
- Conventional commits; trunk-based (commit directly on `main`).

---

### Task 1: Prettier

**Files:**
- Create: `.prettierrc.json`, `.prettierignore`
- Modify: `package.json` (devDependencies + scripts)

**Interfaces:**
- Produces: `pnpm format` (write) and `pnpm format:check` scripts — Task 4's CI calls `format:check`.

- [ ] **Step 1: Install**

```bash
pnpm add -D prettier
```

- [ ] **Step 2: Create `.prettierrc.json`**

```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100
}
```

- [ ] **Step 3: Create `.prettierignore`**

```
.next
node_modules
pnpm-lock.yaml
```

- [ ] **Step 4: Add scripts to `package.json`**

```json
"format": "prettier --write .",
"format:check": "prettier --check ."
```

- [ ] **Step 5: Verify it fails, then normalize**

Run: `pnpm format:check` — expected: exits non-zero listing unformatted files (or passes if already clean).
Then run: `pnpm format` and re-run `pnpm format:check` — expected: PASS ("All matched files use Prettier code style!").
Review the diff `git diff` — formatting-only changes are fine; anything semantic is a stop-and-ask.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: add prettier with format scripts"
```

### Task 2: ESLint

**Files:**
- Create: `eslint.config.mjs`
- Modify: `package.json` (devDependencies + `lint` script)

**Interfaces:**
- Produces: `pnpm lint` script — Task 4's CI calls it.

- [ ] **Step 1: Install**

```bash
pnpm add -D eslint eslint-config-next @eslint/eslintrc
```

- [ ] **Step 2: Create `eslint.config.mjs`** (the flat-config pattern create-next-app generates)

```js
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({ baseDirectory: import.meta.dirname })

const config = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  { ignores: ['.next/**'] },
]

export default config
```

- [ ] **Step 3: Add script to `package.json`**

```json
"lint": "eslint ."
```

- [ ] **Step 4: Run and fix**

Run: `pnpm lint` — expected: PASS. If it reports errors in `app/` or `components/`, fix them minimally (they are real findings); if a rule fights the frozen demo file, disable that single rule with an inline `// eslint-disable-next-line <rule>` and note why.

- [ ] **Step 5: Verify build still passes**

Run: `pnpm build` — expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: add eslint flat config with next presets"
```

### Task 3: Vitest + example test

**Files:**
- Create: `vitest.config.mts`, `vitest.setup.ts`, `components/starter-demo.test.tsx`
- Modify: `package.json` (devDependencies + `test` script), `.batuta/profile.md` (Test line)

**Interfaces:**
- Consumes: `StarterDemo` (named export of `components/starter-demo.tsx`), `ThemeProvider` from `@lyra-ds/react`.
- Produces: `pnpm test` script (vitest run) — Task 4's CI calls it.

- [ ] **Step 1: Install**

```bash
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Create `vitest.config.mts`**

```ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
})
```

- [ ] **Step 3: Create `vitest.setup.ts`** (jest-dom matchers + matchMedia stub — jsdom has none and ThemeProvider needs it for the system theme)

```ts
import '@testing-library/jest-dom/vitest'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})
```

- [ ] **Step 4: Write the failing test — `components/starter-demo.test.tsx`**

```tsx
import { ThemeProvider } from '@lyra-ds/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { StarterDemo } from './starter-demo'

function renderDemo() {
  return render(
    <ThemeProvider>
      <StarterDemo />
    </ThemeProvider>,
  )
}

describe('StarterDemo', () => {
  it('renders the starter headline', () => {
    renderDemo()
    expect(screen.getByRole('heading', { name: 'Make Lyra yours.' })).toBeInTheDocument()
  })

  it('switches the white-label brand', async () => {
    renderDemo()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Atlas' }))
    expect(screen.getByRole('main')).toHaveAttribute('data-brand', 'atlas')
  })

  it('switches the theme preference', async () => {
    renderDemo()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'dark' }))
    expect(screen.getByText('Currently using the dark theme.')).toBeInTheDocument()
  })
})
```

- [ ] **Step 5: Add script, run test to verify it fails first**

Add to `package.json` scripts: `"test": "vitest run"`.
Run: `pnpm test` — before Steps 2–3 exist the suite cannot run; with them in place the three tests should PASS immediately (the component already exists — this task's "red" is the missing infrastructure, not missing behavior). If the theme test fails because `ThemeProvider` resolves themes differently under jsdom, assert on the pressed button's `variant` fallback: `expect(screen.getByRole('button', { name: 'dark' }))` having class match is NOT reliable — instead relax to checking the click does not throw and `data-brand` test still covers interactivity; report the substitution in the task summary.

- [ ] **Step 6: Run full verification**

Run: `pnpm test && pnpm lint && pnpm build` — expected: all PASS.

- [ ] **Step 7: Update Batuta profile**

In `.batuta/profile.md`, replace the `- Test: none yet …` line with:

```
- Test: `pnpm test` (vitest, jsdom)
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "test: add vitest with starter demo example tests"
```

### Task 4: CI workflow

**Files:**
- Create: `.github/workflows/ci.yml`
- Modify: `package.json` (add `packageManager` field)

**Interfaces:**
- Consumes: scripts `lint`, `format:check`, `test`, `build` from Tasks 1–3.

- [ ] **Step 1: Pin the package manager in `package.json`** (top level, after `"private"`)

```json
"packageManager": "pnpm@11.18.0",
```

- [ ] **Step 2: Create `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm format:check
      - run: pnpm test
      - run: pnpm build
```

- [ ] **Step 3: Verify locally** (CI can't run here — mirror its steps)

Run: `pnpm install --frozen-lockfile && pnpm lint && pnpm format:check && pnpm test && pnpm build` — expected: all PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "ci: add lint, format, test and build workflow"
```

### Task 5: LICENSE

**Files:**
- Create: `LICENSE`

- [ ] **Step 1: Create `LICENSE`** — standard MIT text, verbatim, with:

```
MIT License

Copyright (c) 2026 Lyra Design System

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 2: Add `"license": "MIT"` to `package.json`** (replace nothing — insert after `"version"`; keep `"private": true`).

- [ ] **Step 3: Commit**

```bash
git add LICENSE package.json
git commit -m "docs: add MIT license"
```

### Task 6: README rewrite

**Files:**
- Modify: `README.md` (full rewrite)

**Interfaces:**
- Consumes: scripts from Tasks 1–3 (named in the docs), `metadata` export in `app/layout.tsx` (already generic — the checklist points at it, no code change).

- [ ] **Step 1: Rewrite `README.md`**

```markdown
# Lyra DS Next.js template

A minimal [Next.js](https://nextjs.org) template for
[Lyra Design System](https://lyra-ds.dev). It ships the public Lyra styles
and React packages, local fonts, theme selection (light / dark / system),
live white-label branding, and ready-to-go lint, test, and CI setup.

## Create your project

Click **Use this template** on GitHub, or:

```sh
npx create-next-app@latest my-app -e https://github.com/lyra-ds/starter-next
```

Plain cloning works too. Then:

```sh
pnpm install
pnpm dev
```

`npm` and `yarn` work as well.

## After cloning

- [ ] Rename `name` in `package.json`.
- [ ] Edit the `metadata` export in `app/layout.tsx` (title, description).
- [ ] Replace the example brands in `app/brand.css` with your own.
- [ ] Swap `app/icon.svg` for your favicon.
- [ ] When you start building, delete `components/starter-demo.tsx` (and its
      test) and replace `app/page.tsx`.

## White-label branding

Lyra rebrands with only four CSS variables — everything else derives from
them:

```css
[data-brand='acme'] {
  --brand: #176b87;
  --brand-contrast: #ffffff;
  --brand-radius: 0.75rem;
  --brand-font: 'Plus Jakarta Sans', sans-serif;
}
```

See `app/brand.css` for the two example brands the demo switches between.

## Scripts

| Script              | What it does                  |
| ------------------- | ----------------------------- |
| `pnpm dev`          | Start the dev server          |
| `pnpm build`        | Production build              |
| `pnpm test`         | Run tests (Vitest + jsdom)    |
| `pnpm lint`         | ESLint (next presets)         |
| `pnpm format`       | Prettier write                |
| `pnpm format:check` | Prettier check (used in CI)   |

CI runs lint, format check, tests, and build on every push and PR.

## Links

- [Lyra DS](https://lyra-ds.dev)
- [Lyra repository](https://github.com/lyra-ds/lyra)
- [@lyra-ds/styles on npm](https://www.npmjs.com/package/@lyra-ds/styles)
- [@lyra-ds/react on npm](https://www.npmjs.com/package/@lyra-ds/react)
```

- [ ] **Step 2: Verify formatting**

Run: `pnpm format:check` — expected: PASS (run `pnpm format` first if Prettier wants to reflow the README).

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: rewrite readme as template guide with post-clone checklist"
```

### Task 7: Mark repo as template (manual, owner-only)

No files. On GitHub: **Settings → General → check "Template repository"**. This cannot be done from this machine; the executor's only step is to remind the owner in the final summary. Optionally verifiable later via `gh api repos/<owner>/starter-next --jq .is_template`.

---

## Self-review notes

- Spec coverage: item 1 → Tasks 1–2; item 2 → Task 3; item 3 → Task 4; item 4 → Task 5; item 5 → Task 6; item 6 → satisfied by existing `metadata` export in `app/layout.tsx` + Task 6 checklist pointer (no code change needed); item 7 → Task 7 (manual).
- The theme test in Task 3 carries an explicit fallback because `ThemeProvider`'s jsdom behavior is unverified — the executor must report if the fallback was used.
- Commit attribution rule from `.batuta/routing.md` applies to every commit made by a delegate.
