
# Phase 2 — Stabilize, Harden, and Improve

Goals

- Make CI reliable and enforce lint/type checks before merges.
- Harden dependency management and remove transient build issues.
- Incrementally improve developer DX and code quality.

Planned milestones

1. CI and Validation (this branch)

   - Add GitHub Actions workflow to run `npm ci`, `npm run validate`, and `npm run build`.
   - Fail fast on type/lint errors so PRs are safe to merge.

2. Dependency audit and lockfile sync

   - Run `npm audit` and address high/critical alerts.
   - Regenerate `package-lock.json` from canonical `package.json` in CI or developer machines.

3. Type and lint cleanup

   - Fix remaining lint warnings in a tracked series of PRs.
   - Introduce per-directory lint overrides where needed to avoid noisy errors.

4. Tests and coverage

   - Add unit tests for critical components and handlers.
   - Add a small e2e smoke test for the public pages via Playwright or Puppeteer.

5. Performance and CI optimizations

   - Use caching, artifact upload, and selective job triggers to reduce CI cost.

Next steps (first sprint)

- Ensure GitHub Actions runs and succeeds for this branch.
- Regenerate lockfile locally on a dev machine and commit results.
- Open small PRs to fix remaining lint warnings (10-20 files per PR).

Completed

- Guarded wagmi codegen so CI/preview builds don't fail when API keys are absent.
- Removed project root Babel config that disabled SWC to fix production build issues.
- Stabilized jest/babel setup and added runtime-safe mocks for generated hooks.
- Standardized wallet Connect/Connected components in `src/app/labs/*` pages.
 

Notes on environment

- Do not commit secrets; use Netlify/hosting env variable settings for runtime secrets.
- Prefer `npm ci` in CI for reproducibility; use `npm install` for local lockfile generation when needed.

Contact

- I'll iterate and push small, focused PRs to this branch for each sub-task.

