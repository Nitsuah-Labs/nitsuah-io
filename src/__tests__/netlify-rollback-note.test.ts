/**
 * @jest-environment node
 */
// Guards #640: nitsuah.io moved to Cloudflare Pages. netlify.toml stays as a
// rollback-only config and the Netlify portfolio post is marked historical.
import fs from "fs";
import path from "path";

const root = path.resolve(__dirname, "../..");
const read = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");

describe("Netlify rollback-only notes", () => {
  it("netlify.toml says it is rollback-only and names Cloudflare Pages", () => {
    const toml = read("netlify.toml");
    expect(toml).toMatch(/rollback/i);
    expect(toml).toMatch(/Cloudflare Pages/);
  });

  it("the Netlify portfolio post body is marked historical", () => {
    const html = read(
      "github-pages-blog/blog/portfolio-netlify-docker/index.html",
    );
    const body = html.slice(html.indexOf('class="article-body"'));
    expect(body).toMatch(/historical/i);
    expect(body).toMatch(/Cloudflare Pages/);
  });
});
