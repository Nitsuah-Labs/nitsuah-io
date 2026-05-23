"use client";
import type { BlogPost } from "@/lib/data/blogs";
import { useEffect, useMemo, useState } from "react";
import Footer from "../../../app/_components/_site/Footer";
import HomeBar from "../../../app/_components/_site/Homebar";
import { blogPosts } from "../../../lib/data/blogs";
import BlogGrid from "./_comp/BlogGrid";
import BlogsControls from "./_comp/BlogsControls";
import BlogsHeader from "./_comp/BlogsHeader";
import NewBlogForm from "./_comp/NewBlogForm";
import "./_styles/Blog.module.css";

const LOCAL_BLOGS_KEY = "nitsuah_local_blogs";

const Blogsite = () => {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"recent" | "az">("recent");
  const [showNewBlogForm, setShowNewBlogForm] = useState(false);
  const [selectedLocalBlog, setSelectedLocalBlog] = useState<BlogPost | null>(
    null,
  );

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LOCAL_BLOGS_KEY);
      if (!raw) return;
      const localPosts = JSON.parse(raw) as BlogPost[];
      if (!Array.isArray(localPosts) || localPosts.length === 0) return;
      setPosts([...localPosts, ...blogPosts]);
    } catch {
      // Ignore malformed local blog cache and continue with file-based posts.
    }
  }, []);

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

  const handleNewBlogSave = (payload: {
    title: string;
    category: string;
    excerpt: string;
    content: string;
    tags: string[];
  }) => {
    const now = new Date();
    const slugBase = payload.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const newPost: BlogPost = {
      id: `local-${now.getTime()}`,
      title: payload.title,
      slug: `${slugBase}-${now.getTime()}`,
      excerpt: payload.excerpt,
      content: payload.content,
      author: "Austin H.",
      date: now.toISOString().slice(0, 10),
      tags: payload.tags,
      category: payload.category,
      readTime: `${Math.max(1, Math.ceil(payload.content.split(/\s+/).length / 220))} min read`,
      published: true,
      localOnly: true,
    };

    setPosts((prev) => {
      const next = [newPost, ...prev];
      const onlyLocal = next.filter((post) => post.localOnly);
      window.localStorage.setItem(LOCAL_BLOGS_KEY, JSON.stringify(onlyLocal));
      return next;
    });
    setShowNewBlogForm(false);
  };

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
          <BlogsHeader
            showNewBlogForm={showNewBlogForm}
            setShowNewBlogForm={setShowNewBlogForm}
          />

          {showNewBlogForm && (
            <NewBlogForm
              categories={categories.filter((cat) => cat !== "all")}
              onCancel={() => setShowNewBlogForm(false)}
              onSubmit={handleNewBlogSave}
            />
          )}

          <BlogsControls
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <BlogGrid
            filteredBlogs={filteredBlogs}
            onOpenLocalBlog={(blog) => setSelectedLocalBlog(blog)}
          />

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

        {selectedLocalBlog && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(3, 10, 20, 0.82)",
              zIndex: 1200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
            onClick={() => setSelectedLocalBlog(null)}
          >
            <article
              style={{
                width: "min(880px, 100%)",
                maxHeight: "90vh",
                overflowY: "auto",
                background: "rgba(15, 23, 42, 0.98)",
                border: "2px solid rgba(59,130,246,0.45)",
                borderRadius: "14px",
                padding: "1.4rem 1.2rem",
                color: "rgba(255,255,255,0.92)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <h2 style={{ margin: 0, fontSize: "1.5rem" }}>
                    {selectedLocalBlog.title}
                  </h2>
                  <p
                    style={{
                      margin: "0.35rem 0 0",
                      color: "rgba(148,163,184,0.95)",
                      fontSize: "0.95rem",
                    }}
                  >
                    {selectedLocalBlog.author} • {selectedLocalBlog.readTime} •{" "}
                    {new Date(selectedLocalBlog.date).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLocalBlog(null)}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(148,163,184,0.45)",
                    color: "rgba(226,232,240,0.95)",
                    borderRadius: "8px",
                    padding: "0.35rem 0.65rem",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>

              <p
                style={{
                  marginTop: 0,
                  color: "rgba(191,219,254,0.95)",
                  lineHeight: 1.7,
                }}
              >
                {selectedLocalBlog.excerpt}
              </p>

              <div
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.8,
                  fontSize: "1.02rem",
                  marginTop: "1rem",
                }}
              >
                {selectedLocalBlog.content}
              </div>
            </article>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blogsite;
