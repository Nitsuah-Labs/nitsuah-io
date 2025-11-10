# Demo Component Refactoring Guide

**Created:** November 9, 2025  
**Status:** In Progress

## Overview

This guide documents the refactoring strategy for all demo components in the clients page. The goal is to break down large monolithic components (500-2600+ LOC) into focused, maintainable components using shared patterns.

---

## ✅ Completed Work

### Shared Component Library
**Location:** `src/components/demos/`

Created 5 reusable components (392 LOC total):
- `DemoCard.tsx` (44 LOC) - Reusable card with hover effects
- `DemoHeader.tsx` (63 LOC) - Title, subtitle, icon, actions
- `DemoButton.tsx` (89 LOC) - 5 variants, 3 sizes
- `DemoSection.tsx` (63 LOC) - Collapsible sections
- `DemoTable.tsx` (133 LOC) - Generic table with TypeScript generics

### Critical Files (>1000 LOC)

#### 1. ServicesDemo.tsx (2,604 LOC) ✅ WRAPPERS CREATED
**Status:** Wrappers created, full extraction pending

**Created:**
- `RestaurantDemo.tsx` - Wraps ServicesDemo with type="restaurant"
- `BlogCMSDemo.tsx` - Wraps ServicesDemo with type="blog-cms"

**Future Work:**
- Extract restaurant logic (~1,200 LOC): home, menu, booking, pickup pages
- Extract blog CMS logic (~1,200 LOC): dashboard, posts, create, edit pages
- Create shared utils (~200 LOC)

#### 2. StorefrontDemo.tsx (1,777 LOC) ✅ STRUCTURE CREATED
**Status:** Placeholder components created

**Directory:** `src/app/projects/clients/_comp/storefront/`

**Created:**
- `ProductGallery.tsx` - Product grid, bundles, filters (lines 350-560, ~400 LOC target)
- `ShoppingCart.tsx` - Cart items, totals, quantity controls (lines 694-1087, ~350 LOC target)
- `CheckoutFlow.tsx` - Checkout form, confirmation (lines 1088-1600, ~400 LOC target)

**Pages:** home, cart, product, checkout, confirmation, bundle, upload

#### 3. CRMDemo.tsx (1,092 LOC) ✅ STRUCTURE CREATED
**Status:** Placeholder components created

**Directory:** `src/app/projects/clients/_comp/crm/`

**Created:**
- `DashboardView.tsx` - Metrics, charts, activity feed (lines 409-684, ~250 LOC target)
- `ContactsView.tsx` - Contact list with search (lines 685-832, ~150 LOC target)
- `DealsView.tsx` - Deal pipeline by stage (lines 833-962, ~130 LOC target)
- `TasksView.tsx` - Task list with priorities (lines 963-1092, ~130 LOC target)

**Views:** dashboard, contacts, deals, tasks

---

## 🔧 High Priority Files (500-1000 LOC)

### 4. RealEstateDemo.tsx (978 LOC)
**Contains:** Property listings, search, agent profiles, virtual tours

**Recommended Split:**
- `PropertyListings.tsx` (~300 LOC) - Grid view, search, filters
- `PropertyDetails.tsx` (~250 LOC) - Detail view, image gallery, agent info
- `AgentProfiles.tsx` (~200 LOC) - Agent cards, contact info
- `VirtualTour.tsx` (~200 LOC) - 360 tour interface

**Can Use:** DemoCard for property cards, DemoTable for listings, DemoButton for actions

### 5. AppointmentDemo.tsx (840 LOC)
**Contains:** Calendar, booking system, appointment management

**Recommended Split:**
- `CalendarView.tsx` (~350 LOC) - Month/week/day views, navigation
- `BookingForm.tsx` (~250 LOC) - Appointment booking interface
- `AppointmentList.tsx` (~240 LOC) - Upcoming/past appointments

**Can Use:** DemoTable for appointment list, DemoCard for appointment cards, DemoButton for actions

### 6. PortfolioDemo.tsx (684 LOC)
**Contains:** Project showcase, about section, contact form

**Recommended Split:**
- `ProjectShowcase.tsx` (~300 LOC) - Project grid with filters
- `AboutSection.tsx` (~200 LOC) - Bio, skills, experience
- `ContactForm.tsx` (~180 LOC) - Contact form with validation

**Can Use:** DemoCard for project cards, DemoSection for about sections, DemoButton for form

### 7. NFTDemo.tsx (592 LOC)
**Contains:** NFT gallery, minting interface, collection view

**Recommended Split:**
- `NFTGallery.tsx` (~300 LOC) - Grid view, filters, search
- `MintingInterface.tsx` (~200 LOC) - Minting form, preview
- `CollectionView.tsx` (~150 LOC) - User's collection

**Can Use:** DemoCard for NFT cards, DemoButton for minting, DemoSection for sections

### 8. SaaSDemo.tsx (522 LOC)
**Contains:** SaaS dashboard, feature showcase, pricing

**Recommended Split:**
- `SaaSDashboard.tsx` (~250 LOC) - Dashboard with metrics
- `FeatureShowcase.tsx` (~150 LOC) - Feature cards
- `PricingTable.tsx` (~120 LOC) - Pricing tiers

**Can Use:** DemoCard for features/pricing, DemoSection for sections, DemoTable for comparisons

---

## 📋 Implementation Checklist

### Phase 1: Critical Files (COMPLETED)
- [x] Create shared demo component library
- [x] ServicesDemo wrappers created
- [x] StorefrontDemo structure created
- [x] CRMDemo structure created

### Phase 2: High Priority Files (NEXT)
- [ ] Create RealEstateDemo directory with 4 placeholder components
- [ ] Create AppointmentDemo directory with 3 placeholder components
- [ ] Create PortfolioDemo directory with 3 placeholder components
- [ ] Create NFTDemo directory with 3 placeholder components
- [ ] Create SaaSDemo directory with 3 placeholder components
- [ ] Update TECH_DEBT.md with progress

### Phase 3: Full Extraction (FUTURE)
- [ ] Extract ServicesDemo to RestaurantDemo + BlogCMSDemo
- [ ] Extract StorefrontDemo to 3 components
- [ ] Extract CRMDemo to 4 components
- [ ] Extract remaining 5 demos

### Phase 4: Style Refactoring (FUTURE)
- [ ] Extract inline styles to CSS modules
- [ ] Create shared style utilities
- [ ] Standardize color schemes across demos

### Phase 5: Testing & Documentation (FUTURE)
- [ ] Add unit tests for extracted components
- [ ] Document component props and usage
- [ ] Create Storybook stories (optional)

---

## 🎯 Success Metrics

**Current State:**
- 11 demo files: 10,865 LOC total
- Largest file: 2,604 LOC (ServicesDemo)
- Average file size: 987 LOC

**Target State:**
- ~50 focused components: ~8,000 LOC (25% reduction via reusable patterns)
- Largest component: ~400 LOC
- Average component size: ~160 LOC
- Shared components eliminate ~2,000 LOC of duplication

**Progress:**
- ✅ Demo library created: 5 components, 392 LOC
- ✅ Placeholder structure: 11 files across 3 directories
- ✅ Files mapped: 4,873 LOC across 3 critical files
- 🔄 Remaining: 5,992 LOC across 8 files

---

## 📝 Notes

- All placeholder components have TODO comments with extraction details
- Line numbers documented for easy reference during extraction
- Shared components reduce duplication across all demos
- Incremental approach allows testing at each step
- No breaking changes - all demos still work via wrappers

**Next Steps:**
1. Continue with medium-priority files (RealEstateDemo through SaaSDemo)
2. Create placeholder structures for remaining 5 files
3. Document extraction strategy for each
4. Begin full extraction starting with highest-impact files
