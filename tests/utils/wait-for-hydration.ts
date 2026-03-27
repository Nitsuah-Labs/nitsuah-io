/**
 * Test helper utility to wait for React hydration to complete
 * Use this in tests before interacting with page elements
 */
import { Page } from "@playwright/test";

export async function waitForReactHydration(page: Page, timeout = 30000) {
  // In CI, domcontentloaded fires before React client components mount.
  // Wait up to 10s for any of the shell landmarks to appear in the DOM —
  // this is fast when SSR is working (~1s) and has a hard cap so it never
  // consumes the full 45s global timeout.
  if (process.env.CI) {
    await page.waitForLoadState("domcontentloaded", { timeout }).catch(() => {});
    // Require at least one landmark to be present; if none appear within the
    // timeout, the page failed to render and the calling test should fail.
    await page.waitForSelector("header, main, footer, #basics, .resume-container", {
      state: "attached",
      timeout: 10000,
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
  // Use longer timeout for local (60s) to handle heavy pages like homepage with Spline
  // CI uses faster strategies so 30s is sufficient there
  const defaultTimeout = process.env.CI ? 30000 : 60000;
  const timeout = options?.timeout || defaultTimeout;

  // Simplified CI approach — navigate with "domcontentloaded" (faster than
  // waiting for all external assets), then run hydration readiness checks.
  if (process.env.CI) {
    const debugNav = process.env.PLAYWRIGHT_DEBUG_NAV === "1";
    const pageErrorHandler = (err: Error) => {
      console.error(`[CI Page Error] ${url}: ${err.message}`);
    };

    page.on("pageerror", pageErrorHandler);

    if (debugNav) {
      console.log(`[CI] Navigating to ${url}...`);
    }
    try {
      // 'domcontentloaded' fires after HTML is parsed — before external images
      // (company logos etc.) which can be very slow in CI. React scripts are
      // already bundled inline so they begin executing at DOMContentLoaded.
      const response = await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout,
      });

      if (response && !response.ok()) {
        throw new Error(
          `Navigation to ${url} failed with HTTP ${response.status()}`
        );
      }

      await waitForReactHydration(page, timeout);

      if (debugNav) {
        console.log(`[CI] Ready: ${url}`);
      }
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
  await waitForReactHydration(page, timeout);
}
