// src/components/Footer.tsx
"use client";

import Image from "next/image";
import React from "react";
import cat from "../../../../public/images/cat.png";
import "../_styles/global.css";

// CONSTANTS
const TWITTER_HANDLE = "nitsuahlabs";
const TWITTER_LINK = `https://github.com/${TWITTER_HANDLE}`;

const Footer: React.FC = () => {
  return (
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
  );
};

export default Footer;
