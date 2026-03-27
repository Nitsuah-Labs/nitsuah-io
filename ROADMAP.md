# ROADMAP

**Last Updated:** 2026-03-27 | PMO audit — validated against live site https://nitsuah.io, Docker build, and `docs/`

## Status Legend

- ✅ Done
- 🔴 Blocking — fix required before next milestone
- 🔄 In Progress
- 📋 Planned
- 🔭 Exploratory

---

## 2025 Q4 ✅ — Foundation Stabilization

All shipped. Validated in December 2025.

- ✅ Core features and initial release
- ✅ CSS architecture — full migration to CSS Modules + CSS custom properties
- ✅ Dark mode theme system (ThemeContext, localStorage, SSR-safe hydration)
- ✅ Jest unit test coverage ≥98% — 213 tests across 16 suites
- ✅ Docker test infrastructure (Dockerfile.test, docker-compose.test.yml)
- ✅ GitHub Actions CI pipeline (lint, typecheck, unit tests, build, security scan, Lighthouse)
- ✅ Playwright E2E infrastructure (smoke, accessibility, navigation, wallet stubs)
- ✅ Visual regression tests (6 tests, Docker-standardized update workflow)
- ✅ Playwright CI split — CI Fast (required gates) + Playwright Nightly (full browser)
- ✅ `config/` directory — centralized Jest/ESLint/Prettier/wagmi config
- ✅ `.dockerignore` (comprehensive), PR template, bug report template
- ✅ Netlify deployment (Node 22, `@netlify/plugin-nextjs` SSR mode)
- ✅ Resume page PDF mode (two-column layout) + portfolio navigation (Crypto dropdown)
- ✅ Documentation consolidated into `docs/` (ARCH.md, TESTING.md, PLAYWRIGHT_FIXES.md, SCREENSHOTS.md, DEMO_REF.md)

---

## 2026 Q1 🔄 — Restore Test Parity + Complete Visual Identity

**Goal:** `npm run precheck:docker` passes; site has full visual identity; dark mode toggle shipped.

- 🔴 **Fix Playwright Docker image version drift** — `Dockerfile.test` pins `v1.56.1-noble` but `@playwright/test@1.57.0` is installed. Docker smoke run fails with missing browser binary. Fix: update to `v1.57.0-noble`. (P0 — see TASKS.md)
- 📋 **Dark Mode Toggle UI** — `ThemeContext` is wired; toggle component not shipped (P1)
- 📋 **Visual assets: client demos** — Restaurant (22+ images 🔴), E-Commerce (12+ 🔴), Real Estate (🔴), CMS/Blog (🟡), NFT Minting (🟢) — tracked in `docs/SCREENSHOTS.md`
- 📋 **Visual assets: crypto + projects pages** — 4 crypto entries using duplicates; Kryptos/GCP Tools/Stash using `cat.png` placeholder (🟡)

---

## 2026 Q2 📋 — Web3 Tooling + Docs + Analytics

**Goal:** Polygon testnet updated, wallet testing unblocked, documentation complete, analytics live.

- **Mumbai → Amoy migration** — Mumbai deprecated; update `src/wagmi.ts`, redeploy contracts to Amoy, update `/labs` pages
- **MetaMask/wallet local testing setup** — enable wallet test path without live wallet dependency
- **`docs/API.md`** — document wagmi hooks, chain config, and server-side endpoints
- **Privacy-first analytics** — Plausible or Fathom; no PII collection; consent flow if required
- **Refresh `METRICS.md`** — re-run coverage + Lighthouse; add `<!-- last validated: -->` date

---

## 2026 Q3 🔭 — Advanced Web3 + Backend Services

**Goal:** Expanded contract coverage, backend integrations, deeper demo capabilities.

- Expand Playwright Nightly wallet flow coverage (full connection lifecycle)
- Smart contract testing parity (unit tests for deployed contracts)
- Backend services — IPFS, GenAI, NeonDB integration exploration
- Contract deployer tooling — track deployer repo, map contract addresses to repos

---

## Architecture North Star

Next.js 16 App Router SSR on Netlify — no static export (intentional for Web3 SSR features). Web3: wagmi v2 + viem v2, custom Connect UI with wallet logos and install prompts. Styling: CSS Modules + CSS custom properties, full dark/light theme system. Testing: Jest (98% unit) + Playwright split CI strategy. Architecture documented in `docs/ARCH.md`; CI split rationale in `docs/PLAYWRIGHT_FIXES.md`.

<!--
AGENT INSTRUCTIONS:
This file tracks the project's high-level goals.
1. Organize by Quarter with status legend
2. Mark items as ✅ when shipped and validated
3. Evidence source required for any status change
4. For individual task detail see TASKS.md
-->