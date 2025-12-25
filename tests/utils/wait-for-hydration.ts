/**
 * Test helper utility to wait for React hydration to complete
 * Use this in tests before interacting with page elements
 */
import { Page } from "@playwright/test";

export async function waitForReactHydration(page: Page, timeout = 30000) {
  // Simplified hydration check for CI to avoid timeouts
  if (process.env.CI) {
    // In CI, just wait for the Next.js root and a short delay
    await page.waitForSelector("#__next, [id^='__next']", {
      state: "attached",
      timeout: 10000, // Shorter timeout in CI
    }).catch(() => {
      console.log("Next.js root not found - continuing anyway");
    });
    await page.waitForTimeout(2000); // Just wait 2 seconds in CI
    return;
  }

  // Full hydration check for local testing
  await page.waitForSelector("#__next, [id^='__next']", {
    state: "attached",
    timeout,
  });

  // Wait for React to hydrate - check that body has actual content
  await page.waitForFunction(
    () => {
      const main = document.querySelector("main");
      const body = document.body;

      // Check that we have either main or body with children
      const hasContent =
        (main && main.childElementCount > 0) ||
        (body && body.childElementCount > 1); // >1 to account for Next.js script tags (not actual content)

      // Also check that documentElement is not null (prevents the null reading error)
      const hasDocument = document.documentElement !== null;

      return hasContent && hasDocument;
    },
    { timeout }
  );

  await page.waitForTimeout(1000);
}

/**
 * Navigate to a page and wait for it to be fully hydrated and ready
 */
export async function gotoAndWaitForHydration(
  page: Page,
  url: string,
  options?: { timeout?: number }
) {
  const timeout = options?.timeout || 45000;

  // Simple approach in CI - just use domcontentloaded and move on
  if (process.env.CI) {
    await page.goto(url, { 
      waitUntil: "domcontentloaded", 
      timeout: 30000 // Shorter timeout in CI
    });
    await waitForReactHydration(page, 10000); // Much shorter timeout
    return;
  }

  // Full hydration for local testing
  await page.goto(url, { waitUntil: "networkidle", timeout });
  await page.waitForLoadState("networkidle", { timeout }).catch(() => {
    console.log("networkidle timeout - continuing anyway");
  });
  await waitForReactHydration(page, timeout);
  
  // Additional CI-specific wait
  if (process.env.CI) {
    await page.waitForTimeout(2000); // Extra 2s in CI for stability
  }
}
