"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useBalance, useDisconnect, useEnsName } from "wagmi";
import { getExplorerLink } from "../../lib/constants/networks";
import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";
import { Connect } from "../_components/_web3/Connect";

const ProfilePage: React.FC = () => {
  const { address, isConnected, chain } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success("Address copied to clipboard!", { icon: "📋" });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const explorerLink =
    address && chain ? getExplorerLink(address, chain.id) : null;

  return (
    <div
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HomeBar />
      <main
        style={{
          flex: 1,
          marginTop: "80px",
          padding: "2rem 1rem",
          maxWidth: "800px",
          width: "100%",
          margin: "80px auto 0",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          PROFILE
        </h1>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: "2rem",
            fontSize: "1.1rem",
          }}
        >
          {isConnected
            ? "Manage your wallet connection"
            : "Connect your wallet to view your profile"}
        </p>

        {!isConnected ? (
          <div
            style={{
              background: "#1a1a1a",
              border: "2px solid rgba(249, 115, 22, 0.3)",
              borderRadius: "12px",
              padding: "2rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                marginBottom: "1.5rem",
                color: "#f97316",
              }}
            >
              Connect Wallet
            </h2>
            <Connect />
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Wallet Address Card */}
            <div
              style={{
                background: "#1a1a1a",
                border: "2px solid rgba(249, 115, 22, 0.3)",
                borderRadius: "12px",
                padding: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "1rem",
                  color: "#f97316",
                }}
              >
                {ensName ? "ENS Name" : "Wallet Address"}
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <code
                  style={{
                    fontSize: "1.1rem",
                    padding: "0.75rem 1rem",
                    background: "#000",
                    borderRadius: "8px",
                    flex: 1,
                    minWidth: "200px",
                  }}
                >
                  {ensName || truncateAddress(address!)}
                </code>
                <button
                  onClick={handleCopyAddress}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: copied
                      ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                      : "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
                    border: "2px solid #000",
                    borderRadius: "8px",
                    color: "#fff",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              {ensName && (
                <p
                  style={{
                    marginTop: "0.5rem",
                    fontSize: "0.9rem",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  {truncateAddress(address!)}
                </p>
              )}
            </div>

            {/* Network Card */}
            <div
              style={{
                background: "#1a1a1a",
                border: "2px solid rgba(249, 115, 22, 0.3)",
                borderRadius: "12px",
                padding: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "1rem",
                  color: "#f97316",
                }}
              >
                Network
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    background: "#10b981",
                    borderRadius: "50%",
                    boxShadow: "0 0 8px rgba(16, 185, 129, 0.5)",
                  }}
                />
                <span style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                  {chain?.name || "Unknown Network"}
                </span>
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  (Chain ID: {chain?.id})
                </span>
              </div>
            </div>

            {/* Balance Card */}
            {balance && (
              <div
                style={{
                  background: "#1a1a1a",
                  border: "2px solid rgba(249, 115, 22, 0.3)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                    color: "#f97316",
                  }}
                >
                  Balance
                </h3>
                <p style={{ fontSize: "1.5rem", fontWeight: "700" }}>
                  {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                </p>
              </div>
            )}

            {/* Actions Card */}
            <div
              style={{
                background: "#1a1a1a",
                border: "2px solid rgba(249, 115, 22, 0.3)",
                borderRadius: "12px",
                padding: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "1rem",
                  color: "#f97316",
                }}
              >
                Actions
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                {explorerLink && (
                  <a
                    href={explorerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "0.75rem 1.5rem",
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                      border: "2px solid #000",
                      borderRadius: "8px",
                      color: "#fff",
                      fontWeight: "700",
                      cursor: "pointer",
                      textDecoration: "none",
                      display: "inline-block",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    View on Explorer
                  </a>
                )}
                <button
                  onClick={() => {
                    disconnect();
                    toast("Disconnecting wallet...", { icon: "👋" });
                  }}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background:
                      "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                    border: "2px solid #000",
                    borderRadius: "8px",
                    color: "#fff",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
