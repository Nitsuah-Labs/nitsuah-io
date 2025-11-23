/**
 * BlogCMSDemo.tsx
 * Standalone Blog Content Management System Demo - "TechBlog CMS"
 *
 * Features:
 * - Dashboard with statistics and latest posts
 * - Posts list with search and filter
 * - Rich text editor for creating posts
 * - Post editing interface
 * - Category management
 */

"use client";
import {
  initialNewPost,
  mockBlogPosts,
  type BlogPost,
} from "@/lib/data/demos/blog-data";
import React, { useState } from "react";
import {
  DemoButton,
  DemoCard,
  DemoHeader,
  DemoSection,
} from "../../../../components/demos";

type PageType = "dashboard" | "posts" | "create" | "edit";

export const BlogCMSDemo: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState<Partial<BlogPost>>(initialNewPost);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "published" | "draft"
  >("all");

  const createPost = () => {
    if (
      !newPost.title ||
      !newPost.excerpt ||
      !newPost.content ||
      !newPost.author
    )
      return;

    const post: BlogPost = {
      id: Math.max(...posts.map((p) => p.id), 0) + 1,
      title: newPost.title,
      excerpt: newPost.excerpt,
      content: newPost.content,
      author: newPost.author,
      category: newPost.category || "Uncategorized",
      date: new Date().toISOString().split("T")[0],
      status: (newPost.status as "published" | "draft") || "draft",
    };

    setPosts([post, ...posts]);
    setNewPost({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
      status: "draft",
    });
    setCurrentPage("posts");
  };

  const updatePost = () => {
    if (!editingPost) return;

    setPosts(posts.map((p) => (p.id === editingPost.id ? editingPost : p)));
    setEditingPost(null);
    setCurrentPage("posts");
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id));
    setShowDeleteModal(null);
  };

  const togglePostStatus = (id: number) => {
    setPosts(
      posts.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "published" ? "draft" : "published" }
          : p,
      ),
    );
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || post.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%)",
        color: "white",
        padding: "2rem 1rem",
      }}
    >
      {/* Header */}
      <DemoHeader
        title="📝 TechBlog CMS"
        subtitle="Content Management System"
        actions={
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <DemoButton
              variant={currentPage === "dashboard" ? "primary" : "ghost"}
              onClick={() => setCurrentPage("dashboard")}
            >
              Dashboard
            </DemoButton>
            <DemoButton
              variant={currentPage === "posts" ? "primary" : "ghost"}
              onClick={() => setCurrentPage("posts")}
            >
              Posts
            </DemoButton>
            <DemoButton
              variant={currentPage === "create" ? "success" : "secondary"}
              onClick={() => setCurrentPage("create")}
            >
              + New Post
            </DemoButton>
          </div>
        }
      />

      {/* Dashboard Page */}
      {currentPage === "dashboard" && (
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
                <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Total Posts
                </div>
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
                <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Published
                </div>
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
                <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Categories
                </div>
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
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
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
                    onClick={() => {
                      setEditingPost(post);
                      setCurrentPage("edit");
                    }}
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
      )}

      {/* Posts List Page */}
      {currentPage === "posts" && (
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
                onChange={(e) => setSearchTerm(e.target.value)}
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
                  onClick={() => setFilterStatus("all")}
                >
                  All
                </DemoButton>
                <DemoButton
                  variant={
                    filterStatus === "published" ? "success" : "secondary"
                  }
                  size="small"
                  onClick={() => setFilterStatus("published")}
                >
                  Published
                </DemoButton>
                <DemoButton
                  variant={filterStatus === "draft" ? "secondary" : "secondary"}
                  size="small"
                  onClick={() => setFilterStatus("draft")}
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
                      onClick={() => {
                        setEditingPost(post);
                        setCurrentPage("edit");
                      }}
                      style={{ flex: 1 }}
                    >
                      Edit
                    </DemoButton>
                    <DemoButton
                      variant={
                        post.status === "published" ? "secondary" : "success"
                      }
                      size="small"
                      onClick={() => togglePostStatus(post.id)}
                    >
                      {post.status === "published" ? "Unpublish" : "Publish"}
                    </DemoButton>
                    <DemoButton
                      variant="danger"
                      size="small"
                      onClick={() => setShowDeleteModal(post.id)}
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
      )}

      {/* Create Post Page */}
      {currentPage === "create" && (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <DemoSection title="Create New Post">
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
                  value={newPost.title || ""}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
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
                  value={newPost.excerpt || ""}
                  onChange={(e) =>
                    setNewPost({ ...newPost, excerpt: e.target.value })
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
                  value={newPost.content || ""}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
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
                    value={newPost.author || ""}
                    onChange={(e) =>
                      setNewPost({ ...newPost, author: e.target.value })
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
                    value={newPost.category || ""}
                    onChange={(e) =>
                      setNewPost({ ...newPost, category: e.target.value })
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
                  value={newPost.status || "draft"}
                  onChange={(e) =>
                    setNewPost({
                      ...newPost,
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
                  onClick={createPost}
                  disabled={
                    !newPost.title ||
                    !newPost.excerpt ||
                    !newPost.content ||
                    !newPost.author
                  }
                  style={{ flex: 1 }}
                >
                  Create Post
                </DemoButton>
                <DemoButton
                  variant="secondary"
                  onClick={() => {
                    setNewPost({
                      title: "",
                      excerpt: "",
                      content: "",
                      author: "",
                      category: "",
                      status: "draft",
                    });
                    setCurrentPage("posts");
                  }}
                >
                  Cancel
                </DemoButton>
              </div>
            </DemoCard>
          </DemoSection>
        </div>
      )}

      {/* Edit Post Page */}
      {currentPage === "edit" && editingPost && (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <DemoSection title="Edit Post">
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
                  value={editingPost.title}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, title: e.target.value })
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
                  value={editingPost.excerpt}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, excerpt: e.target.value })
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
                  value={editingPost.content}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, content: e.target.value })
                  }
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
                    value={editingPost.author}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, author: e.target.value })
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
                    value={editingPost.category}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        category: e.target.value,
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
                  value={editingPost.status}
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
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
                  onClick={updatePost}
                  style={{ flex: 1 }}
                >
                  Update Post
                </DemoButton>
                <DemoButton
                  variant="secondary"
                  onClick={() => {
                    setEditingPost(null);
                    setCurrentPage("posts");
                  }}
                >
                  Cancel
                </DemoButton>
              </div>
            </DemoCard>
          </DemoSection>
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.6)",
          padding: "2rem 1rem",
          borderTop: "2px solid rgba(139, 92, 246, 0.2)",
          marginTop: "3rem",
        }}
      >
        © 2025 TechBlog CMS - Content Management Demo
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowDeleteModal(null)}
        >
          <div
            style={{
              maxWidth: "400px",
              width: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <DemoCard
              style={{
                border: "2px solid rgba(239, 68, 68, 0.5)",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                ⚠️
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#ef4444",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                Delete Post?
              </h3>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  textAlign: "center",
                  marginBottom: "1.5rem",
                }}
              >
                This action cannot be undone. Are you sure you want to delete
                this post?
              </p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <DemoButton
                  variant="danger"
                  onClick={() => deletePost(showDeleteModal)}
                  style={{ flex: 1 }}
                >
                  Delete
                </DemoButton>
                <DemoButton
                  variant="secondary"
                  onClick={() => setShowDeleteModal(null)}
                  style={{ flex: 1 }}
                >
                  Cancel
                </DemoButton>
              </div>
            </DemoCard>
          </div>
        </div>
      )}
    </div>
  );
};
