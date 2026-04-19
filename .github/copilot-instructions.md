# Copilot Cloud Agent Onboarding Instructions

## Project summary
- Framework: Next.js 16 (App Router) + React 19 + TypeScript.
- Styling: Tailwind CSS.
- Content: MDX notes via `contentlayer2` from `data/notes/**/*.mdx`.
- Package manager: `pnpm` (lockfile: `pnpm-lock.yaml`).

## High-signal repository layout
- `app/`: routes and page composition (`app/notes`, `app/blog`, metadata/SEO, sitemap, robots).
- `components/`: reusable UI and feature blocks (cards, header/footer, home page, MDX renderers, UI primitives).
- `data/`: site config + content (`site-metadata.ts`, `navigation.ts`, `notes/*.mdx`).
- `layouts/`: content layouts (currently `post-simple.tsx`).
- `utils/`: contentlayer helpers and MDX remark/rehype utilities.
- `icons/`: SVG assets imported directly in TSX.
- `contentlayer.config.ts`: content model + MDX processing pipeline.

## How to start quickly
1. Enable pnpm (if missing):
   - `corepack enable`
   - `corepack prepare pnpm@latest --activate`
2. Install dependencies:
   - `pnpm install --frozen-lockfile`
3. Typical local run:
   - `pnpm run dev`

## Editing guidance for cloud agents
- Prefer small, focused edits; avoid broad refactors.
- Keep imports using `~/*` alias (configured in `tsconfig.json`).
- If touching content-driven pages, verify `contentlayer.config.ts` implications.
- Notes content lives in `data/notes/*.mdx`; route rendering is in `app/notes/[...slug]/page.tsx`.
- SVG icons are consumed as React components via SVGR config in `next.config.js`.

## Validation guidance
- This repo currently has command drift with latest tooling. Run checks, but expect baseline failures unless scripts/config are updated.
- Recommended practical sequence for agent tasks:
  - `pnpm install --frozen-lockfile`
  - `pnpm run build` (may fail in sandbox due external font fetch; see below)
  - For docs-only changes, rely on file-level review + git diff when build/lint are blocked by known baseline issues.

## Errors encountered during onboarding and workarounds used
Date observed: 2026-04-19.

1. **`pnpm` not found**
   - Error: `bash: pnpm: command not found`
   - Workaround used: enabled via Corepack:
     - `corepack enable`
     - `corepack prepare pnpm@latest --activate`

2. **Lint script broken with Next.js 16**
   - Command: `pnpm run lint`
   - Error: `next lint --fix ...` -> `error: unknown option '--fix'`
   - Follow-up attempt: `pnpm exec next lint --dir ...` also failed (`unknown option '--dir'`) because `next lint` is no longer available in this Next CLI.
   - Additional attempt: direct ESLint invocation failed because ESLint 9 expects flat config (`eslint.config.js`) while repo uses `.eslintrc.json`.
   - Workaround status: no reliable lint workaround without updating repo lint configuration/scripts.

3. **Typecheck baseline failures**
   - Command: `pnpm run typecheck`
   - Errors include:
     - missing `contentlayer/generated` before generation
     - many `Cannot find module '~/icons/*.svg'` typing errors
     - `contentlayer.config.ts` type mismatch (`allNotes` on `importData()` result)
   - Workaround status: no non-invasive workaround during onboarding; treat as existing baseline issues.

4. **Build failure in sandboxed environment**
   - Command: `pnpm run build`
   - Error: Next font fetch failures from `fonts.googleapis.com` (`JetBrains Mono`, `Nunito`, `Playpen Sans`).
   - Workaround used: none available in restricted network sandbox; treat as environment/network-limited failure.

## Suggested next maintenance tasks (outside this onboarding PR)
- Update lint strategy for Next 16 + ESLint 9 (flat config or compatible pinned versions/scripts).
- Add SVG module type declarations (`*.svg`) for TypeScript.
- Align Contentlayer-generated types and `contentlayer.config.ts` typing.
- Consider local/self-hosted font strategy to avoid Google Fonts network dependency in restricted environments.
