// Dashboard Component for Blog CMS Demo
import { BlogPost } from "@/lib/data/demos/blog-data";
import React from "react";
import { DemoCard, DemoSection } from "../../../../../components/demos";

interface DashboardProps {
  posts: BlogPost[];
  onPostClick: (post: BlogPost) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ posts, onPostClick }) => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <DemoSection title="Dashboard">
        {/* Quick Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <DemoCard
            style={{
              background: "rgba(139, 92, 246, 0.1)",
              border: "2px solid rgba(139, 92, 246, 0.3)",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#8b5cf6",
                marginBottom: "0.5rem",
              }}
            >
              {posts.length}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>Total Posts</div>
          </DemoCard>

          <DemoCard
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "2px solid rgba(16, 185, 129, 0.3)",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#10b981",
                marginBottom: "0.5rem",
              }}
            >
              {posts.filter((p) => p.status === "published").length}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>Published</div>
          </DemoCard>

          <DemoCard
            style={{
              background: "rgba(234, 179, 8, 0.1)",
              border: "2px solid rgba(234, 179, 8, 0.3)",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#eab308",
                marginBottom: "0.5rem",
              }}
            >
              {posts.filter((p) => p.status === "draft").length}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>Drafts</div>
          </DemoCard>

          <DemoCard
            style={{
              background: "rgba(59, 130, 246, 0.1)",
              border: "2px solid rgba(59, 130, 246, 0.3)",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#3b82f6",
                marginBottom: "0.5rem",
              }}
            >
              {[...new Set(posts.map((p) => p.category))].length}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>Categories</div>
          </DemoCard>
        </div>

        {/* Latest Posts */}
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#8b5cf6",
            marginBottom: "1rem",
          }}
        >
          📝 Latest Posts
        </h3>
        <div style={{ display: "grid", gap: "1rem" }}>
          {posts
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .slice(0, 5)
            .map((post) => (
              <DemoCard
                key={post.id}
                style={{
                  background: "rgba(139, 92, 246, 0.05)",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                  cursor: "pointer",
                }}
                onClick={() => onPostClick(post)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: "600",
                        color: "#8b5cf6",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {post.title}
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "rgba(255, 255, 255, 0.6)",
                      }}
                    >
                      {post.author} • {post.date} • {post.category}
                    </div>
                  </div>
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
              </DemoCard>
            ))}
        </div>
      </DemoSection>
    </div>
  );
};
