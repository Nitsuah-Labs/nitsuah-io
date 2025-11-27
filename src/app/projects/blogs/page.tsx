"use client";
import { useMemo, useState } from "react";
import Footer from "../../../app/_components/_site/Footer";
import HomeBar from "../../../app/_components/_site/Homebar";
import { blogPosts } from "../../../lib/data/blogs";
import BlogGrid from "./_comp/BlogGrid";
import BlogsControls from "./_comp/BlogsControls";
import BlogsHeader from "./_comp/BlogsHeader";
import NewBlogForm from "./_comp/NewBlogForm";
import "./_styles/Blog.module.css";

const Blogsite = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"recent" | "az">("recent");
  const [showNewBlogForm, setShowNewBlogForm] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>(["all"]);
    blogPosts.forEach((post) => {
      if (post.published) cats.add(post.category.toLowerCase());
    });
    return Array.from(cats);
  }, []);

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    let filtered = blogPosts.filter((post) => post.published);

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (post) => post.category.toLowerCase() === selectedCategory,
      );
    }

    // Sort
    if (sortBy === "recent") {
      filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    } else if (sortBy === "az") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [selectedCategory, sortBy]);

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
          <BlogsHeader
            showNewBlogForm={showNewBlogForm}
            setShowNewBlogForm={setShowNewBlogForm}
          />

          {showNewBlogForm && (
            <NewBlogForm onCancel={() => setShowNewBlogForm(false)} />
          )}

          <BlogsControls
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <BlogGrid filteredBlogs={filteredBlogs} />

          {filteredBlogs.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <p style={{ fontSize: "1.2rem" }}>
                No blogs found in this category.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blogsite;
