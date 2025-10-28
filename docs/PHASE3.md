# Phase 3 — Finish up, polish, and ship

This document collects remaining work after Phase 2 and Phase 2.1. Move items here when they are deferred or need a larger coordinated effort.

## Priority goals

- Finish lint/type cleanup across the repo (small PRs, run `npm run lint:fix` and manual corrections).

- Add unit tests and CI test job (Account, Connect, MintNFT at minimum).

- Create a simple e2e smoke test (Playwright) that opens the homepage and asserts a 200 response.

- Finalize CI (cache node_modules/.next, add test job, fast-fail on lint/type errors).

## Remaining technical tasks

- Replace temporary `<img/>` fallbacks with `next/image` where appropriate once types are available.

- Review any remaining `any` casts used to work around wagmi/viem generics and replace with narrower types where practical.

- Audit and upgrade dependencies that are safe to bump (lint-staged, pino-pretty, sha.js) in separate PRs.

## Docs & housekeeping

- Consolidate the README, add `src/lib/data/projects.ts` and `SelectedProjects` component.

- Commit a canonical `package-lock.json` for CI reproducibility (generate on canonical dev machine if required).

## Deferred / Large migrations

- Wagmi/Viem major upgrade — schedule as a migration epic and test generated hooks extensively.

## How to pick up work

- Start with lint-fix PRs (5 PRs of ~10-20 files). Each PR: run `npm run lint:fix`, fix remaining errors, run `npm run validate` and `npm run build` locally.

## Notes

- Avoid committing secrets; CI and Netlify should be configured with runtime env vars.

- Keep PRs small and focused to minimize review friction.

---

Place any leftover checklists from Phase 2 / Phase 2.1 here as sub-items, and update this file as tasks are completed.
# Phase 3 — Finish up, polish, and ship

This document collects remaining work after Phase 2 and Phase 2.1. Move items here when they are deferred or need a larger coordinated effort.

Priority goals
- Finish lint/type cleanup across the repo (small PRs, run `npm run lint:fix` and manual corrections).
- Add unit tests and CI test job (Account, Connect, MintNFT at minimum).
- Create a simple e2e smoke test (Playwright) that opens the homepage and asserts a 200 response.
- Finalize CI (cache node_modules/.next, add test job, fast-fail on lint/type errors).

Remaining technical tasks
- Replace temporary `<img/>` fallbacks with `next/image` where appropriate once types are available.
- Review any remaining `any` casts used to work around wagmi/viem generics and replace with narrower types where practical.
- Audit and upgrade dependencies that are safe to bump (lint-staged, pino-pretty, sha.js) in separate PRs.

Docs & housekeeping
- Consolidate the README, add `src/lib/data/projects.ts` and `SelectedProjects` component.
- Commit a canonical `package-lock.json` for CI reproducibility (generate on canonical dev machine if required).

Deferred / Large migrations
- Wagmi/Viem major upgrade — schedule as a migration epic and test generated hooks extensively.

How to pick up work
- Start with lint-fix PRs (5 PRs of ~10-20 files). Each PR: run `npm run lint:fix`, fix remaining errors, run `npm run validate` and `npm run build` locally.
- Add unit tests in a separate test-coverage PR and wire Jest to CI.

Notes
- Avoid committing secrets; CI and Netlify should be configured with runtime env vars.
- Keep PRs small and focused to minimize review friction.

***

Place any leftover checklists from Phase 2 / Phase 2.1 here as sub-items, and update this file as tasks are completed.
# PHASE 3

