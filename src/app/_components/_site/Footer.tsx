// src/components/Footer.tsx
"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import cat from "../../../../public/images/cat.png";
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
      <GitHubButton />
      {/* Export PDF Button - Only visible on resume page */}
      {pathname === "/resume" && (
        <button
          onClick={() => window.print()}
          aria-label="Export PDF"
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
