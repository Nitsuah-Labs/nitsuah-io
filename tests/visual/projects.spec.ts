import { expect, test } from "@playwright/test";

test.describe("Projects Page Visual Tests", () => {
  test("projects page renders correctly", async ({ page }) => {
    await page.goto("/projects");

    await page.waitForLoadState("networkidle");

    // Check header and footer
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    // Take screenshot
    await expect(page).toHaveScreenshot("projects-desktop.png", {
      fullPage: true,
      animations: "disabled",
    });
  });

  test("projects page shows featured repositories", async ({ page }) => {
    await page.goto("/projects");

    // Look for project cards or grid
    const projectSection = page
      .locator("section")
      .filter({ hasText: /featured|repositories/i });
    await expect(projectSection.first()).toBeVisible();
  });

  test("project cards have icons and links", async ({ page }) => {
    await page.goto("/projects");

    // Check that links exist (GitHub, live demos, etc.)
    const links = page
      .getByRole("link")
      .filter({ has: page.locator("img, svg") });
    await expect(links.first()).toBeVisible();
  });
});
