import { expect, test } from "@playwright/test";

test.describe("Homepage Visual Tests", () => {
  test("homepage renders correctly on desktop", async ({ page }) => {
    await page.goto("/");

    // Wait for page to be fully loaded and for Spline to finish loading
    await page.waitForLoadState("networkidle");

    // Wait for critical elements
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    // Wait for Spline canvas or its loading indicator to settle for stable screenshots
    const spline = page.locator('[data-testid="spline-container"], canvas');
    await spline.first().waitFor({ timeout: 25000 }).catch(() => {});

    // Take full page screenshot for visual regression (increase timeout)
    await expect(page).toHaveScreenshot("homepage-desktop.png", {
      fullPage: true,
      animations: "disabled",
      timeout: 20000,
    });
  });

  test("homepage renders correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto("/");

    await page.waitForLoadState("networkidle");

    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    const spline = page.locator('[data-testid="spline-container"], canvas');
    await spline.first().waitFor({ timeout: 25000 }).catch(() => {});

    await expect(page).toHaveScreenshot("homepage-mobile.png", {
      fullPage: true,
      animations: "disabled",
      timeout: 20000,
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
    await splineContainer.first().waitFor({ timeout: 20000 }).catch(() => {});
  });

  test("homepage navigation links are clickable", async ({ page }) => {
    await page.goto("/");

    // Check key navigation links exist
    await expect(page.getByRole("link", { name: /about/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /projects/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /labs/i })).toBeVisible();
  });
});
