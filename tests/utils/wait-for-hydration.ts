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
      { timeout }
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
  // Use longer timeout for local (60s) to handle heavy pages like homepage with Spline
  // CI uses faster strategies so 30s is sufficient there
  const defaultTimeout = process.env.CI ? 30000 : 60000;
  const timeout = options?.timeout || defaultTimeout;

  // Simplified CI approach — wait for 'load' event (scripts executed, React
  // has had a chance to mount) then verify body has at least one child element.
  if (process.env.CI) {
    const pageErrorHandler = (err: Error) => {
      console.error(`[CI Page Error] ${url}: ${err.message}`);
    };

    page.on("pageerror", pageErrorHandler);

    console.log(`[CI] Navigating to ${url}...`);
    try {
      // 'load' fires after scripts run, giving React time to start mounting.
      await page.goto(url, {
        waitUntil: "load",
        timeout,
      });

      // Wait for body to contain at least one child — works for both App Router
      // (renders into <body> directly) and Pages Router (#__next).
      await page.waitForFunction(
        () => document.body !== null && document.body.childElementCount > 0,
        { timeout: Math.min(timeout, 15_000) }
      );

      console.log(`[CI] Ready: ${url}`);
    } catch (e) {
      console.error(`[CI] Navigation failed for ${url}:`, e);
      const html = await page.content().catch(() => "N/A");
      console.error(`[CI] Page HTML snippet: ${html.substring(0, 500)}`);
      throw e;
    } finally {
      page.off("pageerror", pageErrorHandler);
    }
    return;
  }

  // Full hydration for local testing
  await page.goto(url, { waitUntil: "networkidle", timeout });
  await page.waitForLoadState("networkidle", { timeout });
  await waitForReactHydration(page, timeout);
}
