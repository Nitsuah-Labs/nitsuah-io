import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { gotoAndWaitForHydration } from "../utils/wait-for-hydration";
// Note: we used to skip heavy axe scans in test-helpers/dev mode because
// dev overlays could interfere. Those skips were removed so tests run
// deterministically against the production server started by Playwright.

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

    // Use new hydration-aware navigation
    await gotoAndWaitForHydration(page, pageInfo.path, { timeout: 30000 });

    // For pages with Spline, wait a bit longer for it to initialize
    if (pageInfo.path === "/" || pageInfo.path === "/about") {
      await page.waitForTimeout(3000);
    }

    // For projects page, wait for content to load
    if (pageInfo.path === "/projects") {
      await page.waitForSelector("[data-testid='projects-section']", {
        timeout: 10000,
      });
      // Additional wait to ensure cards are rendered
      await page.waitForTimeout(1000);
    }

    // Run axe accessibility scan with error handling
    let accessibilityScanResults;
    try {
      accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
    } catch (e) {
      // If axe fails to inject/run, treat it as a test failure with context
      throw new Error(
        `Axe accessibility scan failed for ${pageInfo.name}: ${e}`
      );
    }

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
    // Increase timeout for possible lazy-loaded images
    test.setTimeout(60000);

    await page.goto("/");

    // Wait for network idle so images begin loading
    await page.waitForLoadState("networkidle");

    // Get all images
    const images = page.locator("img");
    const count = await images.count();

    // Ensure at least one image is present and visible before proceeding
    if (count === 0) {
      // No images on page — fail early with helpful message
      throw new Error(
        "No <img> elements found on the page — nothing to validate for alt attributes"
      );
    }

    // Wait for first image to be visible (helps with lazy-loaded images)
    try {
      await images.first().waitFor({ state: "visible", timeout: 10000 });
    } catch (err) {
      // If not visible quickly, attempt a gentle scroll to trigger lazy-loading
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
    }

    // Extra scroll pass to encourage loading of offscreen images
    await page.evaluate(() => {
      window.scrollTo({ top: 0 });
      window.scrollTo({ top: document.body.scrollHeight });
    });
    await page.waitForTimeout(500);

    // Recompute image count after possible lazy-load
    const finalImages = page.locator("img");
    const finalCount = await finalImages.count();

    // Ensure at least one of the final images is attached/visible before looping
    if (finalCount > 0) {
      try {
        await finalImages
          .first()
          .waitFor({ state: "attached", timeout: 10000 });
      } catch (err) {
        // best-effort: continue but log that first image didn't attach in time
        console.warn("finalImages.first() did not attach in time", err);
      }
    }

    for (let i = 0; i < finalCount; i++) {
      const img = finalImages.nth(i);
      try {
        // Ensure the node is attached before attempting to read attributes
        await img.waitFor({ state: "attached", timeout: 3000 });
        const alt = await img.getAttribute("alt");
        // Alt attribute should exist (can be empty for decorative images)
        expect(alt).not.toBeNull();
      } catch (error) {
        // Add index and a short outerHTML snippet to error for easier debugging
        let outer = "";
        try {
          outer = await img.evaluate((n) => n.outerHTML.slice(0, 500));
        } catch (e) {
          outer = "<could not read outerHTML>";
        }
        console.error(
          `Image at index ${i} caused error while reading 'alt'. outerHTML snippet: ${outer}`,
          error
        );
        throw new Error(
          `Image at index ${i} failed alt check: ${String(error)}`
        );
      }
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
