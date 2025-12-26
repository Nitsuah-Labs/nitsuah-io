/**
 * Test helper utility to wait for React hydration to complete
 * Use this in tests before interacting with page elements
 */
import { Page } from "@playwright/test";

export async function waitForReactHydration(page: Page, timeout = 30000) {
  // Simplified but more robust hydration check for CI
  if (process.env.CI) {
    // In CI, just wait for body to have minimal content
    await page.waitForFunction(
      () => {
        const body = document.body;
        const hasContent = body && body.textContent && body.textContent.length > 50;
        return hasContent;
      },
      { timeout: 10000 }
    ).catch(() => {
      console.log("Body content check timed out - continuing anyway");
    });
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

  // Simplified CI approach - use networkidle which works better in Docker
  if (process.env.CI) {
    await page.goto(url, { 
      waitUntil: "networkidle",
      timeout: 60000
    });
    // Wait specifically for documentElement to exist (critical for axe scanner)
    await page.waitForFunction(
      () => document.documentElement !== null && document.body !== null,
      { timeout: 30000 }
    );
    // Extra brief wait for React hydration
    await page.waitForTimeout(3000); 
    return;
  }

  // Full hydration for local testing
  await page.goto(url, { waitUntil: "networkidle", timeout });
  await page.waitForLoadState("networkidle", { timeout }).catch(() => {
    console.log("networkidle timeout - continuing anyway");
  });
  await waitForReactHydration(page, timeout);
}
