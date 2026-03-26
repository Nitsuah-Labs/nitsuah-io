/**
 * Test helper utility to wait for React hydration to complete
 * Use this in tests before interacting with page elements
 */
import { Page } from "@playwright/test";

export async function waitForReactHydration(page: Page, timeout = 30000) {
  // In CI, poll for meaningful DOM content rather than using a fixed delay.
  // domcontentloaded fires after HTML is parsed; React client components need
  // additional time to hydrate on slow GitHub runners.
  if (process.env.CI) {
    await page.waitForLoadState("domcontentloaded", { timeout }).catch(() => {});

    // Poll for actual DOM content up to 12s, fall back to a 1500ms fixed wait.
    // We look for elements that reliably indicate the page tree is available:
    // - footer: always SSR'd (no !mounted gate), shows HTML is parsed and CSS applied
    // - main: present on most pages
    // - #basics: resume server component
    // Importantly we do NOT use bodyText length as that can pass before client
    // components have hydrated (the SSR shell already has text).
    await page
      .waitForFunction(
        () => {
          const doc = document;
          if (!doc || !doc.documentElement || !doc.body) return false;
          return !!(
            doc.querySelector("footer") ||
            doc.querySelector("main") ||
            doc.querySelector("#basics") ||
            doc.querySelector(".resume-container")
          );
        },
        { timeout: 12000 }
      )
      .catch(() => page.waitForTimeout(1500));

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
      // 'domcontentloaded' fires after HTML is parsed — before external images
      // (company logos etc.) which can be very slow in CI. React scripts are
      // already bundled inline so they begin executing at DOMContentLoaded.
      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout,
      });

      await waitForReactHydration(page, timeout);

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
  await waitForReactHydration(page, timeout);
}
