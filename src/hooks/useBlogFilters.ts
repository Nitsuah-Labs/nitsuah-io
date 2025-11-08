import { useEffect, useState } from "react";

interface Blog {
  id: number;
  title: string;
  slug?: string;
  excerpt?: string;
  description?: string;
  content?: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image_url: string;
  upvotes: number;
  comments: number;
  views: number;
}

type SortOption = "recent" | "popular" | "views";

export const useBlogFilters = (blogs: Blog[]) => {
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(blogs);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  useEffect(() => {
    let filtered = [...blogs];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    // Sort blogs
    switch (sortBy) {
      case "recent":
        filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
      case "popular":
        filtered.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case "views":
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }

    setFilteredBlogs(filtered);
  }, [selectedCategory, sortBy, blogs]);

  const categories = [
    "all",
    ...Array.from(new Set(blogs.map((blog) => blog.category))),
  ];

  return {
    filteredBlogs,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    categories,
  };
};
