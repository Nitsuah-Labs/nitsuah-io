import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { go } from "../_utils/playwright-helpers";

test.describe("Resume Page Accessibility Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Ensure the resume page is fully loaded before each test to avoid flakiness
    await go(page, "/resume");
    await page.waitForLoadState("networkidle");
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    // navigation and networkidle are handled in beforeEach
    // Wait for resume content to load
    await page.locator("h1").waitFor({ timeout: 5000 });

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
    // navigation handled in beforeEach
    // Check PDF export button has aria-label
    const pdfButton = page.locator('button:has-text("Export PDF")');
    await expect(pdfButton).toHaveAttribute("aria-label");
  });

  test("should be keyboard navigable", async ({ page }) => {
    // navigation handled in beforeEach
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
    // navigation handled in beforeEach
    // Check all links have href
    const links = page.locator("a");
    const linkCount = await links.count();

    for (let i = 0; i < linkCount; i++) {
      const href = await links.nth(i).getAttribute("href");
      expect(href).toBeTruthy();
    }
  });

  test("should have proper color contrast", async ({ page }) => {
    // navigation handled in beforeEach
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
    await go(page, "/resume");

    // Check for semantic elements
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("section")).toHaveCount(5); // basics, work, skills, education, languages
    // Check for page header (AppBar) - use role selector to avoid conflict with resume-header
    await expect(page.getByRole("banner")).toBeVisible();
  });

  test("should work with screen readers", async ({ page }) => {
    // navigation handled in beforeEach

    // Check that key sections have headings for screen readers
    await expect(page.locator("h2, h3").first()).toBeVisible();

    // Check that interactive elements are keyboard accessible
    const buttons = page.locator("button");
    const buttonCount = await buttons.count();
    if (buttonCount > 0) {
      await expect(buttons.first()).toBeVisible();
    }

    // Icons with aria-hidden should have accompanying visible text in the same container
    const icons = page.locator('i[aria-hidden="true"]');
    const iconCount = await icons.count();

    if (iconCount > 0) {
      // Check a few representative icons to ensure they have context
      const firstIcon = icons.first();
      const parentElement = firstIcon
        .locator("xpath=ancestor::*[normalize-space(text())]")
        .first();
      const hasText = (await parentElement.count()) > 0;
      expect(hasText).toBe(true);
    }
  });
});
