import { expect, test } from "@playwright/test";
import { gotoAndWaitForHydration } from "../utils/wait-for-hydration";

// Allow ~2% pixel difference for dynamic animations (Spline 3D, etc.)
// Calculated as approximately 100000 pixels for typical desktop viewport
const MAX_VISUAL_DIFF_PIXELS = 100000;

test.describe("Projects Page Visual Tests", () => {
  test("projects page renders correctly", async ({ page }) => {
    await gotoAndWaitForHydration(page, "/projects");

    // Check header and footer are visible
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    // Wait for layout to stabilize
    await page.waitForTimeout(2000);

    // Take screenshot - allow small pixel differences due to dynamic content
    await expect(page).toHaveScreenshot("projects-desktop.png", {
      fullPage: true,
      animations: "disabled",
      timeout: 30000,
      maxDiffPixels: MAX_VISUAL_DIFF_PIXELS,
    });
  });

  test("projects page shows featured repositories", async ({ page }) => {
    await gotoAndWaitForHydration(page, "/projects");

    // Check that the Featured category button (star emoji) exists
    const featuredButton = page.getByRole("button", { name: /⭐/ });
    await expect(featuredButton).toBeVisible();

    // Check that project cards are visible (using correct CSS module class)
    const projectCards = page
      .locator("[class*='card']")
      .filter({ has: page.locator("h3") });
    await expect(projectCards.first()).toBeVisible();
  });
  test("project cards have icons and links", async ({ page }) => {
    await gotoAndWaitForHydration(page, "/projects");

    // Check that links exist (GitHub, live demos, etc.)
    const links = page
      .getByRole("link")
      .filter({ has: page.locator("img, svg") });
    await expect(links.first()).toBeVisible();
  });
});
