# Visual Regression Tests

This directory contains visual regression tests that compare screenshots of pages against baseline images.

## Quick Start

```bash
# Update baselines with Docker (matches CI)
npm run test:visual:update:docker

# Run visual tests
npm run test:visual

# View results
npx playwright show-report
```

## Adding New Tests

1. Create a new spec file (e.g., `new-page.spec.ts`)
2. Use `.toHaveScreenshot()` to capture screenshots
3. Run with `--update-snapshots` to create initial baselines
4. Commit the baseline images

Example:
```typescript
import { expect, test } from "@playwright/test";

test("new page renders correctly", async ({ page }) => {
  await page.goto("/new-page");
  
  // Wait for content
  await expect(page.locator('main')).toBeVisible();
  
  // Capture screenshot
  await expect(page).toHaveScreenshot("new-page-desktop.png", {
    fullPage: true,
    animations: "disabled",
  });
});
```

## Best Practices

- **Mask dynamic content**: Use `mask: [page.locator('canvas')]`
- **Disable animations**: Set `animations: "disabled"`
- **Wait for content**: Ensure page is fully loaded before capturing
- **Use Docker for CI**: Always update baselines with Docker before committing

## Documentation

- Full guide: `docs/VISUAL_REGRESSION.md`
- Quick reference: `docs/VISUAL_REGRESSION_QUICK_REF.md`
- Update script: `scripts/update-visual-baselines.sh`
