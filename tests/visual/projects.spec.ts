import { expect, test } from "@playwright/test";
import { go } from "../_utils/playwright-helpers";

test.describe("Projects Page Visual Tests", () => {
  test("projects page renders correctly", async ({ page }) => {
    await go(page, "/projects");

    // Wait for React to hydrate and render content
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(5000); // Give React extra time to render

    // Check header and footer are visible
    await expect(page.locator("header")).toBeVisible({ timeout: 15000 });
    await expect(page.locator("footer")).toBeVisible({ timeout: 15000 });

    // Wait for layout to stabilize
    await page.waitForTimeout(1000);

    // Take screenshot
    await expect(page).toHaveScreenshot("projects-desktop.png", {
      fullPage: true,
      animations: "disabled",
      timeout: 20000,
    });
  });

  test("projects page shows featured repositories", async ({ page }) => {
    await go(page, "/projects");

    // Wait for main content to load
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(5000); // Give time for React hydration

    // Wait for any project card to appear (they all have h3 titles)
    const cards = page.locator("article, [class*='card']").filter({ has: page.locator("h3") });
    await expect(cards.first()).toBeVisible({ timeout: 15000 });

    // Check that the Featured category button (star emoji) exists
    const featuredButton = page.getByRole("button", { name: /featured/i });
    await expect(featuredButton.first()).toBeVisible();
  });
  
  test("project cards have links", async ({ page }) => {
    await go(page, "/projects");

    // Wait for main content to load
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(5000); // Give time for React hydration

    // Wait for any project card to appear
    const cards = page.locator("article, [class*='card']").filter({ has: page.locator("h3") });
    await expect(cards.first()).toBeVisible({ timeout: 15000 });

    // Check that project cards with action links exist
    // Note: Not all projects may have links (e.g., "Coming Soon" projects)
    const projectLinks = page
      .locator("[class*='cardActions']")
      .getByRole("link");

    // Ensure at least one project card has links
    const linkCount = await projectLinks.count();
    expect(linkCount).toBeGreaterThan(0);

    // Verify the first link has proper security attributes
    const firstLink = projectLinks.first();
    await expect(firstLink).toBeVisible();
    await expect(firstLink).toHaveAttribute("target", "_blank");
    await expect(firstLink).toHaveAttribute("rel", /noopener/);
  });
});
