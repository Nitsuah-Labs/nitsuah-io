# TODO

**Updated:** October 28, 2025

## UI/UX Fixes (See FEEDBACK.md for details)

### Homepage
- [ ] Fix Spline sizing - should be 100% width behind header/footer

### About
- [ ] Fix mobile nav overlap with ABOUT ME text

### Resume
- [ ] Add dark mode styling (white background jarring)
- [ ] Add header/footer for consistency

### Crypto
- [ ] Move heading to header/nav bar (like About page)

### Projects
- [ ] Smaller icons in lower section
- [ ] Better text alignment & spacing
- [ ] Reorganize by impressiveness
- [ ] Shorten descriptions

### Labs
- [ ] Fix wallet connection (Coinbase/Phantom not prompting)

## Technical

### Dependencies
- [ ] Remove unused: `lokijs`, `pino-pretty`, `@react-native-async-storage/async-storage` (see UNUSED_DEPENDENCIES.md)
- [ ] Security: Run `npm audit` and fix moderate+ vulnerabilities
- [ ] Review Dependabot PRs

### Web3
- [ ] Mumbai → Amoy testnet migration
  - Update wagmi.ts chain config
  - Update contract addresses/RPC endpoints
  - Test all Web3 functionality

## Production Readiness
- [ ] Lighthouse scores ≥90 on all pages
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS Safari, Chrome Android)
