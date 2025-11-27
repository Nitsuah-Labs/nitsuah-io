// Post Editor Component for Blog CMS Demo (used for both Create and Edit)
import { BlogPost } from "@/lib/data/demos/blog-data";
import React from "react";
import {
  DemoButton,
  DemoCard,
  DemoSection,
} from "../../../../../components/demos";

interface PostEditorProps {
  mode: "create" | "edit";
  post: Partial<BlogPost> | BlogPost;
  onPostChange: (post: Partial<BlogPost> | BlogPost) => void;
  onSave: () => void;
  onCancel: () => void;
  disabled?: boolean;
}

export const PostEditor: React.FC<PostEditorProps> = ({
  mode,
  post,
  onPostChange,
  onSave,
  onCancel,
  disabled = false,
}) => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <DemoSection title={mode === "create" ? "Create New Post" : "Edit Post"}>
        <DemoCard>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#8b5cf6",
                fontWeight: "600",
              }}
            >
              Title
            </label>
            <input
              type="text"
              value={post.title || ""}
              onChange={(e) => onPostChange({ ...post, title: e.target.value })}
              placeholder="Enter post title..."
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "rgba(139, 92, 246, 0.1)",
                border: "2px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "8px",
                color: "white",
                fontSize: "1rem",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#8b5cf6",
                fontWeight: "600",
              }}
            >
              Excerpt
            </label>
            <input
              type="text"
              value={post.excerpt || ""}
              onChange={(e) =>
                onPostChange({ ...post, excerpt: e.target.value })
              }
              placeholder="Brief summary of the post..."
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "rgba(139, 92, 246, 0.1)",
                border: "2px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "8px",
                color: "white",
                fontSize: "1rem",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#8b5cf6",
                fontWeight: "600",
              }}
            >
              Content
            </label>
            <textarea
              value={post.content || ""}
              onChange={(e) =>
                onPostChange({ ...post, content: e.target.value })
              }
              placeholder="Write your post content here..."
              rows={10}
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "rgba(139, 92, 246, 0.1)",
                border: "2px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "8px",
                color: "white",
                fontSize: "1rem",
                resize: "vertical",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#8b5cf6",
                  fontWeight: "600",
                }}
              >
                Author
              </label>
              <input
                type="text"
                value={post.author || ""}
                onChange={(e) =>
                  onPostChange({ ...post, author: e.target.value })
                }
                placeholder="Author name..."
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "2px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "#8b5cf6",
                  fontWeight: "600",
                }}
              >
                Category
              </label>
              <input
                type="text"
                value={post.category || ""}
                onChange={(e) =>
                  onPostChange({ ...post, category: e.target.value })
                }
                placeholder="Category..."
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "2px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "1rem",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#8b5cf6",
                fontWeight: "600",
              }}
            >
              Status
            </label>
            <select
              value={post.status || "draft"}
              onChange={(e) =>
                onPostChange({
                  ...post,
                  status: e.target.value as "published" | "draft",
                })
              }
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "rgba(139, 92, 246, 0.1)",
                border: "2px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "8px",
                color: "white",
                fontSize: "1rem",
              }}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <DemoButton
              variant="success"
              onClick={onSave}
              disabled={disabled}
              style={{ flex: 1 }}
            >
              {mode === "create" ? "Create Post" : "Save Changes"}
            </DemoButton>
            <DemoButton variant="secondary" onClick={onCancel}>
              Cancel
            </DemoButton>
          </div>
        </DemoCard>
      </DemoSection>
    </div>
  );
};
