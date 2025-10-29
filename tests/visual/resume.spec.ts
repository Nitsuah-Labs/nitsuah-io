import { expect, test } from "@playwright/test";

test.describe("Resume Page Visual Tests", () => {
  test("should render resume page correctly on desktop", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");

    // Wait for key resume selectors to appear
    await expect(page.locator(".resume-name")).toBeVisible();
    await expect(page.locator(".resume-label")).toBeVisible();
    await expect(page.locator("#work")).toBeVisible();
    await expect(page.locator("#skills")).toBeVisible();
    await expect(page.locator("#education")).toBeVisible();

    // Allow layout/fonts to stabilize
    await page.waitForTimeout(300);

    // Take full page screenshot with larger timeout
    await expect(page).toHaveScreenshot("resume-desktop.png", {
      fullPage: true,
      timeout: 20000,
    });
  });

  test("should render resume page correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");

    // Check responsive layout
    await expect(page.locator(".resume-name")).toBeVisible();

    // Allow layout to settle
    await page.waitForTimeout(300);

    // Take mobile screenshot
    await expect(page).toHaveScreenshot("resume-mobile.png", {
      fullPage: true,
      timeout: 20000,
    });
  });

  test("should display all resume sections", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");

    // Verify all major sections exist
    await expect(page.locator("#basics")).toBeVisible();
    await expect(page.locator("#work")).toBeVisible();
    await expect(page.locator("#skills")).toBeVisible();
    await expect(page.locator("#education")).toBeVisible();
    await expect(page.locator("#languages")).toBeVisible();
    await expect(page.locator("#projects")).toBeVisible();
  });

  test("should expand work experience details", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");

    // Find first work item and click to expand
    const firstWorkToggle = page.locator(".work-toggle").first();
    const firstWorkDetails = page.locator(".work-details").first();

    // Click the label associated with the checkbox
    await page.locator(".work-label").first().click();

    // Check that details are visible (via CSS)
    await expect(firstWorkDetails).toBeVisible();
  });

  test("should have working PDF export button", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");

    // Check PDF export button exists
    const pdfButton = page.locator('button:has-text("Export PDF")');
    await expect(pdfButton).toBeVisible();
    await expect(pdfButton).toBeEnabled();
  });

  test("should display contact information", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");

    // Check contact section
    await expect(page.locator(".resume-contact")).toBeVisible();
    await expect(page.locator(".contact-item").first()).toBeVisible();
  });

  test("should display social profiles", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");

    // Check profiles section
    const profiles = page.locator(".resume-profiles");
    await expect(profiles).toBeVisible();

    // Verify profile links are present
    const profileLinks = page.locator(".profile-link");
    await expect(profileLinks.first()).toBeVisible();
  });

  test("should render skills with proficiency bars", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");

    // Check skills section
    const skillsSection = page.locator("#skills");
    await expect(skillsSection).toBeVisible();

    // Verify skill items exist
    const skillItems = page.locator(".skill-item");
    await expect(skillItems.first()).toBeVisible();

    // Check proficiency bars
    const skillBars = page.locator(".skill-bar");
    await expect(skillBars.first()).toBeVisible();
  });
});
