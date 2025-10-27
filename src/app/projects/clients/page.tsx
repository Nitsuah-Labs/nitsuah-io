// src/app/projects/clients/page.tsx
// CLIENTS - src/app/projects/clients/page.tsx //FIXME
"use client";
import React from "react";
import { Footer } from "./_comp/Footer";
import { Navigation } from "./_comp/Header";
import "./_styles/client.css";

// WEB3
import { Account } from "../../_components/_web3/Account";
import { Connect } from "../../_components/_web3/Connect";
import { Connected } from "../../_components/_web3/Connected";
import { MintNFT } from "../../_components/_web3/MintNFT";
import { NetworkSwitcher } from "../../_components/_web3/NetworkSwitcher";

// Removed unused constants (OpenSea, scanners, wallet links) — keep file focused

const MintExample: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <Navigation
            property1="navigation-desktop"
            style={
              {
                /* //TODO your style object */
              }
            }
            NFTMarketplace="/images/NFT-marketplace.svg"
            buttonIcon={<div />}
          />
        </div>
        <div className="middle-row">
          <Connect />
          <Connected>
            <Account />
            <br />
            <MintNFT />
            <br />
            <NetworkSwitcher />
            <br />
          </Connected>
        </div>
        <Footer
          screen="desktop"
          style={
            {
              /* your style object */
            }
          }
          subscribeWidget={<div />}
        />
      </div>
    </div>
  );
};

export default MintExample;
