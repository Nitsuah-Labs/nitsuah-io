# TODO

## Manual Tasks for Phase A

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
- [ ] **Docker Setup** - Setup Docker for visual regression tests to handle CI/local environment differences
- [ ] **Visual Test Re-enablement** - Once Docker is configured, re-enable skipped Playwright visual tests

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
