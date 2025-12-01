// src/components/Footer.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import cat from "../../../../public/images/cat.png";
import "../_styles/global.css";
import styles from "./Footer.module.css";

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
    <footer className={`footer-container ${styles.footer}`}>
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
          className={styles.backToTopButton}
        />
      )}
    </footer>
  );
};

export default Footer;
