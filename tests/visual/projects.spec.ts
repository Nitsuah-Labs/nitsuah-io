import { expect, test } from "@playwright/test";
import { go } from "../_utils/playwright-helpers";

test.describe("Projects Page Visual Tests", () => {
  test("projects page renders correctly", async ({ page }) => {
    await go(page, "/projects");

    await page.waitForLoadState("networkidle");

    // Check header and footer
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    // Wait for Spline or other canvas to stabilize if present
    const spline = page.locator('[data-testid="spline-container"], canvas');
    await spline
      .first()
      .waitFor({ state: 'visible', timeout: 15000 })
      .catch(() => {});

    // Take screenshot with increased timeout after a brief settle
    await expect(page).toHaveScreenshot("projects-desktop.png", {
      fullPage: true,
      animations: "disabled",
      timeout: 20000,
    });
  });

  test("projects page shows featured repositories", async ({ page }) => {
    await go(page, "/projects");

    // Look for project cards or grid
    const projectSection = page
      .locator("section")
      .filter({ hasText: /featured|repositories/i });
    await expect(projectSection.first()).toBeVisible();
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
