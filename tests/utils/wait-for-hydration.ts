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
  const timeout = options?.timeout || 45000;

  // Simplified CI approach - use load state which is faster than networkidle
  if (process.env.CI) {
    // Log console and page errors for better CI debugging
    page.on("pageerror", (err) => {
      console.error(`[CI Page Error] ${url}: ${err.message}`);
      if (err.stack) console.error(err.stack);
    });
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        console.error(`[CI Console Error] ${url}: ${msg.text()}`);
      }
    });

    console.log(`[CI] Navigating to ${url}...`);
    await page.goto(url, {
      waitUntil: "load", // Changed from networkidle
      timeout: 30000    // Reduced from 60000
    }).catch(e => {
      console.error(`[CI] page.goto failed for ${url}: ${e}`);
      throw e;
    });

    // Wait specifically for documentElement to exist
    await page.waitForFunction(
      () => {
        const hasDoc = document.documentElement !== null;
        const hasBody = document.body !== null;
        return hasDoc && hasBody;
      },
      { timeout: 15000 }
    ).catch(async (e) => {
      console.error(`[CI] document.documentElement wait timed out for ${url}`);
      const html = await page.content().catch(() => "N/A");
      console.error(`[CI] Page content snippet: ${html.substring(0, 1000)}`);
      throw e;
    });

    // Minimal wait for React to start mounting content
    await page.waitForFunction(
      () => {
        const rootElements = document.querySelectorAll('#__next, main, [data-testid]');
        return rootElements.length > 0 || document.body.childElementCount > 3;
      },
      { timeout: 15000 }
    ).catch(() => console.log(`[CI] Body children check timed out for ${url} - continuing`));

    console.log(`[CI] Finished navigation/hydration for ${url}`);
    return;
  }

  // Full hydration for local testing
  await page.goto(url, { waitUntil: "networkidle", timeout });
  await page.waitForLoadState("networkidle", { timeout }).catch(() => {
    console.log("networkidle timeout - continuing anyway");
  });
  await waitForReactHydration(page, timeout);
}
