# Projects Page Refactoring TODO

**Priority:** HIGH - This is a complex refactor that needs careful execution
**Status:** PARTIALLY STARTED - Type updated, 6/22+ projects categorized
**Estimated Effort:** 2-3 hours

## Overview

The projects page needs a major architectural refactor to:
1. Eliminate the separate "Featured Projects" section
2. Add Category-based filtering (Apps, Web3, AI/ML, Design)
3. Merge all projects into a single unified grid
4. Show featured projects with star icons
5. Sort featured projects first by default
6. Make filters collapsible (especially on mobile)
7. Reduce CSS bloat and inline styles

---

## Current State

### ✅ COMPLETED
- Added `category` field to Project type definition
- Categorized first 6 projects (kryptos, gcp, stash, nitsuah-io, labs, darkmoon)

### ❌ INCOMPLETE
- **16+ remaining projects** need `category` field added
- Featured section still exists as separate HTML
- No Category filter UI
- No star icons for featured projects
- Massive inline style bloat throughout the file
- No collapsible filter functionality

---

## Step-by-Step Refactoring Plan

### PHASE 1: Complete Data Migration (30 minutes)

**File:** `src/lib/data/projects.ts`

Add `category` field to ALL remaining projects:

```typescript
// Web3 projects (already has 2 done, need ~8 more)
- nights-weekends → category: "Web3"
- eth-core → category: "Web3"  
- eth-dapp → category: "Web3"
- nft-store → category: "Web3"
- ens-nft → category: "Web3"
- sol-core → category: "Web3"
- sol-dapp → category: "Web3"
- devdao → category: "Web3"

// App projects
- games → category: "Apps"
- clients → category: "Apps"
- buildspace → category: "Apps"
- github → category: "Apps"

// Design projects
- spline3d → category: "Design"
- blender → category: "Design"
- paint3d → category: "Design"

// AI/ML projects  
- autogpt → category: "AI/ML"
- imagen → category: "AI/ML"

// Gaming projects (could be Apps or separate)
- nextgen → category: "Apps"
- nft-game → category: "Web3"
```

**Action Items:**
1. Go through ALL projects in `projects.ts`
2. Add appropriate `category` based on tags/content
3. Featured projects should also have their primary category + "Featured" tag

---

### PHASE 2: Simplify Page Structure (45 minutes)

**File:** `src/app/projects/page.tsx`

#### Current Issues:
- **1050 lines** - way too large
- Massive amounts of inline styles (lines 140-400+ are just Featured section styling)
- Separate Featured section (lines 144-370)
- Non-featured section (lines 371-700+)
- Duplicate card rendering logic

#### Refactor Actions:

1. **Extract ProjectCard component** (NEW FILE: `_components/ProjectCard.tsx`)
   - Move all card rendering logic to separate component
   - Props: `project`, `image`, `isFeatured`, `onClick`, `onMouseEnter`, `onMouseLeave`
   - This alone should reduce main file by ~200 lines

2. **Extract inline styles to CSS module** (NEW FILE: `_styles/Projects.module.css`)
   - Move all inline styles to proper CSS classes
   - Use CSS modules for scoping
   - Should reduce file by ~150 lines

3. **Remove Featured section entirely**
   - Delete lines 144-370 (entire Featured Projects section)
   - Merge into single unified grid

4. **Create unified project list logic:**
```typescript
// Sort: featured first, then by date
const sortedProjects = useMemo(() => {
  return [...allProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0; // maintain original order for same type
  });
}, []);
```

---

### PHASE 3: Add Category Filter (30 minutes)

**File:** `src/app/projects/page.tsx`

1. **Add category state:**
```typescript
const [selectedCategory, setSelectedCategory] = useState<string>("all");
```

2. **Filter projects by category:**
```typescript
const filteredProjects = useMemo(() => {
  let filtered = sortedProjects;
  
  // Filter by tags if any selected
  if (selectedTags.length > 0) {
    filtered = filtered.filter(p => 
      selectedTags.some(tag => p.tags.includes(tag))
    );
  }
  
  // Filter by category
  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }
  
  return filtered;
}, [sortedProjects, selectedTags, selectedCategory]);
```

3. **Add Category filter UI:**
```tsx
<div className={styles.categoryFilter}>
  {["all", "Apps", "Web3", "AI/ML", "Design"].map(cat => (
    <button
      key={cat}
      onClick={() => setSelectedCategory(cat)}
      className={selectedCategory === cat ? styles.active : ""}
    >
      {cat === "all" ? "All Projects" : cat}
    </button>
  ))}
</div>
```

---

### PHASE 4: Add Collapsible Filter (30 minutes)

1. **Add collapse state:**
```typescript
const [filtersExpanded, setFiltersExpanded] = useState(true);

// Auto-collapse on mobile
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setFiltersExpanded(false);
    }
  };
  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

2. **Create collapsible filter panel:**
```tsx
<div className={styles.filterPanel}>
  <button 
    className={styles.filterToggle}
    onClick={() => setFiltersExpanded(!filtersExpanded)}
  >
    <i className={`fa fa-filter`} />
    Filters
    <i className={`fa fa-chevron-${filtersExpanded ? 'up' : 'down'}`} />
  </button>
  
  {filtersExpanded && (
    <div className={styles.filterContent}>
      {/* Category buttons */}
      {/* Tag buttons */}
    </div>
  )}
</div>
```

---

### PHASE 5: Add Star Icons for Featured (15 minutes)

**File:** `_components/ProjectCard.tsx`

```tsx
{isFeatured && (
  <div className={styles.featuredBadge}>
    <i className="fa fa-star" aria-hidden="true" />
    Featured
  </div>
)}
```

Position in top-left or top-right of card image.

---

### PHASE 6: Reorder Page Content (10 minutes)

Current order is messy. Should be:
1. Header + description
2. Filter panel (collapsible)
3. Project grid (unified, no sections)

```tsx
<main className={styles.projectsPage}>
  {/* 1. Header */}
  <div className={styles.header}>
    <h1>Projects Portfolio</h1>
    <p>Explore projects organized by category</p>
  </div>
  
  {/* 2. Filters */}
  <div className={styles.filterPanel}>
    {/* Collapsible filters */}
  </div>
  
  {/* 3. Unified Grid */}
  <div className={styles.projectGrid}>
    {filteredProjects.map(project => (
      <ProjectCard key={project.id} {...props} />
    ))}
  </div>
</main>
```

---

## CSS Optimization Strategy

### Current Bloat Sources:
1. **Inline styles everywhere** - move to CSS modules
2. **Duplicate hover logic** - extract to reusable classes
3. **Repetitive gradient definitions** - use CSS variables
4. **Manual media queries** - use CSS Grid auto-fit

### Target Structure:

**NEW FILE: `_styles/Projects.module.css`**
```css
:root {
  --orange-primary: #f97316;
  --orange-secondary: #ea580c;
  --card-bg: rgba(20, 20, 20, 0.8);
  --card-border: rgba(249, 115, 22, 0.3);
}

.projectsPage {
  margin-top: 80px;
  padding: 2rem 1rem 80px;
  background: #0a0a0a;
  min-height: calc(100vh - 140px);
}

.header {
  margin-bottom: 3rem;
  text-align: center;
}

.projectGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.card {
  background: var(--card-bg);
  border: 2px solid var(--card-border);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.card:hover {
  border-color: rgba(249, 115, 22, 0.8);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.2);
}

/* Remove ~80% of current inline styles */
```

---

## Expected Results

### Before:
- ❌ 1050 lines in page.tsx
- ❌ Separate Featured/Non-Featured sections
- ❌ No Category filter
- ❌ No star icons
- ❌ All filters always visible
- ❌ Massive CSS bloat

### After:
- ✅ ~300 lines in page.tsx
- ✅ ~150 lines in ProjectCard.tsx
- ✅ ~200 lines in Projects.module.css
- ✅ Single unified grid
- ✅ Category + Tag filtering
- ✅ Star icons on featured
- ✅ Collapsible filters
- ✅ Clean, maintainable code

**Total reduction: 1050 → 650 lines (~40% reduction)**

---

## Testing Checklist

After refactoring:
- [ ] All 22+ projects display correctly
- [ ] Featured projects appear first
- [ ] Star icons visible on featured projects
- [ ] Category filter works (Apps, Web3, AI/ML, Design)
- [ ] Tag filter still works
- [ ] Filters collapse on mobile by default
- [ ] Filter toggle button works
- [ ] Card hover effects work
- [ ] GitHub/Demo links work
- [ ] No console errors
- [ ] Responsive on mobile/tablet/desktop
- [ ] Performance: page loads fast (no layout shifts)

---

## Risk Mitigation

1. **Work in a new branch** - Don't break existing functionality
2. **Test frequently** - Check after each phase
3. **Keep old code commented** - Easy rollback if needed
4. **Mobile-first** - Test mobile view constantly
5. **Incremental commits** - Commit after each phase completion

---

## Additional Cleanup Opportunities

Once main refactor is done:

1. **Optimize images** - Some project images are large GIFs
2. **Lazy load images** - Use Next.js Image with priority={false}
3. **Add loading states** - Skeleton loaders while projects load
4. **Add search** - Search by project name/description
5. **Add sorting** - Sort by date, name, popularity
6. **Extract projectImages map** - Move to separate file

---

## Notes

- The current `categorizeProjects` utility might be obsolete after this refactor
- Consider removing it if no longer used
- The `allProjects` import should be the single source of truth
- Featured status should be determined by the `featured` boolean, not by which array/section they're in

---

**PRIORITY: Complete this refactor BEFORE adding more features to avoid making the bloat worse!**

### Original notes for clarity

- [ ] projects/ is great! but gave me some ideas. add the features projects to the rest of the projects and make them all the same size. also consider adding "Category" as a secondary filter ie: Apps, Web3, AI/ML, and Design (to start  use simple short words or acronyms). tag existing projects with these categories according to their current location. tag featured projects with their Category as well as add the "Featured" category as a tag, so they can be filtered that way.
- [ ] projects/ - Add a Star icon to project cards to the left of any buttons like view/github, that tags a project as "featured". set this to true for the existing 3 featured projects. featured projects should appear first when no filters are applied (thus removing the need for a default featured projects section and consolidating our projects back to one "pane" with some filtering to boot!).
- [ ] projects/ - Filter should be collapsable on desktop and mobile (default collapsed on mobile). so maybe a multi-select drop down? start with a "drawer"/panel that can collapse/expand for now (but maybe a side panel that slides in from the left on desktop and a bottom sheet on mobile in the future?)
- [ ] projects - after the above changes are done the order of content should be "project portfolio" header & text, filter, then project cards.

## Whats next?

once all of this is completed, lets build out the - /projects/clients - start building more of the "mocks" out as "DEMO"s so people can interact with them.