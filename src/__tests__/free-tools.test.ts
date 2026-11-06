/**
 * @jest-environment node
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import sitemap from "../app/sitemap";
import { freeToolSlugs } from "../lib/data/free-tools";

const toolsDir = join(process.cwd(), "public", "tools");
const read = (file: string) => readFileSync(join(toolsDir, file), "utf8");

describe("free tools (public/tools)", () => {
  const pages = [
    { file: "index.html", canonical: "https://nitsuah.io/tools" },
    ...freeToolSlugs.map((slug) => ({
      file: `${slug}.html`,
      canonical: `https://nitsuah.io/tools/${slug}`,
    })),
  ];

  it.each(pages)(
    "$file is a complete, accessible static page",
    ({ file, canonical }) => {
      const html = read(file);
      expect(html).toMatch(/<html lang="en">/);
      expect(html).toMatch(/<title>[^<]{10,}<\/title>/);
      expect(html).toMatch(/<meta name="description" content="[^"]{40,}">/);
      expect(html).toContain(`<link rel="canonical" href="${canonical}">`);
      expect(html).toMatch(/<a class="skip" href="#main">/);
      expect(html).toMatch(/<main id="main">/);
      expect(html.match(/<h1>/g)).toHaveLength(1);
      // Loads shared CSS from an absolute path so /tools and /tools/<slug> both work.
      expect(html).toContain('href="/tools/style.css"');
      // Client-side only: no third-party requests or trackers.
      expect(html).not.toMatch(
        /https?:\/\/(?!nitsuah\.io|schema\.org|www\.w3\.org)[^"' )]+\.(js|css)/,
      );
    },
  );

  it("links every tool from the index", () => {
    const index = read("index.html");
    for (const slug of freeToolSlugs) {
      expect(index).toContain(`href="/tools/${slug}"`);
    }
  });

  it("lists the index and every tool in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain("https://nitsuah.io/tools");
    for (const slug of freeToolSlugs) {
      expect(urls).toContain(`https://nitsuah.io/tools/${slug}`);
    }
  });
});
