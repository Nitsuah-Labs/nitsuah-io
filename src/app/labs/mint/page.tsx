// MINT - src/app/labs/mint/page.tsx // TODO ADD MINTING LOGIC

"use client";
import React from "react";

// LAB STYLES
import LabFooter from "../../_components/_labs/LabFooter";
import LabNav from "../../_components/_labs/LabNav";
import "../../_components/_styles/labs.css";

// LAB ASSETS (unused logos removed until needed)

import { Account } from "../../_components/_web3/Account";
import { Connect } from "../../_components/_web3/Connect";
import { Connected } from "../../_components/_web3/Connected";
import { MintNFT } from "../../_components/_web3/MintNFT";
import { NetworkSwitcher } from "../../_components/_web3/NetworkSwitcher";

// No extra constants required here; mint component reads contract info from web3 components

const MintSite: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <LabNav />
        </div>
        <div className="middle-row">
          <h2>MINT PORTAL</h2>
          <Connect />
          <Connected>
            <Account />
            <br />
            <MintNFT />
            <br />
            <NetworkSwitcher />
            <br />
          </Connected>
          <div className="footer">
            <LabFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintSite;
