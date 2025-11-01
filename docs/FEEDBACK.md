# User Feedback

**Updated:** November 1, 2025

## Recently Completed (Phase 8)

✅ **Dependencies**: Updated @splinetool/runtime (1.10.91), globals (16.4.0), TypeScript (5.9.3), typescript-eslint (8.46.2)  
✅ **Homepage**: Increased hero fade distance (1200px), h1 properly sized with clamp()  
✅ **Resume**: Duration bars (orange gradient with green indicator for current roles), work history limited to 5 with expand button, education/languages side-by-side, website button orange  
✅ **Projects**: NFT Game removed, cards reduced to 72% scale, button styling improved  
✅ **Crypto**: Added Web3 philosophy content explaining decentralization, trustless verification, DAOs  
✅ **Labs Navigation**: Icon-only Profile/Logout with hover expand, LabNav on profile page, return to labs button, home button with double-click (labs/main home), LabSubNav with icon home and red WIP hover  
✅ **Footer**: Universal back-to-top button (fixed bottom-right, appears at scrollY > 300)

## Feature Requests

- [ ] **Projects Filters** - Categories/filters based on tags (filter at top of page with drop down or toggle selection of unique tag buttons, have a "reset filter" button, etc. some way to show some ui prowess for generated card sections)
- [ ] Expand CLIENTS & BLOGS - so build out blogs to be an "interactive" blog site where we can upload blogs but also view/upvote/etc., for Clients have a switcher in the site app that helps us switch to different "app types". Professional client work examples and storefront demonstrating commercial project capabilities. /projects/clients site to include multiple different types of "customer" projects. mainly traditional service/freelance/consumer apps. come up with a top 10 list and we'll build them out as we have time or as we finish other higher priority items. this is our mono repo so we're fine to toss in more stuff here as long as it doesnt overly bloat the codebase/repository/dependencies. so "within reason" mostly mock ups vs. fully working apps unless its a super simple one off or we find a middleware or headless CMS to help speed along development of these types of projects. (ie: magento headless CMS for ecommerce store front, or sanity.io for blog/CMS type site, etc.) you get the idea. maybe even a small store front or mom&pop shop example.
- [ ] **Dark Mode** - Theme toggle to change some of the ui and css colors around on the page (we defer to dark mode so not really needed imo but shows some CSS and Ally best practices to adjust chromatics like that on demand and when designing for different user prefs)
- [ ] **Network Auto-Switch** - Auto-detect wrong network (most wallets do this automatically but once we confirm connection we can add some wallet ui elements to the nav bar and pages for interaction - ie: wallet connect handles this alot but need to set context on intendend chains for a page and prompt user to switch if on wrong one which is often a message back to the wallet app itself to do so.)
- [ ] **Contract Testing** - Local testnet debugging
- [ ] **Mumbai → Amoy** - Polygon testnet migration (big change but one we definitely need to do, we might need to redeploy our contract but not sure yet - also not sure where our contract deployer repo even is right now so ill track that down later. but if you find contract ID's or wallet addresses that might help me out im sure its SOMEWHERE)

## Submit Feedback

- **Bugs:** [GitHub issue](https://github.com/Nitsuah-Labs/nitsuah-io/issues) with [BUG] prefix
- **Features:** [GitHub issue](https://github.com/Nitsuah-Labs/nitsuah-io/issues) with [FEATURE] prefix
