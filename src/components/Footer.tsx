// src/components/Footer.tsx
'use client'

import React from 'react';
import Image from 'next/image';
import '../styles/home.css';
import cat from '../../public/images/cat.png';

// CONSTANTS
const TWITTER_HANDLE = 'nitsuahlabs';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const Footer: React.FC = () => {
  const handleImageClick = () => {
    window.open('https://www.linkedin.com/in/austinjhardy', '');
  };

  return (
    <div className="footer-container" onClick={handleImageClick}>
      <Image
        alt="arf"
        className="twitter-logo"
        src={cat}
        width={40}
        height={40}
      />
      <a
        className="footer-text"
        href={TWITTER_LINK}
        target="_blank"
        rel="noreferrer"
      >
        <p>{`@${TWITTER_HANDLE}`}</p>
      </a>
    </div>
  );
};

export default Footer;
