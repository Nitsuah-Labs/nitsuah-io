"use client";
import React, { useEffect, useState } from "react";
import "./_styles/Blog.module.css";
import BlogPanel from "./_components/BlogPanel.jsx";
import HomeBar from "../../../app/_components/_site/Homebar";
import Footer from "../../../app/_components/_site/Footer";

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

  const renderBlogContainer = () => (
    <div className="blogs-container">
      {blogs.map((blog) => (
        <div className="blogs-card bg-blur" key={blog.id}>
          <BlogPanel blog={blog} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <HomeBar />
        </div>
        <div className="project-container">
          <h2>BLOGS</h2>
          <h3>On-chain Blog coming soon!</h3>
          {renderBlogContainer()}
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Blogsite;
