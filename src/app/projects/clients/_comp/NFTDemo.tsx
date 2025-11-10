// NFT Marketplace/Minting Demo
"use client";
import React, { useState } from "react";
import { Account } from "../../../_components/_web3/Account";
import { Connect } from "../../../_components/_web3/Connect";
import { Connected } from "../../../_components/_web3/Connected";
import { MintNFT } from "../../../_components/_web3/MintNFT";
import { NetworkSwitcher } from "../../../_components/_web3/NetworkSwitcher";

interface NFTDemoProps {
  initialView?: "gallery" | "mint";
}

export const NFTDemo: React.FC<NFTDemoProps> = ({
  initialView = "gallery",
}) => {
  const [view, setView] = useState<"gallery" | "mint">(initialView);
  const [walletView, setWalletView] = useState(false);

  const nftCollection = [
    {
      id: 1,
      name: "Cosmic Explorer #42",
      price: "0.5 ETH",
      image: "🌌",
      creator: "0x1234...5678",
    },
    {
      id: 2,
      name: "Digital Dreams #7",
      price: "0.3 ETH",
      image: "🎨",
      creator: "0xabcd...ef01",
    },
    {
      id: 3,
      name: "Pixel Punk #156",
      price: "0.8 ETH",
      image: "👾",
      creator: "0x9876...5432",
    },
    {
      id: 4,
      name: "Abstract Wave #23",
      price: "0.4 ETH",
      image: "🌊",
      creator: "0x5678...1234",
    },
    {
      id: 5,
      name: "Neon City #91",
      price: "0.6 ETH",
      image: "🏙️",
      creator: "0xfedc...ba98",
    },
    {
      id: 6,
      name: "Crystal Gem #5",
      price: "0.7 ETH",
      image: "💎",
      creator: "0x4321...8765",
    },
  ];

  if (walletView) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif" }}>
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
            padding: "1.5rem",
            borderRadius: "8px 8px 0 0",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#fff",
              margin: "0 0 0.5rem 0",
            }}
          >
            🎨 NFT Platform - Web3 Interaction
          </h1>
          <button
            onClick={() => setWalletView(false)}
            style={{
              padding: "0.5rem 1rem",
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "6px",
              color: "#fff",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "600",
            }}
          >
            ← Back to Gallery
          </button>
        </div>

        <div style={{ padding: "1.5rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <Connect />
          </div>
          <Connected>
            <div
              className="nft-wallet-grid"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "8px",
                }}
              >
                <Account />
              </div>
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "8px",
                }}
              >
                <MintNFT />
              </div>
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "8px",
                }}
              >
                <NetworkSwitcher />
              </div>
            </div>
          </Connected>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <style>{`
        @media (max-width: 768px) {
          .nft-header {
            padding: 1.5rem 1rem !important;
          }
          
          .nft-header h1 {
            font-size: 1.75rem !important;
          }
          
          .nft-nav {
            flex-direction: column;
            gap: 0.5rem !important;
          }
          
          .nft-nav button {
            width: 100%;
            justify-content: center !important;
          }
          
          .nft-gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          .nft-wallet-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (max-width: 480px) {
          .nft-gallery-grid {
            grid-template-columns: 1fr !important;
          }
          
          .nft-card {
            padding: 1rem !important;
          }
          
          .nft-nav button {
            font-size: 0.813rem !important;
            padding: 0.6rem 1rem !important;
          }
        }
      `}</style>
      {/* Header */}
      <div
        className="nft-header"
        style={{
          background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
          padding: "2rem 1.5rem",
          borderRadius: "8px 8px 0 0",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#fff",
            margin: "0 0 0.5rem 0",
          }}
        >
          🎨 NFT Marketplace
        </h1>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.9)",
            margin: 0,
            fontSize: "1rem",
          }}
        >
          Discover, collect, and trade unique digital assets
        </p>
      </div>

      {/* Navigation */}
      <nav
        className="nft-nav"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          padding: "1rem",
          background: "rgba(139, 92, 246, 0.1)",
          borderBottom: "2px solid rgba(139, 92, 246, 0.3)",
        }}
      >
        {[
          { id: "gallery", label: "Gallery", icon: "🖼️" },
          { id: "mint", label: "Mint NFT", icon: "✨" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as any)}
            style={{
              padding: "0.75rem 1.5rem",
              background:
                view === item.id ? "rgba(139, 92, 246, 0.3)" : "transparent",
              border:
                view === item.id
                  ? "2px solid #8b5cf6"
                  : "2px solid rgba(139, 92, 246, 0.3)",
              color: view === item.id ? "#8b5cf6" : "rgba(255, 255, 255, 0.7)",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div style={{ padding: "2rem 1.5rem", minHeight: "400px" }}>
        {view === "gallery" && (
          <div>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#8b5cf6",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Trending NFTs
            </h2>
            <div
              className="nft-gallery-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "1.5rem",
                maxWidth: "900px",
                margin: "0 auto",
              }}
            >
              {nftCollection.map((nft) => (
                <div
                  key={nft.id}
                  className="nft-card"
                  style={{
                    background: "rgba(139, 92, 246, 0.1)",
                    border: "2px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.borderColor = "#8b5cf6";
                    e.currentTarget.style.boxShadow =
                      "0 12px 24px rgba(139, 92, 246, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor =
                      "rgba(139, 92, 246, 0.3)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      fontSize: "5rem",
                      textAlign: "center",
                      padding: "2rem 1rem",
                      background:
                        "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(109, 40, 217, 0.2) 100%)",
                    }}
                  >
                    {nft.image}
                  </div>
                  <div style={{ padding: "1rem" }}>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        color: "#fff",
                        margin: "0 0 0.5rem 0",
                      }}
                    >
                      {nft.name}
                    </h3>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "rgba(255, 255, 255, 0.6)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      By {nft.creator}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: "700",
                          color: "#8b5cf6",
                        }}
                      >
                        {nft.price}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setWalletView(true);
                        }}
                        style={{
                          padding: "0.5rem 1rem",
                          background:
                            "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
                          border: "none",
                          color: "#fff",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: "0.875rem",
                        }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "2rem",
                textAlign: "center",
                padding: "1.5rem",
                background: "rgba(139, 92, 246, 0.1)",
                border: "2px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "12px",
                maxWidth: "600px",
                margin: "2rem auto 0",
              }}
            >
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  marginBottom: "1rem",
                }}
              >
                Connect your wallet to buy NFTs or mint your own!
              </p>
              <button
                onClick={() => setWalletView(true)}
                style={{
                  padding: "1rem 2rem",
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Connect Wallet
              </button>
            </div>
          </div>
        )}

        {view === "mint" && (
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#8b5cf6",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Create Your NFT
            </h2>
            <div
              style={{
                background: "rgba(139, 92, 246, 0.1)",
                border: "2px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "12px",
                padding: "2rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "4rem",
                  marginBottom: "1rem",
                }}
              >
                🎨
              </div>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  marginBottom: "1.5rem",
                  lineHeight: "1.6",
                }}
              >
                Minting requires a connected wallet. Connect your Web3 wallet to
                upload artwork, set properties, and mint your NFT on the
                blockchain.
              </p>
              <button
                onClick={() => setWalletView(true)}
                style={{
                  padding: "1rem 2rem",
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Connect Wallet to Mint
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "1rem",
          borderTop: "2px solid rgba(139, 92, 246, 0.3)",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "0.875rem",
        }}
      >
        © 2025 NFT Marketplace - Web3 Demo
      </div>
    </div>
  );
};
