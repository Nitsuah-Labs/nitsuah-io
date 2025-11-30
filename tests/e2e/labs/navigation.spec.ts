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
  });
});
