/**
 * @jest-environment node
 */
// Server-side code runs on the Node pinned in .nvmrc (Netlify, `next start`),
// not in a browser, so these run under Jest's node environment rather than
// jsdom. They cover the request/response surfaces that lean on Node's
// built-in Web APIs (Request/Response/Headers via undici), which change
// with each Node major.
import robots from "../app/robots";
import sitemap from "../app/sitemap";
import { GET as serviceWorker } from "../app/sw.js/route";
import { config as proxyConfig, proxy } from "../proxy";

function withNodeEnv<T>(value: string, fn: () => T): T {
  const env = process.env as Record<string, string | undefined>;
  const previous = env.NODE_ENV;
  env.NODE_ENV = value;
  try {
    return fn();
  } finally {
    env.NODE_ENV = previous;
  }
}

describe("server runtime globals", () => {
  it("runs without a browser window", () => {
    expect(typeof window).toBe("undefined");
  });

  it("provides the Fetch API classes Next.js builds responses on", () => {
    expect(typeof Request).toBe("function");
    expect(typeof Response).toBe("function");
    expect(typeof Headers).toBe("function");
    expect(typeof URL).toBe("function");
  });
});

describe("proxy (middleware)", () => {
  it("adds security headers outside development", () => {
    const response = withNodeEnv("production", () => proxy());
    expect(response.headers.get("X-Frame-Options")).toBe("DENY");
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(response.headers.get("Referrer-Policy")).toBe(
      "strict-origin-when-cross-origin",
    );
    // NextResponse.next() hands the request on to the route
    expect(response.headers.get("x-middleware-next")).toBe("1");
  });

  it("leaves headers alone in development", () => {
    const response = withNodeEnv("development", () => proxy());
    expect(response.headers.get("X-Frame-Options")).toBeNull();
    expect(response.headers.get("x-middleware-next")).toBe("1");
  });

  it("skips static assets and the image optimizer", () => {
    const [pattern] = proxyConfig.matcher;
    // The matcher is also a plain regex; its negative lookahead is the part
    // that decides which paths reach the proxy.
    const lookahead = new RegExp(`^${pattern}$`);
    expect(lookahead.test("/resume")).toBe(true);
    expect(lookahead.test("/_next/static/chunk.js")).toBe(false);
    expect(lookahead.test("/_next/image")).toBe(false);
    expect(lookahead.test("/favicon.ico")).toBe(false);
  });
});

describe("/sw.js route handler", () => {
  it("serves an uncacheable no-op service worker", async () => {
    const response = await serviceWorker();
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/javascript");
    expect(response.headers.get("Cache-Control")).toBe(
      "no-cache, no-store, must-revalidate",
    );
    const body = await response.text();
    expect(body).toContain("self.skipWaiting()");
    expect(body).toContain("self.clients.claim()");
  });
});

describe("robots", () => {
  it("points crawlers at the sitemap on the canonical host", () => {
    const result = robots();
    expect(result.host).toBe("https://nitsuah.io");
    expect(result.sitemap).toContain("https://nitsuah.io/sitemap.xml");
    expect(Array.isArray(result.rules)).toBe(true);
  });
});

describe("sitemap", () => {
  const entries = sitemap();

  it("lists unique, absolute nitsuah.io URLs", () => {
    const urls = entries.map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const url of urls) {
      expect(new URL(url).origin).toBe("https://nitsuah.io");
    }
  });

  it("stamps a valid lastModified date and priority on every entry", () => {
    for (const entry of entries) {
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect(Number.isNaN((entry.lastModified as Date).getTime())).toBe(false);
      expect(entry.priority).toBeGreaterThan(0);
      expect(entry.priority).toBeLessThanOrEqual(1);
    }
  });
});
