# TASKS

**Last Updated:** 2026-03-27 | PMO audit — validated against live site https://nitsuah.io, Docker build, and `docs/`

## Priority Key

- **P0** — Blocking (CI or deploy pipeline broken)
- **P1** — High (user-visible gap or quality debt)
- **P2** — Medium (polish, docs, DX)
- **P3** — Low (exploratory)

---

## P0 — Blocking

### Fix Playwright Docker Image Version Drift

**Status:** Open  
**Context:** `Dockerfile.test` pins `mcr.microsoft.com/playwright:v1.56.1-noble` but `package.json` has `@playwright/test@1.57.0`. Docker smoke run fails — `Executable doesn't exist at /ms-playwright/chromium_headless_shell-1200/`. The WebServer starts fine; only the browser binary is mismatched. Prescribed workflow is `npm run precheck:docker` (see `docs/TESTING.md`).  
**Fix:** Update `Dockerfile.test` line 1 → `mcr.microsoft.com/playwright:v1.57.0-noble`  
**Acceptance:** `npm run precheck:docker` passes — `tests/smoke.spec.ts` + `tests/accessibility/critical.spec.ts` green

---

## P1 — High

### Visual Assets: Client Demos

**Status:** Open  
**Context:** Three 🔴 High Priority demos in `/projects/clients` have no real images (from `docs/SCREENSHOTS.md`):
- **Restaurant Demo**: 22+ Italian food images (800×600px min) — no images at all
- **E-Commerce Storefront**: 12+ product images (keyboards, monitors, laptops — 800×800px min)
- **Real Estate Demo**: property listing images — none present
- **CMS/Blog Demo**: 10+ blog header images (1200×600px min) — 🟡 placeholder  
- **NFT Minting Demo**: sample NFT art (512×512px min) — 🟢 emoji placeholders  
**Acceptance:** Each demo renders without placeholder/emoji fallbacks; resolved per `docs/SCREENSHOTS.md` priorities

### Visual Assets: Projects & Crypto Pages

**Status:** Open  
**Context:** From `docs/SCREENSHOTS.md`:
- Crypto `/crypto` page: DApp Gallery, ETH Smart Contracts, NFT Marketplace, Web3 Security Audits all using duplicate `trail.png`/`mint.gif`/`ledger.png` — 🟡
- Projects `/projects` page: Kryptos, GCP Tools, Stash all using `cat.png` placeholder — 🟡  
**Acceptance:** Unique representative images per project; no shared duplicates remaining

### Dark Mode Toggle UI Component

**Status:** Open  
**Context:** Theme system infrastructure is fully wired — `ThemeContext`, CSS custom properties, `localStorage` persistence, SSR-safe (see `docs/ARCH.md`). The toggle UI component was not shipped. In 2026Q1 roadmap since December.  
**Acceptance:** Toggle visible in site header; persists on reload; no hydration mismatch

### Mumbai → Amoy Testnet Migration

**Status:** Open  
**Context:** Polygon deprecated Mumbai testnet. Contracts deployed to Mumbai are unreachable. Affects `/labs` pages (register, mint, domains), `src/wagmi.ts` chain config, and deployed contract addresses.  
**Acceptance:** `src/wagmi.ts` uses Amoy chain; labs contract interactions functional on Amoy; old Mumbai references removed

---

## P2 — Medium

### Wallet / MetaMask Local Testing Setup

**Status:** Open  
**Context:** `tests/e2e/labs/wallet-connection.spec.ts` exists; wallet flows intentionally scoped to Playwright Nightly (see `docs/PLAYWRIGHT_FIXES.md`). No local mock wallet or test wallet documented.  
**Acceptance:** At least one wallet connection path exercisable locally without a live wallet

### API Documentation (`docs/API.md`)

**Status:** Open  
**Context:** `docs/ARCH.md` covers architecture comprehensively. `src/generated.ts` (wagmi hooks) and `src/wagmi.ts` (chain/connector config) lack reference documentation. No `docs/API.md` found.  
**Acceptance:** `docs/API.md` created covering wagmi hook surface, chain config, and any server-side endpoints

### Refresh METRICS.md Currency

**Status:** Open  
**Context:** Values in `METRICS.md` appear accurate (98% unit coverage, 213 tests, Lighthouse scores) but are from December 2025 — 3+ months without revalidation. No "last validated" date field.  
**Acceptance:** Add `<!-- last validated: YYYY-MM-DD -->` marker; re-run `npm run test:coverage` to confirm values

---

## P3 — Low / Exploratory

### Playwright Nightly: Expand Wallet Flow Coverage

**Status:** Open  
**Context:** CI split documented in `docs/PLAYWRIGHT_FIXES.md`. Wallet tests are nightly-only. Full wallet connection lifecycle has no automated coverage.  
**Acceptance:** Wallet connection test passing in Playwright Nightly workflow

### Privacy-First Analytics

**Status:** Open  
**Context:** Referenced in 2026Q2 roadmap. No current analytics implementation.  
**Acceptance:** Privacy-compliant analytics (Plausible or Fathom) with no PII collection; consent flow if required

---

## Done

- [x] Docker test infrastructure (`Dockerfile.test`, `docker-compose.test.yml`, `docs/TESTING.md`)
- [x] CSS architecture — full migration to CSS Modules + CSS custom properties
- [x] Dark mode theme system (ThemeContext, localStorage persistence, SSR-safe)
- [x] Jest unit test coverage ≥98% — 213 tests across 16 suites
- [x] GitHub Actions CI pipeline (lint, typecheck, unit tests, build, security scan, Lighthouse)
- [x] Playwright E2E infrastructure (smoke, accessibility, navigation, wallet stubs)
- [x] Visual regression tests (6 tests — Docker-standardized update workflow)
- [x] Playwright CI split (CI Fast + Playwright Nightly — `docs/PLAYWRIGHT_FIXES.md`)
- [x] `config/` directory — centralized Jest/ESLint/Prettier/wagmi config
- [x] `.dockerignore` (comprehensive — node_modules, .next, .git, docs, coverage excluded)
- [x] PR template + bug report template
- [x] Netlify deployment (Node 22, `@netlify/plugin-nextjs` SSR mode)
- [x] Resume page PDF mode (two-column Experience layout with summary cards)
- [x] Portfolio navigation (Crypto added to dropdown)

---

<!-- AGENT INSTRUCTIONS:
This file tracks actionable tasks.
1. Keep active items in their priority sections (P0–P3)
2. Move completed items to Done with [x]
3. Evidence source in Context field — link to docs/ where applicable
4. Keep descriptions concise but actionable
-->