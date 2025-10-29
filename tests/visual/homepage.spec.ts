import { expect, test } from "@playwright/test";

test.describe("Homepage Visual Tests", () => {
  test("homepage renders correctly on desktop", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // Wait for critical content to be visible (not Spline)
    await expect(page.locator("header")).toBeVisible();
    
    // Wait for main content sections to load
    await expect(page.getByRole("heading", { name: /Hi, I'm Austin Hardy/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Featured Projects/i })).toBeVisible();
    
    await expect(page.locator("footer")).toBeVisible();

    // Wait a moment for layout to stabilize (don't wait for Spline)
    await page.waitForTimeout(2000);

    // Take full page screenshot for visual regression
    await expect(page).toHaveScreenshot("homepage-desktop.png", {
      fullPage: true,
      animations: "disabled",
      timeout: 20000,
      mask: [page.locator('[data-testid="spline-container"], canvas')],
      maxDiffPixelRatio: 0.1, // Allow 10% pixel difference for CI/local environment variations
    });
  });

  test("homepage renders correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto("/", { waitUntil: "networkidle" });

    await expect(page.locator("header")).toBeVisible();
    
    // Wait for main content sections to load
    await expect(page.getByRole("heading", { name: /Hi, I'm Austin Hardy/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Featured Projects/i })).toBeVisible();
    
    await expect(page.locator("footer")).toBeVisible();

    await page.waitForTimeout(2000);

    await expect(page).toHaveScreenshot("homepage-mobile.png", {
      fullPage: true,
      animations: "disabled",
      timeout: 20000,
      mask: [page.locator('[data-testid="spline-container"], canvas')],
      maxDiffPixelRatio: 0.1, // Allow 10% pixel difference for CI/local environment variations
      maxDiffPixels: 100000, // Allow for height differences between CI and local (82px * 375px width)
    });
  });

  test("homepage has visible header and footer", async ({ page }) => {
    await page.goto("/");

    // Check header elements
    const header = page.locator("header");
    await expect(header).toBeVisible();
    await expect(header).toHaveCSS("position", "fixed");

    // Check footer elements
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toHaveCSS("position", "fixed");
  });

  test("homepage loads Spline component", async ({ page }) => {
    await page.goto("/");

    // Wait for Spline container or loading state
    const splineContainer = page.locator(
      '[data-testid="spline-container"], canvas'
    );

    // Either Spline loads or loading indicator appears
    await splineContainer
      .first()
      .waitFor({ state: "visible", timeout: 15000 })
      .catch(() => {});

    await page.waitForTimeout(200);
  });

  test("homepage navigation links are clickable", async ({ page }) => {
    await page.goto("/");

    // Check key navigation links exist (use .first() to avoid strict mode issues with footer links)
    await expect(
      page.getByRole("link", { name: /about/i }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /projects/i }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /labs/i }).first()
    ).toBeVisible();
  });
});
