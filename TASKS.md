# TASKS

## Phase A

### Testing Infrastructure

- [x] **Accessibility Fixes** - Fixed main landmark violations across all pages:
  - Added `id="main"` to all Labs pages (lookup, stake, token, dao, ai, register, mint, domains, hub)
  - Added `id="main"` to main pages (homepage, about, projects, crypto)
  - Fixed aria-prohibited-attr violation in wallet Connect component
  - Result: 20/28 accessibility tests passing (71% → 100% of page-specific tests)
  - Commits: 42ea3d9, d8269cf, 06cb2a1, 193a7ac, e2d1e9c
- [x] **Docker Setup** - Setup Docker for Playwright tests to handle CI/local environment differences:
  - Built Docker image (mcr.microsoft.com/playwright:v1.56.1-noble) - 5.5min build time (332s)
  - Configured docker-compose.test.yml with CI environment variables
  - 136.88MB context size with proper volume mounting for test results
  - Status: Image built successfully, confirmed resume issue not Windows-specific
  - Eliminates Windows-specific test conflicts by matching CI environment exactly
- [x] **Resume Page Test Investigation** - RESOLVED: Resume data import path was incorrect:
  - Root cause: Import path was `../../../data/resume.json` (doesn't exist)
  - Fixed to: `../../data/resume.json` (correct path from src/app/resume/page.tsx)
  - Also fixed: Missing NEXT_PUBLIC_TEST_HELPERS=1 env var in CI workflow
  - Result: Build succeeds, page renders with actual data
  - Commits: 7cba3de (path fix), 53fea7c (CI env var), 25858cc (final correction)
- [ ] **Accessibility Test Failures** - ACTIVE: 47/59 tests failing with axe-core injection errors:
  - Error: "Cannot read properties of null (reading 'documentElement')"
  - Cause: axe-core running before React hydration completes
  - Fix attempt: Added networkidle wait + error handling to all-pages.spec.ts
  - Affects: All accessibility tests across homepage, labs pages, resume, keyboard nav
  - Tests passing: 11 (keyboard nav skip links, some visual tests)
  - Next: Verify fix, may need to add waitForSelector for main/body before axe scan
- [ ] **Visual Test Re-enablement** - Once Docker resume investigation completes, re-enable 3 skipped Playwright visual tests:
  - `tests/visual/homepage.spec.ts:5` - homepage desktop rendering
  - `tests/visual/homepage.spec.ts:32` - homepage mobile rendering
  - `tests/visual/projects.spec.ts:6` - projects page rendering
  - Requires: Docker environment validation and screenshot baseline updates

### Dependency Fixes

- [ ] chore(deps): bump next from 16.0.1 to 16.0.5
- [ ] chore(deps): bump @splinetool/runtime from 1.10.99 to 1.12.4
- [ ] chore(deps-dev) bump @types/react from 19.2.2 to 19.2.7
- [ ] chore(deps-dev): bump @wagmi/cli from 2.7.1 to 2.8.0
- [ ] chore(deps-dev): bump js-yaml from 3.14.1 to 3.14.2
- [ ] chore(deps-dev): bump baseline-browser-mapping to latest (currently >2 months old)
- [ ] Verify all dependency updates do not introduce new test failures or accessibility issues and are up to date

### Web3 / Wallet Setup

- [ ] **Wallet Testing Setup** - Manual setup for MetaMask or embedded wallet components from wagmi for local testing
- [ ] **Network Context** - Review wallet provider options and set up network detection context
- [ ] **Contract Deployer** - Track down contract deployer repo, find contract IDs and wallet addresses
- [ ] **Mumbai → Amoy Migration** - Polygon testnet migration (contract redeployment may be needed)

### Visual Assets

- [ ] **Screenshot Requirements** - See `SCREENSHOT-REQUIREMENTS.md` for full list of needed assets:
  - Crypto page: 4 projects need screenshots (DApp Gallery, ETH Contracts, NFT Marketplace, Security Audits)
  - Projects page: 3 projects need screenshots (Kryptos, GCP Tools, Stash)
  - Client demos: Multiple demos need product/content images (Restaurant: 22+ food photos, E-Commerce: 12+ products, Real Estate: 30-50 property photos, etc.)

### Code Quality (Optional)

- [ ] **Inline Styles Extraction** - Extract inline styles from demo components to CSS modules:
  - Portfolio components (ProjectGallery, AboutSection, ContactForm)
  - Resume components (ResumeView, ContactView)
  - NFT components (NFTGallery, MintingInterface)
- [ ] **Type Safety** - Review and remove `any` types where possible
- [ ] **JSDoc Comments** - Add documentation for complex functions
- [ ] Run line of code scans for top 10 files and reduce LOC where possible by refactoring

### Documentation Updates

- [ ] As a `PM.md` task list, update documentation to reflect current architecture and best practices:
  - [ ] **ARCHITECTURE.md** - Update with Phase 3 component structure
  - [ ] **Component Style Guide** - Document shared component patterns
  - [ ] **Testing Best Practices** - Document testing conventions (partially in CONTRIBUTING.md)

### Future Enhancements

- [ ] **Dark Mode** - Implement theme toggle (shows CSS/accessibility best practices)
- [ ] **Data Backend Strategy** - SaaS Dashboard meta-dashboard concept:
  - Hook into /lib/data for static data initially
  - Create SQL query window interface
  - Research Netlify data storage options (neon db)
  - Plan "meta" dashboard to pull data from all demos and start to bring them to life
  - Design connector strategy for demo apps (where they all use shared db/api)

## /docs

_For pre-phase work see `PREP-PHASE-A.md`_
_For feature requests see `FEEDBACK.md`_
_For security status see `SECURITY_FIXES.md`_
_For phase items see `PHASE-A.md`_
_For completed tech debt see `TECH_DEBT.md`_

<!--
AGENT INSTRUCTIONS:
This file tracks specific actionable tasks.
1. Categorize tasks into "Todo", "In Progress", and "Done".
2. Add new tasks identified during code analysis or planning.
3. Mark tasks as [x] when verified as complete.
4. Keep task descriptions concise but actionable.
-->