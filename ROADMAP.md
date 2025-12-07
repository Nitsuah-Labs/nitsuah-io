# ROADMAP.md

**Updated:** December 4, 2025

## 2025Q4

- [x] Core features
- [x] Initial release
- [x] Setup Docker and re-enable skipped Playwright visual tests
- [x] Docker environment for CI/local parity (Playwright v1.57.0 on Ubuntu Noble)
- [x] FIX Resume page test investigation - RESOLVED: Use production build in tests
- [x] **TECH DEBT** - Strategic codebase cleanup (98% test coverage, CSS modules, dark mode)
- [x] **Test Coverage** - 213 tests across 16 suites, 98% statement coverage
- [x] **Dark Mode** - Theme system with localStorage persistence (completed December 2025)
- [x] **CSS Refactor** - All inline styles migrated to CSS modules (completed December 2025)
- [x] **Documentation** - Cleaned up and consolidated project docs

## 2026Q1

- [x] **Visual Regression Automation** - Standardized screenshot update workflow with Docker
- [x] **Resume Page Enhancements** - PDF mode improvements, Education/Experience layouts
- [ ] **Dark Mode Toggle** - UI component to switch themes on demand (shows CSS/a11y best practices)
- [ ] **Manual Wallet Setup** - MetaMask or embedded wallet for local Web3 testing
- [ ] **Contract Testing** - Local testnet debugging
- [ ] **Network Auto-Switch** - Auto-detect wrong network and prompt user to switch
- [ ] **Mumbai → Amoy** - Polygon testnet migration (contract redeployment needed)
- [ ] Screenshot requirements - see `docs/SCREENSHOTS.md`

## 2026Q2

- [ ] Advanced demos - Analytics
- [ ] Backend services - add `ipfs` & `genai` & `neondb`

## 2026Q3

- [ ] Enterprise features

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