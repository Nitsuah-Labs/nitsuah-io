"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import Footer from "../../../app/_components/_site/Footer";
import HomeBar from "../../../app/_components/_site/Homebar";
import { blogPosts } from "../../../lib/data/blogs";
import "./_styles/Blog.module.css";

const Blogsite = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"recent" | "az">("recent");

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>(["all"]);
    blogPosts.forEach((post) => {
      if (post.published) cats.add(post.category.toLowerCase());
    });
    return Array.from(cats);
  }, []);

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    let filtered = blogPosts.filter((post) => post.published);

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
  }, [selectedCategory, sortBy]);

  return (
    <div className="App" style={{ background: "#0a0a0a", minHeight: "100vh" }}>
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
          <div style={{ marginBottom: "3rem", textAlign: "center" }}>
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "700",
                background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "1rem",
              }}
            >
              BLOGS
            </h1>
            <p
              style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "1.1rem" }}
            >
              Thoughts on Web3, development, and technology
            </p>
          </div>

          {/* Filters and Sort */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "2rem",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    border: "2px solid",
                    borderColor:
                      selectedCategory === cat
                        ? "#3b82f6"
                        : "rgba(59, 130, 246, 0.3)",
                    background:
                      selectedCategory === cat ? "#3b82f6" : "transparent",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "recent" | "az")}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                border: "2px solid rgba(59, 130, 246, 0.3)",
                background: "rgba(10, 10, 10, 0.8)",
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              <option value="recent">Most Recent</option>
              <option value="az">A-Z</option>
            </select>
          </div>

          {/* Blog Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "2rem",
            }}
          >
            {filteredBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/projects/blogs/${blog.slug}`}
                style={{ textDecoration: "none" }}
              >
                <article
                  style={{
                    background: "rgba(20, 20, 20, 0.8)",
                    border: "2px solid rgba(59, 130, 246, 0.3)",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(59, 130, 246, 0.8)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(59, 130, 246, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(59, 130, 246, 0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Category Badge */}
                  <div
                    style={{
                      display: "inline-block",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "12px",
                      background: "rgba(59, 130, 246, 0.2)",
                      border: "1px solid rgba(59, 130, 246, 0.4)",
                      color: "#3b82f6",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      marginBottom: "1rem",
                      width: "fit-content",
                    }}
                  >
                    {blog.category}
                  </div>

                  {/* Title */}
                  <h2
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#fff",
                      marginBottom: "0.75rem",
                      lineHeight: "1.3",
                    }}
                  >
                    {blog.title}
                  </h2>

                  {/* Excerpt */}
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                      marginBottom: "1.5rem",
                      flexGrow: 1,
                    }}
                  >
                    {blog.excerpt}
                  </p>

                  {/* Tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: "0.25rem 0.5rem",
                          borderRadius: "8px",
                          background: "rgba(255, 255, 255, 0.05)",
                          color: "rgba(255, 255, 255, 0.5)",
                          fontSize: "0.75rem",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "1rem",
                      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                      fontSize: "0.875rem",
                      color: "rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    <span>{blog.author}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                    <span>•</span>
                    <span>
                      {new Date(blog.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                color: "rgba(255, 255, 255, 0.5)",
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
