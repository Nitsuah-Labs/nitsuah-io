"use client";
import { useEffect, useState } from "react";
import Footer from "../../../app/_components/_site/Footer";
import HomeBar from "../../../app/_components/_site/Homebar";
import BlogPanel from "./_components/BlogPanel.jsx";
import "./_styles/Blog.module.css";

const Blogsite = () => {
  const { publicKey } = "0x85C67d169A7bc00b252C2f3274c472a25c03b77d";
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchBlogs`)
        .then((response) => response.json())
        .then((data) => {
          setBlogs(data);
          console.log("BLOGS", data);
        });
    }
  }, [publicKey]);

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
              }}
            >
              On-chain Blog coming soon!
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {blogs.map((blog) => (
              <div
                key={blog.id}
                style={{
                  background: "rgba(20, 20, 20, 0.8)",
                  border: "2px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "12px",
                  padding: "1.5rem",
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
                <BlogPanel blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blogsite;
