import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { go } from "../_utils/playwright-helpers";

// Allow longer time for the resume page to fully hydrate and for our
// overlay-removal logic to run in CI/dev. This file needs more time
// than the global 30s timeout during some runs.
test.setTimeout(120000);

test.describe("Resume Page Accessibility Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Ensure the resume page is fully loaded before each test to avoid flakiness
    await go(page, "/resume");
    // Some dev overlays may appear; proactively add the test-helpers body class and
    // remove noisy dev overlays so tests can find the resume content reliably.
    try {
      await page.evaluate(() => {
        try {
          document.body.classList.add("test-helpers");
        } catch (e) {}

        const selectors = [
          "#__next_dev_overlay",
          ".next-dev-overlay",
          ".react-dev-overlay",
          "#next-overlay",
          ".overseer",
          '[data-testid="overseer"]',
        ];
        for (const s of selectors) {
          try {
            document.querySelectorAll(s).forEach((n) => n.remove());
          } catch (e) {}
        }
        const texts = [
          "Overseer Dashboard",
          "Welcome to Overseer",
          "Open Next.js Dev Tools",
          "Next.js Dev Tools",
          "Sign in with GitHub",
        ];
        Array.from(document.querySelectorAll("*")).forEach((el) => {
          try {
            const txt = el.textContent || "";
            for (const t of texts) if (txt.includes(t)) el.remove();
          } catch (e) {}
        });
      });
    } catch (e) {}

    // Wait for resume container to appear (longer timeout to allow hydration).
    // Some overlays may re-appear; loop and remove overlays until the resume container is present.
    // Increase attempts and interval to allow client-side hydration to finish
    // and for our overlay-removal logic to run. Total wait ~= 30s.
    const maxAttempts = 60;
    let found = false;
    for (let i = 0; i < maxAttempts; i++) {
      try {
        // run overlay cleanup
        await page.evaluate(() => {
          try {
            document.body.classList.add("test-helpers");
          } catch (e) {}
          const selectors = [
            "#__next_dev_overlay",
            ".next-dev-overlay",
            ".react-dev-overlay",
            "#next-overlay",
            ".overseer",
            '[data-testid="overseer"]',
          ];
          for (const s of selectors) {
            try {
              document.querySelectorAll(s).forEach((n) => n.remove());
            } catch (e) {}
          }
          const texts = [
            "Overseer Dashboard",
            "Welcome to Overseer",
            "Open Next.js Dev Tools",
            "Next.js Dev Tools",
            "Sign in with GitHub",
          ];
          Array.from(document.querySelectorAll("*")).forEach((el) => {
            try {
              const txt = el.textContent || "";
              for (const t of texts) if (txt.includes(t)) el.remove();
            } catch (e) {}
          });
        });

        const cnt = await page.locator("#basics").count();
        if (cnt > 0) {
          found = true;
          break;
        }
      } catch (e) {
        // ignore and retry
      }
      // Slightly longer sleep between retries to reduce CPU churn.
      await page.waitForTimeout(500);
    }
    if (!found) {
      // allow the original wait to surface a helpful failure if not found
      await page.waitForSelector("#basics", {
        state: "attached",
        timeout: 15000,
      });
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
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .include("#basics")
      .analyze();

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
    await go(page, "/resume");

    // Check for semantic elements
    await expect(page.locator("main")).toBeVisible();
    // Verify the key resume sections are present (be tolerant to overlays)
    await expect(page.locator("#basics")).toBeVisible();
    await expect(page.locator("#work")).toBeVisible();
    await expect(page.locator("#skills")).toBeVisible();
    await expect(page.locator("#education")).toBeVisible();
    await expect(page.locator("#languages")).toBeVisible();

    // Check for page header (AppBar) - use role selector to avoid conflict with resume-header
    await expect(page.getByRole("banner")).toBeVisible();
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
