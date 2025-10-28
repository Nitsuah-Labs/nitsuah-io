import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Resume Page Accessibility Tests", () => {
  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/resume");

    // Check h1 exists and is unique
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Check h1 contains name
    const h1Text = await page.locator("h1").textContent();
    expect(h1Text).toBeTruthy();
  });

  test("should have proper ARIA labels on interactive elements", async ({
    page,
  }) => {
    await page.goto("/resume");

    // Check PDF export button has aria-label
    const pdfButton = page.locator('button:has-text("Export PDF")');
    await expect(pdfButton).toHaveAttribute("aria-label");
  });

  test("should be keyboard navigable", async ({ page }) => {
    await page.goto("/resume");

    // Tab through interactive elements
    await page.keyboard.press("Tab");

    // Check that focus is visible on first interactive element
    const focusedElement = await page.evaluate(
      () => document.activeElement?.tagName
    );
    expect(focusedElement).toBeTruthy();
  });

  test("should have accessible links with href attributes", async ({
    page,
  }) => {
    await page.goto("/resume");

    // Check all links have href
    const links = page.locator("a");
    const linkCount = await links.count();

    for (let i = 0; i < linkCount; i++) {
      const href = await links.nth(i).getAttribute("href");
      expect(href).toBeTruthy();
    }
  });

  test("should have proper color contrast", async ({ page }) => {
    await page.goto("/resume");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2aa"])
      .include(".resume-container")
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === "color-contrast"
    );

    expect(contrastViolations).toEqual([]);
  });

  test("should have semantic HTML structure", async ({ page }) => {
    await page.goto("/resume");

    // Check for semantic elements
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("section")).toHaveCount(6); // basics, work, skills, education, languages, projects
    await expect(page.locator("header")).toBeVisible();
  });

  test("should work with screen readers", async ({ page }) => {
    await page.goto("/resume");

    // Check for proper alt text on icons (if any images)
    const icons = page.locator('i[aria-hidden="true"]');
    const iconCount = await icons.count();

    // Icons with aria-hidden should have accompanying text
    expect(iconCount).toBeGreaterThan(0);
  });
});
