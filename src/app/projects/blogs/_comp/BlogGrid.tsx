"use client";
import React from "react";
import Link from "next/link";

const BlogGrid: React.FC<{ filteredBlogs: any[] }> = ({ filteredBlogs }) => {
  return (
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
              background: "rgba(20,20,20,0.8)",
              border: "2px solid rgba(59,130,246,0.3)",
              borderRadius: "12px",
              padding: "1.5rem",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(59,130,246,0.8)";
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(59,130,246,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "0.25rem 0.75rem",
                borderRadius: "12px",
                background: "rgba(59,130,246,0.2)",
                border: "1px solid rgba(59,130,246,0.4)",
                color: "#3b82f6",
                fontSize: "0.75rem",
                fontWeight: "600",
                marginBottom: "1rem",
                width: "fit-content",
              }}
            >
              {blog.category}
            </div>
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
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.95rem",
                lineHeight: "1.6",
                marginBottom: "1.5rem",
                flexGrow: 1,
              }}
            >
              {blog.excerpt}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              {blog.tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  style={{
                    padding: "0.25rem 0.5rem",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.75rem",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "1rem",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.5)",
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
  );
};

export default BlogGrid;
