/**
 * @jest-environment node
 */
// Guards the metadata and blog content problems found auditing the deploy
// preview: a site-wide canonical that marked every page a duplicate of the
// homepage, shared titles/descriptions, a 404ing og:image, and blog posts
// with broken relative links, missing images and unfilled template text.
// Only the exported metadata is under test; stub the UI these modules render
// (wallet providers and react-markdown are ESM-only and irrelevant here).
jest.mock("../app/providers", () => ({
  Providers: ({ children }: { children: unknown }) => children,
}));
jest.mock("../app/_components/_site/Footer", () => () => null);
jest.mock("../app/_components/_site/Homebar", () => () => null);
jest.mock("../app/projects/blogs/[slug]/TableOfContents", () => () => null);
jest.mock("react-markdown", () => () => null);

import fs from "fs";
import type { Metadata } from "next";
import path from "path";
import { metadata as rootMetadata } from "../app/layout";
import { generateMetadata as blogMetadata } from "../app/projects/blogs/[slug]/page";
import { blogPosts } from "../lib/data/blogs";
import { DEFAULT_OG_IMAGE, pageMetadata, TITLE_SUFFIX } from "../lib/seo";

const APP_DIR = path.join(__dirname, "..", "app");
const PUBLIC_DIR = path.join(__dirname, "..", "..", "public");

const publicFileExists = (url: string) =>
  fs.existsSync(path.join(PUBLIC_DIR, url.replace(/^\//, "")));

function imageUrls(meta: Metadata): string[] {
  const images = meta.openGraph?.images;
  const list = Array.isArray(images) ? images : images ? [images] : [];
  return list.map((i) =>
    typeof i === "string" ? i : String((i as { url: string | URL }).url),
  );
}

// Every static route: a directory with a page.tsx that isn't a dynamic
// segment or a bare redirect to another route.
function staticRoutes(): string[] {
  const routes: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (/^[[_(]/.test(entry.name) || entry.name === "sw.js") continue;
      const full = path.join(dir, entry.name);
      const page = path.join(full, "page.tsx");
      if (
        fs.existsSync(page) &&
        !/\b(permanentRedirect|redirect)\(/.test(fs.readFileSync(page, "utf8"))
      ) {
        routes.push(
          "/" + path.relative(APP_DIR, full).split(path.sep).join("/"),
        );
      }
      walk(full);
    }
  };
  walk(APP_DIR);
  return routes.sort();
}

describe("root layout metadata", () => {
  it("does not set a canonical that every page would inherit", () => {
    expect(rootMetadata.alternates?.canonical).toBeUndefined();
  });

  it("points og:image at a file that exists", () => {
    const urls = imageUrls(rootMetadata);
    expect(urls).toEqual([DEFAULT_OG_IMAGE.url]);
    urls.forEach((url) => expect(publicFileExists(url)).toBe(true));
  });
});

describe("pageMetadata", () => {
  it("sets a canonical, og:url, suffixed title and the default card", () => {
    const meta = pageMetadata({
      title: "Resume",
      description: "d",
      path: "/resume",
    });
    expect(meta.alternates?.canonical).toBe("/resume");
    expect(meta.openGraph?.url).toBe("/resume");
    expect(meta.title).toEqual({ absolute: `Resume${TITLE_SUFFIX}` });
    expect(imageUrls(meta)).toEqual([DEFAULT_OG_IMAGE.url]);
    expect(meta.robots).toBeUndefined();
  });

  it("marks noIndex pages and keeps absolute titles as-is", () => {
    const meta = pageMetadata({
      title: "Exact",
      description: "d",
      path: "/x",
      noIndex: true,
      absoluteTitle: true,
    });
    expect(meta.title).toEqual({ absolute: "Exact" });
    expect(meta.robots).toEqual({ index: false, follow: true });
  });
});

describe("route metadata", () => {
  const routes = staticRoutes();
  const metaFor = (route: string): Metadata => {
    const layout = path.join(APP_DIR, route, "layout.tsx");
    return require(layout).metadata;
  };

  it("finds the site's routes", () => {
    expect(routes).toEqual(
      expect.arrayContaining(["/about", "/resume", "/labs/mint"]),
    );
  });

  it.each(routes)(
    "%s has its own layout metadata with a matching canonical",
    (route) => {
      const meta = metaFor(route);
      expect(meta.alternates?.canonical).toBe(route);
      expect(meta.openGraph?.url).toBe(route);
      expect(meta.description).toBeTruthy();
    },
  );

  it("gives every route a unique title and description", () => {
    const titles = routes.map((r) => JSON.stringify(metaFor(r).title));
    const descriptions = routes.map((r) => metaFor(r).description);
    expect(new Set(titles).size).toBe(routes.length);
    expect(new Set(descriptions).size).toBe(routes.length);
  });

  it("sets the homepage's own canonical", () => {
    // The homepage has no layout of its own; its metadata lives in page.tsx.
    const source = fs.readFileSync(path.join(APP_DIR, "page.tsx"), "utf8");
    expect(source).toMatch(/export const metadata[^;]*pageMetadata\(/s);
    expect(source).toMatch(/path: "\/"/);
  });
});

describe("blog posts", () => {
  const published = blogPosts.filter((p) => p.published);

  it.each(published.map((p) => [p.slug, p]))(
    "%s has a canonical and an og:image that exists",
    async (slug, post) => {
      const meta = await blogMetadata({
        params: Promise.resolve({ slug: slug as string }),
      });
      expect(meta.alternates?.canonical).toBe(`/projects/blogs/${slug}`);
      imageUrls(meta).forEach((url) =>
        expect(publicFileExists(url)).toBe(true),
      );
      if (typeof post !== "string" && post.image) {
        expect(publicFileExists(post.image)).toBe(true);
      }
    },
  );

  it.each(published.map((p) => [p.slug, p.content]))(
    "%s content has no broken links, missing images or template text",
    (_slug, content) => {
      const text = content as string;
      // Relative links resolve against the site, not a repo.
      expect(text).not.toMatch(/\]\(\.\.?\//);
      for (const [, src] of text.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
        expect({ src, exists: publicFileExists(src) }).toEqual({
          src,
          exists: true,
        });
      }
      expect(text).not.toMatch(
        /Summarize the (main points|key insights)|Highlight benefits and practical/,
      );
      // No heading left with nothing under it.
      expect(text).not.toMatch(/^## .+\n\n(?=## |$)/m);
    },
  );
});
