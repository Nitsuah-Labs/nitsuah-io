import { expect, test } from "@playwright/test";
import { go } from "../../_utils/playwright-helpers";

test.skip(
  !!process.env.CI && process.env.FORCE_BROWSER_E2E !== "1",
  "Navigation browser checks run locally only; CI smoke covers route availability"
);

test.describe("Navigation Tests", () => {
  test("all main navigation links work", async ({ page }) => {
    await go(page, "/");

    const nav = page.locator("nav");

    // Test homepage link
    const homeLink = nav.getByRole("link", { name: /home|nitsuah/i }).first();
    if (await homeLink.isVisible()) {
      await homeLink.click();
      await expect(page).toHaveURL(/\/(\?.*)?$/); // Match path with optional query
    }

    // Test about link
    await go(page, "/");
    const aboutLink = nav.getByRole("link", { name: /about/i }).first();
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await expect(page).toHaveURL(/\/about/);
    }

    // Test projects link — rendered as a button in the desktop nav.
    // First click opens the dropdown; second click navigates to /projects.
    await go(page, "/");
    const projectsLink = nav.getByRole("button", { name: /projects/i }).first();
    if (await projectsLink.isVisible()) {
      await projectsLink.click();
      await projectsLink.click();
      await expect(page).toHaveURL(/\/projects/);
    }
  });
});
