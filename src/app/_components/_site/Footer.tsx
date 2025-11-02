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
    <>
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          style={{
            position: "fixed",
            bottom: "100px",
            right: "2rem",
            zIndex: 1000,
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            border: "2px solid rgba(0, 0, 0, 0.3)",
            color: "#fff",
            fontSize: "1.5rem",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(249, 115, 22, 0.4)",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow =
              "0 8px 20px rgba(249, 115, 22, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 12px rgba(249, 115, 22, 0.4)";
          }}
        >
          <i className="fa fa-chevron-up" aria-hidden="true"></i>
        </button>
      )}

      <footer className="footer-container">
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
      </footer>
    </>
  );
};

export default Footer;
