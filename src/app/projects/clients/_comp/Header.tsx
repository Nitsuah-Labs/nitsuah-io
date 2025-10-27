"use client";

import { BaseError } from "viem";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import PropTypes from "prop-types";
import React from "react";
import Image from "next/image";
import { BurgerMenu } from "./BurgerMenu";
import { Button } from "./Button";
import { Storefront } from "./Storefront";
import { UserProfile } from "./userProfile";
import "../_styles/client.css";

interface Props {
  property1: "navigation-tablet" | "navigation-desktop" | "navigation-mobile";
  style: React.CSSProperties;
  NFTMarketplace: string;
  buttonIcon: JSX.Element;
}

export const Navigation = ({
  property1,
  style,
  NFTMarketplace = "/images/NFT-marketplace.svg",
  buttonIcon = (
    <UserProfile
      style={{
        height: "20px",
        minWidth: "20px",
        position: "relative",
      }}
    />
  ),
}: Props): JSX.Element => {
  return (
    <div className={`navigation ${property1}`} style={style}>
      <div className="nav-logo">
        <div className="div">
          {["navigation-mobile", "navigation-tablet"].includes(property1) && (
            <div className="logo">
              <Storefront
                color="white"
                style={{
                  height: "24px",
                  left: "0",
                  position: "absolute",
                  top: "0",
                  width: "24px",
                }}
              />
              <Image
                className="NFT-marketplace"
                alt="Nft marketplace"
                src={
                  property1 === "navigation-tablet"
                    ? "NFT-marketplace-2.svg"
                    : "image.svg"
                }
              />
            </div>
          )}

          {property1 === "navigation-desktop" && (
            <>
              <Storefront
                color="white"
                style={{
                  height: "32px",
                  left: "0",
                  position: "absolute",
                  top: "0",
                  width: "32px",
                }}
              />
              <Image
                className="img"
                alt="Nft marketplace"
                src={NFTMarketplace}
                width={32}
                height={32}
              />
            </>
          )}
        </div>
      </div>
      <div className="nav-nav-menu">
        {["navigation-mobile", "navigation-tablet"].includes(property1) && (
          <BurgerMenu
            style={{
              height: "24px",
              minWidth: "24px",
              position: "relative",
            }}
          />
        )}

        {property1 === "navigation-desktop" && (
          <>
            <div className="marketplace">
              <div className="button-i">Marketplace</div>
            </div>
            <div className="rankings">
              <div className="button-2">Rankings</div>
            </div>
            <div className="connect-a-wallet">
              <div className="button-3">Connect a wallet</div>
            </div>
            <Button
              icon={buttonIcon}
              property1="secondary-filled"
              hasLeftIcon={true}
              hasText={true}
              style={{
                padding: "0px 30px",
              }}
              text="Sign Up"
            />
          </>
        )}
      </div>
    </div>
  );
};

Navigation.propTypes = {
  property1: PropTypes.oneOf([
    "navigation-tablet",
    "navigation-desktop",
    "navigation-mobile",
  ]),
  NFTMarketplace: PropTypes.string,
};
