import type { Page } from "@playwright/test";

export async function go(page: Page, path: string) {
  if (!path) return page.goto(path);

  let url = path;
  try {
    // if path looks like a full URL preserve it, else append testHelpers query
    if (!/^https?:\/\//i.test(path)) {
      const base =
        process.env.TEST_BASE_URL ||
        process.env.BASE_URL ||
        "http://localhost:3000";
      const sep = path.includes("?") ? "&" : "?";
      url = base.replace(/\/$/, "") + path + sep + "testHelpers=1";
    }
  } catch {
    url = path;
  }

  const resp = await page.goto(url);
  // Wait for DOM to be ready - don't wait for networkidle (Spline keeps connections open)
  await page.waitForLoadState("domcontentloaded");
  return resp;
}
