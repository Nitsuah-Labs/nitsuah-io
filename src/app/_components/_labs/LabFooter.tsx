import React from "react";
import "../_styles/labs.css";
import ape from '../../../../public/images/ape.png';
import Image from 'next/image';

// CONSTANTS
const TWITTER_HANDLE = 'nitsuahlabs';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const LabFooter: React.FC = () => {
    const handleImageClick = () => {
      window.open('https://www.linkedin.com/in/austinjhardy', '');
    };

  return (
    <div className="footer-container" onClick={handleImageClick}>
      <Image alt="ape 24px" className="footer-logo"
        src={ape}
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

export default LabFooter;
