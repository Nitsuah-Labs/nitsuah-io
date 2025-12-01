# TASKS

**Last Updated:** December 1, 2025

## Completed ✅

### December 1, 2025

- [x] **Test Coverage Target** - Achieved 98% coverage (213 tests, 16 suites)
  - Added 199+ comprehensive unit tests
  - url.ts, validation.ts, useHoverStyle.ts at 98-100% coverage
  - All demo, restaurant, and resume components at 100% statement coverage
- [x] **Dark Mode Theme System** - Complete theme toggle with localStorage persistence
  - ThemeContext with React Context API
  - CSS custom properties for comprehensive theming
  - SSR-safe implementation
- [x] **CSS Architecture Overhaul** - Zero inline styles
  - All components migrated to CSS modules
  - Theme tokens integrated throughout codebase
  - Hover states moved from JavaScript to CSS
- [x] **Git Cleanup** - Removed HTML report files from tracking
  - playwright-report/ and temp-ci-report/ removed
  - Updated .gitignore
- [x] **ARCHITECTURE.md** - Expanded with comprehensive documentation (300+ LOC)

## Todo

### High Priority

- [ ] **Visual Regression Baselines** - Standardize baseline update workflow
  - Design automated screenshot gathering script
  - Document when/how to update baselines in Docker
  - Ensure Docker-generated screenshots match CI exactly
- [ ] **Wallet Testing Setup** - Setup MetaMask or embedded wallet for local Web3 testing
- [ ] **Contract Deployer** - Track down deployer repo, find contract IDs, etc.
- [ ] **Mumbai → Amoy** - Polygon testnet migration
- [ ] **Visual Assets** - See `docs/SCREENSHOTS.md` for needed screenshots:
  - Crypto page: 4 projects need screenshots
  - Projects page: 3 projects need screenshots  
  - Client demos: 100+ product/content images needed?
  - avatar - maybe we need to update repo to scale this service for us?

---

See `docs/TECH_DEBT.md` for completed work history.

<!--
AGENT INSTRUCTIONS:
This file tracks actionable tasks.
1. Keep "Active Tasks" section focused on pending work
2. Move completed items to "Completed" section with dates
3. Mark items as [x] when verified complete
4. Keep descriptions concise but actionable
-->