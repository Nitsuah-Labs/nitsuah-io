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
    );
    return;
  }

  // Hydration check that works for both App Router and Pages Router
  // Wait for body to be present first
  await page.waitForSelector("body", { state: "attached", timeout });

  // Wait for React to hydrate - check that body has actual content
  // We look for either #__next (Pages) or a main element (App) with content
  await page.waitForFunction(
    () => {
      const main = document.querySelector("main");
      const nextRoot = document.querySelector("#__next");
      const body = document.body;

      // Check that we have a significant number of children or content
      const hasContent =
        (main && main.childElementCount > 0) ||
        (nextRoot && nextRoot.childElementCount > 0) ||
        (body && body.childElementCount > 2);

      // Also check that documentElement is not null
      const hasDocument = document.documentElement !== null;

      return !!(hasContent && hasDocument);
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
  const timeout = options?.timeout || 30000;

  // Simplified CI approach - use load state which is faster than networkidle
  if (process.env.CI) {
    // Set up event listeners with proper cleanup
    const pageErrorHandler = (err: Error) => {
      console.error(`[CI Page Error] ${url}: ${err.message}`);
      if (err.stack) console.error(err.stack);
    };
    const consoleErrorHandler = (msg: any) => {
      if (msg.type() === "error") {
        console.error(`[CI Console Error] ${url}: ${msg.text()}`);
      }
    };

    page.once("pageerror", pageErrorHandler);
    page.once("console", consoleErrorHandler);

    console.log(`[CI] Navigating to ${url}...`);
    try {
      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 30000
      });

      // Wait specifically for documentElement to exist
      await page.waitForFunction(
        () => {
          const hasDoc = document.documentElement !== null;
          const hasBody = document.body !== null;
          return hasDoc && hasBody;
        },
        { timeout: 10000 }
      );

      // Wait for React to start mounting content
      await page.waitForFunction(
        () => {
          const rootElements = document.querySelectorAll('#__next, main, [data-testid]');
          return rootElements.length > 0 || document.body.childElementCount > 3;
        },
        { timeout: 10000 }
      );

      console.log(`[CI] Finished navigation/hydration for ${url}`);
    } catch (e) {
      console.error(`[CI] Navigation/hydration failed for ${url}:`, e);
      const html = await page.content().catch(() => "N/A");
      console.error(`[CI] Page content snippet: ${html.substring(0, 500)}`);
      throw e;
    } finally {
      // Clean up event listeners
      page.off("pageerror", pageErrorHandler);
      page.off("console", consoleErrorHandler);
    }
    return;
  }

  // Full hydration for local testing
  await page.goto(url, { waitUntil: "networkidle", timeout });
  await page.waitForLoadState("networkidle", { timeout });
  await waitForReactHydration(page, timeout);
}
