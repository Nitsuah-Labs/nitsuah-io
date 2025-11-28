# Playwright Test Fixes - Projects Page

## Overview
Fixed failing Playwright tests for the Projects page by addressing locator issues, adding proper wait conditions, and implementing more robust test patterns.

## Issues Identified

### 1. Featured Button Locator Issue (projects.spec.ts:29)
**Problem**: Test looked for button with `name: /⭐/` but the button's `aria-label` contains descriptive text ("Mark as featured" or "Remove from featured"), not the star emoji.

**Root Cause**: The ProjectCard component renders the star emoji as button text but uses descriptive aria-labels for accessibility.

**Solution**: Changed locator to search for button with `/featured/i` regex pattern which matches the aria-label text.

### 2. Project Links Test Fragility (projects.spec.ts:42)
**Problem**: Test selected all links on the page using `page.getByRole("link")`, which could match navigation links, footer links, etc., not just project card action links.

**Root Cause**: Overly broad selector that didn't specifically target project card action buttons.

**Solution**: 
- Scope the selector to `[class*='cardActions']` first, then get links within
- Add count validation to ensure at least one link exists
- Handle cases where some projects might not have links (e.g., "Coming Soon" projects)

### 3. Missing Wait Conditions
**Problem**: Tests didn't wait for async content rendering, causing timing issues where elements weren't yet visible when assertions ran.

**Root Cause**: React client-side rendering means content appears after initial page load.

**Solution**: 
- Added `data-testid="projects-section"` to the projects grid for stable selection
- Added explicit `waitForSelector` with 10-second timeout before assertions
- Added project-specific wait in accessibility tests

## Changes Made

### 1. Updated Test File: `tests/visual/projects.spec.ts`

#### Before:
```typescript
test("projects page shows featured repositories", async ({ page }) => {
  await go(page, "/projects");
  const featuredButton = page.getByRole("button", { name: /⭐/ });
  await expect(featuredButton).toBeVisible();
  // ...
});

test("project cards have links", async ({ page }) => {
  await go(page, "/projects");
  const projectLinks = page.getByRole("link");
  await expect(projectLinks.first()).toBeVisible();
  // ...
});
```

#### After:
```typescript
test("projects page shows featured repositories", async ({ page }) => {
  await go(page, "/projects");
  
  // Wait for projects section to load
  await page.waitForSelector("[data-testid='projects-section']", {
    timeout: 10000,
  });
  
  // Fixed: Use aria-label text pattern instead of emoji
  const featuredButton = page.getByRole("button", { name: /featured/i });
  await expect(featuredButton.first()).toBeVisible();
  // ...
});

test("project cards have links", async ({ page }) => {
  await go(page, "/projects");
  
  // Wait for projects section to load
  await page.waitForSelector("[data-testid='projects-section']", {
    timeout: 10000,
  });
  
  // Fixed: Scope to card actions specifically
  const projectLinks = page
    .locator("[class*='cardActions']")
    .getByRole("link");
  
  // Validate at least one exists
  const linkCount = await projectLinks.count();
  expect(linkCount).toBeGreaterThan(0);
  // ...
});
```

### 2. Updated Component: `src/app/projects/page.tsx`

Added `data-testid` for stable test selection:

```typescript
<section
  className={styles.projectGrid}
  aria-label="Project Repositories"
  data-testid="projects-section"  // ← Added this
>
```

### 3. Updated Accessibility Tests: `tests/accessibility/all-pages.spec.ts`

Added specific wait condition for Projects page:

```typescript
for (const pageInfo of pages) {
  test(`${pageInfo.name} has no accessibility violations`, async ({ page }) => {
    // ... existing code ...
    
    // For projects page, wait for content to load
    if (pageInfo.path === "/projects") {
      await page.waitForSelector("[data-testid='projects-section']", {
        timeout: 10000,
      });
      await page.waitForTimeout(1000);
    }
    
    // Run axe accessibility scan
    // ...
  });
}
```

## Best Practices Applied

### 1. **Stable Selectors**
- Use `data-testid` attributes for elements that need to be tested
- Avoid relying on emoji characters in locators
- Use semantic selectors (roles, labels) when possible

### 2. **Proper Wait Conditions**
```typescript
// ✅ Good: Wait for specific element
await page.waitForSelector("[data-testid='projects-section']", {
  timeout: 10000,
});

// ❌ Bad: No wait, might fail on slow loads
const element = page.locator("...");
```

### 3. **Scoped Locators**
```typescript
// ✅ Good: Scoped to specific area
const projectLinks = page
  .locator("[class*='cardActions']")
  .getByRole("link");

// ❌ Bad: Too broad, matches unrelated elements
const links = page.getByRole("link");
```

### 4. **Defensive Assertions**
```typescript
// ✅ Good: Check count first
const linkCount = await projectLinks.count();
expect(linkCount).toBeGreaterThan(0);

// ❌ Bad: Assumes elements exist
await expect(projectLinks.first()).toBeVisible();
```

### 5. **Handle Conditional Rendering**
```typescript
// ✅ Good: Account for optional elements
if (await starButton.count() > 0) {
  await expect(starButton).toBeVisible();
}

// ❌ Bad: Assumes element always exists
await expect(starButton).toBeVisible();
```

## Testing the Fixes

Run the tests to verify:

```bash
# Run all Playwright tests
npm run test:e2e

# Run only visual tests
npx playwright test tests/visual

# Run only accessibility tests
npx playwright test tests/accessibility

# Run with UI for debugging
npx playwright test --ui
```

## Additional Recommendations

### 1. Add More Test IDs
Consider adding `data-testid` to other commonly tested elements:

```typescript
// In ProjectCard.tsx
<div className={styles.cardActions} data-testid="project-card-actions">
  {/* ... */}
</div>

<button
  className={styles.featuredStar}
  data-testid="featured-star-button"
  // ...
>
```

### 2. Mock Data for Tests
For consistent test results, consider creating a test-specific data file:

```typescript
// tests/_utils/test-projects.ts
export const testProjects = [
  {
    id: "test-project-1",
    title: "Test Project",
    // ... complete project data
  },
];
```

### 3. Visual Regression Testing
The visual screenshot test is currently skipped. To re-enable:
- Set up consistent Docker environment
- Remove `.skip` from the test
- Update snapshots: `npx playwright test --update-snapshots`

### 4. Component-Level Testing
Consider adding component tests using Playwright Component Testing:

```typescript
import { test, expect } from '@playwright/experimental-ct-react';
import { ProjectCard } from '@/app/projects/_components/ProjectCard';

test('ProjectCard renders correctly', async ({ mount }) => {
  const component = await mount(
    <ProjectCard project={mockProject} image={mockImage} />
  );
  await expect(component.getByRole('button', { name: /featured/i })).toBeVisible();
});
```

## Summary

All changes focus on making tests:
1. **More robust** - Handle async rendering and conditional elements
2. **More specific** - Target exact elements being tested
3. **More maintainable** - Use semantic selectors and test IDs
4. **More reliable** - Add proper wait conditions and defensive checks

These patterns should prevent similar failures in the future and make tests more resilient to UI changes.
