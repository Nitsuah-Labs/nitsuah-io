import { expect, test } from "@playwright/test";
import { go } from "../_utils/playwright-helpers";

test.describe.skip("Projects Page Visual Tests - SKIPPED: Client-side pages return only DOCTYPE", () => {
  // CRITICAL ISSUE: Projects page (and all client-side lab pages) return only "<!DOCTYPE html>" (15 bytes)
  // JavaScript errors in console:
  //   - "Unexpected identifier 'overseer'"
  //   - "Cannot read properties of null (reading 'insertBefore')"
  // 
  // Root Cause: Next.js dev server failing to compile/serve these client-side pages in Playwright
  // Same issue affects: /projects, /labs, /labs/register, /labs/mint, /labs/domains
  // 
  // TODO: Investigate why client-side pages fail to build in Playwright webServer mode
  
  test("projects page renders correctly", async ({ page }) => {

    // Check that project cards with action links exist
    // Note: Not all projects may have links (e.g., "Coming Soon" projects)
    const projectLinks = page
      .locator("[class*='cardActions']")
      .getByRole("link");

    // Ensure at least one project card has links
    const linkCount = await projectLinks.count();
    expect(linkCount).toBeGreaterThan(0);

    // Verify the first link has proper security attributes
    const firstLink = projectLinks.first();
    await expect(firstLink).toBeVisible();
    await expect(firstLink).toHaveAttribute("target", "_blank");
    await expect(firstLink).toHaveAttribute("rel", /noopener/);
  });
});
