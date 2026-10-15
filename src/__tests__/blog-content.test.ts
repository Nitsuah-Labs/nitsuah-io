/**
 * @jest-environment node
 */
// Guards #569: an encoding pass turned em dashes, arrows, tree-drawing
// characters and check/cross marks into ASCII "|-- ", "|    ", "||o" and "[OK]".
import { blogPosts } from "../lib/data/blogs";

describe("blog post content", () => {
  it.each(blogPosts.map((post) => [post.slug, post.content] as const))(
    "%s has no mangled punctuation",
    (_slug, content) => {
      expect(content).not.toContain("|-- ");
      expect(content).not.toContain("[OK]");
      // Tree art: a line that starts with "||" (or "|" then spaces) was a box-drawing branch.
      expect(content).not.toMatch(/^\s*\|\|/m);
      expect(content).not.toMatch(/^\s*\|\s{2,}\S/m);
    },
  );
});
