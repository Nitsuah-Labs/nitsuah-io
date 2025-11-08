// src/app/projects/clients/page.tsx
"use client";
import React, { useState } from "react";
import Footer from "../../_components/_site/Footer";
import HomeBar from "../../_components/_site/Homebar";
import "./_styles/client.css";

// WEB3
import { Account } from "../../_components/_web3/Account";
import { Connect } from "../../_components/_web3/Connect";
import { Connected } from "../../_components/_web3/Connected";
import { MintNFT } from "../../_components/_web3/MintNFT";
import { NetworkSwitcher } from "../../_components/_web3/NetworkSwitcher";

// Demo Components
import { ECommerceDemo } from "./_comp/ECommerceDemo";
import { SaaSDemo } from "./_comp/SaaSDemo";
import { ServicesDemo } from "./_comp/ServicesDemo";

type ProjectType = "web3" | "ecommerce" | "saas" | "service" | "all";

interface ClientProject {
  id: string;
  name: string;
  type: ProjectType;
  description: string;
  technologies: string[];
  features: string[];
  status: "live" | "demo" | "mockup";
}

const clientProjects: ClientProject[] = [
  {
    id: "nft-mint",
    name: "NFT Minting Platform",
    type: "web3",
    description:
      "Web3 NFT minting demo with wallet connection and network switching",
    technologies: ["React", "wagmi", "Web3", "Ethereum"],
    features: [
      "Wallet Connect",
      "NFT Minting",
      "Network Switching",
      "Account Management",
    ],
    status: "demo",
  },
  {
    id: "storefront",
    name: "E-Commerce Storefront",
    type: "ecommerce",
    description:
      "Modern e-commerce platform with cart, checkout, and inventory management",
    technologies: ["Next.js", "Stripe", "Headless CMS"],
    features: [
      "Product Catalog",
      "Shopping Cart",
      "Payment Integration",
      "Order Management",
    ],
    status: "mockup",
  },
  {
    id: "restaurant",
    name: "Restaurant & Booking",
    type: "service",
    description:
      "Restaurant website with online menu, reservations, and ordering system",
    technologies: ["React", "Node.js", "PostgreSQL"],
    features: [
      "Menu Display",
      "Table Reservations",
      "Online Ordering",
      "Reviews",
    ],
    status: "mockup",
  },
  {
    id: "dashboard",
    name: "SaaS Analytics Dashboard",
    type: "saas",
    description:
      "Analytics dashboard for tracking KPIs, metrics, and business insights",
    technologies: ["React", "D3.js", "Chart.js", "REST API"],
    features: [
      "Real-time Analytics",
      "Custom Reports",
      "Data Visualization",
      "Export Tools",
    ],
    status: "mockup",
  },
  {
    id: "realestate",
    name: "Real Estate Listings",
    type: "service",
    description:
      "Property listing platform with search, filters, and virtual tours",
    technologies: ["Next.js", "Mapbox", "Sanity CMS"],
    features: [
      "Property Search",
      "Map Integration",
      "Virtual Tours",
      "Agent Profiles",
    ],
    status: "mockup",
  },
  {
    id: "crm",
    name: "Customer CRM System",
    type: "saas",
    description:
      "Customer relationship management system for sales and support teams",
    technologies: ["React", "GraphQL", "MongoDB"],
    features: [
      "Contact Management",
      "Sales Pipeline",
      "Task Tracking",
      "Email Integration",
    ],
    status: "mockup",
  },
  {
    id: "portfolio",
    name: "Creative Portfolio",
    type: "service",
    description: "Portfolio showcase for photographers, designers, and artists",
    technologies: ["Next.js", "Framer Motion", "Cloudinary"],
    features: [
      "Gallery Grid",
      "Lightbox View",
      "Project Details",
      "Contact Form",
    ],
    status: "mockup",
  },
  {
    id: "booking",
    name: "Appointment Booking",
    type: "service",
    description:
      "Booking system for service providers with calendar and reminders",
    technologies: ["React", "Calendar API", "Twilio"],
    features: [
      "Calendar Sync",
      "SMS Reminders",
      "Payment Processing",
      "Cancellation Policy",
    ],
    status: "mockup",
  },
  {
    id: "marketplace",
    name: "NFT Marketplace",
    type: "web3",
    description: "Decentralized marketplace for buying and selling NFTs",
    technologies: ["React", "Solidity", "IPFS", "ethers.js"],
    features: [
      "NFT Listing",
      "Auction System",
      "Wallet Integration",
      "Gas Optimization",
    ],
    status: "mockup",
  },
  {
    id: "blog-cms",
    name: "Content Management",
    type: "service",
    description: "Blog CMS with markdown support, SEO tools, and analytics",
    technologies: ["Next.js", "MDX", "Vercel Analytics"],
    features: [
      "Rich Text Editor",
      "SEO Tools",
      "Draft System",
      "Analytics Dashboard",
    ],
    status: "mockup",
  },
];

const getProjectIcon = (type: ProjectType): string => {
  switch (type) {
    case "web3":
      return "🔗";
    case "ecommerce":
      return "🛒";
    case "saas":
      return "📊";
    case "service":
      return "🏢";
    default:
      return "💼";
  }
};

const MintExample: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ProjectType>("all");
  const [showDemo, setShowDemo] = useState<string | null>(null);

  const filteredProjects =
    selectedType === "all"
      ? clientProjects
      : clientProjects.filter((p) => p.type === selectedType);

  // Helper function to render the appropriate demo
  const renderDemo = (projectId: string) => {
    const project = clientProjects.find((p) => p.id === projectId);
    if (!project) return null;

    const demoContent = (() => {
      switch (projectId) {
        case "nft-mint":
        case "marketplace":
          return (
            <>
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
            </>
          );
        case "storefront":
          return <ECommerceDemo />;
        case "dashboard":
        case "crm":
          return <SaaSDemo />;
        case "restaurant":
        case "realestate":
        case "portfolio":
        case "booking":
        case "blog-cms":
          return <ServicesDemo />;
        default:
          return (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🚧</div>
              <p>Demo coming soon...</p>
            </div>
          );
      }
    })();

    return (
      <div style={{ marginBottom: "3rem" }}>
        {/* Demo Container with Title Inside */}
        <div
          style={{
            background: "rgba(20, 20, 20, 0.9)",
            border: "2px solid rgba(16, 185, 129, 0.5)",
            borderRadius: "16px",
            padding: "2rem",
            maxWidth: "900px",
            margin: "0 auto",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Demo Title - Part of the Demo */}
          <div
            style={{
              marginBottom: "2rem",
              textAlign: "center",
              borderBottom: "2px solid rgba(16, 185, 129, 0.3)",
              paddingBottom: "1rem",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "600",
                color: "#10b981",
                margin: "0 0 0.5rem 0",
              }}
            >
              {getProjectIcon(project.type)} {project.name}
            </h2>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                margin: 0,
                fontSize: "0.95rem",
              }}
            >
              {project.description}
            </p>
          </div>

          {/* Demo Content Area */}
          <div
            style={{
              maxHeight: "600px",
              overflowY: "auto",
              overflowX: "hidden",
              padding: "0.5rem",
            }}
          >
            {demoContent}
          </div>

          {/* Close Demo Button */}
          <div
            style={{
              marginTop: "1.5rem",
              textAlign: "center",
              borderTop: "2px solid rgba(16, 185, 129, 0.3)",
              paddingTop: "1rem",
            }}
          >
            <button
              onClick={() => setShowDemo(null)}
              style={{
                padding: "0.75rem 1.5rem",
                background: "rgba(16, 185, 129, 0.2)",
                border: "2px solid rgba(16, 185, 129, 0.4)",
                borderRadius: "8px",
                color: "#10b981",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(16, 185, 129, 0.3)";
                e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(16, 185, 129, 0.2)";
                e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.4)";
              }}
            >
              Close Demo
            </button>
          </div>
        </div>
      </div>
    );
  };

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
                marginBottom: "2rem",
              }}
            >
              Professional service, freelance, and commercial app demonstrations
            </p>
          </div>

          {/* NFT Minting Demo - Show before filters */}
          {showDemo && renderDemo(showDemo)}

          <div>
            {/* Project Type Switcher */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: "2rem",
              }}
            >
              {[
                { type: "all", label: "All Projects", color: "#10b981" },
                { type: "web3", label: "Web3", color: "#8b5cf6" },
                { type: "ecommerce", label: "E-Commerce", color: "#f59e0b" },
                { type: "saas", label: "SaaS", color: "#3b82f6" },
                { type: "service", label: "Services", color: "#ec4899" },
              ].map(({ type, label, color }) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type as ProjectType)}
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    border:
                      selectedType === type
                        ? `2px solid ${color}`
                        : "2px solid rgba(255, 255, 255, 0.2)",
                    background:
                      selectedType === type
                        ? `${color}20`
                        : "rgba(20, 20, 20, 0.8)",
                    color:
                      selectedType === type
                        ? color
                        : "rgba(255, 255, 255, 0.7)",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedType !== type) {
                      e.currentTarget.style.borderColor = `${color}80`;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedType !== type) {
                      e.currentTarget.style.borderColor =
                        "rgba(255, 255, 255, 0.2)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "2rem",
              marginBottom: "3rem",
            }}
          >
            {filteredProjects.map((project) => {
              const isMinimal = showDemo && showDemo !== project.id;

              return (
                <div
                  key={project.id}
                  style={{
                    background:
                      showDemo === project.id
                        ? "rgba(20, 20, 20, 0.95)"
                        : isMinimal
                          ? "rgba(20, 20, 20, 0.6)"
                          : "rgba(20, 20, 20, 0.8)",
                    border: `2px solid ${showDemo === project.id ? "rgba(16, 185, 129, 0.8)" : "rgba(16, 185, 129, 0.3)"}`,
                    borderRadius: "12px",
                    padding: isMinimal ? "1rem" : "1.5rem",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isMinimal ? "center" : "stretch",
                  }}
                  onClick={() =>
                    setShowDemo(project.id === showDemo ? null : project.id)
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(16, 185, 129, 0.8)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(16, 185, 129, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      showDemo === project.id
                        ? "rgba(16, 185, 129, 0.8)"
                        : "rgba(16, 185, 129, 0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Minimal Card View */}
                  {isMinimal ? (
                    <>
                      {/* Icon */}
                      <div
                        style={{
                          fontSize: "2.5rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {getProjectIcon(project.type)}
                      </div>

                      {/* Name */}
                      <h3
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: "600",
                          color: "#10b981",
                          margin: "0 0 0.5rem 0",
                          textAlign: "center",
                        }}
                      >
                        {project.name}
                      </h3>

                      {/* Type Badge */}
                      <span
                        style={{
                          padding: "0.25rem 0.75rem",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          background: "rgba(16, 185, 129, 0.1)",
                          color: "#10b981",
                          marginBottom: "0.75rem",
                          textTransform: "capitalize",
                        }}
                      >
                        {project.type}
                      </span>

                      {/* View More Button */}
                      <button
                        style={{
                          padding: "0.5rem 1rem",
                          background: "rgba(16, 185, 129, 0.2)",
                          border: "1px solid rgba(16, 185, 129, 0.4)",
                          borderRadius: "6px",
                          color: "#10b981",
                          fontWeight: "600",
                          fontSize: "0.875rem",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDemo(project.id);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(16, 185, 129, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "rgba(16, 185, 129, 0.2)";
                        }}
                      >
                        View More
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Full Card View */}
                      {/* Project Icon */}
                      <div
                        style={{
                          fontSize: "3rem",
                          textAlign: "center",
                          marginBottom: "1rem",
                        }}
                      >
                        {getProjectIcon(project.type)}
                      </div>

                      {/* Header with title and status tag */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "start",
                          marginBottom: "1rem",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "600",
                            color: "#10b981",
                            margin: 0,
                            textAlign: "left",
                          }}
                        >
                          {project.name}
                        </h3>
                        <span
                          style={{
                            padding: "0.25rem 0.75rem",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            background:
                              project.status === "live"
                                ? "#10b98120"
                                : project.status === "demo"
                                  ? "#3b82f620"
                                  : "#6b728020",
                            color:
                              project.status === "live"
                                ? "#10b981"
                                : project.status === "demo"
                                  ? "#3b82f6"
                                  : "#9ca3af",
                            flexShrink: 0,
                          }}
                        >
                          {project.status.toUpperCase()}
                        </span>
                      </div>

                      {/* Description - left aligned */}
                      <p
                        style={{
                          color: "rgba(255, 255, 255, 0.7)",
                          marginBottom: "1rem",
                          textAlign: "left",
                        }}
                      >
                        {project.description}
                      </p>

                      {/* Technologies - left aligned */}
                      <div style={{ marginBottom: "1rem", textAlign: "left" }}>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            color: "#10b981",
                            marginBottom: "0.5rem",
                            fontWeight: "600",
                          }}
                        >
                          Technologies:
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                          }}
                        >
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              style={{
                                padding: "0.25rem 0.5rem",
                                background: "rgba(16, 185, 129, 0.1)",
                                border: "1px solid rgba(16, 185, 129, 0.3)",
                                borderRadius: "4px",
                                fontSize: "0.75rem",
                                color: "rgba(255, 255, 255, 0.8)",
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Features - left aligned */}
                      <div style={{ marginBottom: "1rem", textAlign: "left" }}>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            color: "#10b981",
                            marginBottom: "0.5rem",
                            fontWeight: "600",
                          }}
                        >
                          Key Features:
                        </div>
                        <ul
                          style={{
                            margin: 0,
                            paddingLeft: "1.25rem",
                            color: "rgba(255, 255, 255, 0.6)",
                            fontSize: "0.875rem",
                          }}
                        >
                          {project.features.slice(0, 3).map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MintExample;
