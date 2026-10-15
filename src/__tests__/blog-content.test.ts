/**
 * @jest-environment node
 */
// Guards #569: an encoding pass turned em dashes, arrows, tree-drawing
// characters and check/cross marks into ASCII "|-- ", "|    " and "[OK]".
import { blogPosts } from "../lib/data/blogs";

describe("blog post content", () => {
  it.each(blogPosts.map((post) => [post.slug, post.content] as const))(
    "%s has no mangled punctuation",
    (_slug, content) => {
      expect(content).not.toContain("|-- ");
      expect(content).not.toContain("[OK]");
    },
  );
});
