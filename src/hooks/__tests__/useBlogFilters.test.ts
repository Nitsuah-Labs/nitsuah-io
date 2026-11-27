import { act, renderHook } from "@testing-library/react";
import { useBlogFilters } from "../useBlogFilters";

type Blog = Parameters<typeof useBlogFilters>[0][number];

const blog = (
  id: number,
  category: string,
  date: string,
  upvotes: number,
  views: number,
): Blog => ({
  id,
  title: `Post ${id}`,
  author: "A",
  date,
  readTime: "1 min",
  category,
  tags: [],
  image_url: "",
  upvotes,
  comments: 0,
  views,
});

// Stable reference: the hook re-filters whenever `blogs` changes identity.
const blogs = [
  blog(1, "web3", "2026-01-01", 5, 300),
  blog(2, "ai", "2026-03-01", 1, 100),
  blog(3, "web3", "2026-02-01", 9, 200),
];
const ids = (list: Blog[]) => list.map((b) => b.id);

describe("useBlogFilters", () => {
  it("defaults to all categories sorted by most recent", () => {
    const { result } = renderHook(() => useBlogFilters(blogs));
    expect(result.current.selectedCategory).toBe("all");
    expect(result.current.sortBy).toBe("recent");
    expect(ids(result.current.filteredBlogs)).toEqual([2, 3, 1]);
  });

  it("sorts by upvotes and by views", () => {
    const { result } = renderHook(() => useBlogFilters(blogs));
    act(() => result.current.setSortBy("popular"));
    expect(ids(result.current.filteredBlogs)).toEqual([3, 1, 2]);
    act(() => result.current.setSortBy("views"));
    expect(ids(result.current.filteredBlogs)).toEqual([1, 3, 2]);
  });

  it("filters by category and lists unique categories with all first", () => {
    const { result } = renderHook(() => useBlogFilters(blogs));
    expect(result.current.categories).toEqual(["all", "web3", "ai"]);
    act(() => result.current.setSelectedCategory("web3"));
    expect(ids(result.current.filteredBlogs)).toEqual([3, 1]);
  });
});
