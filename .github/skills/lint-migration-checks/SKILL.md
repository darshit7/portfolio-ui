# Lint Migration Checks

Purpose: verify lint behavior safely in this repository and guide migration from the current broken lint setup to a working Next.js 16 + ESLint 9 flow.

## When to use

Use this skill when:
- A task asks to run lint.
- A task modifies config or source files and needs static quality checks.
- A task touches files in app, components, layouts, data, or utils.

## Repository-specific known state

- `pnpm run lint` is expected to work in this repo.
- Lint runs via ESLint flat config (`eslint.config.mjs`) using:
   - `eslint . --fix --max-warnings=0`
- Config-style files use a targeted override for `@typescript-eslint/no-require-imports`.

## Required preflight

Always do preflight before attempting lint:
1. Confirm runtime versions and package manager are available.
2. If this is WSL/Linux and dependencies may have come from Windows, clean and reinstall:
   - `rm -rf node_modules .next .contentlayer tsconfig.tsbuildinfo`
   - `pnpm install`
3. Run reliable checks first:
   - `pnpm run typecheck`
   - `pnpm run build`

## Lint workflow (safe default)

1. Run `pnpm run lint` and capture exact output.
2. If lint fails, fix errors where practical.
3. If failure is tooling-related (config/dependency mismatch), run migration checks below.
4. Report status explicitly:
   - typecheck: pass/fail
   - build: pass/fail
   - lint: pass/fail (with command and error if failing)

## Migration path (when task explicitly requests lint fix)

1. Ensure lint script uses ESLint directly (not `next lint --fix --dir ...`).
2. Choose one lint strategy and implement fully:
   - Strategy A: Next-managed lint configuration compatible with current Next version.
   - Strategy B: ESLint flat config via `eslint.config.js` and aligned eslint plugins.
3. Re-run checks in order:
   - `pnpm install`
   - `pnpm run typecheck`
   - `pnpm run build`
   - lint command(s)
4. Document command timings, errors, and final working sequence in AGENTS.md.

## Output contract

Return a concise result block with:
- Commands executed
- What passed
- What failed
- Blocking cause (if any)
- Exact next step to unblock lint
