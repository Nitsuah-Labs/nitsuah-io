# Phase 6: Homepage Redesign & Platform Improvements

**Status:** Planning  
**Started:** TBD  
**Target Completion:** TBD

## Overview

Phase 6 focuses on transforming the homepage into a compelling identity anchor while implementing critical platform improvements, dependency cleanup, and security updates.

---

## 🎯 Primary Objectives

### 1. Homepage Redesign (Priority: CRITICAL)

**Goal:** Create an interactive, scroll-based homepage that immediately communicates who Austin J. Hardy is and what he does, while maintaining the site's minimal, modern aesthetic.

#### Requirements

**Hero Section (Above the Fold):**
- [ ] Add hero heading: "Hi, I'm Austin Hardy — Developer Productivity Engineer & Researcher"
- [ ] Add value statement: "I build tools and platforms that help engineers move faster and systems scale smarter"
- [ ] Add primary CTAs:
  - "Explore My Work" → `/projects`
  - "About Me" → `/about`
- [ ] Ensure instant load (no loading message for critical content)

**Interactive Scroll Experience:**
- [ ] Implement scroll-to-reveal interaction (unlock content without page jumps)
- [ ] Keep Spline component as "cool behind the scenes" reveal element
- [ ] Add scroll cue indicator for discoverability
- [ ] Maintain existing sitemap/navigation structure
- [ ] Add subtle background gradient or texture for visual depth

**Featured Projects Section:**
- [ ] Highlight 3-5 hero projects on homepage
- [ ] Each card includes:
  - Title
  - One-line summary
  - Why it matters (impact statement)
  - Technology tags
  - GitHub link
  - Optional: demo/screenshot link
- [ ] Use `src/lib/data/projects.ts` as data source
- [ ] Ensure fast load, minimal animations

**Navigation Improvements:**
- [ ] Keep existing clean top-bar nav
- [ ] Add clearer microcopy/tooltips on hover:
  - Projects → "Things I've built"
  - About → "Who I am and what drives me"
  - Contact → "How to reach out"
- [ ] Ensure navigation is accessible and mobile-friendly

**First Impression Test:**
- [ ] Verify visitors understand within 5 seconds:
  - Who you are
  - What you do
  - Why they should care
  - Where to click next

---

### 2. Technical Debt & Dependency Cleanup (Priority: HIGH)

#### Unused Dependencies (Confirmed)
- [ ] Remove `lokijs` (^1.5.12) - No usage found in codebase
- [ ] Remove `pino-pretty` (^13.1.2) - No usage found in codebase
- [ ] Remove `@react-native-async-storage/async-storage` (^2.2.0) - React Native package, not needed for Next.js
- [ ] Remove `encoding` (^0.1.13) - Verify if transitive dependency, remove if unused
- [ ] **Keep** `utf-8-validate` and `bufferutil` - Used by WalletConnect for performance

**Expected Impact:**
- Bundle size reduction: ~100-200KB
- Faster npm install
- Reduced attack surface
- Fewer packages to maintain

#### Security Vulnerabilities (21 total: 18 low, 3 moderate)

**Moderate Priority Fixes:**
- [ ] Update `esbuild` (<=0.24.2 → 0.25.1) - Development server request vulnerability
- [ ] Update `micromatch` (<4.0.8 → 4.0.8+) - ReDoS vulnerability affecting lint-staged
- [ ] Review WalletConnect/Reown chain (18 low severity) - Prototype pollution in fast-redact affecting @walletconnect/* packages

**Action Items:**
- [ ] Run `npm audit fix` for non-breaking updates
- [ ] Test `npm audit fix --force` in separate branch for breaking changes
- [ ] Review and merge Dependabot PRs: https://github.com/Nitsuah-Labs/nitsuah-io/security/dependabot
- [ ] Update documentation after fixes

---

### 3. Web3 Infrastructure Updates (Priority: MEDIUM)

#### Mumbai → Amoy Testnet Migration
- [ ] **Status Check:** Amoy already implemented in `src/wagmi.ts` ✅
- [ ] Verify Mumbai contracts still needed (currently both Mumbai + Amoy are active)
- [ ] Update contract addresses if migrating
- [ ] Test all Web3 functionality on Amoy
- [ ] Update documentation to reflect testnet changes
- [ ] Consider deprecating Mumbai if no longer needed

#### Wallet Connection Issues
- [ ] Debug Coinbase wallet not prompting
- [ ] Debug Phantom wallet not prompting
- [ ] Test WalletConnect flow across all supported wallets
- [ ] Add better error messaging for connection failures
- [ ] Document wallet connection troubleshooting

---

### 4. Code Quality & Minor Fixes (Priority: LOW)

#### Copilot Feedback Items
- [ ] **src/app/labs/register/page.tsx** - Improve catch block comment:
  ```typescript
  // Current: } catch { // ignore }
  // Better: } catch {
  //   // It is safe to ignore errors here because URLSearchParams or window.location
  //   // may not be available in some environments (e.g., during SSR or non-browser contexts).
  //   // In such cases, test helpers are not shown.
  // }
  ```

- [ ] **src/wagmi.ts** - Consider extracting type casting helper:
  ```typescript
  // Current: Direct type casting with inline comment
  // Improvement: Create reusable helper if pattern repeats elsewhere
  ```

---

## 🚀 Stretch Goals (Time Permitting)

### SEO & Metadata
- [ ] Add proper meta tags to all pages
- [ ] Implement Open Graph tags (`og:title`, `og:image`, `og:description`)
- [ ] Add Twitter Card metadata
- [ ] Generate dynamic social preview images
- [ ] Update `robots.txt` and sitemap.xml

### Performance Optimization
- [ ] Run Lighthouse audit (target: 90+ all categories)
- [ ] Optimize images with `next/image`
- [ ] Lazy-load non-critical scripts
- [ ] Compress assets
- [ ] Implement code splitting where beneficial

### Accessibility
- [ ] Full WCAG 2.1 AA compliance check
- [ ] Test with screen readers
- [ ] Verify keyboard navigation on all interactive elements
- [ ] Check color contrast ratios
- [ ] Add skip links where missing

### Cross-Browser & Mobile Testing
- [ ] Chrome (Desktop & Android)
- [ ] Firefox (Desktop)
- [ ] Safari (Desktop & iOS)
- [ ] Edge (Desktop)
- [ ] Test responsive breakpoints (320px, 375px, 768px, 1024px, 1440px+)

### Optional Features
- [ ] Dark mode toggle
- [ ] "Writing" or blog section for thought leadership
- [ ] Newsletter signup integration
- [ ] Contact form with validation
- [ ] Resume download functionality

---

## 📋 Implementation Checklist

### Phase 6.1: Planning & Setup
- [ ] Review and finalize homepage wireframes/mockups
- [ ] Create component architecture for new homepage
- [ ] Set up feature branch: `phase-6-homepage-redesign`
- [ ] Update project board with all tasks

### Phase 6.2: Homepage Implementation
- [ ] Build hero section component
- [ ] Implement scroll interaction mechanics
- [ ] Create featured projects component
- [ ] Integrate with existing layout
- [ ] Add responsive styles
- [ ] Test across devices

### Phase 6.3: Dependency Cleanup
- [ ] Remove unused dependencies (one commit per package)
- [ ] Run full test suite after each removal
- [ ] Update package-lock.json
- [ ] Document removals in changelog

### Phase 6.4: Security Updates
- [ ] Apply `npm audit fix`
- [ ] Test breaking changes in isolation
- [ ] Merge Dependabot PRs
- [ ] Re-run security scan
- [ ] Update SECURITY_AUDIT.md

### Phase 6.5: Testing & QA
- [ ] Run full test suite (unit + e2e + a11y)
- [ ] Manual QA on all pages
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Performance audit

### Phase 6.6: Documentation & Launch
- [ ] Update README.md
- [ ] Update ARCHITECTURE.md
- [ ] Create changelog entry
- [ ] Merge to main
- [ ] Deploy to production
- [ ] Monitor for issues

---

## 🎨 Design Guidelines

### Visual Principles
- **Clarity over cleverness:** Message must be immediately clear
- **Minimal but intentional:** Every element serves a purpose
- **Modern and professional:** Reflects technical expertise
- **Fast and smooth:** No jank, no unnecessary loading states

### Typography Hierarchy
- **H1 (Hero):** Large, bold, immediate impact
- **Subheading:** Clear value proposition
- **Body:** Concise, scannable content
- **CTAs:** High contrast, unmissable

### Interaction Design
- Scroll reveals should feel natural, not gimmicky
- Animations should be subtle and purposeful (60fps minimum)
- Hover states should provide clear feedback
- Mobile touch targets: minimum 44px × 44px

---

## 📊 Success Metrics

### Quantitative
- [ ] Lighthouse Performance: ≥90
- [ ] Lighthouse Accessibility: ≥95
- [ ] Lighthouse SEO: ≥90
- [ ] First Contentful Paint: <1.5s
- [ ] Time to Interactive: <3.5s
- [ ] Bundle size increase: <50KB (after homepage additions)
- [ ] All tests passing (100% pass rate)
- [ ] Zero high/critical security vulnerabilities

### Qualitative
- [ ] Homepage message is clear within 5 seconds (user testing)
- [ ] CTAs are obvious and clickable
- [ ] Scroll interaction feels intuitive
- [ ] Site maintains "cool" factor
- [ ] Professional and modern aesthetic
- [ ] Mobile experience is excellent

---

## 🔄 Rollback Plan

If critical issues arise:
1. Revert homepage changes: `git revert <commit-range>`
2. Keep dependency/security updates (safer changes)
3. Fix issues in separate branch
4. Re-deploy when stable

---

## 📝 Notes

- **Homepage is the priority** - Get this right first
- **Don't break existing pages** - Maintain working Labs section
- **Test incrementally** - Don't wait until the end to test
- **Mobile-first approach** - Most visitors are on mobile
- **Performance matters** - Keep it fast
- **Accessibility is non-negotiable** - Build it in from the start

---

## 🔗 Related Documents

- [FEEDBACK.md](./FEEDBACK.md) - User feedback and issues (will be cleared for Phase 6 tracking)
- [TODO.md](./TODO.md) - Current todos (will be cleared and repopulated during Phase 6)
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Project architecture overview
- [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) - Development workflow
- [SECURITY_AUDIT.md](./SECURITY_AUDIT.md) - Security status and audit plan

---

**Last Updated:** October 29, 2025
