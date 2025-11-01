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

    // Check for links to lab pages - wait for navigation to be ready
    await page.waitForSelector('a[href*="/labs/"]', { timeout: 5000 });

    const registerLink = page
      .getByRole("link", { name: /register|domain/i })
      .first();
    const mintLink = page.getByRole("link", { name: /mint|nft/i }).first();

    // At least one lab link should be visible
    const hasRegister = await registerLink.isVisible().catch(() => false);
    const hasMint = await mintLink.isVisible().catch(() => false);

    expect(hasRegister || hasMint).toBeTruthy();
  });

  test("footer links are present", async ({ page }) => {
    await go(page, "/");

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

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
