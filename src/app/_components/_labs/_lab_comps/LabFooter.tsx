import React from "react";
import "../_components/_styles/labs.css";
import arf from '../assets/arf.png';
import Image from 'next/image';

// CONSTANTS
const TWITTER_HANDLE = 'nitsuahlabs';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

function Footer() {
return (
    <div className="footer-container">
        <Image alt="arf sappyseals nft #534" className="footer-logo"
                    src={arf} />
        <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
        >
            <p>{`@${TWITTER_HANDLE}`}</p></a>
    </div>
);
}
  
export default Footer;