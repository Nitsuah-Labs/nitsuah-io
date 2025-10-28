# nitsuah-io TODO

**Updated:** October 28, 2025
**Branch:** phase-3

---

## HIGH PRIORITY (From FEEDBACK.md)

### Homepage
- [ ] Fix Spline sizing - too small, should be 100% width extending behind header/footer

### About Page
- [ ] Fix mobile nav overlap - nav bar overlaps ABOUT ME text on mobile

### Resume Page
- [ ] Update styling - white background jarring, needs dark mode
- [ ] Add header/footer for consistency

### Crypto Page
- [ ] Move heading to header/nav bar like About page

### Projects Page
- [ ] Smaller icons in lower section
- [ ] Better text alignment
- [ ] More spacing/dividers
- [ ] Reorganize by impressiveness
- [ ] Shorten descriptions

### Labs Section
- [x] Fix white border
- [x] Fix footer positioning
- [x] Standardize header styling
- [ ] Fix wallet connection (Coinbase Wallet and Phantom not prompting)

---

## TECHNICAL DEBT

### Dependencies
- [ ] Deduplicate Lit versions (npm ls lit, use npm overrides)
- [ ] Review Dependabot PRs: lint-staged, globals, typescript

### Web3
- [ ] Mumbai to Amoy testnet migration
  - Update wagmi.ts chain config
  - Update contract addresses and RPC endpoints
  - Test all Web3 functionality

---

## PRODUCTION READINESS

- [ ] Run full Playwright test suite (all 13 pages)
- [ ] Lighthouse scores >=90 on all metrics
- [ ] Security scan (npm audit)
- [ ] CSP headers validation
- [ ] Cross-browser testing
- [ ] Mobile testing

---

## Recent Fixes

- Labs white border fixed (CSS viewport width, flexbox)
- Labs footer positioning (flex: 1 on main)
- Projects page color contrast (WCAG 2.1 AA)
- Test timeouts fixed (60s for Spline pages)
- About page landmark violation resolved
- WagmiConfig to WagmiProvider upgrade
- Git cleanup (200+ playwright-report files removed)
- Pre-commit/pre-push hooks fixed for Git Bash

---

## Key Commands

npm run dev              # Start dev server
npm run build            # Production build
npm run validate         # Typecheck + format check
npm test                 # Jest tests
npm run test:a11y:quick  # Quick accessibility tests
npm run format           # Auto-format all files
