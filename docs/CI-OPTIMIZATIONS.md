# CI Optimization Notes

This document lists safe, low-risk optimizations to make CI builds and Playwright runs faster and more deterministic.

1) Use a production build in CI for Playwright visual/e2e runs
   - Running `next build` + `next start` is more deterministic than `next dev` and usually faster in CI.
   - Playwright's `webServer` is configured to run `npm run build:ci && npm run start` when `process.env.CI` is set.
   - `package.json` provides `build:ci` which currently maps to `build:skip-wagmi` to avoid heavy codegen during test runs.

2) Cache directories in CI
   - Cache `node_modules` and the Next.js build output (`.next`) between jobs to reduce cold-start time.
   - Example (GitHub Actions):
     - Cache `~/.npm` / `node_modules`
     - Cache `.next` between jobs when the branch hasn't changed dramatically

3) Skip heavy codegen in short CI runs
   - Use `npm run build:ci` in fast test pipelines to avoid wagmi codegen. For release or full build pipelines, run the full `npm run build`.

4) Run a smaller Playwright matrix for PR validation
   - For quick PR checks, only run `chromium-desktop` with a subset of smoke tests. Reserve full cross-browser suites for nightly or merged main builds.

5) Lighthouse profiling (local / scheduled)
   - Run Lighthouse audits locally or in a scheduled job using `lighthouse-ci` instead of in every PR.
   - Focus fixes on LCP, TBT, and accessibility. For Spline (heavy 3D scene), prefer lazy-loading and use a lightweight fallback for LCP.

6) Debugging failing checks
   - If accessibility checks fail in CI, inspect the Playwright artifacts (`test-results/*/compare`, screenshots, and video) provided by Playwright for exact failure contexts.

If you want, I can:

- Add a small GitHub Actions workflow snippet for caching and using `build:ci`.

- Implement a `lighthouse-ci` job scaffold for scheduled runs.

<!-- EOF -->