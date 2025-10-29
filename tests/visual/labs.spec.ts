import { expect, test } from "@playwright/test";
import { go } from "../_utils/playwright-helpers";

test.describe("Labs Pages Visual Tests", () => {
  const labsPages = [
    { path: "/labs", name: "Labs Hub" },
    { path: "/labs/register", name: "Register Domain" },
    { path: "/labs/mint", name: "Mint NFT" },
    { path: "/labs/domains", name: "Domains" },
  ];

  for (const page of labsPages) {
    test(`${page.name} page renders correctly`, async ({
      page: browserPage,
    }) => {
      await go(browserPage, page.path);

      // Check header and footer
      await expect(browserPage.locator("header")).toBeVisible();
      await expect(browserPage.locator("footer")).toBeVisible();

      // Wait for Spline canvas or other stable content if present
      const spline = browserPage.locator(
        '[data-testid="spline-container"], canvas'
      );
      await spline
        .first()
        .waitFor({ timeout: 15000 })
        .catch(() => {});

      // Take screenshot (increase timeout for stability)
      const screenshotName = `${page.path.replace(/\//g, "-").slice(1) || "labs"}-desktop.png`;
      await expect(browserPage).toHaveScreenshot(screenshotName, {
        fullPage: true,
        animations: "disabled",
        timeout: 20000,
      });
    });
  }

  test("labs pages use consistent design system", async ({ page }) => {
    await go(page, "/labs/register");

    // Check for .labs-btn class buttons
    const labsButtons = page.locator(".labs-btn");
    if ((await labsButtons.count()) > 0) {
      await expect(labsButtons.first()).toBeVisible();
    }

    // Check for card layouts
    const cards = page.locator(".labs-card");
    if ((await cards.count()) > 0) {
      await expect(cards.first()).toBeVisible();
    }
  });
});
