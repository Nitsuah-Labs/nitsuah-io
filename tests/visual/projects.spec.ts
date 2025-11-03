import { expect, test } from "@playwright/test";
import { go } from "../_utils/playwright-helpers";

test.describe("Projects Page Visual Tests", () => {
  // TODO: Re-enable after Docker setup in next phase for consistent CI/local rendering
  test.skip("projects page renders correctly", async ({ page }) => {
    await go(page, "/projects");

    // Check header and footer are visible
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

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

    // Check that the Featured category button (star emoji) exists
    const featuredButton = page.getByRole("button", { name: /⭐/ });
    await expect(featuredButton).toBeVisible();

    // Check that project cards are visible
    const projectCards = page.locator("[class*='projectCard']");
    await expect(projectCards.first()).toBeVisible();
  });

  test("project cards have icons and links", async ({ page }) => {
    await go(page, "/projects");

    // Check that links exist (GitHub, live demos, etc.)
    const links = page
      .getByRole("link")
      .filter({ has: page.locator("img, svg") });
    await expect(links.first()).toBeVisible();
  });
});
