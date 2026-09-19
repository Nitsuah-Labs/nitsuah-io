"use client";
import type { BlogPost } from "@/lib/data/blogs";
import Footer from "../../../app/_components/_site/Footer";
import HomeBar from "../../../app/_components/_site/Homebar";
import { blogPosts } from "../../../lib/data/blogs";
import BlogGrid from "./_comp/BlogGrid";
import BlogsHeader from "./_comp/BlogsHeader";
import "./_styles/Blog.module.css";

const Blogsite = () => {
  return (
    <div
      className="App"
      style={{ background: "var(--color-background)", minHeight: "100vh" }}
    >
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
          <BlogsHeader />
          <BlogGrid filteredBlogs={blogPosts} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blogsite;
