// src/app/projects/clients/page.tsx
"use client";
import React from "react";
import Footer from "../../_components/_site/Footer";
import HomeBar from "../../_components/_site/Homebar";
import "./_styles/client.css";

// WEB3
import { Account } from "../../_components/_web3/Account";
import { Connect } from "../../_components/_web3/Connect";
import { Connected } from "../../_components/_web3/Connected";
import { MintNFT } from "../../_components/_web3/MintNFT";
import { NetworkSwitcher } from "../../_components/_web3/NetworkSwitcher";

const MintExample: React.FC = () => {
  return (
    <div className="App" style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <HomeBar />
      <main
        style={{
          marginTop: "80px",
          marginBottom: "60px",
          paddingBottom: "80px",
          minHeight: "calc(100vh - 140px)",
          padding: "2rem 1rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem", textAlign: "center" }}>
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "700",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "0.5rem",
              }}
            >
              CLIENT PROJECTS
            </h1>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "1.2rem",
              }}
            >
              Web3 NFT Minting Demo
            </p>
          </div>
          <div
            style={{
              background: "rgba(20, 20, 20, 0.8)",
              border: "2px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "12px",
              padding: "2rem",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <Connect />
            </div>
            <Connected>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <div
                  style={{
                    padding: "1rem",
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    borderRadius: "8px",
                  }}
                >
                  <Account />
                </div>
                <div
                  style={{
                    padding: "1rem",
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    borderRadius: "8px",
                  }}
                >
                  <MintNFT />
                </div>
                <div
                  style={{
                    padding: "1rem",
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    borderRadius: "8px",
                  }}
                >
                  <NetworkSwitcher />
                </div>
              </div>
            </Connected>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MintExample;
