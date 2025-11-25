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
  return resp;
}
