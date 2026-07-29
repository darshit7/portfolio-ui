# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio/blog: Next.js 16 App Router + React 19 + Tailwind 3, with MDX content compiled by Contentlayer2. Deployed on Vercel. Package manager is **pnpm** (Node 24, per `.nvmrc`).

## Commands

```bash
pnpm dev          # contentlayer build, then next dev
pnpm build        # contentlayer build, then next build (~2 min warm)
pnpm serve        # next start (requires a prior build)
pnpm typecheck    # contentlayer build, then tsc -b
pnpm lint         # eslint . --fix --max-warnings=0  (note: --fix writes to files)
pnpm analyze      # bundle analyzer (ANALYZE=true)
```

There is no test runner and no `test` script.

**Contentlayer must run before anything type-aware.** `dev`, `build`, and `typecheck` all shell out to `contentlayer2/bin/cli.cjs build` first, because `contentlayer/generated` (aliased to `.contentlayer/generated`, gitignored) does not exist until then. Bare `tsc` or `next build` fails on a clean checkout.

Before considering work done: `pnpm typecheck && pnpm build`. Both currently pass clean, as does lint — keep it that way.

## Content model

`data/notes/**/*.mdx` → Contentlayer `Note` documents → `/notes/[...slug]` (SSG via `generateStaticParams`).

- Required frontmatter: `heading`, `title`, `icon`, `date`. Optional: `lastmod`, `draft`, `summary`, `images`, `layout`.
- `contentDirPath` is `data`, so the `slug` computed field strips the leading `notes/`: `data/notes/vim-configurations.mdx` → slug `vim-configurations`, path `notes/vim-configurations`, URL `/notes/vim-configurations`.
- **`icon` must be a key of `BrandsMap` in `components/ui/brand.tsx`** — a registry of SVGs from `icons/`. An unrecognized value renders nothing (destructures from `undefined` at `brand.tsx:264`). Add the icon to `icons/` and register it in `BrandsMap` before using a new value.
- `draft: true` is only filtered in production, and only through `allCoreContent()` in `utils/contentlayer.ts`. Drafts stay visible in dev.
- `layout` frontmatter selects from the `LAYOUTS` map in `app/notes/[...slug]/page.tsx`; only `PostSimple` is registered.

**`/blog` is unrelated to MDX.** It renders a hand-maintained array of external Medium links from `data/blog-metadata.ts`. Notes are the only real content pipeline.

## Rendering pipeline

`contentlayer.config.ts` wires the remark/rehype chain: local plugins in `utils/remark-*.ts` (frontmatter extraction, code titles, TOC headings, `remarkImgToJsx`) plus GFM, math, alerts, slug/autolink headings, citations, `rehype-pretty-code` (Shiki: `github-dark-dimmed` / `solarized-light`), and minify.

- `remarkImgToJsx` rewrites markdown images to `next/image` **only for files that exist under `public/`**, reading dimensions off disk at build time. Remote image URLs pass through untouched and need a `remotePatterns` entry in `next.config.js`.
- `components/mdx/index.tsx` maps MDX tags to components (`a`, `pre`, `table`, `Image`, `Twemoji`, `CodeTitle`). Changing it changes every note.
- `components/mdx/layout-renderer.tsx` is a **local copy of Contentlayer's `useMDXComponent`** — TS transpiled the upstream import to a `require` and broke under ESM. Don't replace it with the upstream hook.

## Search

`app/search.json/route.ts` serves all notes as JSON; `components/search/kbar-provider.tsx` fetches it client-side into kbar actions. The path comes from `SITE_METADATA.search.kbarConfigs`. This route is the one dynamic (`ƒ`) route — everything else prerenders static.

## TypeScript constraints

Strict mode, plus two settings that shape every edit:

- **`verbatimModuleSyntax: true`** — type-only imports must use `import type`, or the build fails.
- **`@typescript-eslint/no-explicit-any: 'error'`** in `eslint.config.mjs` — no escape hatch; type it properly.

Path aliases: `~/*` → repo root, `app/*`, `contentlayer/generated`. (`jsconfig.json` also declares stale `@/*` aliases; prefer `~/*`, which is what the codebase actually uses.)

Two type shims exist because `moduleResolution: bundler` can't see through some packages' `exports` maps — read them before fighting a resolution error:
- `types/declarations.d.ts` — `react-dom` and `probe-image-size`.
- `types/vfile.d.ts` — augments VFile's `Data` so remark plugins pass typed `frontmatter`/`toc`. Paired with a `"vfile"` entry in `tsconfig.json` `paths` pointing directly at `node_modules/vfile/index.d.ts`. Fragile; don't remove one without the other.

The Contentlayer warning about a missing `compilerOptions.baseUrl` on every build is expected and harmless.

## Config notes

- `next.config.js` sets a strict CSP. `'unsafe-eval'` was deliberately removed; `'unsafe-inline'` for `script-src` is retained only for the next-themes FOUC script. Adding a third-party script means adding its host here.
- SVG imports go through `@svgr/webpack`, configured **twice** — under `turbopack.rules` (dev/build default) and `webpack()`. Change both or behavior diverges.
- Env vars: `NEXT_UMAMI_ID` (analytics; warns if unset in prod), `BASE_PATH`, `EXPORT`, `UNOPTIMIZED`, `ANALYZE`.

## Working rules

- **Conventional commits are required** (`commitlint.config.js`, `@commitlint/config-conventional`). Husky's `prepare` script is wired but only `.husky/_` scaffolding is present, so nothing enforces this locally — the discipline is on you. Match existing history: `feat:`, `fix:`, `chore:`.
- **Don't edit `data/site-metadata.ts`, `data/blog-metadata.ts`, or `data/notes/**` unless asked.** These are the author's personal identity, links, and writing — not code to refactor.
- Keep edits in their layer: routes/metadata in `app/`, reusable UI in `components/`, content model in `contentlayer.config.ts` + `utils/remark-*`, site-wide config in `data/`.
- `pnpm lint` runs with `--fix` and will rewrite files. Check `git status` afterward if the working tree mattered.

## WSL / cross-OS gotcha

This repo lives on `/mnt/d/...` and is also reachable via a symlink at `/home/darshit/projects/portfolio-ui`. If `node_modules` was installed from Windows and you're in WSL (or vice versa), builds fail with `You installed esbuild for another platform`. Fix:

```bash
rm -rf node_modules .next .contentlayer tsconfig.tsbuildinfo && pnpm install
```

Reach for this only on binary/platform errors — a clean reinstall takes several minutes.
