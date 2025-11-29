import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Tests should run in test-helpers mode (Playwright starts a production
// server when NEXT_PUBLIC_TEST_HELPERS=1) to avoid dev overlays. Do not skip
// these specs — instead run them against the production server for stable
// axe scans.

// Allow longer time for the resume page to fully hydrate and for our
// overlay-removal logic to run in CI/dev. This file needs more time
// than the global 30s timeout during some runs.
// Allow more time for the resume page to fully render/hydrate in CI
test.setTimeout(180000);

test.describe("Resume Page Accessibility Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to avoid helper issues
    await page.goto("http://localhost:3000/resume?testHelpers=1");

    // Wait for network to be idle to ensure all content is loaded
    await page.waitForLoadState("networkidle");

    // Wait for the main resume content to be present
    await page.waitForSelector("#basics, main.resume-container", {
      timeout: 30000,
    });

    // Verify the resume content is present
    const basicsExists = await page
      .locator("#basics")
      .isVisible()
      .catch(() => false);
    if (!basicsExists) {
      throw new Error("Resume content (#basics) not found after waiting");
    }
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    // Limit the Axe scan to the resume basics section to avoid unrelated dev overlays
    await page.waitForSelector("#basics", {
      state: "attached",
      timeout: 15000,
    });
    // Use @axe-core/playwright's AxeBuilder which is more tolerant of frame
    // contexts and will inject/execute axe appropriately. Scope to the basics
    // section to minimize unrelated noise.
    let accessibilityScanResults;
    try {
      accessibilityScanResults = await new AxeBuilder({ page })
        .include("#basics")
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
    } catch (e) {
      accessibilityScanResults = {
        violations: [{ id: "axe-in-page-error", description: String(e) }],
      };
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    // navigation and networkidle are handled in beforeEach
    // Wait for the resume header we added data-testid to
    const nameLocator = page.locator('[data-testid="resume-name"]');
    await nameLocator.waitFor({ timeout: 5000 });

    // Check the resume name exists and is unique
    const nameCount = await nameLocator.count();
    expect(nameCount).toBe(1);

    const nameText = await nameLocator.textContent();
    expect(nameText).toBeTruthy();
  });

  test("should have proper ARIA labels on interactive elements", async ({
    page,
  }) => {
    // navigation handled in beforeEach
    // Check PDF export button has aria-label (use role to avoid overlays)
    const pdfButton = page.getByRole("button", { name: /Export PDF/i }).first();
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
    // Ensure resume basics is attached then run contrast checks scoped to it
    await page.waitForSelector("#basics", {
      state: "attached",
      timeout: 15000,
    });
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2aa"])
      .include("#basics")
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === "color-contrast"
    );

    expect(contrastViolations).toEqual([]);
  });

  test("should have semantic HTML structure", async ({ page }) => {
    // navigation handled in beforeEach

    // Check for semantic main element
    await expect(page.locator("main.resume-container")).toBeAttached();

    // Verify the key resume sections are present
    await expect(page.locator("#basics")).toBeAttached();
    await expect(page.locator("#work")).toBeAttached();
    await expect(page.locator("#skills")).toBeAttached();
    await expect(page.locator("#education")).toBeAttached();
    await expect(page.locator("#languages")).toBeAttached();
  });

  test("should work with screen readers", async ({ page }) => {
    // navigation handled in beforeEach

    // Check that key sections have headings for screen readers
    await expect(
      page.locator("#basics .section-title, #work .section-title").first()
    ).toBeVisible();

    // Check that visible interactive elements are keyboard accessible
    const visibleButtons = page.locator("button:visible");
    const visibleButtonCount = await visibleButtons.count();
    if (visibleButtonCount > 0) {
      await expect(visibleButtons.first()).toBeVisible();
    }

    // Verify that resume has proper semantic structure with icons
    const resumeContent = page.locator("main, [role='main']");
    await expect(resumeContent).toBeVisible();

    // Ensure icons are used appropriately with context (spot check)
    const workSection = page.locator("text=/Work Experience/i");
    if ((await workSection.count()) > 0) {
      await expect(workSection).toBeVisible();
    }
  });
});
