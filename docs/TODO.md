# TODO

**Updated:** November 1, 2025

## Backlog

To be done after existing feedback or phase items (or to track said items):

- [ ] FIX Playwright visual tests to better handle CI/local environment differences - use Docker?
- [ ] Manual setup step - will setup metamask or another wallet or lets review embedded components that may ship by default with wagmi or whatever provider we have. but enough to get us started again on testing locally.
- [ ] Contract debugging on local testnet
- [ ] Network auto-switch detection
- [ ] Mumbai → Amoy migration

## Detailed Improvements

- [ ] Manual setup step - will setup metamask or another wallet or lets review embedded components that may ship by default with wagmi or whatever provider we have. but enough to get us started again on testing locally.
- [ ] **Network Auto-Switch** - Auto-detect wrong network (most wallets do this automatically but once we confirm connection we can add some wallet ui elements to the nav bar and pages for interaction - ie: wallet connect handles this alot but need to set context on intendend chains for a page and prompt user to switch if on wrong one which is often a message back to the wallet app itself to do so.)
- [ ] **Contract Testing** - Local testnet debugging
- [ ] **Mumbai → Amoy** - Polygon testnet migration (big change but one we definitely need to do, we might need to redeploy our contract but not sure yet - also not sure where our contract deployer repo even is right now so ill track that down later. but if you find contract ID's or wallet addresses that might help me out im sure its SOMEWHERE)
- [ ] **Dark Mode** - Theme toggle to change some of the ui and css colors around on the page (we defer to dark mode so not really needed imo but shows some CSS and Ally best practices to adjust chromatics like that on demand and when designing for different user prefs)

---

_For feature requests see `FEEDBACK.md`_
_For security status see `SECURITY_FIXES.md`_
_For phase items see `PHASE_#.md`_
