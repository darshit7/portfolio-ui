---
mode: ask
description: Validate a code change safely in portfolio-ui using the repo-standard command order and known tooling constraints.
---

Validate this change using the repository’s proven workflow and do not skip steps.

Rules:
- Trust AGENTS.md first; search only if AGENTS.md is incomplete or appears incorrect.
- Treat cross-OS node_modules contamination as a common risk in WSL/Windows contexts.
- Prefer reliable checks over lint when lint tooling is known-broken.

Run in this exact order unless the task explicitly says otherwise:
1. Clean when needed:
   - rm -rf node_modules .next .contentlayer tsconfig.tsbuildinfo
2. Install:
   - pnpm install
3. Validate types:
   - pnpm run typecheck
4. Validate production build:
   - pnpm run build
5. Run production server only if runtime verification is required:
   - pnpm run serve
6. Try lint only as informational if relevant:
   - pnpm run lint

Output format:
- Summary: one short paragraph with overall status.
- Results table: command, pass/fail, duration, notes.
- Failures and mitigations: include exact error signatures and workaround steps.
- Confidence statement: explain whether the change is safe to merge given current repo constraints.

Important repository caveats to account for:
- Lint is powered by ESLint flat config (`eslint.config.mjs`), not `next lint --fix --dir ...`.
- `pnpm run test` is unavailable because no test script exists.
- Build/dev can fail with esbuild platform mismatch if dependencies were installed on another OS.
