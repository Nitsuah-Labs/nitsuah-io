# User Feedback

**Updated:** November 1, 2025

## QA Feedback

- [ ] the nitsuah to austin h. animation still seems to be broken and only h2 instead of h1 expected.
- [ ] the scroll on the main page is better, but STILL not far enough to see the full spline animation and hide the initial first page (see pasted image)
- [ ] the about me page is much better! but the about me section that first shows up should be visible entirely without needing to scroll to see it all (see pasted image 2) the about me on the page is probably the wrong header (lets be consistent but h2 feels more appropriate, axe/ally may complain so follow best practices)
- [ ] on scrollbar pages. include a hint on the lower right to scroll down (and when scrolled down give a button to scroll back to top automatically when clicked)
- [ ] resume page - work xp amount should be only the years and located on the right hand of the card. maybe make it a "tick" bar or visual indicator of duration plus the text? so 1 bar per year and partial filled for decimals - just do .25 increments or round up ish. or something similar to show duration visually as well as textually.
- [ ] resume page - the homepage/url in the about section should also be a button like linkedin and github are (but can make it orange/more visually appearling if needed but grey is fine too)
- [ ] crypto page is perfect tbh.
- [ ] projects - MUCH BETTER but the smaller cards dont resize when not hovered over. so each just grows but never shrnks back down to original size when not hovered over. also the view/github buttons should have a bit of spacing between them when both are present on smaller cards and should have separation from the labels (so align the buttons towards the bottom of the card with some spacing from the label/elements above them.)
  - websites & apps - cards should be center aligned, the github button should have a different color than the view button. its OK if you need to re-order them vertically when at very small sizes/mobile as needed. but otherwise should be responsive. the icons and headings provide most of the visual bits. but axe should keep us honest on accessibility best practices here.
  - [ ] portfolio site is still listed twice, should not be under "Web3 & Blockchain" (can remove the web3 label if thats whats making it appear there. - labs is on the site map there and in that section already so its fine to move it out of "web3")
  - [ ] "NFT Game - Turn-based game built with NFT characters and on-chain game state management." = remove this card as we never implemented it.
  - [ ] the "profile" project for "Profile on Buildspace showcasing completed projects and community involvement in Web3 education." can be removed as this is dead content.
  - [ ] NEXTGEN "Next-generation NFT game combining blockchain technology with interactive gameplay mechanics." can be removed as i migrated this into darkmoon.dev
- [ ] projects - Featured Projects cards should be the size they are, but other project cards on the page should be smaller in height and width to allow more cards to fit in the viewport without scrolling. maybe 50% of current size or whatever keeps them readable but smaller.

## Labs Feedback

- [ ] /labs - buttons in cards should be consistently aligned center bottom across the site in labs.
- [ ] /labs - the network should show the actual connected network or show disconnected by default if not connected to a network/wallet yet. it just shows "mumbai" placeholder all the time.
- [ ] /labs nav bar - profile and logout buttons should be aligned right side. make logout just an icon button with tooltip or expand on hover (from icon button to say logout). same thing with profile - just an icon with tooltip or expand on hover to show "profile" and on click of either go to profile page.
- [ ] profile page should use purple accents like the rest of labs instead of orange (but keep primary nav as is, profile uses main site for now - maybe needs its own or react might hate us later? idk if this matters as much.)

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
