# User Feedback

**Updated:** November 1, 2025

## Deployment Feedback

- [ ] home - nitsuah to austin h. animation is still broken. should change on hover over. but the heading should be h1 either way (if austin h. needs to be h 2 tht is fine). (pasted image 1)
- [ ] home - scroll to spline - still not able to scroll enough to display the spline (or the threshold for triggering the spline to display vs. the initial text is too high up the page). so it should hide the text faster (or when even less of a scroll required or happened) to show the spline. (pasted image)
- [ ] home - "Scroll for more" hint to scroll down is not visible at all (maybe move it to the footer?)
- [ ] the move to top button (orange in the bottom right) has two buttons visible? i think intent is to have these overlap? but either way this should just go in the footer so that its as consistent as possible across all pages. so put it in the footer bottom right.
- [ ] about/ - use the arf.png for the placeholder image
- [ ] resume - green triangle for present should be on the right side of the time amount text and pointing upwards (to show it is increasing)
- [ ] resume - website button should be orange w/ black text like the other buttons
- [ ] resume - work experience duration time bars should have consistent widths across all entries (some are wider/thinner than others which looks odd)
- [ ] resume - work experience duration text should ONLY say whats in the ( ) without the ( ) - so just "4.0 yrs" not "3 years, 12 months (4.0 yrs)"
- [ ] resume - projects section should just be a button in the about portion of the resume (like website) no other text needed. but should display like those buttons do during pdf mode (where its just a bare url with a descriptor next to it) tl;dr remove it from the bottom of the resume and make it a button in the top part.
- [ ] resume - work experience cards should have indicator (maybe flashing small tab or arrow or something) to show it can be expanded? just give it some flavor to show it can be interacted with (bot to expand and collapse.)
- [ ] resume - work experience cards should have indicator (maybe flashing small tab or arrow or something) to show it can be expanded? just give it some flavor to show it can be interacted with (both to expand and collapse.)
- [ ] resume - languages should highlight (theres a sliver on the right side that isn't colored in) that colors in when hovered (education section has a working example) just for consistency.
- [ ] crypto - "why web3 matters" should be centered on the page. but otherwise super cool!
- [ ] projects - the lower cards (non-featured) should have hover states (like the featured ones do) to give some interactivity and flavor to the page. right now they just grow. but dont shrink. they also take on the default width needed for that growth without being more reactive. use the top section for a reference featured works well to highlight what we want.
- [ ] projects - the project cards leave too much dead space on the bottom.
- [ ] projects - the project cards "github" and "view" buttons should be on the bottom right of the card instead of bottom left. (pasted image 2)
- [ ] projects - for web3 and block chain category items, organize the items in the following order: /labs, darkmoon.dev, N+W S1, ETH Core, ETH dApp, NFT Store, ENS NFT, SOL Core, SOL dApp, DevDAO, etc.
- [ ] projects - AI & Machine learning section - add a "coming soon ..." card next to "Imagen" that teases upcoming AI/ML projects to be added to this section.
- [ ] labs/  

## Feature Requests

- [ ] Setup Docker and re-enable skipped playwright visual tests
- [ ] Expand CLIENTS & BLOGS pages (they exist already under projects/ path) - so build out blogs to be an "interactive" blog site where we can upload blogs but also view/upvote/etc., for Clients have a switcher in the site app that helps us switch to different "app types". Professional client work examples and storefront demonstrating commercial project capabilities. /projects/clients site to include multiple different types of "customer" projects. mainly traditional service/freelance/consumer apps. come up with a top 10 list and we'll build them out as we have time or as we finish other higher priority items. this is our mono repo so we're fine to toss in more stuff here as long as it doesnt overly bloat the codebase/repository/dependencies. so "within reason" mostly mock ups vs. fully working apps unless its a super simple one off or we find a middleware or headless CMS to help speed along development of these types of projects. (ie: magento headless CMS for ecommerce store front, or sanity.io for blog/CMS type site, etc.) you get the idea. maybe even a small store front or mom&pop shop example.
- [ ] FIX Playwright visual tests to better handle CI/local environment differences

## Other improvements
- [ ] Manual setup step - will setup metamask or another wallet or lets review embedded components that may ship by default with wagmi or whatever provider we have. but enough to get us started again on testing locally.
- [ ] **Projects Filters** - Categories/filters based on tags (filter at top of page with drop down or toggle selection of unique tag buttons, have a "reset filter" button, etc. some way to show some ui prowess for generated card sections)
- [ ] **Dark Mode** - Theme toggle to change some of the ui and css colors around on the page (we defer to dark mode so not really needed imo but shows some CSS and Ally best practices to adjust chromatics like that on demand and when designing for different user prefs)
- [ ] **Network Auto-Switch** - Auto-detect wrong network (most wallets do this automatically but once we confirm connection we can add some wallet ui elements to the nav bar and pages for interaction - ie: wallet connect handles this alot but need to set context on intendend chains for a page and prompt user to switch if on wrong one which is often a message back to the wallet app itself to do so.)
- [ ] **Contract Testing** - Local testnet debugging
- [ ] **Mumbai → Amoy** - Polygon testnet migration (big change but one we definitely need to do, we might need to redeploy our contract but not sure yet - also not sure where our contract deployer repo even is right now so ill track that down later. but if you find contract ID's or wallet addresses that might help me out im sure its SOMEWHERE)

## Submit Feedback

- **Bugs:** [GitHub issue](https://github.com/Nitsuah-Labs/nitsuah-io/issues) with [BUG] prefix
- **Features:** [GitHub issue](https://github.com/Nitsuah-Labs/nitsuah-io/issues) with [FEATURE] prefix
