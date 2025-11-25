import type { Page } from "@playwright/test";

export async function go(page: Page, path: string) {
  if (!path) return page.goto(path);

  const isAbsolute = path.startsWith("http://") || path.startsWith("https://");
  // Match Playwright webServer default port so tests hit the started dev server
  const base = process.env.TEST_BASE_URL || "http://localhost:3001";
  const url = isAbsolute
    ? path
    : `${base}${path.startsWith("/") ? "" : "/"}${path}`;
  const urlWithHelpers = new URL(url);
  if (!urlWithHelpers.searchParams.has("testHelpers")) {
    urlWithHelpers.searchParams.set("testHelpers", "1");
  }
  const resp = await page.goto(urlWithHelpers.toString());
  // Wait for DOM to be ready - don't wait for networkidle (Spline keeps connections open)
  await page.waitForLoadState("domcontentloaded");
  // Ensure the app's test-helpers class is present so test-only CSS applies
  try {
    await page.evaluate(() => {
      try {
        if (
          document.body &&
          !document.body.classList.contains("test-helpers")
        ) {
          document.body.classList.add("test-helpers");
        }
      } catch (e) {}
    });

    // Also attempt to remove any overlays that may still be present
    await page.evaluate(() => {
      try {
        const texts = [
          "Overseer Dashboard",
          "Welcome to Overseer",
          "Open Next.js Dev Tools",
          "Next.js Dev Tools",
          "Sign in with GitHub",
        ];
        const selectors = [
          "#__next_dev_overlay",
          ".next-dev-overlay",
          ".react-dev-overlay",
          "#next-overlay",
          ".overseer",
          '[data-testid="overseer"]',
        ];

        for (const s of selectors) {
          try {
            document.querySelectorAll(s).forEach((n) => n.remove());
          } catch (e) {}
        }

        const all = Array.from(document.querySelectorAll("*"));
        for (const el of all) {
          try {
            const txt = el.textContent || "";
            for (const t of texts) {
              if (txt && txt.includes(t)) {
                el.remove();
                break;
              }
            }
          } catch (e) {}
        }
      } catch (e) {}
    });
  } catch (e) {}
  return resp;
}
