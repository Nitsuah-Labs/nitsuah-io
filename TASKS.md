# TASKS

## Tasks for Phase A

### Dependency Fixes

- chore(deps): bump next from 16.0.1 to 16.0.5
- chore(deps): bump @splinetool/runtime from 1.10.99 to 1.12.4
- chore(deps-dev) bump @types/react from 19.2.2 to 19.2.7
- chore(deps-dev): bump @wagmi/cli from 2.7.1 to 2.8.0
- chore(deps-dev): bump js-yaml from 3.14.1 to 3.14.2

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

### Testing Infrastructure

- [x] **Accessibility Fixes** - Fixed main landmark violations across all pages:
  - Added `id="main"` to all Labs pages (lookup, stake, token, dao, ai, register, mint, domains, hub)
  - Added `id="main"` to main pages (homepage, about, projects, crypto)
  - Fixed aria-prohibited-attr violation in wallet Connect component
  - Result: 20/28 accessibility tests passing (71% → 100% of page-specific tests)
- [ ] **Resume Page Test Investigation** - Resume page builds and renders correctly in browser but returns empty HTML in Playwright tests:
  - Moved resume.json from public/assets to src/data for proper imports
  - All 8 Resume accessibility tests timeout waiting for selectors
  - Page works manually, issue is specific to test environment
  - Needs: Debug why Playwright webServer returns empty response for /resume route
- [ ] **Docker Setup** - Setup Docker for visual regression tests to handle CI/local environment differences
- [ ] **Visual Test Re-enablement** - Once Docker is configured, re-enable 3 skipped Playwright visual tests:
  - `tests/visual/homepage.spec.ts:5` - homepage desktop rendering
  - `tests/visual/homepage.spec.ts:32` - homepage mobile rendering
  - `tests/visual/projects.spec.ts:6` - projects page rendering

### Code Quality (Optional - Nice to Have)

- [ ] **Inline Styles Extraction** - Extract inline styles from demo components to CSS modules:
  - Portfolio components (ProjectGallery, AboutSection, ContactForm)
  - Resume components (ResumeView, ContactView)
  - NFT components (NFTGallery, MintingInterface)
- [ ] **Type Safety** - Review and remove `any` types where possible
- [ ] **JSDoc Comments** - Add documentation for complex functions

### Documentation (Optional)

- [ ] **ARCHITECTURE.md** - Update with Phase 3 component structure
- [ ] **Component Style Guide** - Document shared component patterns
- [ ] **Testing Best Practices** - Document testing conventions

### Future Enhancements

- [ ] **Dark Mode** - Implement theme toggle (shows CSS/accessibility best practices)
- [ ] **Data Backend Strategy** - SaaS Dashboard meta-dashboard concept:
  - Hook into /lib/data for static data initially
  - Create SQL query window interface
  - Research Netlify data storage options (postgres, sqlite)
  - Plan "meta" dashboard to pull data from all demos
  - Design connector strategy for demo apps

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