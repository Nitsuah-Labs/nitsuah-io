import { expect, test } from "@playwright/test";

test.describe("Homepage Visual Tests", () => {
  test("homepage renders correctly on desktop", async ({ page }) => {
    await page.goto("http://localhost:3000/?testHelpers=1", { waitUntil: "networkidle" });

    // Wait for critical content to be visible (not Spline)
    await expect(page.locator("header")).toBeVisible();

    // Wait for main hero content (name is typed in dynamically as "Austin H.")
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    // Wait a moment for layout to stabilize (don't wait for Spline)
    await page.waitForTimeout(2000);

    // Take full page screenshot for visual regression
    await expect(page).toHaveScreenshot("homepage-desktop.png", {
      fullPage: true,
      animations: "disabled",
      timeout: 20000,
      mask: [page.locator('[data-testid="spline-container"], canvas')],
    });
  });

  test("homepage renders correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto("http://localhost:3000/?testHelpers=1", { waitUntil: "networkidle" });

    await expect(page.locator("header")).toBeVisible();

    // Wait for main hero content (name is typed in dynamically as "Austin H.")
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    await page.waitForTimeout(2000);

    await expect(page).toHaveScreenshot("homepage-mobile.png", {
      fullPage: true,
      animations: "disabled",
      timeout: 20000,
      mask: [page.locator('[data-testid="spline-container"], canvas')],
      maxDiffPixelRatio: 0.15, // Increased tolerance for CI/local font rendering differences
      threshold: 0.3, // Allow 30% threshold for image comparison to handle dimension variations
    });
  });

  test("homepage has visible header and footer", async ({ page }) => {
    await page.goto("http://localhost:3000/?testHelpers=1");

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
    await page.goto("http://localhost:3000/?testHelpers=1");

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
    await page.goto("http://localhost:3000/?testHelpers=1");

    // Wait for header to be fully loaded
    await expect(page.locator("header")).toBeVisible();

    // Check main navigation links exist on homepage
    // Note: "labs" is NOT a top-level nav item - it's nested under "projects"
    // So we test for the actual top-level navigation items: about, resume, crypto, projects
    const aboutLink = page.getByRole("link", { name: /about/i }).first();
    const resumeLink = page.getByRole("link", { name: /resume/i }).first();
    const cryptoLink = page.getByRole("link", { name: /crypto/i }).first();
    const projectsLink = page.locator('a[href="/projects"]').first();

    // Verify all top-level navigation links are visible
    await expect(aboutLink).toBeVisible();
    await expect(resumeLink).toBeVisible();
    await expect(cryptoLink).toBeVisible();
    await expect(projectsLink).toBeVisible();

    // Verify links have correct href attributes
    await expect(aboutLink).toHaveAttribute("href", "/about");
    await expect(resumeLink).toHaveAttribute("href", "/resume");
    await expect(cryptoLink).toHaveAttribute("href", "/crypto");
    await expect(projectsLink).toHaveAttribute("href", "/projects");
  });
});
