# Demo Component Quick Reference

**Last Updated:** November 9, 2025

## 🎨 Shared Component Library

Import from: `src/components/demos`

```typescript
import { DemoCard, DemoHeader, DemoButton, DemoSection, DemoTable } from '@/components/demos';
```

### DemoCard
**Use for:** Product cards, feature cards, stat cards

```tsx
<DemoCard 
  hover={true}
  onClick={() => handleClick()}
  style={{ background: 'rgba(...)' }}
>
  {/* Your content */}
</DemoCard>
```

### DemoButton
**Variants:** primary, secondary, success, danger, ghost  
**Sizes:** small, medium, large

```tsx
<DemoButton 
  variant="primary" 
  size="medium"
  onClick={handleSubmit}
  disabled={loading}
>
  Click Me
</DemoButton>
```

### DemoTable
**Use for:** Data lists, contact tables, product listings

```tsx
<DemoTable
  data={contacts}
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (row) => <button>Edit</button>
    }
  ]}
  onRowClick={(row) => console.log(row)}
  hover={true}
  striped={true}
/>
```

### DemoSection
**Use for:** Collapsible sections, grouped content

```tsx
<DemoSection 
  title="Section Title"
  collapsible={true}
  defaultOpen={true}
>
  {/* Section content */}
</DemoSection>
```

### DemoHeader
**Use for:** Page headers with actions

```tsx
<DemoHeader
  icon="🎯"
  title="Dashboard"
  subtitle="Welcome back, User"
  actions={
    <button>New Item</button>
  }
/>
```

---

## 📁 Demo Component Structure

### Completed Structures

#### ServicesDemo → RestaurantDemo + BlogCMSDemo
```
src/app/projects/clients/_comp/
├── RestaurantDemo.tsx    (wrapper for type="restaurant")
└── BlogCMSDemo.tsx       (wrapper for type="blog-cms")
```

#### StorefrontDemo → storefront/
```
src/app/projects/clients/_comp/storefront/
├── ProductGallery.tsx    (~400 LOC target)
├── ShoppingCart.tsx      (~350 LOC target)
├── CheckoutFlow.tsx      (~400 LOC target)
└── index.ts
```

#### CRMDemo → crm/
```
src/app/projects/clients/_comp/crm/
├── DashboardView.tsx     (~250 LOC target)
├── ContactsView.tsx      (~150 LOC target)
├── DealsView.tsx         (~130 LOC target)
├── TasksView.tsx         (~130 LOC target)
└── index.ts
```

### Pending Structures

**RealEstateDemo** (978 LOC) → realestate/
- PropertyListings.tsx (~300 LOC)
- PropertyDetails.tsx (~250 LOC)
- AgentProfiles.tsx (~200 LOC)
- VirtualTour.tsx (~200 LOC)

**AppointmentDemo** (840 LOC) → appointment/
- CalendarView.tsx (~350 LOC)
- BookingForm.tsx (~250 LOC)
- AppointmentList.tsx (~240 LOC)

**PortfolioDemo** (684 LOC) → portfolio/
- ProjectShowcase.tsx (~300 LOC)
- AboutSection.tsx (~200 LOC)
- ContactForm.tsx (~180 LOC)

**NFTDemo** (592 LOC) → nft/
- NFTGallery.tsx (~300 LOC)
- MintingInterface.tsx (~200 LOC)
- CollectionView.tsx (~150 LOC)

**SaaSDemo** (522 LOC) → saas/
- SaaSDashboard.tsx (~250 LOC)
- FeatureShowcase.tsx (~150 LOC)
- PricingTable.tsx (~120 LOC)

---

## 🎯 Refactoring Guidelines

### When to Extract a Component

Extract when:
- Section exceeds 150 LOC
- Logic is reusable across pages
- Clear single responsibility
- Has distinct state management

### Component Naming

```typescript
// ✅ Good
ProductGallery.tsx      // Specific, clear purpose
DashboardView.tsx       // Indicates view layer
CheckoutFlow.tsx        // Describes user journey

// ❌ Avoid
Products.tsx            // Too generic
Page1.tsx               // Not descriptive
BigComponent.tsx        // Not meaningful
```

### Extraction Steps

1. **Identify section** - Find clear start/end in monolithic file
2. **List dependencies** - State, props, handlers needed
3. **Create placeholder** - Document with TODO and line numbers
4. **Extract interfaces** - Move types to separate file if shared
5. **Move JSX** - Copy section to new file
6. **Replace in original** - Import and use new component
7. **Test** - Verify functionality
8. **Refine** - Use shared components (DemoCard, etc.)

### Code Style

```typescript
// ✅ Use shared components
<DemoCard hover onClick={handleClick}>
  <DemoHeader title="Product" icon="📦" />
  <DemoButton variant="primary">Add to Cart</DemoButton>
</DemoCard>

// ❌ Avoid inline styles when possible
<div style={{ 
  padding: '1rem', 
  background: 'rgba(...)' 
}}>
  <button style={{ ... }}>Click</button>
</div>
```

---

## 📊 Current Progress

| File            | LOC   | Status      | Components | Target LOC  |
| --------------- | ----- | ----------- | ---------- | ----------- |
| ServicesDemo    | 2,604 | ✅ Wrappers  | 2          | 1,600 total |
| StorefrontDemo  | 1,777 | ✅ Structure | 3          | 1,150 total |
| CRMDemo         | 1,092 | ✅ Structure | 4          | 660 total   |
| RealEstateDemo  | 978   | 🔄 Pending   | 4          | 950 total   |
| AppointmentDemo | 840   | 🔄 Pending   | 3          | 840 total   |
| PortfolioDemo   | 684   | 🔄 Pending   | 3          | 680 total   |
| NFTDemo         | 592   | 🔄 Pending   | 3          | 650 total   |
| SaaSDemo        | 522   | 🔄 Pending   | 3          | 520 total   |

**Totals:**
- Current: 10,865 LOC
- Target: ~8,000 LOC (25% reduction)
- Progress: 45% mapped

---

## 🚀 Quick Commands

```bash
# Run tests
npm test

# Check errors
npm run lint

# Build
npm run build

# Find large files
Get-ChildItem -Recurse *.tsx | Sort-Object Length -Descending | Select-Object -First 10 Name, @{Name="LOC";Expression={(Get-Content $_.FullName).Length}}
```

---

## 📚 Documentation

- **DEMO_REFACTORING.md** - Detailed refactoring guide
- **TECH_DEBT.md** - Overall tech debt tracking
- **REFACTORING_SESSION_SUMMARY.md** - Latest session summary
- **TODO comments** - In placeholder files with line numbers
