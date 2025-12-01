/**
 * Test helper utility to wait for React hydration to complete
 * Use this in tests before interacting with page elements
 */
import { Page } from "@playwright/test";

export async function waitForReactHydration(page: Page, timeout = 15000) {
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

  // Additional small delay to ensure all client-side JS has executed
  await page.waitForTimeout(500);
}

/**
 * Navigate to a page and wait for it to be fully hydrated and ready
 */
export async function gotoAndWaitForHydration(
  page: Page,
  url: string,
  options?: { timeout?: number }
) {
  const timeout = options?.timeout || 30000;

  await page.goto(url, { waitUntil: "commit" });
  await page.waitForLoadState("networkidle", { timeout });
  await waitForReactHydration(page, timeout);
}
