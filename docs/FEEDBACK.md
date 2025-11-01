# User Feedback

**Updated:** November 1, 2025

## QA Feedback

- [ ] the nitsuah to austin h. animation still seems to be broken and only h2 instead of h1 expected? so make it bigger? it seems to be using h6? FIX THE ANIMATION....
- [ ] the scroll on the main page is better, but STILL not far enough to see the full spline animation and hide the initial first page (see pasted image) - so the initial section should be removed much further up the page so that when you scroll on the site you see the full spline animation and not part of the initial section overlapping from the first view.
- [ ] the about me page is much better! but the about me section that first shows up should be visible entirely without needing to scroll to see it all (see pasted image 2) the about me on the page is probably the wrong header (lets be consistent but h2 feels more appropriate, axe/ally may complain so follow best practices)
- [ ] on scrollbar pages - the scrollback up button should be on top of or actually in the footer so that it can always be seen and clicked when the user is scrolled down. the scroll down for more hit should be on the right (or middle sidebar/near scrollbar) for visibility and consistency of UX.
- [ ] resume page - lets just keep the last 5 recent work experiences with a "button to expand further" but otherwise dont display that content unless it is pressed (if we can help that) also should not be visible in the PDF version (if possible).
- [ ] resume - work experience cell for years worked indicator sizes should be consistent in height and width. use a rectangle or square. but pick one. for "present", add a green triangle or something to show its ongoing. also the text should just be the decimal/float version ex: 4.0 years below the cells. also make the cell colors orange too. (image 2)
- [ ] resume - website button should be orange like the export pdf button.
- [ ] resume - instead of the "projects" section (which is currently at the end). include a button (and for pdf a url like the others in the about me section) pointing to the website url /projects (kinda merge it into the about me section more or less). we'll add some more text eventually to the Ut prosim statement to see how this affects our sizing, but its getting there!!
- [ ] resume - make the education and languages sections side by side in larger viewports instead of stacked.
- [ ] crypto page is perfect tbh. but we should improve the blurb "NFTs, POAPs, and blockchain achievements". review the content we have on the page and summarize why i care about crypto and web3 here a bit more.
- [ ] projects page - MUCH BETTER but the smaller cards dont resize when not hovered over. so each just grows but never shrnks back down to original size when not hovered over. also the view/github buttons should have a bit of spacing between them when both are present on smaller cards and should have separation from the labels (so align the buttons towards the bottom of the card with some spacing from the label/elements above them.)
  - project page - under websites & apps - cards should be center aligned, also in cards any github buttons should have a different color than the "view" button, grey is fine for GH. its OK if you need to re-order them vertically when at very small sizes/mobile as needed. but otherwise should be responsive. the icons and headings provide most of the visual bits. but axe should keep us honest on accessibility best practices here. but those buttons should really be on the lower right of the card with some spacing from the other elements above them as needed or center aligned if right alignment doesnt work.
  - [ ] project page - the "NFT Game - Turn-based game built with NFT characters and on-chain game state management." card = remove this card as we never implemented it so dead content.
  - [ ] project page - the sizing on the smaller cards is better but reduce height a bit more to fit more cards in viewport without scrolling. so another 15% reduction or so? they just have a bit too much at the bottom still. (pasted image 3)
- [ ] footer - note on the scroll up/footer - all pages should have the "return to top" button on the bottom right corner when scrolled down even a bit on the page for consistency and usability. only do the "scroll down" hint on pages that have a spline like home or about.

## Labs Feedback

- [ ] /labs - buttons on home page and other cards should all use consistent styling and sizing. (pasted image 4)
- [ ] /labs - the network should show the actual connected network or show disconnected by default if not connected to a network/wallet yet. it just shows "mumbai" placeholder all the time, instead of "not connected or disconnected" when no wallet is connected/detected.
- [ ] /labs nav bar - make logout just an icon button until you hover then it expands to show "logout" text next to it. do the same with profile. use placeholder emojis for now if needed.
- [ ] profile page - make "labs" the active nav item when on profile page since its semi-part of labs section now. include a return to labs button at the bottom of the profile page to go back to labs home.
- [ ] labs nav - add a home button/icon to go back to labs home from any lab page at the top left, but make it so its double click, one click exposes another button which is a red arrow pointing left or something and that returns to home
- [ ] labs nav secondary - the secondary nav has a "labs home" button that should just be a purple home icon or emoji instead of text to save space and look cleaner. also the wip/disabled should hover red instead of greyed out and not be clickable.

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
