# User Feedback

**Purpose:** Track user-reported issues, feature requests, and design feedback.

**Updated:** October 29, 2025

---

## Active Feedback

- [ ] home - just remove the featured products section from the scroll reveal experience. instead the reveal should uncover our spline component (which is there in between it seems so just removing the projects bit should fix everything)
- [ ] home nav - austin h. MUCH BETTER! but make it stay austin h. in orange/black theme of the site instead of morphing back to nitsuah.
- [ ] about me - the loader/spinner is going away too fast
- [ ] resume page is good, but the export pdf text might need to be dark grey? for sufficient contrast against the orange background. more a nit. playwright and lighthouse can complain if it is i guess. "View my portfolio of selected projects at nitsuah.io/projects" can have a button instead of a bare url. linkedin and github buttons should have icons in the buttons for clarity.
- [ ] crypto - could use some buffer at the bottom so the footer doesnt overlap the content as much. cards still get overlapped by the footer
- [ ] projects - a little better. but you removed the images from the project cards? they should be there. definitely fix this.
- [ ] projects - website and apps should be near the top and portfolio site should be a part of this category. als othe cards should have space between each row similar to the crypto page.

- [ ] labs -the "test funds" button still overlap the card but the rest are fixed it looks like. 
- [ ] labs nav wip links should not be clickable, and should have red on hover to indicate work in progress.
- [ ] labs nav - accent color for buttons should match purple black theme of "labs" site.
- [ ] labs nav - navigation should say nitsuah labs one word.
- [ ] labs nav logout button should match purple black theme as well.

### Layout & Styling

- [ ] **Resume Layout** - Improve about section (button, city, GitHub, LinkedIn positioning)
- [ ] **Resume Export Button** - Style PDF button to match orange/black theme

### Features

- [ ] **Projects Filters** - Add categories/filters based on tags
- [ ] **Lab Wallet Connection UX** - Simplify to modern wallet selector pattern, see web3 section below

### Web3

- [ ] **Wallet Flow** - Auto-detect/redirect to install if wallet missing (this should be a natural part of the connect wallet flow already i think we need to dig into the wallet features further to understand the expected best practice - learn about the packages we use, web3/wagmi/etc. whatever were using and deep dive on those.)

- [ ] **/profile Page** - Display wallet info on profile and labs header

---

## Future Ideas

- Dark mode toggle
- Enhanced analytics (heatmaps, user flows)

---

## How to Submit Feedback

- **Bugs:** GitHub issue with [BUG] prefix
- **Features:** GitHub issue with [FEATURE] prefix
- **Design:** Comment here or on PRs
- **Other:** Add notes in this file
