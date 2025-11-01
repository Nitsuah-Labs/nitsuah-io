import Image from "next/image";
import React from "react";
import ape from "../../../../public/images/ape.png";
import "../_styles/labs.css";

// CONSTANTS
const TWITTER_HANDLE = "nitsuah";
const TWITTER_LINK = `https://github.com/${TWITTER_HANDLE}`;

const LabFooter: React.FC = () => {
  const handleImageClick = () => {
    window.open(`https://www.github.com/${TWITTER_HANDLE}`);
  };

  return (
    <footer>
      <div className="footer-container" onClick={handleImageClick}>
        <Image
          alt="ape 24px"
          className="footer-logo"
          src={ape}
          width={40}
          height={40}
        />
        <a
          className="footer-text"
          href={TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
          aria-label={`Follow @${TWITTER_HANDLE} on Twitter`}
        >
          <p>{`github — @${TWITTER_HANDLE}`}</p>
        </a>
      </div>
    </footer>
  );
};

export default LabFooter;
