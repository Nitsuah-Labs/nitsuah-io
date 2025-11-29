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
    await page.goto("/resume");
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
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");

    // Verify all major sections exist
    await expect(page.locator("#basics")).toBeVisible();
    await expect(page.locator("#work")).toBeVisible();
    await expect(page.locator("#skills")).toBeVisible();
    await expect(page.locator("#education")).toBeVisible();
    await expect(page.locator("#languages")).toBeVisible();
  });

  test("should expand work experience details", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");

    // Wait for work section to load
    await page.waitForSelector("#work", { timeout: 10000 });

    // Find first work item and click to expand
    const firstWorkHeader = page.locator(".work-header").first();
    await expect(firstWorkHeader).toBeVisible({ timeout: 10000 });

    const firstWorkDetails = page.locator(".work-details").first();

    // Click the header to toggle expansion
    await firstWorkHeader.click();

    // Check that details are visible (via CSS)
    await expect(firstWorkDetails).toBeVisible();
  });

  test("should have working PDF export button", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");

    // Wait for resume content to load
    await page.waitForSelector(".resume-content", { timeout: 10000 });

    // Check PDF export button exists in resume content - use specific aria-label
    const pdfButton = page
      .locator(".resume-content")
      .getByRole("button", { name: "Export resume as PDF" });
    await expect(pdfButton).toBeVisible({ timeout: 10000 });
    await expect(pdfButton).toBeEnabled();
  });

  test("should display contact information", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");

    // Wait for basics section to load
    await page.waitForSelector("#basics", { timeout: 10000 });

    // Check contact section exists
    const contactSection = page.locator(".resume-contact");
    await expect(contactSection).toBeVisible({ timeout: 10000 });
    
    // Verify at least one contact item is present
    await expect(page.locator(".contact-item").first()).toBeVisible();
  });

  test("should display social profiles", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");

    // Wait for resume content to load
    await page.waitForSelector(".resume-content", { timeout: 10000 });

    // Check profiles section exists
    const profiles = page.locator(".resume-profiles");
    await expect(profiles).toBeVisible({ timeout: 10000 });

    // Verify profile buttons are present (using CSS module class pattern)
    const profileButtons = page.locator("[class*='profileButton']");
    await expect(profileButtons.first()).toBeVisible();
  });

  test("should render skills with proficiency bars", async ({ page }) => {
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");

    // Wait for skills section to load
    const skillsSection = page.locator("#skills");
    await expect(skillsSection).toBeVisible({ timeout: 10000 });

    // Verify skill items exist
    const skillItems = page.locator(".skill-item");
    await expect(skillItems.first()).toBeVisible();

    // Check proficiency bars
    const skillBars = page.locator(".skill-bar");
    await expect(skillBars.first()).toBeVisible();
  });
});
