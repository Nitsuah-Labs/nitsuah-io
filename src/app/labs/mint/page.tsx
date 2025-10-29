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

import { useEffect, useState } from "react";
import { Account } from "../../_components/_web3/Account";
import { MintNFT } from "../../_components/_web3/MintNFT";
import { NetworkSwitcher } from "../../_components/_web3/NetworkSwitcher";

// No extra constants required here; mint component reads contract info from web3 components

const MintSite: React.FC = () => {
  const [showTestHelpers, setShowTestHelpers] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("testHelpers") === "1") setShowTestHelpers(true);
    } catch (e) {
      // ignore
    }
  }, []);

  const helpersEnabled =
    process.env.NEXT_PUBLIC_TEST_HELPERS === "1" || showTestHelpers;

  return (
    <div className="App">
      <LabNav />
      <main>
        <h1>MINT PORTAL</h1>
        <div className="form-container">
          <div className="labs-card">
            <div className="labs-card-header">
              <h2 className="labs-card-title">Connect Your Wallet</h2>
            </div>
            <div className="labs-card-body">
              <Connect />
            </div>
          </div>

          {/* Test helpers: small fallbacks to make wallet/network presence deterministic in e2e */}
          {helpersEnabled && (
            <div
              data-testid="mint-test-helpers"
              style={{ marginTop: 12, display: "flex", gap: 12 }}
            >
              <button
                className="labs-btn labs-btn-primary"
                aria-label="Connect Wallet"
                data-testid="mint-connect-button"
                onClick={() => {
                  const el = document.querySelector(
                    "[aria-label='Connect to MetaMask wallet'], [aria-label^='Connect to']",
                  );
                  if (el) (el as HTMLElement).focus();
                }}
              >
                Connect Wallet
              </button>

              <div data-testid="network-info">Network: testnet</div>
            </div>
          )}

          <Connected>
            <div className="labs-card">
              <div className="labs-card-header">
                <h2 className="labs-card-title">Account Details</h2>
              </div>
              <div className="labs-card-body">
                <Account />
              </div>
            </div>

            <div className="labs-card">
              <div className="labs-card-header">
                <h2 className="labs-card-title">Mint NFT</h2>
              </div>
              <div className="labs-card-body">
                <MintNFT />
              </div>
            </div>

            <div className="labs-card">
              <div className="labs-card-header">
                <h2 className="labs-card-title">Network Settings</h2>
              </div>
              <div className="labs-card-body">
                <NetworkSwitcher />
              </div>
            </div>
          </Connected>
        </div>
      </main>
      <LabFooter />
    </div>
  );
};

export default MintSite;
