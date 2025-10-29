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

const web3Data = [
  {
    title: "#LIVECRYPTO",
    description:
      "Coinbase Learn & Earn campaign - Educational crypto initiative",
    link: "https://www.coinbase.com/livecrypto",
    image: null,
    tags: ["Education", "Coinbase"],
  },
  {
    title: "Trailblazer NFT",
    description: "Early adopter NFT from Buildspace program on Polygon",
    link: "https://opensea.io/assets/matic/0xb62c2b82a8fe234c96ab1a4c9d50305fd19ef079/259",
    image: trail,
    tags: ["NFT", "Polygon", "Buildspace"],
  },
  {
    title: "Ledger NFT",
    description: "Hardware wallet community NFT collectible",
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
    tags: ["NFT", "DAO", "Governance"],
  },
  {
    title: "#MintMadness",
    description: "NFT minting campaign participation token",
    link: "https://opensea.io/assets/matic/0xc94a4a1a6c12f9c9f56894ba00d99f766a800e39/2",
    image: mint,
    tags: ["NFT", "Campaign"],
  },
  {
    title: "#GAAD POAP",
    description: "Global Accessibility Awareness Day commemorative POAP",
    link: "https://app.poap.xyz/token/6633244",
    image: gaad,
    tags: ["POAP", "A11y", "Event"],
  },
];

const CryptoPage = () => {
  return (
    <div className="App">
      <HomeBar />
      <main
        className="content-container"
        style={{
          marginTop: "80px", // Increased from 64px to prevent header cutoff
          marginBottom: "60px",
          overflowY: "auto",
          height: "calc(100vh - 140px)", // Adjusted for increased margin
          padding: "2rem 1rem",
        }}
      >
        <div className="projects-header" style={{ marginBottom: "32px" }}>
          <h1>Web3 & Crypto</h1>
          <p>NFTs, POAPs, and blockchain achievements</p>
        </div>

        <Grid container spacing={3} rowSpacing={6}>
          {" "}
          {/* Increased rowSpacing from 4 to 6 for better separation */}
          {web3Data.map((project, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <div
                className="portfolio-card"
                onClick={() => window.open(project.link, "_blank")}
                style={{ cursor: "pointer" }}
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
