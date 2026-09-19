"use client";
import React from "react";

const BlogsHeader: React.FC = () => {
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
    </div>
  );
};

export default BlogsHeader;
