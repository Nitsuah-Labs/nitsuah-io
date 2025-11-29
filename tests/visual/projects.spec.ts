import { expect, test } from "@playwright/test";

test.describe("Projects Page Visual Tests", () => {
  // TODO: Re-enable after Docker setup in next phase for consistent CI/local rendering
  test.skip("projects page renders correctly", async ({ page }) => {
    await page.goto("http://localhost:3000/projects?testHelpers=1");

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
    await page.goto("http://localhost:3000/projects?testHelpers=1");

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
    await page.goto("http://localhost:3000/projects?testHelpers=1");

    // Check that links exist (GitHub, live demos, etc.)
    const links = page
      .getByRole("link")
      .filter({ has: page.locator("img, svg") });
    await expect(links.first()).toBeVisible();
  });
});
