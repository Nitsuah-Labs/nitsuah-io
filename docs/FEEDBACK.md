# FEEDBACK# FEEDBACK# FEEDBACK

**Updated:** October 29, 2025

**Updated:** October 29, 2025

## Phase 6 User Feedback**Updated:** October 29, 2025

## 🎯 Phase 6 Priority Feedback Items

All Phase 6 homepage redesign requirements have been moved to [PHASE-6.md](./PHASE-6.md).

### Critical Path Items

This file will be used to collect user feedback, bug reports, and improvement suggestions during Phase 6 development and beyond.

- [ ] **Header Animation** - Add cool animation that changes NITSUAH to AUSTIN H. (scaffold simple animation first, iterate on hover/scroll effects later)

- [ ] **Active Page Indicator** - Highlight current page in header nav with visual cue (color/underline/bold) to show location## Phase 6 User Feedback

- [ ] **Homepage Scroll Experience** - Implement scroll-to-reveal with Spline component as "behind the scenes" element

- [ ] **404 Page** - Create custom 404 with neat/funny design and navigation options**Updated:** October 29, 2025

- [ ] **Logout Redirect** - Redirect to homepage after logout instead of blank page

**Updated:** October 29, 2025

### Layout & Spacing Issues

---

- [ ] **Footer Buffer** - Add consistent buffer before footer on all pages (crypto, projects, labs pages)

- [ ] **Resume Layout** - Improve about section layout (button, city, GitHub, LinkedIn positioning)## How to Provide Feedback

- [ ] **Resume Export Button** - Style PDF export button to match site theme (orange on black/grey)

- [ ] **Labs Card Sizing** - Fix buttons extending past card boundaries (wider cards or smaller buttons)All Phase 6 homepage redesign requirements have been moved to [PHASE-6.md](./PHASE-6.md).



### Navigation & Organization- **Bugs:** Open a GitHub issue with `[BUG]` prefix



- [ ] **Labs Secondary Nav** - Make secondary nav bar visible on all lab pages for better navigation- **Feature Requests:** Open a GitHub issue with `[FEATURE]` prefix

- [ ] **Projects Organization** - Add categories/filters based on tags for better discoverability

- [ ] **Wallet Connection UX** - Simplify/remove Step 1 links, use wallet selector following wagmi best practices- **Design Feedback:** Add notes here or comment on relevant PRsThis file will be used to collect user feedback, bug reports, and improvement suggestions during Phase 6 development and beyond.## Phase 6 User Feedback## Phase 6 User Feedback



### Web3 & Wallet (Lower Priority - Fix with Web3 updates)- **Usability Issues:** Document here with steps to reproduce



- [ ] **Profile Page** - Display wallet connection info on profile and labs header---

- [ ] **Wallet Flow** - Update to modern wallet selector pattern (auto-detect/redirect to install)

---

---

## Active Feedback Items Top priority to include in Phase 6 implementation

## How to Provide Feedback

- [ ] on the header bar, there should be a cool animation that changes NITSUAH to be AUSTIN H. - just do a simple animation to scaffold it for now, but then we'll iterate on a kind of animation or reveal on hover effect or scroll or something along those lines

- **Bugs:** Open a GitHub issue with `[BUG]` prefix- [ ] also on the header bar, the current page should be emphased or highlighted in some way to indicate which page the user is currently on. this could be done with a different color, underline, bolding, both, or some other visual cue to help users quickly identify their location within the site. if using h2 this could remove some of the need or impact of accessibility issues with nav items not being clear enough. so having to be included on the page. defer to best practices but could help us remove "ABOUT ME" & "Web3 & crypto" text from those respective pages. just a thought, always defer to accessibility best practices.

- **Feature Requests:** Open a GitHub issue with `[FEATURE]` prefix- [ ] HOME - phase 6 has most of the improvements planned here but just make sure the homepage redesign is implemented as per the plan. so there should be a scroll effect that then exposes the spline component behind the scenes as you scroll down to see more about me and my work first as a primer before seeing the full sitemap navigation via the spline.

- **Design Feedback:** Add notes here or comment on relevant PRs- [ ] resume - the about section is a bit malformed or could be improved how the layout is structured. I might just need to jazz this up with a better description/about section in the resume.json. ill try that later. just observing that the button, then my city, then github, then linkedin is just weird to have at the top with empty space to the sides? the style on the export pdf button could also be better. its fine that it has the highest contrast on that page but should match more of the site style of that page ( i dig the orange on black/grey theme tbh.) but otherwise this page is perfect.

- **Usability Issues:** Document here with steps to reproduce- [ ] crypto page is excellent. there could be a smaller gap at the end before the footer? just a minor thing. the footer currently overlaps the end of the cards a bit.

- [ ] projects - i think phase 6 has most of the improveements planned here. but just organizing the projects into more readily digestible sections or categories could be helpful. maybe based on tags or filters? same thing with the buffer at the end needed before the footer.

---- [ ] LABS - home is fine, but the buttons still extend past the cards they are in. so the cards should be wider or the buttons smaller to fit within the card boundaries. also on the individual lab pages, there should be a consistent buffer at the end of the content before the footer to prevent overlap or cramped appearance. just a minor visual improvement.

- [ ] labs - the secondary nav bar should be visible on this page as well to help users navigate back to other lab projects or the main labs page. this will improve usability and ensure users can easily explore all lab content without getting lost.

## Resolved Feedback- [ ] logout page - currently after logging out, the user is redirected to a blank page. instead, they should be redirected to the homepage or a dedicated logout confirmation page that informs them they have successfully logged out and provides options to log back in or explore the site further. we'll work on this further when we fix the wallet stuff. for now redirect to homepage.

- [ ] 404 page - currently when navigating to a non-existent route, the user is presented with a blank page. instead, there should be a custom 404 error page that informs the user that the page they are looking for does not exist and provides options to navigate back to the homepage or other key sections of the site. this will enhance user experience and help retain visitors who may have landed on an incorrect URL. give it a neat or funny design and combination of responses to make it more engaging so we know when we've landed there.

### Phase 5 (October 2025)- [ ] profile page - similarly needs some work when we fix wallets up. it should display some of the wallet connection info there. but also in the labs header bar too as most wallet implementations come with built in that are better and we just need to summarize pertinent info from the user to understand and interact with our site.

- [ ] labs - remove or simplify/the step 1 links. check how our depedencies or wallet connection (wagmi) say it should be setup following best practices. (ie most have a wallet selector that will then redirect the user to install the wallet if not installed already rather than having a step 1 link that confuses users). this used to work better when web3 injected more and told us whether a wallet was connected. i dont think it works like that any more. 

- ✅ Visual regression tests replaced with layout validation tests- [ ] all labs pages similarly need the footer buffer so it doesnt overlap the content at the end of the page.

- ✅ Cross-platform screenshot issues resolved

- ✅ Test suite stability improved## How to Provide Feedback for Phase 6



---All Phase 6 homepage redesign requirements have been moved to [PHASE-6.md](./PHASE-6.md).



## Future ConsiderationsAll Phase 6 homepage redesign requirements have been moved to [PHASE-6.md](./PHASE-6.md).



Items that may be addressed in future phases:---



- Dark mode toggle## Resolved Feedback

- Blog/writing section

- Newsletter integration- **Bugs:** Open a GitHub issue with `[BUG]` prefix

- Enhanced mobile interactions

### Phase 5 (October 2025)

- **Feature Requests:** Open a GitHub issue with `[FEATURE]` prefix

- ✅ Visual regression tests replaced with layout validation tests

- ✅ Cross-platform screenshot issues resolved- **Design Feedback:** Add notes here or comment on relevant PRsThis file will be used to collect user feedback, bug reports, and improvement suggestions during Phase 6 development and beyond.This file will be used to collect user feedback, bug reports, and improvement suggestions during Phase 6 development and beyond.

- ✅ Test suite stability improved

- **Usability Issues:** Document here with steps to reproduce

---

## Future Considerations

---

Items that may be addressed in future phases:

---

- Dark mode toggle

- Blog/writing section

## Active Feedback Items B

- Newsletter integration

- Enhanced mobile interactions

_No active feedback - cleared for Phase 6. New items will be added as they arise._

## How to Provide Feedback## How to Provide Feedback

---

## Resolved Feedback

### Phase 5 (October 2025)

- **Feature Requests:** Open a GitHub issue with `[FEATURE]` prefix- **Feature Requests:** Open a GitHub issue with `[FEATURE]` prefix

- ✅ Visual regression tests replaced with layout validation tests

- ✅ Cross-platform screenshot issues resolved- **Design Feedback:** Add notes here or comment on relevant PRs- **Design Feedback:** Add notes here or comment on relevant PRs

- ✅ Test suite stability improved

- **Usability Issues:** Document here with steps to reproduce- **Usability Issues:** Document here with steps to reproduce

---

## Future Considerations

---

Items that may be addressed in future phases:

- Dark mode toggle

- Blog/writing section## Active Feedback Items## Active Feedback Items

- Newsletter integration

- Enhanced mobile interactions

_No active feedback - cleared for Phase 6. New items will be added as they arise.__No active feedback - cleared for Phase 6. New items will be added as they arise._

---

## Resolved Feedback## Resolved Feedback

### Phase 5 (October 2025)### Phase 5 (October 2025)

- ✅ Visual regression tests replaced with layout validation tests- ✅ Visual regression tests replaced with layout validation tests

- ✅ Cross-platform screenshot issues resolved- ✅ Cross-platform screenshot issues resolved

- ✅ Test suite stability improved- ✅ Test suite stability improved

---

## Future Considerations## Future Considerations

Items that may be addressed in future phases:Items that may be addressed in future phases:

- Dark mode toggle- Dark mode toggle

- Blog/writing section- Blog/writing section

- Newsletter integration- Newsletter integration

- Enhanced mobile interactions- Enhanced mobile interactions

## Feedback from Copilot

The goal of HomePagev2 is to make it immediately clear **who Austin J. Hardy is** and **what he does**, while keeping the site’s minimal and “cool” navigation intact.

Visitors should instantly understand:  
> You’ve stumbled onto the site of a senior systems and developer-productivity engineer who builds tools, automation, and research systems.

Every design and content decision should help answer:

- Who is this person?
- What do they do?
- Why should I click the next button?

The website should feel intentional, modern, and distinctly “Austin.”

TL;DR - lets make it one of those cool "scroll to unlock more without actually moving anything on the page" type things where its interactive to get to the cool stuff behind the scenes. keep the existing sitemap intact, just focus on improving the homepage and main navigation experience (while keeping the spline component as the cool behind the scenes element to unlock with a scroll while highliting the following better)

---

## 1. Homepage (Landing Section)

### Objective

Turn the homepage into a powerful identity anchor that defines the brand and sets expectations.

### Required Changes

- Add a **hero section** with:
  - **Main heading:**  
    Hi, I’m Austin Hardy — Developer Productivity Engineer & Researcher.
  - **Subheading / value statement:**  
    I build tools and platforms that help engineers move faster and systems scale smarter.
  - **Primary CTA buttons:**  
    - Explore My Work → `/projects`  
    - About Me → `/about`

- Ensure this section loads instantly (no “takes time to load” message).

### Design Notes

- Keep the current navigation — it’s visually clean and modern.  
- Add visual contrast between the hero section and rest of page (e.g., subtle background gradient or texture).  
- Include subtle motion or scroll cue to signal there’s more below.

---

## 2. Navigation & Flow

### Goal

Leverage the existing navigation’s “cool” style but improve clarity of intent.

### Changes

- Keep top-bar nav items but ensure they’re self-explanatory.
  - **Projects** → “Things I’ve built”  
  - **About** → “Who I am and what drives me”  
  - **Contact** → “How to reach out”

### Optional Microcopy

Add tooltips or hover-text for nav items for added clarity.

---

## 3. Selected Projects

### Objective

Highlight **3–5 hero projects** that define your technical breadth and personality.

### Content Format

Each project card should include:
- Title (e.g., Kryptos)  
- Short summary (1 line)  
- Highlight (why it matters)  
- Tags (Python, Research, Automation)  
- GitHub link  
- Optional demo or screenshot link

### Implementation

- Use a static file (`data/projects.ts`) for this data.  
- Render these cards on both:
  - Homepage (as a preview / highlight)  
  - `/projects` page (as a full list)

### Content Example

Kryptos — cryptanalysis toolkit solving classical ciphers using testable pipelines.  
GCP — automation scripts for Drive API reporting & migration.  
Stash — system admin utilities and Atlassian helpers.

### Visual Design

- Each card clickable (GitHub / demo).  
- Keep consistent spacing and typography.  
- Fast-load; no heavy animations.

---

## 4. About Page

### Objective

Make this a short but memorable personal summary.

### Structure

1. **Who I am**  
   Austin J. Hardy — Senior Systems & Developer Productivity Engineer  
2. **What I do**  
   I build tools that automate workflows, scale engineering systems, and make developers happier.  
3. **Why I do it**  
   I enjoy bridging research and infrastructure — turning clever ideas into reliable systems.  
4. **Currently working on**  
   Developer tooling, automation platforms, and modernizing engineering processes.  
5. Optional photo or signature block.

---

## 5. First-Impression Rule

Visitors should know within **5 seconds**:

- Who you are  
- What you do  
- Why they should care  
- Where to click next  

To achieve that:

- Keep messaging concise.  
- Emphasize your professional identity visually (large type, consistent hierarchy).  
- Include clear CTAs and visible “next steps.”

---

## 6. Future Additions (for v2.5+)

- SEO: add meta tags, page titles, and Open Graph previews (`og:title`, `og:image`).  
- Performance: use `next/image`, compress assets, and lazy-load noncritical scripts.  
- Accessibility: test with Lighthouse (aim for 90+ across metrics).  
- Add “Writing” section or blog for thought leadership content.  
- Optional: dark mode toggle.

---

## Summary Checklist

| Area          | Action                            | Priority |
| ------------- | --------------------------------- | -------- |
| Hero Section  | Add intro + clear value statement | 🔥        |
| Navigation    | Keep clean, add clarity           | ✅        |
| Projects      | Curate 3–5 hero cards             | 🔥        |
| About Page    | Tell your story briefly           | ✅        |
| Performance   | Optimize load times               | ⚡        |
| SEO / Meta    | Add proper titles and OG tags     | ⚡        |
| Accessibility | Check contrast and structure      | ⚙️        |

---

## **Next Steps**

1. Wait for next phase of deployment (ALL OF the work above to be completed)
2. Collect visual feedback and user reactions.  
3. Come up with even better ideas to improve the site.
