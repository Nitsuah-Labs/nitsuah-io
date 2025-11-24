"use client";
import React from "react";

const BlogsControls: React.FC<{
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (s: string) => void;
  sortBy: "recent" | "az";
  setSortBy: (s: "recent" | "az") => void;
}> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}) => {
  return (
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
                selectedCategory === cat ? "#3b82f6" : "rgba(59,130,246,0.3)",
              background: selectedCategory === cat ? "#3b82f6" : "transparent",
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
          border: "2px solid rgba(59,130,246,0.3)",
          background: "rgba(10,10,10,0.8)",
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
  );
};

export default BlogsControls;
