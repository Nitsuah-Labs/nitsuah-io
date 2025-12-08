// src/components/Footer.tsx
"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import "../_styles/global.css";
import styles from "./Footer.module.css";
import GitHubButton from "./GitHubButton";
import ThemeToggle from "./ThemeToggle";

// CONSTANTS
const TWITTER_HANDLE = "nitsuah";
const TWITTER_LINK = `https://github.com/${TWITTER_HANDLE}`;

const Footer: React.FC = () => {
  const pathname = usePathname();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`footer-container ${styles.footer}`}>
      {/* Theme Toggle - Fixed to Left Side */}
      <div className={styles.themeToggleWrapper}>
        <ThemeToggle />
      </div>
      <a
        href="https://www.linkedin.com/in/austinjhardy"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit Austin Hardy's LinkedIn profile"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "1rem",
          height: "1rem",
          padding: "0.4rem",
          borderRadius: 6,
          textDecoration: "none",
          border: "1px solid #0A66C2",
          background: "#0A66C2",
          color: "#fff",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(10, 102, 194, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
          focusable={false}
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
      <p className="divider"> | </p>
      <GitHubButton />
      {/* Export PDF Button - Only visible on resume page */}
      {pathname === "/resume" && (
        <button
          onClick={() => window.print()}
          aria-label="Export resume as PDF"
          className={styles.exportPdfButton}
        >
          Export PDF
        </button>
      )}
      {/* Back to Top Button - Fixed to Right Side */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className={styles.backToTopButton}
        />
      )}
    </footer>
  );
};

export default Footer;
