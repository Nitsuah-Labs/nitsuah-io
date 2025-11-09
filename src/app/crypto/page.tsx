// app/cryto/page.tsx
"use client";
import Image from "next/image";
import { useMemo, useState } from "react";

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
    featured: true,
  },
  {
    title: "Ledger NFT",
    description: "Attended a Coinbassador Hardware wallet partnership session",
    link: "https://opensea.io/assets/matic/0xb62c2b82a8fe234c96ab1a4c9d50305fd19ef079/376",
    image: ledger,
    tags: ["NFT", "Polygon", "Security"],
    featured: false,
  },
  {
    title: "DAO NFT",
    description:
      "DAO membership token for decentralized governance participation",
    link: "https://opensea.io/assets/matic/0xc94a4a1a6c12f9c9f56894ba00d99f766a800e39/0",
    image: dao,
    tags: ["NFT", "DAO", "Governance", "CryptoU"],
    featured: true,
  },
  {
    title: "#MintMadness",
    description:
      "CryptoU - AI image generation minting contest participation token",
    link: "https://opensea.io/assets/matic/0xc94a4a1a6c12f9c9f56894ba00d99f766a800e39/2",
    image: mint,
    tags: ["NFT", "DALL·E", "CryptoU"],
    featured: false,
  },
  {
    title: "#GAAD POAP",
    description:
      "Global Accessibility Awareness Day commemorative proof of attendance protocol (POAP)",
    link: "https://app.poap.xyz/token/6633244",
    image: gaad,
    tags: ["POAP", "A11y"],
    featured: false,
  },
  {
    title: "N+W S1",
    description:
      "Participation in Buildspace's Nights + Weekends Season 1 program, building Web3 projects in a community setting.",
    link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/22083",
    image: nightsWeekends,
    tags: ["buildspace", "web3", "community"],
    featured: false,
  },
  {
    title: "ETH Core",
    description:
      "Foundational Ethereum smart contract development project covering Solidity programming and Web3 integration.",
    link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/18457",
    image: ethIntro,
    tags: ["ethereum", "solidity", "web3"],
    featured: false,
  },
  {
    title: "ETH dApp",
    description:
      "Full-featured Ethereum dApp for minting NFT collections with smart contract integration.",
    link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/18857",
    image: nftStore,
    tags: ["ethereum", "nft", "web3", "dapp"],
    featured: false,
  },
  {
    title: "NFT Store",
    description:
      "Complete NFT storefront built on Solana with payment processing and collection management.",
    link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/19051",
    image: nftStore,
    tags: ["nft", "solana", "web3", "marketplace"],
    featured: false,
  },
  {
    title: "SOL Core",
    description:
      "Core Solana blockchain development course covering Rust, Anchor framework, and Solana program architecture.",
    link: "https://darkmoon.dev/about",
    image: solCore,
    tags: ["solana", "rust", "web3"],
    featured: false,
  },
  {
    title: "ENS NFT",
    description:
      "ENS (Ethereum Name Service) subdomain NFT implementation on Polygon, allowing users to mint custom subdomain names as NFTs.",
    link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/18179",
    image: ensNft,
    tags: ["nft", "ens", "polygon", "web3"],
    featured: false,
  },
  {
    title: "SOL dApp",
    description:
      "Decentralized application built on Solana blockchain with wallet integration and on-chain interactions.",
    link: "https://opensea.io/assets/matic/0x3cd266509d127d0eac42f4474f57d0526804b44e/19995",
    image: solDapp,
    tags: ["solana", "web3", "dapp"],
    featured: false,
  },
];

const CryptoPage = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Sort projects: featured first
  const sortedProjects = useMemo(() => {
    return [...web3Data].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, []);

  // Get available tags from all projects
  const availableTags = useMemo(() => {
    let projectsForTags = sortedProjects;

    // Filter by selected tags to show only relevant tags
    if (selectedTags.length > 0) {
      projectsForTags = projectsForTags.filter((project) =>
        selectedTags.every((tag) => project.tags.includes(tag)),
      );
    }

    const tagsSet = new Set<string>();
    projectsForTags.forEach((project) => {
      project.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [sortedProjects, selectedTags]);

  // Filter projects by tags (AND logic)
  const filteredProjects = useMemo(() => {
    let filtered = sortedProjects;

    if (selectedTags.length > 0) {
      filtered = filtered.filter((project) =>
        selectedTags.every((tag) => project.tags.includes(tag)),
      );
    }

    return filtered;
  }, [sortedProjects, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="App">
      <HomeBar />
      <main
        className="content-container"
        style={{
          marginTop: "60px",
          marginBottom: "100px",
          paddingBottom: "60px",
          minHeight: "calc(100vh - 200px)",
          padding: "1rem",
        }}
      >
        <div
          className="projects-header"
          style={{
            marginBottom: "24px",
            maxWidth: "900px",
            margin: "0 auto 24px",
            textAlign: "center",
          }}
        >
          <h1 style={{ marginBottom: "1rem" }}>Web3 & Crypto</h1>
          <div
            style={{
              background: "rgba(249, 115, 22, 0.1)",
              border: "2px solid rgba(249, 115, 22, 0.3)",
              borderRadius: "12px",
              padding: "1.5rem",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "0.75rem",
                color: "#f97316",
                textAlign: "center",
              }}
            >
              Why Web3 Matters
            </h2>

            <div
              style={{
                textAlign: "center",
                maxWidth: "600px",
                margin: "0 auto 0.5rem",
              }}
            >
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  textAlign: "left",
                  display: "inline-block",
                }}
              >
                <li
                  style={{
                    marginBottom: "0.5rem",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>
                    🔐
                  </span>
                  <strong style={{ color: "#f97316" }}>Ownership</strong> -
                  Control your data, identity, and digital assets
                </li>
                <li
                  style={{
                    marginBottom: "0.5rem",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>
                    ✅
                  </span>
                  <strong style={{ color: "#f97316" }}>Verification</strong> -
                  Trustless verification & transparent governance
                </li>
                <li
                  style={{
                    marginBottom: "0.5rem",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>
                    🛠️
                  </span>
                  <strong style={{ color: "#f97316" }}>Innovation</strong> -
                  Building practical DAOs, credentials & tools
                </li>
              </ul>
            </div>
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: "1.5",
                color: "rgba(255, 255, 255, 0.85)",
                marginTop: "1rem",
                textAlign: "center",
                fontStyle: "italic",
                maxWidth: "800px",
                margin: "1rem auto 0",
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
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#f97316",
              marginTop: "2rem",
              marginBottom: "1rem",
            }}
          ></p>

          {/* Tag Filter */}
          <div
            style={{
              marginBottom: "1.5rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              justifyContent: "center",
            }}
          >
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  padding: "0.4rem 0.8rem",
                  borderRadius: "20px",
                  border: "2px solid",
                  borderColor: selectedTags.includes(tag)
                    ? "#f97316"
                    : "rgba(249, 115, 22, 0.3)",
                  background: selectedTags.includes(tag)
                    ? "#f97316"
                    : "transparent",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!selectedTags.includes(tag)) {
                    e.currentTarget.style.borderColor = "#f97316";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedTags.includes(tag)) {
                    e.currentTarget.style.borderColor =
                      "rgba(249, 115, 22, 0.3)";
                  }
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "3rem",
            marginTop: "2rem",
            marginLeft: "0",
            marginRight: "2rem",
            marginBottom: "2rem",
          }}
        >
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="portfolio-card"
              onClick={() => window.open(project.link, "_blank")}
              style={{
                cursor: "pointer",
                background: "rgba(20, 20, 20, 0.8)",
                border: "2px solid rgba(249, 115, 22, 0.3)",
                transition: "all 0.3s ease",
                width: "100%",
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
                      padding: "0.75rem 1rem",
                      borderRadius: "6px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      width: "100%",
                      textAlign: "center",
                      display: "block",
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
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CryptoPage;
