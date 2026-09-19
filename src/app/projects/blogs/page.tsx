"use client";
import type { BlogPost } from "@/lib/data/blogs";
import { useMemo, useState } from "react";
import Footer from "../../../app/_components/_site/Footer";
import HomeBar from "../../../app/_components/_site/Homebar";
import { blogPosts } from "../../../lib/data/blogs";
import BlogGrid from "./_comp/BlogGrid";
import BlogsControls from "./_comp/BlogsControls";
import BlogsHeader from "./_comp/BlogsHeader";
import "./_styles/Blog.module.css";

const normalizeText = (value: string, maxLength: number) =>
  value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const sanitizeSlugSegment = (value: string) => {
  const normalized = value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized || "post";
};

const sanitizeTags = (tags: unknown) => {
  if (!Array.isArray(tags)) return [];

  return tags
    .map((tag) => normalizeText(String(tag), 40).toLowerCase())
    .filter(Boolean)
    .slice(0, 12);
};

const sanitizeBlogPost = (post: BlogPost): BlogPost => {
  const safeTitle = normalizeText(post.title, 120);
  const safeCategory = normalizeText(post.category, 40).toLowerCase();
  const safeExcerpt = normalizeText(post.excerpt, 320);
  const safeContent = normalizeText(post.content, 20000);
  const safeSlug = sanitizeSlugSegment(post.slug || safeTitle);
  const safeId = sanitizeSlugSegment(post.id || safeSlug);

  return {
    ...post,
    id: safeId,
    title: safeTitle,
    slug: safeSlug,
    excerpt: safeExcerpt,
    content: safeContent,
    category: safeCategory,
    tags: sanitizeTags(post.tags),
  };
};

const Blogsite = () => {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"recent" | "az">("recent");

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>(["all"]);
    posts.forEach((post) => {
      if (post.published) cats.add(post.category.toLowerCase());
    });
    return Array.from(cats);
  }, [posts]);

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    let filtered = posts.filter((post) => post.published);

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (post) => post.category.toLowerCase() === selectedCategory,
      );
    }

    // Sort
    if (sortBy === "recent") {
      filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    } else if (sortBy === "az") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [posts, selectedCategory, sortBy]);

  return (
    <div
      className="App"
      style={{ background: "var(--color-background)", minHeight: "100vh" }}
    >
      <HomeBar />
      <main
        style={{
          marginTop: "80px",
          marginBottom: "60px",
          paddingBottom: "80px",
          minHeight: "calc(100vh - 140px)",
          padding: "2rem 1rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <BlogsHeader />

          <BlogsControls
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <BlogGrid filteredBlogs={filteredBlogs} />

          {filteredBlogs.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                color: "var(--color-text-secondary)",
              }}
            >
              <p style={{ fontSize: "1.2rem" }}>
                No blogs found in this category.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blogsite;
