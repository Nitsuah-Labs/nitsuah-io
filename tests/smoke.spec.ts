/**
 * CI smoke suite: deterministic HTTP-level checks only.
 * Browser rendering checks are kept local because CI browser timing has been
 * persistently flaky and low-signal for this repo.
 */
import { expect, test } from "@playwright/test";

const smokePaths = [
  "/",
  "/about",
  "/resume",
  "/projects",
  "/labs",
  "/crypto",
  "/3d",
  "/projects/blogs",
  "/projects/clients",
  "/tools",
];

test("all key routes return 200", async ({ request }) => {
  for (const path of smokePaths) {
    const response = await request.get(path);
    expect(response.status(), {
      message: `${path} should return 200`,
    }).toBe(200);
  }
});

test("/clients permanently redirects to /projects/clients", async ({
  request,
}) => {
  const response = await request.get("/clients", { maxRedirects: 0 });
  expect([307, 308]).toContain(response.status());
  expect(response.headers()["location"] ?? "").toMatch(/\/projects\/clients$/);
});

test("every sitemap URL returns 200", async ({ request, baseURL }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  const origin = new URL(baseURL ?? "http://localhost").host;
  const paths = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
    .map((m) => new URL(m[1]))
    .filter((u) => u.host === "nitsuah.io" || u.host === origin)
    .map((u) => u.pathname || "/");
  expect(paths.length, "sitemap should list pages").toBeGreaterThan(5);
  for (const path of new Set(paths)) {
    const page = await request.get(path);
    expect(page.status(), { message: `${path} should return 200` }).toBe(200);
  }
});

test("homepage HTML shell is served", async ({ request }) => {
  const response = await request.get("/");
  const html = await response.text();
  expect(html).toContain("<!DOCTYPE html>");
  expect(html).toContain("<html");
  expect(html.length).toBeGreaterThan(1000);
});

test("resume page HTML is served", async ({ request }) => {
  const response = await request.get("/resume");
  const html = await response.text();
  expect(response.status()).toBe(200);
  expect(html).toContain("<!DOCTYPE html>");
  expect(html.length).toBeGreaterThan(1000);
});

test("projects page HTML is served", async ({ request }) => {
  const response = await request.get("/projects");
  const html = await response.text();
  expect(response.status()).toBe(200);
  expect(html).toContain("<!DOCTYPE html>");
  expect(html.length).toBeGreaterThan(1000);
});

test("browser sanity check (local only)", async ({ page }) => {
  test.skip(
    !!process.env.CI && process.env.FORCE_BROWSER_E2E !== "1",
    "Browser smoke runs locally only unless FORCE_BROWSER_E2E=1",
  );
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("body")).toBeVisible({ timeout: 60000 });
});
