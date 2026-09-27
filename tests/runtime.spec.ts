/**
 * Server runtime checks against the production build (`next start`).
 * HTTP-level only, like smoke.spec.ts, so they run in CI without a browser.
 * They cover what the Node runtime itself serves (proxy middleware, route
 * handlers, metadata routes, not-found handling), which is what a Node
 * major upgrade can break without any page failing to render.
 */
import { expect, test } from "@playwright/test";

test("proxy middleware adds security headers to pages", async ({ request }) => {
  const response = await request.get("/resume");
  expect(response.status()).toBe(200);
  const headers = response.headers();
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["x-powered-by"]).toBeUndefined();
});

test("/sw.js route handler serves an uncacheable no-op worker", async ({
  request,
}) => {
  const response = await request.get("/sw.js");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain(
    "application/javascript",
  );
  expect(response.headers()["cache-control"]).toContain("no-store");
  expect(await response.text()).toContain("self.skipWaiting()");
});

test("robots.txt and sitemap.xml are generated", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(
    "Sitemap: https://nitsuah.io/sitemap.xml",
  );

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml).toContain("<urlset");
  expect(xml).toContain("<loc>https://nitsuah.io/resume</loc>");
});

test("prerendered blog posts are served", async ({ request }) => {
  const response = await request.get(
    "/projects/blogs/portfolio-netlify-docker",
  );
  expect(response.status()).toBe(200);
  expect(await response.text()).toContain("<!DOCTYPE html>");
});

test("unknown routes get the not-found page, not a server error", async ({
  request,
}) => {
  const response = await request.get("/this-route-does-not-exist");
  expect(response.status()).toBe(404);
  expect(await response.text()).toContain("<!DOCTYPE html>");
});

test("static assets are served with immutable caching", async ({ request }) => {
  const html = await (await request.get("/")).text();
  const asset = html.match(/\/_next\/static\/[^"']+\.js/)?.[0];
  expect(
    asset,
    "homepage should reference a /_next/static script",
  ).toBeTruthy();
  const response = await request.get(asset!);
  expect(response.status()).toBe(200);
  expect(response.headers()["cache-control"]).toContain("immutable");
});
