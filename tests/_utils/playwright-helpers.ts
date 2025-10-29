import type { Page } from "@playwright/test";

export async function go(page: Page, path: string) {
  if (!path) return page.goto(path);

  let url = path;
  try {
    // if path looks like a full URL preserve it, else append testHelpers query
    if (!/^https?:\/\//i.test(path)) {
      url = path.includes("?")
        ? `${path}&testHelpers=1`
        : `${path}?testHelpers=1`;
    }
  } catch {
    url = path;
  }

  const resp = await page.goto(url);
  // Wait for network idle to stabilize client-side assets and Spline
  await page.waitForLoadState("networkidle");
  return resp;
}
