"use client";

import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";
import "../_styles/client.css";
import { Storefront } from "./Storefront";

interface Props {
  screen: "desktop" | "tablet" | "mobile";
  style: React.CSSProperties;
  subscribeWidget: React.ReactElement;
}

export const Footer = ({
  screen,
  style,
  subscribeWidget, // add this prop
}: Props): React.ReactElement => {
  return (
    <div className={`footer ${screen}`} style={style}>
      <div className="footer-info">
        <div className="NFT-marketplace-info">
          <div className="logo">
            <Storefront
              color="#A259FF"
              style={{
                height: "32px",
                left: "0",
                position: "absolute",
                top: "0",
                width: "32px",
              }}
            />
            <Image
              className="NFT-marketplace"
              alt="Nft marketplace"
              src={
                screen === "tablet"
                  ? "/image.svg"
                  : screen === "mobile"
                    ? "/images/NFT-marketplace-2.svg"
                    : "/images/NFT-marketplace.svg"
              }
              width={32}
              height={32}
            />
          </div>
          <div className="additional-info">
            <p className="NFT-marketplace-UI">
              NFT marketplace UI created with Anima for Figma.
            </p>
            <div className="community-info">
              <div className="join-our-community">Join our community</div>
              <div className="icons"></div>
            </div>
          </div>
        </div>
        <div className="explore">
          <div className="div">Explore</div>
          <div className="pages">
            <div className="marketplace">Marketplace</div>
            <div className="rankings">Rankings</div>
            <div className="connect-a-wallet">Connect a wallet</div>
          </div>
        </div>
        <div className="subscribe">
          <div className="join-our-weekly">Join Our Weekly Digest</div>
          <div className="subscribe-form-info">{subscribeWidget}</div>
        </div>
      </div>
      <div className="frame">
        <p className="NFT-market-use-this">
          Ⓒ nitsuahlabs - use this template freely.
        </p>
      </div>
    </div>
  );
};

Footer.propTypes = {
  screen: PropTypes.oneOf(["desktop", "tablet", "mobile"]),
};
