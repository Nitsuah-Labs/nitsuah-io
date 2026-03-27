# TASKS

Last Updated: 2026-03-27

## Todo

### P0 - Blocking

- [ ] Keep the Playwright Docker image and npm version in lockstep.
  - Priority: P0
  - Context: any future Playwright upgrade must update both `Dockerfile.test` and `@playwright/test` together or Docker smoke runs will break.
  - Acceptance Criteria: coordinated upgrades keep `npm run precheck:docker` passing.

### P1 - High

- [ ] Replace placeholder-heavy client demo assets.
  - Priority: P1
  - Context: the restaurant, e-commerce, real-estate, CMS, and NFT demos still rely on missing or placeholder imagery tracked in `docs/SCREENSHOTS.md`.
  - Acceptance Criteria: each demo renders with representative assets instead of placeholders.

- [ ] Replace duplicate project and crypto page assets.
  - Priority: P1
  - Context: several project and crypto entries still reuse the same placeholder images.
  - Acceptance Criteria: each featured project and crypto item has distinct representative media.

- [ ] Ship the dark mode toggle UI.
  - Priority: P1
  - Context: the theme system is complete, but the visible toggle still is not.
  - Acceptance Criteria: the toggle is present in the header, persists, and avoids hydration issues.

- [ ] Migrate labs from Mumbai to Amoy.
  - Priority: P1
  - Context: Mumbai is deprecated and the labs contract flows need an updated chain target.
  - Acceptance Criteria: `src/wagmi.ts` and the labs pages use Amoy and no Mumbai references remain.

### P2 - Medium

- [ ] Add a wallet and MetaMask local testing path.
  - Priority: P2
  - Context: the wallet E2E coverage is still skipped instead of being explicitly gated for nightly or browser-only runs.
  - Acceptance Criteria: at least one local wallet flow is testable without a live wallet and the test is gated intentionally.

- [ ] Add `docs/API.md`.
  - Priority: P2
  - Context: `docs/ARCH.md` covers architecture, but the wagmi and chain surface still lacks focused API documentation.
  - Acceptance Criteria: `docs/API.md` documents the hook surface, chain config, and any server-side endpoints.

- [ ] Refresh `METRICS.md` and add a validation marker.
  - Priority: P2
  - Context: the current metrics are strong, but they have not been revalidated since December 2025.
  - Acceptance Criteria: `METRICS.md` includes a `last validated` marker and coverage is re-run.

### P3 - Exploratory

- [ ] Expand wallet-flow coverage in Playwright Nightly.
  - Priority: P3
  - Context: the full wallet lifecycle still lacks automated nightly coverage.
  - Acceptance Criteria: the wallet connection flow passes in the Nightly workflow.

- [ ] Add privacy-first analytics.
  - Priority: P3
  - Context: analytics remains a roadmap concept rather than a live capability.
  - Acceptance Criteria: a privacy-respecting analytics path is implemented without PII collection.

## In Progress

## Done

- [x] Docker test infrastructure.
- [x] CSS architecture migration.
- [x] Dark mode theme system.
- [x] Jest unit coverage above 98 percent.
- [x] GitHub Actions CI pipeline.
- [x] Playwright E2E infrastructure.
- [x] Visual regression coverage.
- [x] Split Playwright CI strategy.
- [x] Centralized `config/` directory.
- [x] Comprehensive `.dockerignore`.
- [x] PR and bug-report templates.
- [x] Netlify deployment.
- [x] Resume PDF mode.
- [x] Portfolio navigation updates.

<!-- AGENT INSTRUCTIONS:
1. Keep work in P0-P3 sections.
2. Preserve short, scannable checklist entries.
3. Keep detailed visual-asset inventory in `docs/SCREENSHOTS.md`.
-->
