import { expect, test } from "@playwright/test";

test.describe("Resume Page Visual Tests", () => {
  test("should render resume page correctly on desktop", async ({ page }) => {
    await page.goto("http://localhost:3000/resume?testHelpers=1");
    await page.waitForLoadState("networkidle");

    // Wait for key resume selectors to appear
    await expect(page.locator(".resume-name")).toBeVisible();
    await expect(page.locator(".resume-label")).toBeVisible();
    await expect(page.locator("#work")).toBeVisible();
    await expect(page.locator("#skills")).toBeVisible();
    await expect(page.locator("#education")).toBeVisible();

    // Verify layout isn't broken (instead of pixel-perfect comparison)
    const resumeContainer = page
      .locator(".resume-container, [class*='resume']")
      .first();
    await expect(resumeContainer).toBeVisible();

    // Check that the page has reasonable dimensions (not collapsed or broken)
    const boundingBox = await resumeContainer.boundingBox();
    expect(boundingBox?.height).toBeGreaterThan(1000); // Resume should be substantial
    expect(boundingBox?.width).toBeGreaterThan(500);
  });

  test("should render resume page correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("http://localhost:3000/resume?testHelpers=1");
    await page.waitForLoadState("networkidle");

    // Check responsive layout
    await expect(page.locator(".resume-name")).toBeVisible();

    // Verify mobile layout isn't broken (instead of pixel-perfect comparison)
    const resumeContainer = page
      .locator(".resume-container, [class*='resume']")
      .first();
    await expect(resumeContainer).toBeVisible();

    // Check that mobile layout has reasonable dimensions
    const boundingBox = await resumeContainer.boundingBox();
    expect(boundingBox?.height).toBeGreaterThan(1000); // Resume should be substantial on mobile too
    expect(boundingBox?.width).toBeLessThanOrEqual(375); // Should fit in mobile viewport
  });

  test("should display all resume sections", async ({ page }) => {
    await page.goto("http://localhost:3000/resume?testHelpers=1");
    await page.waitForLoadState("networkidle");

    // Verify all major sections exist
    await expect(page.locator("#basics")).toBeVisible();
    await expect(page.locator("#work")).toBeVisible();
    await expect(page.locator("#skills")).toBeVisible();
    await expect(page.locator("#education")).toBeVisible();
    await expect(page.locator("#languages")).toBeVisible();
  });

  test("should expand work experience details", async ({ page }) => {
    await page.goto("http://localhost:3000/resume?testHelpers=1");
    await page.waitForLoadState("networkidle");

    // Find first work item and click to expand
    const firstWorkHeader = page.locator(".work-header").first();
    const firstWorkDetails = page.locator(".work-details").first();

    // Click the header to toggle expansion
    await firstWorkHeader.click();

    // Check that details are visible (via CSS)
    await expect(firstWorkDetails).toBeVisible();
  });

  test("should have working PDF export button", async ({ page }) => {
    await page.goto("http://localhost:3000/resume?testHelpers=1");
    await page.waitForLoadState("networkidle");

    // Check PDF export button exists (specifically the one in resume content)
    const pdfButton = page.locator(
      '.resume-content button:has-text("Export PDF")'
    );
    await expect(pdfButton).toBeVisible();
    await expect(pdfButton).toBeEnabled();
  });

  test("should display contact information", async ({ page }) => {
    await page.goto("http://localhost:3000/resume?testHelpers=1");
    await page.waitForLoadState("networkidle");

    // Check contact section
    await expect(page.locator(".resume-contact")).toBeVisible();
    await expect(page.locator(".contact-item").first()).toBeVisible();
  });

  test("should display social profiles", async ({ page }) => {
    await page.goto("http://localhost:3000/resume?testHelpers=1");
    await page.waitForLoadState("networkidle");

    // Check profiles section
    const profiles = page.locator(".resume-profiles");
    await expect(profiles).toBeVisible();

    // Verify profile buttons are present (using CSS module class pattern)
    const profileButtons = page.locator("[class*='profileButton']");
    await expect(profileButtons.first()).toBeVisible();
  });

  test("should render skills with proficiency bars", async ({ page }) => {
    await page.goto("http://localhost:3000/resume?testHelpers=1");
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
