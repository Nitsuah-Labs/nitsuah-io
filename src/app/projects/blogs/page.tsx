"use client";
import { useEffect, useState } from "react";
import Footer from "../../../app/_components/_site/Footer";
import HomeBar from "../../../app/_components/_site/Homebar";
import { Modal } from "../../../components/ui/Modal";
import { useBlogFilters, useModal } from "../../../hooks";
import BlogPanel from "./_components/BlogPanel.jsx";
import "./_styles/Blog.module.css";

interface Blog {
  id: number;
  title: string;
  slug?: string;
  excerpt?: string;
  description?: string;
  content?: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image_url: string;
  upvotes: number;
  comments: number;
  views: number;
}

const Blogsite = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { isOpen, close } = useModal();
  const {
    filteredBlogs,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    categories,
  } = useBlogFilters(blogs);

  useEffect(() => {
    import("./_api/blogs.json").then((data) => {
      setBlogs(data.default);
    });
  }, []);

  const handleUpvote = (blogId: number, isUpvoted: boolean) => {
    console.log(`Blog ${blogId} ${isUpvoted ? "upvoted" : "downvoted"}`);
  };

  return (
    <div className="App" style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <HomeBar />
      <main
        style={{
          marginTop: "80px",
          marginBottom: "60px",
          paddingBottom: "80px",
          minHeight: "calc(100vh - 140px)",
          padding: "2rem 1rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
              Blog & Articles
            </h1>
            <p
              style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "1.1rem" }}
            >
              Thoughts on Web3, development, and technology
            </p>
          </div>

          {/* Filters and Sort */}
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
                      selectedCategory === cat
                        ? "#3b82f6"
                        : "rgba(59, 130, 246, 0.3)",
                    background:
                      selectedCategory === cat ? "#3b82f6" : "transparent",
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
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                border: "2px solid rgba(59, 130, 246, 0.3)",
                background: "rgba(10, 10, 10, 0.8)",
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>

          {/* Blog Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "2rem",
            }}
          >
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                style={{
                  background: "rgba(20, 20, 20, 0.8)",
                  border: "2px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.8)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(59, 130, 246, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <BlogPanel blog={blog} onUpvote={handleUpvote} />
              </div>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <i
                className="fa fa-file-text-o"
                aria-hidden="true"
                style={{ fontSize: "4rem", marginBottom: "1rem" }}
              ></i>
              <p style={{ fontSize: "1.2rem" }}>
                No blogs found in this category.
              </p>
            </div>
          )}
        </div>

        {/* Upload Modal - Using reusable Modal component */}
        <Modal
          isOpen={isOpen}
          onClose={close}
          title="Create New Blog Post"
          size="lg"
        >
          <p
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              marginBottom: "1.5rem",
            }}
          >
            This is a mockup interface. In production, this would connect to a
            CMS or blockchain.
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <input
              type="text"
              placeholder="Blog Title"
              className="blog-input"
            />
            <select className="blog-input">
              <option>Select Category</option>
              <option>Web3</option>
              <option>Frontend</option>
              <option>Backend</option>
            </select>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              className="blog-input"
            />
            <textarea
              placeholder="Blog content..."
              rows={8}
              className="blog-input"
            />
            <input type="file" accept="image/*" className="blog-input" />
          </div>
        </Modal>
      </main>
      <Footer />
    </div>
  );
};

export default Blogsite;
