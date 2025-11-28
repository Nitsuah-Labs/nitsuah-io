import { expect, test } from "@playwright/test";
import { go } from "../../_utils/playwright-helpers";

test.describe("Navigation Tests", () => {
  test("all main navigation links work", async ({ page }) => {
    await go(page, "/");

    // Test homepage link
    const homeLink = page.getByRole("link", { name: /home|nitsuah/i }).first();
    if (await homeLink.isVisible()) {
      await homeLink.click();
      await expect(page).toHaveURL(/\/(\?.*)?$/); // Match path with optional query
    }

    // Test about link
    await go(page, "/");
    const aboutLink = page.getByRole("link", { name: /about/i }).first();
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await expect(page).toHaveURL(/\/about/);
    }

    // Test projects link
    await go(page, "/");
    const projectsLink = page.getByRole("link", { name: /projects/i }).first();
    if (await projectsLink.isVisible()) {
      await projectsLink.click();
      await expect(page).toHaveURL(/\/projects/);
    }

    // Test labs link
    await go(page, "/");
    const labsLink = page.getByRole("link", { name: /labs/i }).first();
    if (await labsLink.isVisible()) {
      await labsLink.click();
      await expect(page).toHaveURL(/\/labs/);
    }
  });

  test("labs hub navigation works", async ({ page }) => {
    await go(page, "/labs");

    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(5000); // Give React time to render

    // Check that main content is visible
    await expect(page.locator("main")).toBeVisible({ timeout: 15000 });
    
    // Check for any links on the page (labs hub should have lab links)
    const allLinks = page.getByRole("link");
    const linkCount = await allLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test("footer links are present", async ({ page }) => {
    await go(page, "/");

    await page.waitForTimeout(3000); // Let page render

    const footer = page.locator("footer");
    await expect(footer).toBeVisible({ timeout: 15000 });

    // Footer should have some links
    const footerLinks = footer.getByRole("link");
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("404 page exists", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");

    // Should return 404 status
    expect(response?.status()).toBe(404);

    // Page should still render (Next.js 404 page)
    await expect(page.locator("body")).toBeVisible();
  });
});
