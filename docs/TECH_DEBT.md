# Technical Debt & Code Cleanup

**Created:** November 2, 2025  
**Status:** Ongoing

## Overview

Strategic plan for reducing code bloat, improving maintainability, and establishing better code organization patterns across the codebase. Focus on refactoring large components, extracting reusable patterns, and moving inline styles to proper CSS files.

---

## 🎯 Primary Goals

1. **Reduce Component Size** - Break down 300-1000+ LOC files into manageable, focused components
2. **Separate Concerns** - Move inline styles and className-heavy JSX into proper CSS modules
3. **Create Reusable Components** - Extract common patterns into shared components with style props
4. **Remove Dead Code** - Identify and remove unused files, functions, and dependencies
5. **Improve Readability** - Make files easier to navigate and understand at a glance
6. **Reorganize Code Structure** - Move code from cluttered directories into more logical structures or update folder structure or file structure as needed (just consider the impacts and updates needed, test to ensure breakages get fixed)
7. **Best Practices** - Follow established coding conventions, use meaningful names, and read/write information or document complex logic in `docs/`

---

## 🔥 High Priority - Bloated Files

### Critical Refactoring Targets (>1000 LOC)

**Total Impact:** 3 files, ~5,380 LOC

1. **ServicesDemo.tsx** - 2,604 LOC ✅ WRAPPERS CREATED
   - **Status:** Wrapper components created (RestaurantDemo.tsx, BlogCMSDemo.tsx)
   - **Current State:** Both wrap ServicesDemo with type prop ("restaurant" | "blog-cms")
   - **Future Work:** Full extraction to standalone components (~800 LOC each + shared utils)
   - **Impact:** Contains 2 complete applications (Italian restaurant + blog CMS), extensive inline styles
   - **Can Use:** DemoCard, DemoHeader, DemoButton, DemoSection, DemoTable components
   - **Location:** `src/app/projects/clients/_comp/`

2. **StorefrontDemo.tsx** - 1,777 LOC ✅ STRUCTURE CREATED
   - **Status:** Placeholder components created in `_comp/storefront/`
   - **Components:** ProductGallery, ShoppingCart, CheckoutFlow
   - **Future Work:** Full extraction (~400 LOC each)
   - **Split Points:** home (350), cart (694), checkout (1088), confirmation (1425)
   - **Can Use:** DemoCard for products, DemoTable for cart items, DemoButton for actions
   - **Location:** `src/app/projects/clients/_comp/storefront/`

3. **CRMDemo.tsx** - 1,092 LOC ✅ STRUCTURE CREATED
   - **Status:** Placeholder components created in `_comp/crm/`
   - **Components:** DashboardView, ContactsView, DealsView, TasksView
   - **Future Work:** Full extraction (~250 LOC each)
   - **Split Points:** dashboard (409), contacts (685), deals (833), tasks (963)
   - **Can Use:** DemoTable for lists, DemoCard for metrics/deal cards, DemoSection for activity
   - **Location:** `src/app/projects/clients/_comp/crm/`

### High Priority Files (500-1000 LOC)

4. **RealEstateDemo.tsx** - 978 LOC
   - **Contains:** Property listings, search, agent profiles
   - **Can Use:** DemoCard for property cards, DemoTable for listings

5. **AppointmentDemo.tsx** - 840 LOC
   - **Contains:** Calendar, booking system, appointment management
   - **Can Use:** DemoTable for appointments, DemoButton for actions

6. **PortfolioDemo.tsx** - 684 LOC
   - **Contains:** Project showcase, about section, contact form
   - **Can Use:** DemoCard for projects, DemoSection for content areas

7. **ClientsDemo.tsx** - 613 LOC
   - **Contains:** Client management interface
   - **Can Use:** DemoTable for client list, DemoCard for client cards

8. **NFTDemo.tsx** - 592 LOC
   - **Contains:** NFT gallery, minting interface
   - **Can Use:** DemoCard for NFT cards, DemoButton for minting

9. **SaaSDemo.tsx** - 522 LOC
   - **Contains:** SaaS dashboard, feature showcase
   - **Can Use:** DemoCard, DemoSection for feature areas

**Refactoring Strategy:**
1. ✅ Create shared demo component library (COMPLETED - 5 components, ~400 LOC)
2. ✅ ServicesDemo wrappers created (RestaurantDemo, BlogCMSDemo)
3. ✅ StorefrontDemo structure created (3 placeholder components)
4. ✅ CRMDemo structure created (4 placeholder components)
5. Next: Apply patterns to remaining 6 files (RealEstateDemo, AppointmentDemo, etc.)
6. Then: Full extraction of placeholders to standalone components
7. Finally: Extract inline styles to CSS modules

**Progress Metrics:**
- Demo component library: 5 components, 392 LOC reusable patterns
- Placeholder components created: 11 files across 3 demo directories
- Files with structure mapped: ServicesDemo (2), StorefrontDemo (3), CRMDemo (4)
- Total LOC organized: ~4,873 LOC across 3 critical files

---

## 🔧 Reusable Component Library

Create shared components to reduce duplication:

### Demo Components ✅ COMPLETED

**Location:** `src/components/demos/`

Created reusable demo patterns to reduce duplication across 10+ demo files (~10,000 LOC total):

- [x] `DemoCard` (44 LOC) - Reusable card with hover effects, onClick handler, customizable styles
- [x] `DemoHeader` (63 LOC) - Title, subtitle, icon, and actions slot with responsive wrapping
- [x] `DemoButton` (89 LOC) - 5 variants (primary/secondary/success/danger/ghost), 3 sizes, disabled state
- [x] `DemoSection` (63 LOC) - Optional title, collapsible sections, custom styles
- [x] `DemoTable` (133 LOC) - Generic table with TypeScript generics, column config, row clicks, hover, striped rows
- [x] `index.ts` - Barrel exports for clean imports

**Impact:** ~400 LOC of reusable patterns that will reduce duplication in ServicesDemo (2,604 LOC), StorefrontDemo (1,715 LOC), CRMDemo (1,065 LOC), and 7 other demo files.

**Next Steps:** Refactor demo files to use these components, extract inline styles to CSS modules.

### Layout Components

- [ ] `Section` - Wrapper with consistent padding/background (future)

### UI Components ✅ Enhanced

- [x] `FilterButton` - Reusable filter button with category-based color coding
- [x] `ProjectTypeFilter` - Project type filter component for client projects page

### Form Components (Future Enhancement)

- [ ] `Input` - Styled text input
- [ ] `TextArea` - Styled textarea
- [ ] `Select` - Styled dropdown
- [ ] `FileUpload` - Styled file input

**Location:** `src/components/ui/` ✅ Created and expanded

### Phase 6: Testing & QA (Future - See TODO.md)

- [ ] Visual regression testing (requires Docker setup)
- [ ] Accessibility testing
- [ ] Performance testing
- [ ] Cross-browser testing

## 🗺️ Implementation Phases

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
- See `CONTRIBUTING.md` for contribution guidelines
- See `TODO.md` for other backlog items

---

## 🎬 Next Steps

1. **Create baseline metrics** - Document current LOC and complexity
2. **Set up component structure** - Create directories and example components
3. **Start with resume page** - Highest impact, most bloated
4. **Iterate and refine** - Apply learnings to other pages

**Goal:** Make the codebase maintainable, scalable, and a joy to work with.
