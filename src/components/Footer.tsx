import React from 'react';
import Image from 'next/image'; // Import Image from next/image for optimized image loading
import cat from '../../labs/assets/arf.png';

// CONSTANTS
const TWITTER_HANDLE = 'nitsuahlabs';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const Footer: React.FC = () => {
  return (
    <div className="footer-container">
      {/* Use next/image for optimized image loading */}
      <Image
        alt="arf"
        className="twitter-logo"
        src={cat}
        width={40} // Adjust width based on your design
        height={40} // Adjust height based on your design
        onClick={() => window.open('https://www.linkedin.com/in/austinjhardy', '')}
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
