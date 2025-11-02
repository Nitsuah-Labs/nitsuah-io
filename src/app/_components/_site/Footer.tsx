// src/components/Footer.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import cat from "../../../../public/images/cat.png";
import "../_styles/global.css";

// CONSTANTS
const TWITTER_HANDLE = "nitsuah";
const TWITTER_LINK = `https://github.com/${TWITTER_HANDLE}`;

const Footer: React.FC = () => {
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
    <footer className="footer-container" style={{ position: "fixed" }}>
      <a
        href="https://www.linkedin.com/in/austinjhardy"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit Austin Hardy's LinkedIn profile"
      >
        <Image
          alt="Cat avatar icon for Austin Hardy"
          className="twitter-logo"
          src={cat}
          width={40}
          height={40}
        />
      </a>
      <a
        className="footer-text"
        href={TWITTER_LINK}
        target="_blank"
        rel="noreferrer"
        aria-label={`Follow @${TWITTER_HANDLE} on Twitter`}
      >
        {`@${TWITTER_HANDLE}`}
      </a>
      {/* Back to Top Button - Inside Footer */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          style={{
            position: "absolute",
            right: "2rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "0",
            height: "0",
            border: "none",
            borderLeft: "20px solid transparent",
            borderRight: "20px solid transparent",
            borderBottom: "25px solid #f97316",
            background: "transparent",
            cursor: "pointer",
            transition: "all 0.3s ease",
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderBottomColor = "#ea580c";
            e.currentTarget.style.filter =
              "drop-shadow(0 4px 8px rgba(249, 115, 22, 0.6))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderBottomColor = "#f97316";
            e.currentTarget.style.filter = "none";
          }}
        />
      )}
    </footer>
  );
};

export default Footer;
