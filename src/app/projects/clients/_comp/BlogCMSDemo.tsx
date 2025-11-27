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
import { DemoButton, DemoCard, DemoHeader } from "../../../../components/demos";
import { Dashboard } from "./blogcms/Dashboard";
import { PostEditor } from "./blogcms/PostEditor";
import { PostsList } from "./blogcms/PostsList";

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
      {/* Dashboard Page */}
      {currentPage === "dashboard" && (
        <Dashboard
          posts={posts}
          onPostClick={(post) => {
            setEditingPost(post);
            setCurrentPage("edit");
          }}
        />
      )}

      {/* Posts List Page */}
      {currentPage === "posts" && (
        <PostsList
          posts={filteredPosts}
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilterStatus}
          onEditPost={(post) => {
            setEditingPost(post);
            setCurrentPage("edit");
          }}
          onToggleStatus={togglePostStatus}
          onDeletePost={setShowDeleteModal}
        />
      )}

      {/* Create Post Page */}
      {currentPage === "create" && (
        <PostEditor
          mode="create"
          post={newPost}
          onPostChange={setNewPost}
          onSave={createPost}
          onCancel={() => {
            setNewPost(initialNewPost);
            setCurrentPage("posts");
          }}
          disabled={
            !newPost.title ||
            !newPost.excerpt ||
            !newPost.content ||
            !newPost.author
          }
        />
      )}

      {/* Edit Post Page */}
      {currentPage === "edit" && editingPost && (
        <PostEditor
          mode="edit"
          post={editingPost}
          onPostChange={(post) => setEditingPost(post as BlogPost)}
          onSave={updatePost}
          onCancel={() => {
            setEditingPost(null);
            setCurrentPage("posts");
          }}
        />
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
