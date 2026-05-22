"use client";
import type { BlogPost } from "@/lib/data/blogs";
import React from "react";

type NewBlogPayload = Pick<BlogPost, "title" | "category" | "excerpt" | "content"> & {
  tags: string[];
};

interface NewBlogFormProps {
  categories: string[];
  onCancel: () => void;
  onSubmit: (payload: NewBlogPayload) => void;
}

const NewBlogForm: React.FC<NewBlogFormProps> = ({
  categories,
  onCancel,
  onSubmit,
}) => {
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [excerpt, setExcerpt] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tags, setTags] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      title: title.trim(),
      category: category.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
    });
    setTitle("");
    setCategory("");
    setExcerpt("");
    setContent("");
    setTags("");
  };

  return (
    <div
      style={{
        background: "rgba(20,20,20,0.9)",
        border: "2px solid rgba(59,130,246,0.5)",
        borderRadius: "12px",
        padding: "2rem",
        marginBottom: "2rem",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#fff",
          marginBottom: "1.5rem",
        }}
      >
        Create New Blog Post
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div>
          <label
            style={{
              display: "block",
              color: "rgba(255,255,255,0.8)",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            Title
          </label>
          <input
            type="text"
            required
            placeholder="Enter blog title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "6px",
              border: "2px solid rgba(59,130,246,0.3)",
              background: "rgba(10,10,10,0.8)",
              color: "#fff",
              fontSize: "1rem",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              color: "rgba(255,255,255,0.8)",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            Category
          </label>
          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "6px",
              border: "2px solid rgba(59,130,246,0.3)",
              background: "rgba(10,10,10,0.8)",
              color: "#fff",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            <option value="">Select a category...</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            style={{
              display: "block",
              color: "rgba(255,255,255,0.8)",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            Excerpt
          </label>
          <textarea
            required
            placeholder="Brief description of your blog post..."
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "6px",
              border: "2px solid rgba(59,130,246,0.3)",
              background: "rgba(10,10,10,0.8)",
              color: "#fff",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              color: "rgba(255,255,255,0.8)",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            Content
          </label>
          <textarea
            required
            placeholder="Write your blog content here..."
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "6px",
              border: "2px solid rgba(59,130,246,0.3)",
              background: "rgba(10,10,10,0.8)",
              color: "#fff",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              color: "rgba(255,255,255,0.8)",
              marginBottom: "0.5rem",
              fontWeight: "600",
            }}
          >
            Tags (comma-separated)
          </label>
          <input
            type="text"
            placeholder="web3, blockchain, tutorial..."
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "6px",
              border: "2px solid rgba(59,130,246,0.3)",
              background: "rgba(10,10,10,0.8)",
              color: "#fff",
              fontSize: "1rem",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              border: "none",
              background: "#3b82f6",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2563eb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#3b82f6";
            }}
          >
            Save Blog
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              border: "2px solid rgba(255,255,255,0.3)",
              background: "transparent",
              color: "rgba(255,255,255,0.7)",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBlogForm;
