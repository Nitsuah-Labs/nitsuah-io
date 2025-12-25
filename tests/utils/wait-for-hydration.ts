/**
 * Test helper utility to wait for React hydration to complete
 * Use this in tests before interacting with page elements
 */
import { Page } from "@playwright/test";

export async function waitForReactHydration(page: Page, timeout = 30000) {
  // Wait for Next.js root element
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

  // Increased delay to ensure all client-side JS has executed
  // This is particularly important in CI where render times are slower
  await page.waitForTimeout(1000); // Increased from 500ms
}

/**
 * Navigate to a page and wait for it to be fully hydrated and ready
 */
export async function gotoAndWaitForHydration(
  page: Page,
  url: string,
  options?: { timeout?: number }
) {
  const timeout = options?.timeout || 45000; // Increased from 30s to 45s for CI

  // Use domcontentloaded instead of networkidle in CI to avoid hanging
  const waitUntil = process.env.CI ? "domcontentloaded" : "networkidle";
  await page.goto(url, { waitUntil, timeout });
  
  // In CI, don't wait for networkidle if we already used domcontentloaded
  if (!process.env.CI) {
    await page.waitForLoadState("networkidle", { timeout }).catch(() => {
      // Ignore networkidle timeout, proceed anyway
      console.log("networkidle timeout - continuing anyway");
    });
  }
  
  await waitForReactHydration(page, timeout);
  
  // Additional CI-specific wait
  if (process.env.CI) {
    await page.waitForTimeout(2000); // Extra 2s in CI for stability
  }
}
