"use client";
import { useEffect, useState } from "react";
import Footer from "../../../app/_components/_site/Footer";
import HomeBar from "../../../app/_components/_site/Homebar";
import BlogPanel from "./_components/BlogPanel.jsx";
import "./_styles/Blog.module.css";

const Blogsite = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    // Load blogs from static JSON file
    import("./_api/blogs.json").then((data) => {
      setBlogs(data.default);
      setFilteredBlogs(data.default);
    });
  }, []);

  useEffect(() => {
    let filtered = [...blogs];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    // Sort blogs
    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "popular":
        filtered.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case "views":
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }

    setFilteredBlogs(filtered);
  }, [selectedCategory, sortBy, blogs]);

  const categories = ["all", ...new Set(blogs.map((blog) => blog.category))];

  const handleUpvote = (blogId, isUpvoted) => {
    console.log(`Blog ${blogId} ${isUpvoted ? "upvoted" : "downvoted"}`);
    // In a real app, this would update the backend
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
                marginBottom: "0.5rem",
              }}
            >
              BLOGS
            </h1>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "1.2rem",
                marginBottom: "1rem",
              }}
            >
              Technical insights, tutorials, and thoughts on web development
            </p>
            <button
              onClick={() => setShowUploadModal(true)}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                border: "2px solid #3b82f6",
                background: "rgba(59, 130, 246, 0.1)",
                color: "#3b82f6",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                marginTop: "1rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(59, 130, 246, 0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <i
                className="fa fa-plus"
                aria-hidden="true"
                style={{ marginRight: "0.5rem" }}
              ></i>
              Create New Post
            </button>
          </div>

          {/* Filters and Sorting */}
          <div
            style={{
              marginBottom: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {/* Category Filter */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    border:
                      selectedCategory === category
                        ? "2px solid #3b82f6"
                        : "2px solid rgba(255, 255, 255, 0.2)",
                    background:
                      selectedCategory === category
                        ? "rgba(59, 130, 246, 0.2)"
                        : "rgba(20, 20, 20, 0.8)",
                    color:
                      selectedCategory === category
                        ? "#3b82f6"
                        : "rgba(255, 255, 255, 0.7)",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontSize: "0.875rem",
                  }}
                >
                  {category === "all" ? "All" : category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                background: "rgba(20, 20, 20, 0.8)",
                color: "rgba(255, 255, 255, 0.7)",
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

        {/* Upload Modal */}
        {showUploadModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
              padding: "2rem",
            }}
            onClick={() => setShowUploadModal(false)}
          >
            <div
              style={{
                background: "rgba(20, 20, 20, 0.95)",
                border: "2px solid rgba(59, 130, 246, 0.5)",
                borderRadius: "12px",
                padding: "2rem",
                maxWidth: "600px",
                width: "100%",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <h2
                  style={{
                    color: "#3b82f6",
                    fontSize: "1.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  Create New Blog Post
                </h2>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "0.875rem",
                  }}
                >
                  This is a mockup interface. In production, this would connect
                  to a CMS or blockchain.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <input
                  type="text"
                  placeholder="Blog Title"
                  style={{
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "2px solid rgba(59, 130, 246, 0.3)",
                    background: "rgba(10, 10, 10, 0.8)",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                />
                <select
                  style={{
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "2px solid rgba(59, 130, 246, 0.3)",
                    background: "rgba(10, 10, 10, 0.8)",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                >
                  <option>Select Category</option>
                  <option>Web3</option>
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>TypeScript</option>
                  <option>CSS</option>
                </select>
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  style={{
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "2px solid rgba(59, 130, 246, 0.3)",
                    background: "rgba(10, 10, 10, 0.8)",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                />
                <textarea
                  placeholder="Blog content..."
                  rows={8}
                  style={{
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "2px solid rgba(59, 130, 246, 0.3)",
                    background: "rgba(10, 10, 10, 0.8)",
                    color: "#fff",
                    fontSize: "1rem",
                    resize: "vertical",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  style={{
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "2px solid rgba(59, 130, 246, 0.3)",
                    background: "rgba(10, 10, 10, 0.8)",
                    color: "#fff",
                    fontSize: "0.875rem",
                  }}
                />

                <div
                  style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}
                >
                  <button
                    onClick={() => setShowUploadModal(false)}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      borderRadius: "6px",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                      background: "rgba(20, 20, 20, 0.8)",
                      color: "rgba(255, 255, 255, 0.7)",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert(
                        "In production, this would publish to your chosen CMS or blockchain!",
                      );
                      setShowUploadModal(false);
                    }}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      borderRadius: "6px",
                      border: "2px solid #3b82f6",
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                      color: "#fff",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blogsite;
