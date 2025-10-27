# Phase 2.1 — Iterate, Harden, and Automate

This short roadmap contains concrete next steps after the Phase 2 baseline work.

Goals
- Reduce noise in CI and developer machines.
- Harden the Web3 surface for security-sensitive deps.
- Add small test coverage and measurable perf improvements.

Immediate tasks (this sprint)
1. Type & lint cleanup (5 PRs)
   - Split remaining lint fixes into several small PRs (10–20 files each).
   - Each PR: run `npm run lint:fix`, then manually fix remaining complaints.
   - Validate with `npm run validate` and `npm run build` before merge.

2. Tests & coverage
   - Add unit smoke tests for critical components (Account, Connect, MintNFT) using React Testing Library.
   - Add a single e2e smoke using Playwright: open homepage and assert 200 response.
   - Run tests in CI and gate merges on basic passing.

3. Performance quick wins
   - Make `dev` the fast path and `dev:wagmi` for regenerating contract hooks.
   - Lazy-load Spline components via dynamic imports (SSR disabled).
   - Enable `incremental` and `skipLibCheck` in `tsconfig` for faster local builds.

4. Dependency triage
   - Upgrades that are safe to bump in separate PRs: `lint-staged`, `pino-pretty`, `sha.js`.
   - Larger upgrades requiring coordination (wagmi/viem/esbuild) belong to a dedicated migration epic.

5. CI hygiene
   - Clean the `.github/workflows/ci.yml` (remove duplicate blocks, unify node matrix).
   - Add caching for node_modules and `.next` build where appropriate.
   - Add a `test` job that runs Jest and reports coverage.

Metrics and acceptance
- PRs must pass `npm run validate` and `npm run build` locally before merge.
- CI should run in < 10 minutes for the build job (with caching).
- Test coverage for critical components ≥ 60% in the first pass.

Notes
- Avoid large web3 stack upgrades in small PRs; schedule the migration epic.
- Keep PRs small and focused to keep review fast.

***

I'll open small, focused PRs for the Type & lint cleanup task and the test scaffolding next.