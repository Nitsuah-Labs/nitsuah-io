/**
 * CI smoke suite: deterministic HTTP-level checks only.
 * Browser rendering checks are kept local because CI browser timing has been
 * persistently flaky and low-signal for this repo.
 */
import { expect, test } from "@playwright/test";

const smokePaths = ["/", "/about", "/resume", "/projects", "/labs"];

test("all key routes return 200", async ({ request }) => {
  for (const path of smokePaths) {
    const response = await request.get(path);
    expect(response.status(), `${path} should return 200`).toBe(200);
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
    "Browser smoke runs locally only unless FORCE_BROWSER_E2E=1"
  );
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toBeVisible();
});
