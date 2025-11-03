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
    title: "🌑DARKMOON",
    description:
      "A web3 NFT project exploring a 3D lunar setting with F2P & P2P modes",
    link: "https://www.darkmoon.dev/",
    image: null,
    tags: ["NFT", "Solana", "3D Game"],
  },
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
  {
    title: "DevDAO",
    description:
      "Decentralized Autonomous Organization (DAO) implementation using JavaScript for governance and voting mechanisms.",
    link: "/labs/dao",
    image: devDao,
    tags: ["dao", "web3", "javascript"],
  },
  {
    title: "AutoGPT",
    description:
      "AI-powered writing assistant using GPT-3 API for automated content generation and creative writing support.",
    link: "https://buildspace.so/@nitsuah",
    image: autoGpt,
    tags: ["ai", "gpt3", "automation"],
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
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "#f97316",
                textAlign: "center",
              }}
            >
              Why Web3 Matters
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.7",
                marginBottom: "1rem",
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              Web3 represents a fundamental shift from centralized platforms to
              decentralized ownership and governance. It&apos;s about giving
              users control over their data, identity, and digital assets
              through blockchain technology.
            </p>
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.7",
                marginBottom: "1rem",
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              Beyond speculation, blockchain enables{" "}
              <strong>trustless verification</strong>,{" "}
              <strong>transparent governance</strong>, and{" "}
              <strong>programmable value exchange</strong>. NFTs and POAPs
              aren&apos;t just collectibles—they&apos;re proof of participation,
              achievement, and community membership that no central authority
              can revoke.
            </p>
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.7",
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              My exploration of this space focuses on practical applications:
              DAOs for decentralized decision-making, on-chain credentials for
              verifiable achievements, and building tools that make Web3 more
              accessible to developers and users alike.
            </p>
          </div>
          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "500",
              color: "rgba(255, 255, 255, 0.8)",
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
