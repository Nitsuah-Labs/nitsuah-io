"use client";
import React from "react";

const BlogsHeader: React.FC<{
  showNewBlogForm: boolean;
  setShowNewBlogForm: (v: boolean) => void;
}> = ({ showNewBlogForm, setShowNewBlogForm }) => {
  return (
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
      <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "1.1rem" }}>
        Thoughts on Web3, development, and technology
      </p>

      <button
        onClick={() => setShowNewBlogForm(!showNewBlogForm)}
        style={{
          marginTop: "1.5rem",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          border: "2px solid #3b82f6",
          background: showNewBlogForm ? "#3b82f6" : "transparent",
          color: "#fff",
          fontSize: "1rem",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.3s ease",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
        onMouseEnter={(e) => {
          if (!showNewBlogForm) {
            e.currentTarget.style.background = "rgba(59, 130, 246, 0.2)";
          }
        }}
        onMouseLeave={(e) => {
          if (!showNewBlogForm) {
            e.currentTarget.style.background = "transparent";
          }
        }}
      >
        <span style={{ fontSize: "1.2rem" }}>+</span>
        {showNewBlogForm ? "Cancel" : "New Blog Post"}
      </button>
    </div>
  );
};

export default BlogsHeader;
