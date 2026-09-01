
# Metrics

**Last Validated:** 2026-09-01 (re-run in Docker via `config/Dockerfile.unit`, `npm run test:coverage`)

## Core Metrics

| Metric        | Value                                        | Notes                                        |
| ------------- | --------------------------------------------- | --------------------------------------------- |
| Code Coverage | 97.21% stmts / 81.37% branch / 83.33% funcs   | Jest unit tests (214 passing)                |
| Test Suites   | 17                                            | Jest unit test suites                        |
| TypeScript    | Strict mode                                  | Assumed zero errors — not re-run this pass    |
| Lines of Code | ~21.8K                                        | Not re-measured this pass; excludes tests/generated/config |

## Health

| Metric          | Value      | Notes                          |
| --------------- | ---------- | ------------------------------ |
| Passing Tests   | 214/214    | 100% Jest unit tests (re-run 2026-09-01) |
| Skipped Tests   | 0          | All Jest tests enabled and passing |
| Security Alerts | Not re-run this pass | Last known: 0 (npm audit, zero high/critical) |
| Last Updated    | 2026-09-01 | Metrics audit date (Jest only — see note below) |

## Test Breakdown

| Test Suite   | Status   | Count | Notes |
| ------------ | -------- | ----- | ----- |
| Unit Tests   | 214      | ✅ Re-verified 2026-09-01 | Jest + React Testing Library, 17 suites |
| A11y Tests   | 20       | ⚠️ Not re-run this pass | Last known count from 2026-04-13 audit |
| Resume Tests | 8        | ⚠️ Not re-run this pass | Last known count from 2026-04-13 audit |
| Visual Tests | 9        | ⚠️ Not re-run this pass | Last known count from 2026-04-13 audit |
| E2E Tests    | 11       | ⚠️ Not re-run this pass | Last known count from 2026-04-13 audit |

Playwright suites (A11y/Resume/Visual/E2E) were not re-executed to completion in this pass — the Docker build/run was kicked off but didn't finish within this session. Numbers above are carried over from the last validated run and should be treated as stale until re-confirmed.

## Docker Testing

| Metric | Value | Notes |
| ------ | ----- | ----- |
| Unit test image (`config/Dockerfile.unit`) | `node:22.13.0-slim` | Built and run 2026-09-01; `npm run test:coverage` passed (214/214) |
| Playwright image (`config/Dockerfile.test`) | `mcr.microsoft.com/playwright:v1.62.1-noble` | Version bumped from v1.57.0 since last validation; not re-run to completion this pass |

## Notes

- **Code Coverage**: 97.21% statements / 81.37% branch / 83.33% functions, measured via Jest coverage report, re-run 2026-09-01 in Docker (`config/Dockerfile.unit`). 214 tests across 17 suites — up from the previously recorded 213/16 (see `docs/CHANGELOG.md`).
- **Build Performance / Bundle Size**: not re-measured this pass; previous values (35.13s build, 324.90 MB `.next`) are stale and removed rather than re-published unverified.
- **Test Status**: only the Jest unit suite was re-verified this pass. Playwright E2E/A11y/Visual/Resume suites still show their last-known 2026-04-13 counts (61 total) — re-run `npm run precheck:docker` to refresh them.
- **Lines of Code**: not re-measured this pass; previously recorded at ~21.8K (2026-04-13).
- **Security**: not re-run this pass; previously zero npm audit vulnerabilities as of 2026-04-13.
- **Accessibility**: not re-verified this pass; previously WCAG 2.1 AA compliant across all 13 pages as of 2026-04-13.

Last validated: 2026-09-01 — Jest unit suite re-run in Docker; Playwright suites still pending re-verification.

<!--
AGENT INSTRUCTIONS:
This file tracks project health metrics.
1. Update values based on the latest code analysis or CI/CD outputs.
2. "Code Coverage": Percentage of code covered by tests.
3. "Build Time": Time taken for the build process.
4. "Bundle Size": Size of production assets.
5. "Health": General health indicators like open issues count.
6. Ensure values are accurate and reflect the current state of the codebase.
7. Can allow custom attribute value pairs, but leave existing.
-->
