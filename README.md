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

## Lyra compatibility

This template pairs `@lyra-ds/react` 2.0.0 with `@lyra-ds/styles` 1.2.0.
React and ReactDOM peer support remains `>=18 <20`; this adoption does not
upgrade React or Next.js.

The starter does not mount `ToastProvider`. If you add it, info and success
toasts default to 8000 ms, while error/danger toasts stay persistent. Hover
and focus independently pause the remaining time. Set
`<ToastProvider duration={4000}>` to restore the previous timing for every
tone. Explicit per-toast durations override provider settings, including
`duration: 0` for persistence; use it to keep action-bearing toasts visible.
Later provider configuration changes apply only to newly queued toasts.

To roll back, restore both previous dependency ranges (`^1.1.0`) and the
previous lockfile. No data migration is needed.

## After cloning

- [ ] Rename `name` in `package.json`.
- [ ] Edit the `metadata` export in `app/layout.tsx` (title, description).
- [ ] Replace the example brands in `app/brand.css` with your own.
- [ ] Swap `app/icon.svg` for your favicon.
- [ ] When you start building, delete `components/starter-home.tsx` (and its
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
The demo's "Lyra" option is the baseline look: it removes `data-brand`
entirely — never set the attribute without defining `--brand`, or the
derived accent group resolves to nothing.

## Scripts

| Script              | What it does                |
| ------------------- | --------------------------- |
| `pnpm dev`          | Start the dev server        |
| `pnpm build`        | Production build            |
| `pnpm test`         | Run tests (Vitest + jsdom)  |
| `pnpm lint`         | ESLint (next presets)       |
| `pnpm format`       | Prettier write              |
| `pnpm format:check` | Prettier check (used in CI) |

CI runs lint, format check, tests, and build on every push and PR.

## AI agents

The template ships an [`AGENTS.md`](./AGENTS.md) that points AI coding
agents at the Lyra DS docs, the machine-readable component contracts
([llms.txt](https://lyra-ds.dev/llms.txt)), and this project's commands and
conventions. Keep it updated as your project evolves.

## Links

- [Lyra DS](https://lyra-ds.dev)
- [Lyra repository](https://github.com/lyra-ds/lyra)
- [@lyra-ds/styles on npm](https://www.npmjs.com/package/@lyra-ds/styles)
- [@lyra-ds/react on npm](https://www.npmjs.com/package/@lyra-ds/react)
