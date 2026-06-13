# East End Systems

Marketing site for **East End Systems** — a software engineering consultancy
specializing in enterprise architecture, developer tooling, and AI-integrated
systems. Sag Harbor, New York · remote-friendly.

Single-page static site. Stack: **Vue 3.5 · Vite 6 · Tailwind 4 · TypeScript**.
The design is ported from the Stitch "East End Technical" design system into
Tailwind v4 `@theme` tokens (`src/assets/main.css`).

## Quick start

```bash
bun install
bun dev          # http://localhost:5173
```

> Prefers Bun; `npm install && npm run dev` works as a fallback.

## Scripts

| Script              | What it does                                              |
| ------------------- | -------------------------------------------------------- |
| `bun dev`           | Vite dev server with HMR                                  |
| `bun run build`     | Type-check then production build to `dist/`               |
| `bun preview`       | Serve the production build locally                        |
| `bun run typecheck` | `vue-tsc --noEmit` strict type check                      |
| `bun lint`          | ESLint over the repo                                      |
| `bun run format`    | Prettier write (Tailwind class sorting)                  |
| `bun test`          | Run the Vitest suite once                                 |

## Project layout

```
src/
├── main.ts            # createApp → router → mount
├── App.vue            # <RouterView /> + dark-theme init
├── assets/main.css    # Tailwind entry + @theme design tokens
├── composables/       # useTheme (+ __tests__)
├── views/HomeView.vue # the full single-page site (nav/hero/services/projects/contact/footer)
└── router/index.ts    # single home route; in-page nav via #anchors
```

## Contact form

The contact form posts to [Formspree](https://formspree.io). Until configured
it renders a `mailto:` button instead.

**To enable the form:**

1. Create a free form at <https://formspree.io> and copy its form ID
   (e.g. `xyzabcd`).
2. In `src/views/HomeView.vue`, set `const FORMSPREE_ID = 'xyzabcd'`.
3. Commit and push — the form goes live on the next deploy.

## Deployment — GitHub Pages

`.github/workflows/deploy.yml` builds with Bun and publishes `dist/` to GitHub
Pages on every push to `main`. Live at:

> **https://nottag.github.io/EastEndSystems/**

Vite `base` defaults to `/EastEndSystems/` (the project-page path). To serve from
a custom domain at root, set `VITE_BASE=/`.

See **[SETUP.md](./SETUP.md)** for the full go-live checklist — enabling Pages,
the `eastendsystems.com` custom domain + DNS, and the Formspree contact form.

## License

© 2026 East End Systems. All rights reserved.
