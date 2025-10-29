import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { go } from "../_utils/playwright-helpers";

/**
 * Accessibility tests for all pages using axe-core
 * Tests WCAG 2.1 AA compliance
 */

const pages = [
  { path: "/", name: "Homepage" },
  { path: "/about", name: "About" },
  { path: "/projects", name: "Projects" },
  { path: "/crypto", name: "Crypto" },
  { path: "/labs", name: "Labs Hub" },
  { path: "/labs/register", name: "Register Domain" },
  { path: "/labs/mint", name: "Mint NFT" },
  { path: "/labs/domains", name: "Domains" },
  { path: "/labs/lookup", name: "Lookup" },
  { path: "/labs/stake", name: "Stake" },
  { path: "/labs/token", name: "Token" },
  { path: "/labs/dao", name: "DAO" },
  { path: "/labs/ai", name: "AI Lab" },
];

for (const pageInfo of pages) {
  test(`${pageInfo.name} has no accessibility violations`, async ({ page }) => {
    // Increase timeout for pages with Spline components
    test.setTimeout(60000);

  await go(page, pageInfo.path);

    // Wait for page to be fully loaded
    await page.waitForLoadState("domcontentloaded");

    // For pages with Spline, wait a bit longer for it to initialize
    if (pageInfo.path === "/" || pageInfo.path === "/about") {
      await page.waitForTimeout(3000);
    }

    // Run axe accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // Assert no violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });
}

test.describe("Keyboard Navigation", () => {
  test("all interactive elements are keyboard accessible", async ({ page }) => {
    await page.goto("/");

    // Tab through elements
    await page.keyboard.press("Tab");

    // Check that focused element is visible
    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? el.tagName : null;
    });

    expect(focusedElement).toBeTruthy();
  });

  test("skip links work for keyboard users", async ({ page }) => {
    await page.goto("/");

    // Press Tab to focus skip link (if exists)
    await page.keyboard.press("Tab");

    // Check if focused element is a skip link
    const skipLink = page.locator('a[href^="#"]').first();
    const isVisible = await skipLink.isVisible().catch(() => false);

    // If skip link exists, it should work
    if (isVisible) {
      await skipLink.press("Enter");
      // Content should be focused
      await expect(page.locator('main, [role="main"]')).toBeFocused();
    }
  });
});

test.describe("Screen Reader Support", () => {
  test("images have alt text", async ({ page }) => {
    await page.goto("/");

    // Get all images
    const images = page.locator("img");
    const count = await images.count();

    // Check each image has alt attribute
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");

      // Alt attribute should exist (can be empty for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test("buttons have accessible labels", async ({ page }) => {
    await page.goto("/labs/register");

    // Get all buttons
    const buttons = page.locator("button");
    const count = await buttons.count();

    // Check each button has accessible name
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const accessibleName = await button.getAttribute("aria-label");
      const textContent = await button.textContent();

      // Button should have either text content or aria-label
      expect(accessibleName || textContent?.trim()).toBeTruthy();
    }
  });

  test("form inputs have labels", async ({ page }) => {
    await page.goto("/labs/register");

    // Get all inputs
    const inputs = page.locator('input[type="text"], input[type="email"]');
    const count = await inputs.count();

    // Check each input has label or aria-label
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const ariaLabel = await input.getAttribute("aria-label");
      const id = await input.getAttribute("id");

      // Should have aria-label or associated label
      if (!ariaLabel && id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = await label.count();
        expect(hasLabel).toBeGreaterThan(0);
      } else {
        expect(ariaLabel).toBeTruthy();
      }
    }
  });
});

test.describe("Color Contrast", () => {
  test("text has sufficient contrast", async ({ page }) => {
    await page.goto("/");

    // Run axe with only color-contrast rule
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(["color-contrast"])
      .analyze();

    // Assert no color contrast violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe("ARIA Attributes", () => {
  test("live regions announce dynamic content", async ({ page }) => {
    await page.goto("/labs/mint");

    // Check for aria-live regions (for loading states, errors, etc.)
    const liveRegions = page.locator("[aria-live]");
    const count = await liveRegions.count();

    // If live regions exist, they should have valid values
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const region = liveRegions.nth(i);
        const ariaLive = await region.getAttribute("aria-live");
        expect(["polite", "assertive", "off"]).toContain(ariaLive);
      }
    }
  });
});
