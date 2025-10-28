// MINT - src/app/labs/mint/page.tsx
"use client";
import React from "react";
import LabFooter from "../../_components/_labs/LabFooter";
import LabNav from "../../_components/_labs/LabNav";
import "../../_components/_styles/labs.css";
import { Connect } from "../../_components/_web3/Connect";
import { Connected } from "../../_components/_web3/Connected";

// LAB STYLES
import "../../_components/_styles/labs.css";

// LAB ASSETS (unused logos removed until needed)

import { Account } from "../../_components/_web3/Account";
import { MintNFT } from "../../_components/_web3/MintNFT";
import { NetworkSwitcher } from "../../_components/_web3/NetworkSwitcher";

// No extra constants required here; mint component reads contract info from web3 components

const MintSite: React.FC = () => {
  return (
    <div className="App">
      <LabNav />
      <h2>MINT PORTAL</h2>
      <div className="form-container">
        <div className="labs-card">
          <div className="labs-card-header">
            <h3 className="labs-card-title">Connect Your Wallet</h3>
          </div>
          <div className="labs-card-body">
            <Connect />
          </div>
        </div>

        <Connected>
          <div className="labs-card">
            <div className="labs-card-header">
              <h3 className="labs-card-title">Account Details</h3>
            </div>
            <div className="labs-card-body">
              <Account />
            </div>
          </div>

          <div className="labs-card">
            <div className="labs-card-header">
              <h3 className="labs-card-title">Mint NFT</h3>
            </div>
            <div className="labs-card-body">
              <MintNFT />
            </div>
          </div>

          <div className="labs-card">
            <div className="labs-card-header">
              <h3 className="labs-card-title">Network Settings</h3>
            </div>
            <div className="labs-card-body">
              <NetworkSwitcher />
            </div>
          </div>
        </Connected>
      </div>
      <LabFooter />
    </div>
  );
};

export default MintSite;
