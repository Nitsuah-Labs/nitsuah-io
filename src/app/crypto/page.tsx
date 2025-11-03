// app/cryto/page.tsx
"use client";
import { Grid } from "@mui/material";
import Image from "next/image";

import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";
import "../_components/_styles/global.css";
import "../_components/_styles/SelectedProjects.css";

import trail from "./_assets/cbtb.png";
import dao from "./_assets/dao.gif";
import gaad from "./_assets/gaad-poap.gif";
import ledger from "./_assets/ledger.png";
import mint from "./_assets/mint.gif";

// Import images for moved projects from projects/_assets
import ensNft from "../projects/_assets/ens.gif";
import nightsWeekends from "../projects/_assets/nights+weekends.png";
import solDapp from "../projects/_assets/sol-dapp.gif";
import solCore from "../projects/_assets/solana-logo.png";
import ethIntro from "../projects/_assets/web3-intro.png";
import nftStore from "../projects/_assets/web3-mint.png";

const web3Data = [
  {
    title: "Crypto Trailblazer",
    description:
      "Early adopter NFT of Coinbassador education & activity program at Coinbase",
    link: "https://opensea.io/assets/matic/0xb62c2b82a8fe234c96ab1a4c9d50305fd19ef079/259",
    image: trail,
    tags: ["NFT", "Polygon", "Coinbase"],
  },
  {
    title: "Ledger NFT",
    description: "Attended a Coinbassador Hardware wallet partnership session",
    link: "https://opensea.io/assets/matic/0xb62c2b82a8fe234c96ab1a4c9d50305fd19ef079/376",
    image: ledger,
    tags: ["NFT", "Polygon", "Security"],
  },
  {
    title: "DAO NFT",
    description:
      "DAO membership token for decentralized governance participation",
    link: "https://opensea.io/assets/matic/0xc94a4a1a6c12f9c9f56894ba00d99f766a800e39/0",
    image: dao,
    tags: ["NFT", "DAO", "Governance", "CryptoU"],
  },
  {
    title: "#MintMadness",
    description:
      "CryptoU - AI image generation minting contest participation token",
    link: "https://opensea.io/assets/matic/0xc94a4a1a6c12f9c9f56894ba00d99f766a800e39/2",
    image: mint,
    tags: ["NFT", "DALL·E", "CryptoU"],
  },
  {
    title: "#GAAD POAP",
    description:
      "Global Accessibility Awareness Day commemorative proof of attendance protocol (POAP)",
    link: "https://app.poap.xyz/token/6633244",
    image: gaad,
    tags: ["POAP", "A11y"],
  },
  {
    title: "N+W S1",
    description:
      "Participation in Buildspace's Nights + Weekends Season 1 program, building Web3 projects in a community setting.",
    link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/22083",
    image: nightsWeekends,
    tags: ["buildspace", "web3", "community"],
  },
  {
    title: "ETH Core",
    description:
      "Foundational Ethereum smart contract development project covering Solidity programming and Web3 integration.",
    link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/18457",
    image: ethIntro,
    tags: ["ethereum", "solidity", "web3"],
  },
  {
    title: "ETH dApp",
    description:
      "Full-featured Ethereum dApp for minting NFT collections with smart contract integration.",
    link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/18857",
    image: nftStore,
    tags: ["ethereum", "nft", "web3", "dapp"],
  },
  {
    title: "NFT Store",
    description:
      "Complete NFT storefront built on Solana with payment processing and collection management.",
    link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/19051",
    image: nftStore,
    tags: ["nft", "solana", "web3", "marketplace"],
  },
  {
    title: "SOL Core",
    description:
      "Core Solana blockchain development course covering Rust, Anchor framework, and Solana program architecture.",
    link: "https://darkmoon.dev/about",
    image: solCore,
    tags: ["solana", "rust", "web3"],
  },
  {
    title: "ENS NFT",
    description:
      "ENS (Ethereum Name Service) subdomain NFT implementation on Polygon, allowing users to mint custom subdomain names as NFTs.",
    link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/18179",
    image: ensNft,
    tags: ["nft", "ens", "polygon", "web3"],
  },
  {
    title: "SOL dApp",
    description:
      "Decentralized application built on Solana blockchain with wallet integration and on-chain interactions.",
    link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/19995",
    image: solDapp,
    tags: ["solana", "web3", "dapp"],
  },
];

const CryptoPage = () => {
  return (
    <div className="App">
      <HomeBar />
      <main
        className="content-container"
        style={{
          marginTop: "80px",
          marginBottom: "80px",
          paddingBottom: "200px", // Increased footer spacing buffer
          minHeight: "calc(100vh - 200px)",
          padding: "2rem 1rem",
        }}
      >
        <div
          className="projects-header"
          style={{
            marginBottom: "48px",
            maxWidth: "900px",
            margin: "0 auto 48px",
            textAlign: "center",
          }}
        >
          <h1 style={{ marginBottom: "1.5rem" }}>Web3 & Crypto</h1>
          <div
            style={{
              background: "rgba(249, 115, 22, 0.1)",
              border: "2px solid rgba(249, 115, 22, 0.3)",
              borderRadius: "12px",
              padding: "2rem",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "600",
                marginBottom: "2.5rem",
                color: "#f97316",
                textAlign: "center",
              }}
            >
              Why Web3 Matters
            </h2>

            <Grid container spacing={4} style={{ marginBottom: "2rem" }}>
              <Grid item xs={12} md={4}>
                <div style={{ textAlign: "center", padding: "1.5rem 1rem" }}>
                  <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
                    🔐
                  </div>
                  <h3
                    style={{
                      color: "#f97316",
                      fontSize: "1.4rem",
                      marginBottom: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    Ownership
                  </h3>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: "1rem",
                      lineHeight: "1.6",
                    }}
                  >
                    Control your data, identity, and digital assets
                  </p>
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                <div style={{ textAlign: "center", padding: "1.5rem 1rem" }}>
                  <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
                    ✅
                  </div>
                  <h3
                    style={{
                      color: "#f97316",
                      fontSize: "1.4rem",
                      marginBottom: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    Verification
                  </h3>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: "1rem",
                      lineHeight: "1.6",
                    }}
                  >
                    Trustless verification & transparent governance
                  </p>
                </div>
              </Grid>

              <Grid item xs={12} md={4}>
                <div style={{ textAlign: "center", padding: "1.5rem 1rem" }}>
                  <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
                    🛠️
                  </div>
                  <h3
                    style={{
                      color: "#f97316",
                      fontSize: "1.4rem",
                      marginBottom: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    Innovation
                  </h3>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: "1rem",
                      lineHeight: "1.6",
                    }}
                  >
                    Building practical DAOs, credentials & tools
                  </p>
                </div>
              </Grid>
            </Grid>

            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: "1.7",
                color: "rgba(255, 255, 255, 0.85)",
                marginTop: "2rem",
                textAlign: "center",
                fontStyle: "italic",
                maxWidth: "800px",
                margin: "2rem auto 0",
              }}
            >
              For me, Web3 isn&apos;t about speculation—it&apos;s about building
              a more transparent, accessible internet where users own their
              digital identity and communities govern themselves without
              intermediaries.
            </p>
          </div>
          <p
            style={{
              fontSize: "1.3rem",
              fontWeight: "600",
              color: "#f97316",
              marginTop: "3rem",
              marginBottom: "1.5rem",
            }}
          >
            NFTs, POAPs, and On-Chain Achievements
          </p>
        </div>

        <Grid container spacing={3} rowSpacing={6}>
          {" "}
          {/* Increased rowSpacing from 4 to 6 for better separation */}
          {web3Data.map((project, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <div
                className="portfolio-card"
                onClick={() => window.open(project.link, "_blank")}
                style={{
                  cursor: "pointer",
                  background: "rgba(20, 20, 20, 0.8)",
                  border: "2px solid rgba(249, 115, 22, 0.3)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(249, 115, 22, 0.8)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(249, 115, 22, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(249, 115, 22, 0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="portfolio-card-image">
                  {project.image ? (
                    <Image
                      alt={project.title}
                      src={project.image}
                      fill
                      style={{ objectFit: "cover" }}
                      unoptimized={
                        project.image === dao ||
                        project.image === gaad ||
                        project.image === mint
                      }
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        fontSize: "1.5rem",
                        fontWeight: "700",
                      }}
                    >
                      {project.title}
                    </div>
                  )}
                </div>

                <div className="portfolio-card-content">
                  <h2 className="portfolio-card-title">{project.title}</h2>

                  {project.description && (
                    <p className="portfolio-card-description">
                      {project.description}
                    </p>
                  )}

                  {project.tags && project.tags.length > 0 && (
                    <div className="portfolio-card-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="portfolio-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="portfolio-card-links">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-link portfolio-link-primary"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        background:
                          "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                        color: "#000",
                        border: "2px solid #000",
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(249, 115, 22, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      View on Chain
                    </a>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </main>
      <Footer />
    </div>
  );
};

export default CryptoPage;
