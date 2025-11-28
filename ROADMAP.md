# ROADMAP.md

**Updated:** November 28, 2025

## Q1 2026

- [x] Core features
- [x] Initial release
- [x] Setup Docker and re-enable skipped Playwright visual tests
- [x] Docker environment for CI/local parity (Playwright v1.56.1 on Ubuntu Noble)
- [ ] FIX Resume page test investigation - debug empty HTML response in test environment
- [ ] Manual setup step - will setup metamask or another wallet or lets review embedded components that may ship by default with wagmi or whatever provider we have. but enough to get us started again on testing locally.
- [ ] Contract debugging on local testnet
- [ ] Network auto-switch detection
- [ ] Mumbai → Amoy migration
- [ ] Screenshot requirements doc see `SCREENSHOT-REQUIREMENTS.md`
- [ ] Dark mode implementation

## Q2 2026

- [ ] User feedback integration
- [ ] Performance improvements
- [ ] **TECH DEBT** - any new Strategic codebase cleanup and refactoring remaining (see `TECH_DEBT.md` for full plan)

## Q3 2026

- [ ] Advanced features
- [ ] Mobile support

## Q4 2026

- [ ] Enterprise features

## OKRs

- [x] **Docker Testing Infrastructure** - Built Docker image (mcr.microsoft.com/playwright:v1.56.1-noble) for consistent CI/local testing environment (5.5min build, 332s)
- [ ] **Resume Page Tests** - Investigate why resume page returns empty HTML in Playwright tests despite successful build and browser rendering
- [ ] Manual setup step - will setup metamask or another wallet or lets review embedded components that may ship by default with wagmi or whatever provider we have. but enough to get us started again on testing locally.
- [ ] **Network Auto-Switch** - Auto-detect wrong network (most wallets do this automatically but once we confirm connection we can add some wallet ui elements to the nav bar and pages for interaction - ie: wallet connect handles this alot but need to set context on intendend chains for a page and prompt user to switch if on wrong one which is often a message back to the wallet app itself to do so.)
- [ ] **Contract Testing** - Local testnet debugging
- [ ] **Mumbai → Amoy** - Polygon testnet migration (big change but one we definitely need to do, we might need to redeploy our contract but not sure yet - also not sure where our contract deployer repo even is right now so ill track that down later. but if you find contract ID's or wallet addresses that might help me out im sure its SOMEWHERE)
- [ ] **Dark Mode** - Theme toggle to change some of the ui and css colors around on the page (we defer to dark mode so not really needed imo but shows some CSS and Ally best practices to adjust chromatics like that on demand and when designing for different user prefs)

<!--
AGENT INSTRUCTIONS:
This file tracks the project's high-level goals.
1. Organize items by Quarter (Q1, Q2, etc.) or Milestone.
2. Mark items as [x] when completed.
3. Add new strategic goals as they emerge.
4. Ensure items are high-level features or milestones, not individual bug fixes.

_For feature requests see `FEEDBACK.md`_
_For security status see `SECURITY_FIXES.md`_
_For phase items see `PHASE_#.md`_
-->