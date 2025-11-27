// Posts List Component for Blog CMS Demo
import { BlogPost } from "@/lib/data/demos/blog-data";
import React from "react";
import {
  DemoButton,
  DemoCard,
  DemoSection,
} from "../../../../../components/demos";

interface PostsListProps {
  posts: BlogPost[];
  searchTerm: string;
  filterStatus: "all" | "published" | "draft";
  onSearchChange: (term: string) => void;
  onFilterChange: (status: "all" | "published" | "draft") => void;
  onEditPost: (post: BlogPost) => void;
  onToggleStatus: (postId: number) => void;
  onDeletePost: (postId: number) => void;
}

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  searchTerm,
  filterStatus,
  onSearchChange,
  onFilterChange,
  onEditPost,
  onToggleStatus,
  onDeletePost,
}) => {
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || post.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <DemoSection title="All Posts">
        {/* Search and Filter */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search posts..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "0.75rem 1rem",
              background: "rgba(139, 92, 246, 0.1)",
              border: "2px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "8px",
              color: "white",
              fontSize: "1rem",
            }}
          />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <DemoButton
              variant={filterStatus === "all" ? "primary" : "secondary"}
              size="small"
              onClick={() => onFilterChange("all")}
            >
              All
            </DemoButton>
            <DemoButton
              variant={filterStatus === "published" ? "success" : "secondary"}
              size="small"
              onClick={() => onFilterChange("published")}
            >
              Published
            </DemoButton>
            <DemoButton
              variant={filterStatus === "draft" ? "secondary" : "secondary"}
              size="small"
              onClick={() => onFilterChange("draft")}
            >
              Drafts
            </DemoButton>
          </div>
        </div>

        {/* Posts Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "1rem",
          }}
        >
          {filteredPosts.map((post) => (
            <DemoCard
              key={post.id}
              style={{
                background: "rgba(139, 92, 246, 0.05)",
                border: "2px solid rgba(139, 92, 246, 0.2)",
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "700",
                      color: "#8b5cf6",
                      flex: 1,
                    }}
                  >
                    {post.title}
                  </h3>
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      background:
                        post.status === "published"
                          ? "rgba(16, 185, 129, 0.2)"
                          : "rgba(234, 179, 8, 0.2)",
                      color:
                        post.status === "published" ? "#10b981" : "#eab308",
                    }}
                  >
                    {post.status}
                  </span>
                </div>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "0.95rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {post.excerpt}
                </p>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <span>📅 {post.date}</span>
                  <span style={{ margin: "0 0.5rem" }}>•</span>
                  <span>✍️ {post.author}</span>
                  <span style={{ margin: "0 0.5rem" }}>•</span>
                  <span>🏷️ {post.category}</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <DemoButton
                  variant="primary"
                  size="small"
                  onClick={() => onEditPost(post)}
                  style={{ flex: 1 }}
                >
                  Edit
                </DemoButton>
                <DemoButton
                  variant={
                    post.status === "published" ? "secondary" : "success"
                  }
                  size="small"
                  onClick={() => onToggleStatus(post.id)}
                >
                  {post.status === "published" ? "Unpublish" : "Publish"}
                </DemoButton>
                <DemoButton
                  variant="danger"
                  size="small"
                  onClick={() => onDeletePost(post.id)}
                >
                  🗑️
                </DemoButton>
              </div>
            </DemoCard>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <DemoCard style={{ textAlign: "center", padding: "3rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
              No posts found matching your criteria
            </p>
          </DemoCard>
        )}
      </DemoSection>
    </div>
  );
};
