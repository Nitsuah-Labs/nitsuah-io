# Technical Debt & Code Cleanup

**Created:** November 2, 2025  
**Status:** Planning

## Overview

Strategic plan for reducing code bloat, improving maintainability, and establishing better code organization patterns across the codebase. Focus on refactoring large components, extracting reusable patterns, and moving inline styles to proper CSS files.

---

## 🎯 Primary Goals

1. **Reduce Component Size** - Break down 800-1000+ LOC files into manageable, focused components
2. **Separate Concerns** - Move inline styles and className-heavy JSX into proper CSS modules
3. **Create Reusable Components** - Extract common patterns into shared components with style props
4. **Remove Dead Code** - Identify and remove unused files, functions, and dependencies
5. **Improve Readability** - Make files easier to navigate and understand at a glance
6. **Reorganize Code Structure** - Move code from cluttered directories into more logical structures or update folder structure or file structure as needed (just consider the impacts and updates needed, test to ensure breakages get fixed)

---

## 🔥 High Priority - Bloated Pages

### Resume Page (`src/app/resume/page.tsx` - ~650 lines)

**Current Issues:**
- Massive inline styles throughout JSX (50+ style objects)
- Repetitive button/link patterns with duplicate hover handlers
- Mixed concerns: data formatting, rendering, and styling all in one file
- Hard to maintain and prone to errors

**Refactoring Plan:**
- [ ] Extract `ResumeHeader` component (basics section)
- [ ] Extract `WorkExperience` component with `WorkCard` sub-component
- [ ] Extract `EducationSection` component
- [ ] Extract `SkillsGrid` component
- [ ] Create `ProfileButton` reusable component for link buttons
- [ ] Create `resume.module.css` for component-specific styles
- [ ] Move utility functions (`formatDate`, `getSkillLevel`) to `utils/resume.ts`
- [ ] Create type definitions in `types/resume.ts`

**Estimated Impact:** Reduce to ~200 lines, 4-5 focused components

---

### About Page (`src/app/about/page.tsx` - ~212 lines)

**Current Issues:**
- Heavy inline styling for animations and layout
- Scroll effects mixed with rendering logic
- Fixed positioning calculations in JSX

**Refactoring Plan:**
- [ ] Extract `ProfileSection` component
- [ ] Extract `ScrollIndicator` reusable component (also used in home page)
- [ ] Create `about.module.css` for section-specific styles
- [ ] Move scroll effects to custom hook `useScrollOpacity`

**Estimated Impact:** Reduce to ~100 lines, cleaner separation

---

### Home Page (`src/app/page.tsx` - ~323 lines)

**Current Issues:**
- Similar scroll/fade logic to about page (duplicate code)
- Large inline style objects
- Animation logic mixed with rendering

**Refactoring Plan:**
- [ ] Share `ScrollIndicator` component with about page
- [ ] Share `useScrollOpacity` hook with about page
- [ ] Extract `HeroSection` component
- [ ] Create `home.module.css` for hero and layout styles

**Estimated Impact:** Reduce to ~150 lines

---

### Projects/Blogs (`src/app/projects/blogs/page.tsx` - ~484 lines)

**Current Issues:**
- Massive modal JSX embedded in main component
- Inline styles everywhere
- Filter/sort logic mixed with rendering

**Refactoring Plan:**
- [ ] Extract `BlogUploadModal` component
- [ ] Extract `BlogFilters` component
- [ ] Extract `BlogGrid` component
- [ ] Create `blogs.module.css` (already exists but underutilized)
- [ ] Move filter/sort logic to custom hook `useBlogFilters`

**Estimated Impact:** Reduce to ~150 lines

---

## 🔧 Reusable Component Library

Create shared components to reduce duplication:

### Layout Components
- [ ] `ScrollIndicator` - Animated scroll hint (home, about)
- [ ] `PageHero` - Hero section pattern with title/description
- [ ] `Section` - Wrapper with consistent padding/background

### UI Components  
- [ ] `ActionButton` - Reusable button with hover states and icon support
- [ ] `LinkButton` - External/internal link button with consistent styling
- [ ] `Card` - Generic card container with hover effects
- [ ] `Modal` - Reusable modal/dialog component
- [ ] `Badge` - Tag/category badge component

### Form Components
- [ ] `Input` - Styled text input
- [ ] `TextArea` - Styled textarea
- [ ] `Select` - Styled dropdown
- [ ] `FileUpload` - Styled file input

**Location:** `src/components/ui/` (new directory)

---

## 🎨 CSS Organization Strategy

### Current State
- Inline styles scattered throughout JSX
- Mix of CSS files and CSS modules
- Duplicate style patterns across files
- Hard to maintain consistency

### Target Structure

```
src/
├── app/
│   ├── _components/
│   │   ├── ui/              # New: Reusable UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Button.module.css
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   └── index.ts
│   │   ├── _styles/
│   │   │   ├── global.css   # Existing
│   │   │   ├── variables.css # New: CSS custom properties
│   │   │   └── utilities.css # New: Utility classes
│   ├── resume/
│   │   ├── page.tsx         # Slimmed down
│   │   ├── resume.css       # Existing, cleaned up
│   │   └── _components/     # New: Page-specific components
│   │       ├── ResumeHeader.tsx
│   │       ├── WorkExperience.tsx
│   │       └── SkillsGrid.tsx
```

### CSS Standards
- [ ] Create `variables.css` with design tokens (colors, spacing, fonts)
- [ ] Use CSS modules for component styles (`.module.css`)
- [ ] Move all inline styles to CSS classes where possible
- [ ] Use CSS custom properties for theme values
- [ ] Limit inline styles to truly dynamic values only

---

## 🧹 Dead Code & File Cleanup

### Audit Process
1. [ ] Run dependency analyzer to find unused npm packages
2. [ ] Search for unused imports across all files
3. [ ] Identify orphaned CSS/config files
4. [ ] Check for duplicate utility functions
5. [ ] Review `__mocks__/` directory for unused mocks

### Known Areas to Review
- [ ] `__mocks__/` - Check if all mocks are actually used
- [ ] Config files in root - Consolidate where possible
- [ ] Unused Font Awesome imports (we switched to emojis)
- [ ] Check `src/lib/data/projects.ts` for category errors
- [ ] Review all `_assets/` directories for unused images

---

## 🔀 Custom Hooks Strategy

Extract stateful logic into reusable hooks:

### Planned Hooks
- [ ] `useScrollOpacity(fadeDistance)` - Scroll-based fade effect
- [ ] `useScrollPosition()` - Track scroll Y position
- [ ] `useDelayedVisibility(delay)` - Show element after delay
- [ ] `useHoverStyle(styles)` - Manage hover state styles
- [ ] `useBlogFilters(blogs)` - Blog filtering/sorting logic
- [ ] `useModal()` - Modal open/close state management

**Location:** `src/hooks/` (new directory)

---

## 📊 Metrics & Success Criteria

### Before (Current State)
- Resume page: ~650 LOC
- About page: ~212 LOC  
- Home page: ~323 LOC
- Blogs page: ~484 LOC
- **Total:** ~1,669 LOC for 4 key pages

### After (Target State)
- Resume page: ~200 LOC (70% reduction)
- About page: ~100 LOC (53% reduction)
- Home page: ~150 LOC (54% reduction)
- Blogs page: ~150 LOC (69% reduction)
- **Total:** ~600 LOC (64% reduction)
- **New:** ~15-20 reusable components (~1,500 LOC)

### Quality Metrics
- [ ] No file over 300 lines
- [ ] No component with more than 3 inline style objects
- [ ] 90%+ of styles in CSS files (not inline)
- [ ] Zero unused dependencies
- [ ] Zero ESLint warnings
- [ ] All TypeScript errors resolved

---

## 🗺️ Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Create component library structure (`src/components/ui/`)
- [ ] Create hooks directory (`src/hooks/`)
- [ ] Set up CSS variables and utilities
- [ ] Create base UI components (Button, Card, Modal)

### Phase 2: Resume Refactor (Week 2)
- [ ] Break down resume page into components
- [ ] Move inline styles to CSS modules
- [ ] Extract utility functions
- [ ] Test resume page functionality

### Phase 3: Page Refactors (Week 3)
- [ ] Refactor about page
- [ ] Refactor home page
- [ ] Share components between pages
- [ ] Create custom hooks

### Phase 4: Blogs & Projects (Week 4)
- [ ] Refactor blogs page
- [ ] Refactor clients page
- [ ] Apply patterns to remaining project pages

### Phase 5: Cleanup (Week 5)
- [ ] Remove dead code
- [ ] Clean up unused files
- [ ] Remove unused dependencies
- [ ] Update documentation

### Phase 6: Testing & QA (Week 6)
- [ ] Visual regression testing
- [ ] Accessibility testing
- [ ] Performance testing
- [ ] Cross-browser testing

---

## 🚨 Risk Mitigation

### Breaking Changes
- Refactor one page at a time
- Maintain parallel branches for comparison
- Use feature flags if needed
- Extensive testing after each refactor

### Style Consistency
- Document design system as we extract styles
- Create style guide for new components
- Use TypeScript for prop validation
- Storybook for component documentation (future)

### Dependencies

- Audit before removing any package
- Check for transitive dependencies
- Test all affected features
- Keep package-lock.json in sync

---

## 📝 Related Documentation

- See `FEEDBACK.md` for user-facing feature requests
- See `ARCHITECTURE.md` for overall system design
- See `DEVELOPER_GUIDE.md` for contribution guidelines
- See `TODO.md` for other backlog items

---

## 🎬 Next Steps

1. **Create baseline metrics** - Document current LOC and complexity
2. **Set up component structure** - Create directories and example components
3. **Start with resume page** - Highest impact, most bloated
4. **Iterate and refine** - Apply learnings to other pages

**Goal:** Make the codebase maintainable, scalable, and a joy to work with.
