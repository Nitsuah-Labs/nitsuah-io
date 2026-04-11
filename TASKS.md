# TASKS

**Last Updated:** 2026-04-03 (pmo/q2-2026-planning)

## Todo

### P0 - Blocking

- [ ] **[Q2-CEO] Move Spline 3D animation to `/3d` route** — relocate the Spline scene from the home page hero to a dedicated `/3d` page; remove the "scroll for more" prompt from the home page.
  - Context: CEO directive — the Spline scene inflates the home page bundle and hurts LCP; it belongs on an opt-in page, not the critical landing path.
  - Acceptance Criteria: home page loads without any Spline bundle; `/3d` route renders the Spline scene; "scroll for more" prompt is removed; Lighthouse performance score on the home page improves by ≥ 15 points.
  - Completed: 2026-04-03
  - Evidence: `src/app/page.tsx` no longer imports/renders Spline; new `src/app/3d/page.tsx` hosts the Spline scene; `HeroSection` now supports disabling scroll prompt and home passes `showScrollIndicator={false}`.
  - Follow-up: record Lighthouse before/after measurement evidence showing the home page performance score improved by ≥ 15 points, then re-check this task.

- [ ] **[Q2-CEO] Redesign home page as a landing page with project cards** — replace the current hero/Spline layout with a focused landing page that prominently features primary projects as cards (title, short description, link to project). Use the same card styling as the existing Projects page. Lead with newer projects: agent-board, overseer, bb-mcp, darkmoon.
  - Context: CEO directive — the home page should immediately communicate what the portfolio author builds; project cards give visitors a fast scannable overview.
  - Acceptance Criteria: home page has a clear above-the-fold intro + featured project cards section; cards match Projects page styling; new projects (agent-board, overseer, bb-mcp, darkmoon) appear first; no Spline or scroll-trigger blocking the cards.
  - Completed: 2026-04-11
  - Evidence: `src/app/page.tsx` now renders LandingHero + FeaturedProjects components; new `src/app/_components/LandingHero.tsx` provides clean intro without scroll effects; new `src/app/_components/_site/FeaturedProjects.tsx` displays top 4 featured projects in 2x2 grid; new `src/app/_components/_styles/FeaturedProjects.css` provides matching card styling with hover effects; projects.ts updated to feature agent-board, overseer, bb-mcp, darkmoon as P0 visible projects.
  - Follow-up: refresh README/docs screenshots to reflect the new landing page design.

- [ ] Keep the Playwright Docker image and npm version in lockstep.
  - Context: any future Playwright upgrade must update both `Dockerfile.test` and `@playwright/test` together or Docker smoke runs will break.
  - Acceptance Criteria: coordinated upgrades keep `npm run precheck:docker` passing.

### P1 - High

- [ ] Replace placeholder-heavy client demo assets.
  - Context: the restaurant, e-commerce, real-estate, CMS, and NFT demos still rely on missing or placeholder imagery tracked in `docs/SCREENSHOTS.md`.
  - Acceptance Criteria: each demo renders with representative assets instead of placeholders.

- [ ] Replace duplicate project and crypto page assets.
  - Context: several project and crypto entries still reuse the same placeholder images.
  - Acceptance Criteria: each featured project and crypto item has distinct representative media.

- [ ] Migrate labs contracts from Mumbai to Amoy testnet.
  - Context: Mumbai is deprecated; labs contract flows need an updated chain target.
  - Acceptance Criteria: `src/wagmi.ts` and all labs pages reference Amoy; zero Mumbai references remain.

- [ ] Add AI chat widget via bb-mcp.
  - Context: bb-mcp repo provides the MCP-compatible AI chat backend; surfacing it here gives portfolio visitors an interactive Q&A about the work.
  - Acceptance Criteria: `/api/chat` route proxies bb-mcp with API key server-side only; streaming response renders in a floating widget; toggle persists across navigation.

- [ ] Bento grid layout for Projects and Skills sections.
  - Context: current card grid is uniform; bento layout improves visual hierarchy and reflects 2026 design conventions.
  - Acceptance Criteria: Projects page uses an asymmetric bento grid; Skills section uses a compact bento matrix; layout is responsive and accessible.

### P2 - Medium

- [ ] Add a wallet and MetaMask local testing path.
  - Context: wallet E2E coverage is still skipped instead of being explicitly gated.
  - Acceptance Criteria: at least one local wallet flow is testable without a live wallet; the test is intentionally gated for Nightly.

- [ ] Live kryptos feed widget.
  - Context: kryptos repo exposes cipher challenge stats; surfacing this data in Labs sidebar reinforces cross-repo coherence.
  - Acceptance Criteria: Labs sidebar shows latest kryptos challenge stats fetched from kryptos API or static JSON artifact; updates on build.

- [ ] Wire skyview analytics.
  - Context: skyview provides privacy-first event collection; replacing ad-hoc `console.log` with skyview events gives actionable usage data.
  - Acceptance Criteria: page-view events and key CTA clicks are emitted to skyview sink; no PII collected; METRICS.md updated with sample event schema.

- [ ] Add `docs/API.md`.
  - Context: `docs/ARCH.md` covers architecture, but the wagmi and chain surface lacks focused API documentation.
  - Acceptance Criteria: `docs/API.md` documents the hook surface, chain config, and any `/api/*` server routes.

- [ ] Refresh `METRICS.md` and add a validation marker.
  - Context: metrics are strong but have not been revalidated since Q1 2026.
  - Acceptance Criteria: `METRICS.md` includes a `last validated` marker and coverage is re-run; health score reflects current CI state.

- [ ] Micro-interaction and animation pass.
  - Context: hover states, scroll-triggered reveals, and page transitions are minimal; competitors use motion to improve perceived quality.
  - Acceptance Criteria: all interactive cards have consistent hover lift; sections reveal on scroll via Intersection Observer; page nav has a crossfade transition; no layout shift introduced.

- [ ] Variable font and fluid typography scale.
  - Context: current font stack uses fixed sizes; variable fonts enable smooth responsive scaling without media query breakpoints.
  - Acceptance Criteria: `--font-size-*` tokens in `theme.css` use `clamp()` values; a variable font is loaded with `font-display: swap`; existing heading hierarchy preserved.

### P3 - Exploratory

- [ ] Expand wallet-flow coverage in Playwright Nightly.
  - Context: full wallet lifecycle (connect → sign → disconnect) still lacks automated nightly coverage.
  - Acceptance Criteria: wallet connection flow passes in the Nightly workflow using a mock provider.

- [ ] On-chain resume / verifiable credentials page.
  - Context: EAS (Ethereum Attestation Service) on Base allows on-chain skill and experience attestations tied to a wallet address.
  - Acceptance Criteria: a `/resume/onchain` route renders attestations from a configured wallet; falls back gracefully when no attestations found.

- [ ] Agent-board showcase section.
  - Context: agent-board orchestrates autonomous coding agents; showing its activity log on the portfolio is a meta-demonstration of the stack.
  - Acceptance Criteria: a `/lab/agents` page embeds a read-only agent activity feed from agent-board; updates are near-real-time via polling or SSE.

- [ ] PWA manifest and offline support.
  - Context: portfolio is frequently shared on mobile; PWA install prompt improves retention.
  - Acceptance Criteria: `public/manifest.json` is valid; Lighthouse PWA score ≥ 90; offline fallback serves cached project data.

- [ ] Farm staking demo integration.
  - Context: farm repo contains staking contract deployments; surfacing live staking flow in Labs strengthens the DeFi demo.
  - Acceptance Criteria: Labs staking page connects to farm contracts on Amoy; APY and balance are read from chain in real time.

- [ ] Evaluate and reduce Spline 3D scene weight.
  - Context: Spline scenes inflate initial bundle and hurt LCP; hero scene may be the only one worth keeping.
  - Acceptance Criteria: Spline scenes outside the hero are lazy-loaded or replaced with CSS animations; LCP improves by ≥ 10%.

## In Progress

## Done

- [x] Docker test infrastructure.
- [x] CSS architecture migration.
- [x] Dark mode theme system.
- [x] Dark mode toggle UI.
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
- [x] Add `docs/INTEGRATIONS.md`.

<!-- AGENT INSTRUCTIONS:
1. Keep work in P0-P3 sections.
2. Preserve short, scannable checklist entries with Context and Acceptance Criteria.
3. Keep detailed visual-asset inventory in `docs/SCREENSHOTS.md`.
4. Cross-repo integration tasks should reference the source repo by name (e.g., bb-mcp, kryptos).
5. Move completed items to Done when CI confirms the feature ships.
-->
