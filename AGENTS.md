# AGENTS.md

Instructions for AI coding agents (GitHub Copilot, Claude, and similar) working in this repository.

## 1) Repository Summary

- Purpose: Personal portfolio/blog UI built with Next.js App Router and MDX-backed notes.
- Main content model: `Note` documents from `data/notes/**/*.mdx` are compiled by Contentlayer and rendered at `/notes/[...slug]`.
- Deployment shape: static-first Next.js build output + production server via `next start`.

## 2) High-Level Project Facts

- Type: Medium single-app frontend web project.
- Runtime/tooling validated here: Node `v21.7.3`, pnpm `10.25.0`, npm `10.5.0`.
- Languages: TypeScript/TSX, JavaScript, MDX, CSS.
- Stack: Next.js 16 (App Router), React 19, Tailwind CSS 3, Contentlayer2.

For product/context details, prefer reading [README.md](README.md) instead of duplicating it here.

## 3) Always-Use Build and Validation Workflow

Follow this exact order unless you have a strong reason not to.

1. Clean when switching OS context (Windows <-> WSL/Linux) or after binary errors.
2. Bootstrap dependencies with pnpm.
3. Run typecheck.
4. Run production build.
5. Run production server if needed.

### 3.1 Bootstrap / Clean

Always run install in the current OS environment before build/dev if `node_modules` may have come from another OS.

```bash
rm -rf node_modules .next .contentlayer tsconfig.tsbuildinfo
pnpm install
```

Validated: Works (~3m47s). `pnpm install` warns about ignored build scripts (`pnpm approve-builds`), but build/dev still worked.

### 3.2 Typecheck

```bash
pnpm run typecheck
```

Validated: Works. Duration ~96s after clean install (earlier run ~154s before clean).

### 3.3 Build

```bash
pnpm run build
```

Validated: Works after clean reinstall. Duration ~408s. Emits non-fatal warnings (`baseline-browser-mapping` stale data, TS project references warning).

Known failure: `You installed esbuild for another platform` (`@esbuild/win32-x64` on Linux).
Mitigation: remove `node_modules` and reinstall with pnpm inside the current OS shell.

### 3.4 Run / Serve

Development:
```bash
pnpm run dev
```
- Starts long-running dev server after Contentlayer build.
- Previously failed before clean reinstall due esbuild platform mismatch.

Production server:
```bash
pnpm run serve
```
- Works after successful `pnpm run build`.
- Verified startup banner includes `Local: http://localhost:3000`.

### 3.5 Lint

```bash
pnpm run lint
```

Validated: Works after migration to ESLint 9 flat config.

Current implementation:
- Lint script: `eslint . --fix --max-warnings=0`
- Config file: `eslint.config.mjs`
- Compatibility package required: `@eslint/eslintrc`

Notes:
- `next lint` flags such as `--fix` / `--dir` are not used in this repo anymore.
- Config-style files (`next.config.js`, `tailwind.config.ts`, `*.config.*`) have a targeted override for `@typescript-eslint/no-require-imports`.

### 3.6 Tests

```bash
pnpm run test
```

Validated result:
- Fails because no `test` script exists.

## 4) Architecture and File Map

### 4.1 Routing / App shell

- `app/layout.tsx`: Global shell, fonts, providers, analytics, header/footer.
- `app/page.tsx`: Home route.
- `app/blog/page.tsx`: Blog list route from static metadata.
- `app/notes/page.tsx`: Notes listing from Contentlayer-generated data.
- `app/notes/[...slug]/page.tsx`: Note detail SSG route, metadata, structured data.
- `app/seo.tsx`: Shared page metadata helper.

### 4.2 Content pipeline

- `contentlayer.config.ts`: defines `Note`, compiles MDX from `data/notes/**/*.mdx`, applies remark/rehype plugins.
- `utils/contentlayer.ts`: helpers (`coreContent`, `allCoreContent`) and production draft filtering.
- `components/mdx/index.tsx`: MDX component mapping.
- `components/mdx/layout-renderer.tsx`: runtime MDX renderer with local Contentlayer hook workaround.

### 4.3 UI composition

- `components/home-page/*`: Home intro/profile composition.
- `layouts/post-simple.tsx`: Note page layout wrapper.
- `components/ui/*`: Shared visual primitives.

### 4.4 Data and configuration

- `data/site-metadata.ts`: canonical site/profile/social/search/analytics metadata.
- `data/navigation.ts`: header/footer nav config.
- `tailwind.config.ts`: theme extensions + typography behavior.
- `next.config.js`: security headers, Contentlayer plugin, bundle analyzer, SVG handling.
- `tsconfig.json` + `jsconfig.json`: path aliases (`~/*`, `@/...`) and TS settings.
- `.eslintrc.json`: legacy config, mismatched with ESLint 9 flat config expectations.
- `prettier.config.js`: formatting rules + Tailwind plugin.
- `commitlint.config.js`: conventional commit rules.

## 5) Git Hooks, CI, and Pre-Checkin Reality

- `.github/` currently contains agent customizations (`.github/agents`, `.github/prompts`, `.github/skills`) and no GitHub Actions workflows.
- Husky exists (`prepare: husky`), but only generated `.husky/_` scaffolding was found.
- Practical pre-checkin quality gate:
  1. `pnpm run typecheck`
  2. `pnpm run build`

## 6) Working Rules for Agents in This Repo

- Trust this file first. Search only if:
  - the requested area is not described here, or
  - commands/files here are outdated or failing differently.
- Always assume cross-OS `node_modules` contamination is possible in WSL/Windows contexts; clean reinstall before deep debugging.
- Keep edits focused:
  - route/page concerns in `app/*`
  - reusable UI in `components/*`
  - content model/rendering in Contentlayer + MDX modules
  - site-wide metadata in `data/site-metadata.ts`
- For validation, prioritize reliable checks (`typecheck`, `build`) over lint until lint config is updated.

## 7) Root Inventory (Quick Reference)

Top-level entries: `.contentlayer`, `.github`, `.husky`, `.next`, `app`, `components`, `css`, `data`, `icons`, `layouts`, `public`, `types`, `utils`, plus key configs (`package.json`, `next.config.js`, `contentlayer.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `postcss.config.js`, `prettier.config.js`, `commitlint.config.js`).
