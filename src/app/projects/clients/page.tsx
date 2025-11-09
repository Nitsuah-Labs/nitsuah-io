// src/app/projects/clients/page.tsx
"use client";
import React, { useState } from "react";
import Footer from "../../_components/_site/Footer";
import HomeBar from "../../_components/_site/Homebar";
import "./_styles/client.css";

// Demo Components
import { AppointmentDemo } from "./_comp/AppointmentDemo";
import { CRMDemo } from "./_comp/CRMDemo";
import { NFTDemo } from "./_comp/NFTDemo";
import { PortfolioDemo } from "./_comp/PortfolioDemo";
import { RealEstateDemo } from "./_comp/RealEstateDemo";
import { ResumeSiteDemo } from "./_comp/ResumeSiteDemo";
import { SaaSDemo } from "./_comp/SaaSDemo";
import { ServicesDemo } from "./_comp/ServicesDemo";
import { StorefrontDemo } from "./_comp/StorefrontDemo";

type ProjectType =
  | "web3"
  | "ecommerce"
  | "saas"
  | "service"
  | "portfolio"
  | "all";

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
    status: "demo",
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
    status: "demo",
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
    status: "demo",
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
    status: "demo",
  },
  {
    id: "crm",
    name: "Customer CRM",
    type: "saas",
    description:
      "Salesforce-style CRM with contacts, pipeline, tasks, and deals tracking",
    technologies: ["React", "TypeScript", "Real-time Sync"],
    features: [
      "Contact Management",
      "Sales Pipeline",
      "Task Tracking",
      "Deal Flow",
    ],
    status: "demo",
  },
  {
    id: "portfolio",
    name: "Creative Portfolio",
    type: "portfolio",
    description: "Portfolio showcase for photographers, designers, and artists",
    technologies: ["Next.js", "Framer Motion", "Cloudinary"],
    features: [
      "Gallery Grid",
      "Lightbox View",
      "Project Details",
      "Contact Form",
    ],
    status: "demo",
  },
  {
    id: "resume-site",
    name: "Resume Website",
    type: "portfolio",
    description:
      "Professional resume template with clean layout and downloadable PDF",
    technologies: ["Next.js", "TypeScript", "CSS Grid"],
    features: [
      "Work History",
      "Skills Showcase",
      "PDF Download",
      "Contact Section",
    ],
    status: "demo",
  },
  {
    id: "booking",
    name: "Dental Appointments",
    type: "service",
    description:
      "Dentist office appointment booking with patient management and SMS reminders",
    technologies: ["React", "Calendar API", "Twilio"],
    features: [
      "Calendar Schedule",
      "Patient Records",
      "SMS Reminders",
      "Insurance Processing",
    ],
    status: "demo",
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
    status: "demo",
  },
  {
    id: "blog-cms",
    name: "Content Management",
    type: "saas",
    description: "Blog CMS with markdown support, SEO tools, and analytics",
    technologies: ["Next.js", "MDX", "Vercel Analytics"],
    features: [
      "Rich Text Editor",
      "SEO Tools",
      "Draft System",
      "Analytics Dashboard",
    ],
    status: "demo",
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
    case "portfolio":
      return "🎨";
    default:
      return "💼";
  }
};

const MintExample: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ProjectType>("all");
  const [showDemo, setShowDemo] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const filteredProjects =
    selectedType === "all"
      ? clientProjects
      : clientProjects.filter((p) => p.type === selectedType);

  // Carousel navigation
  const scrollCarousel = (direction: "left" | "right") => {
    const cardsVisible = 3;
    const maxIndex = Math.max(0, filteredProjects.length - cardsVisible);
    if (direction === "left") {
      setCarouselIndex(Math.max(0, carouselIndex - 1));
    } else {
      setCarouselIndex(Math.min(maxIndex, carouselIndex + 1));
    }
  };

  // Helper function to render the appropriate demo
  const renderDemo = (projectId: string) => {
    const project = clientProjects.find((p) => p.id === projectId);
    if (!project) return null;

    const demoContent = (() => {
      switch (projectId) {
        case "nft-mint":
        case "marketplace":
          return <NFTDemo />;
        case "storefront":
          return <StorefrontDemo />;
        case "dashboard":
          return <SaaSDemo />;
        case "crm":
          return <CRMDemo />;
        case "portfolio":
          return <PortfolioDemo />;
        case "resume-site":
          return <ResumeSiteDemo />;
        case "realestate":
          return <RealEstateDemo />;
        case "restaurant":
        case "blog-cms":
          return <ServicesDemo />;
        case "booking":
          return <AppointmentDemo />;
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
      <div
        style={{
          background: "rgba(10, 10, 10, 0.6)",
          border: "2px solid rgba(16, 185, 129, 0.5)",
          borderRadius: "16px",
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          animation: "fadeIn 0.3s ease",
        }}
      >
        {/* Demo Content Area */}
        <div
          style={{
            maxHeight: "70vh",
            overflowY: "auto",
            overflowX: "hidden",
            padding: "0.5rem",
          }}
        >
          {demoContent}
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
          padding: showDemo ? "1rem 1rem" : "2rem 1rem",
          transition: "padding 0.3s ease",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Header - Collapses when demo is active */}
          <div
            style={{
              marginBottom: showDemo ? "1rem" : "2rem",
              textAlign: "center",
              transition: "all 0.3s ease",
            }}
          >
            <h1
              style={{
                fontSize: showDemo ? "1.5rem" : "3rem",
                fontWeight: "700",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: showDemo ? "0" : "0.5rem",
                transition: "all 0.3s ease",
              }}
            >
              CLIENT PROJECTS
            </h1>
            {!showDemo && (
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "1.2rem",
                  marginBottom: "0",
                }}
              >
                Professional service, freelance, and commercial app
                demonstrations
              </p>
            )}
          </div>

          {/* Filters - Always visible but more compact when demo active */}
          <div
            style={{
              display: "flex",
              gap: showDemo ? "0.5rem" : "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: showDemo ? "1rem" : "2rem",
              transition: "all 0.3s ease",
            }}
          >
            {[
              { type: "all", label: "All Projects", color: "#10b981" },
              { type: "web3", label: "Web3", color: "#8b5cf6" },
              { type: "ecommerce", label: "E-Commerce", color: "#f59e0b" },
              { type: "saas", label: "SaaS", color: "#3b82f6" },
              { type: "service", label: "Services", color: "#ec4899" },
              { type: "portfolio", label: "Portfolio", color: "#a855f7" },
            ].map(({ type, label, color }) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type as ProjectType);
                  setCarouselIndex(0);
                }}
                style={{
                  padding: showDemo ? "0.5rem 1rem" : "0.75rem 1.5rem",
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
                    selectedType === type ? color : "rgba(255, 255, 255, 0.7)",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: showDemo ? "0.875rem" : "1rem",
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

          {/* Carousel - Compact when demo is active */}
          <div
            style={{
              position: "relative",
              marginBottom: showDemo ? "1.5rem" : "3rem",
              paddingTop: showDemo ? "0.5rem" : "1rem",
              transition: "all 0.3s ease",
            }}
          >
            {/* Carousel Navigation */}
            {filteredProjects.length > 3 && (
              <>
                <button
                  onClick={() => scrollCarousel("left")}
                  disabled={carouselIndex === 0}
                  style={{
                    position: "absolute",
                    left: showDemo ? "0" : "-20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: showDemo ? "32px" : "40px",
                    height: showDemo ? "32px" : "40px",
                    borderRadius: "50%",
                    background: "rgba(16, 185, 129, 0.2)",
                    border: "2px solid rgba(16, 185, 129, 0.4)",
                    color: "#10b981",
                    fontSize: showDemo ? "1.2rem" : "1.5rem",
                    cursor: carouselIndex === 0 ? "not-allowed" : "pointer",
                    opacity: carouselIndex === 0 ? 0.3 : 1,
                    zIndex: 10,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (carouselIndex > 0) {
                      e.currentTarget.style.background =
                        "rgba(16, 185, 129, 0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(16, 185, 129, 0.2)";
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  disabled={carouselIndex >= filteredProjects.length - 3}
                  style={{
                    position: "absolute",
                    right: showDemo ? "0" : "-20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: showDemo ? "32px" : "40px",
                    height: showDemo ? "32px" : "40px",
                    borderRadius: "50%",
                    background: "rgba(16, 185, 129, 0.2)",
                    border: "2px solid rgba(16, 185, 129, 0.4)",
                    color: "#10b981",
                    fontSize: showDemo ? "1.2rem" : "1.5rem",
                    cursor:
                      carouselIndex >= filteredProjects.length - 3
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      carouselIndex >= filteredProjects.length - 3 ? 0.3 : 1,
                    zIndex: 10,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (carouselIndex < filteredProjects.length - 3) {
                      e.currentTarget.style.background =
                        "rgba(16, 185, 129, 0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(16, 185, 129, 0.2)";
                  }}
                >
                  ›
                </button>
              </>
            )}

            {/* Carousel Container */}
            <div
              style={{
                overflow: "hidden",
                padding: showDemo ? "0 32px" : "0 40px",
                transition: "padding 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: showDemo ? "0.75rem" : "1.5rem",
                  transform: `translateX(-${carouselIndex * (showDemo ? 20.5 : 34)}%)`,
                  transition: "all 0.4s ease",
                }}
              >
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    style={{
                      minWidth: showDemo
                        ? "calc(20% - 0.6rem)"
                        : "calc(33.333% - 1rem)",
                      maxWidth: showDemo
                        ? "calc(20% - 0.6rem)"
                        : "calc(33.333% - 1rem)",
                      flexShrink: 0,
                      background:
                        showDemo === project.id
                          ? "rgba(16, 185, 129, 0.2)"
                          : "rgba(20, 20, 20, 0.8)",
                      border: `2px solid ${
                        showDemo === project.id
                          ? "rgba(16, 185, 129, 0.8)"
                          : "rgba(16, 185, 129, 0.3)"
                      }`,
                      borderRadius: showDemo ? "8px" : "12px",
                      padding: showDemo ? "0.5rem" : "1.5rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      display: "flex",
                      flexDirection: showDemo ? "row" : "column",
                      alignItems: showDemo ? "center" : "stretch",
                      gap: showDemo ? "0.5rem" : "0",
                      position: "relative",
                    }}
                    onClick={() =>
                      setShowDemo(project.id === showDemo ? null : project.id)
                    }
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(16, 185, 129, 0.8)";
                      if (!showDemo) {
                        e.currentTarget.style.transform = "translateY(-4px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        showDemo === project.id
                          ? "rgba(16, 185, 129, 0.8)"
                          : "rgba(16, 185, 129, 0.3)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {/* Status Badge - Top Right */}
                    {!showDemo && (
                      <div
                        style={{
                          position: "absolute",
                          top: "0.75rem",
                          right: "0.75rem",
                          zIndex: 5,
                        }}
                      >
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
                            textTransform: "capitalize",
                            border: `1px solid ${
                              project.status === "live"
                                ? "#10b98140"
                                : project.status === "demo"
                                  ? "#3b82f640"
                                  : "#6b728040"
                            }`,
                            transition: "all 0.3s ease",
                          }}
                        >
                          {project.status}
                        </span>
                      </div>
                    )}

                    {/* Icon - Left side when demo active, center when not */}
                    <div
                      style={{
                        fontSize: showDemo ? "1.5rem" : "2.5rem",
                        textAlign: showDemo ? "left" : "center",
                        marginBottom: showDemo ? "0" : "0.75rem",
                        marginTop: showDemo ? "0" : "1.5rem",
                        flexShrink: 0,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {getProjectIcon(project.type)}
                    </div>

                    {/* Title and Content Container */}
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 0,
                      }}
                    >
                      <h3
                        style={{
                          fontSize: showDemo ? "0.75rem" : "1.25rem",
                          fontWeight: "600",
                          color: "#10b981",
                          margin: 0,
                          textAlign: showDemo ? "left" : "center",
                          transition: "all 0.3s ease",
                          whiteSpace: showDemo ? "nowrap" : "normal",
                          overflow: showDemo ? "hidden" : "visible",
                          textOverflow: showDemo ? "ellipsis" : "clip",
                        }}
                      >
                        {project.name}
                      </h3>

                      {/* Description - Only show when no demo is active */}
                      {!showDemo && (
                        <p
                          style={{
                            color: "rgba(255, 255, 255, 0.7)",
                            fontSize: "0.875rem",
                            textAlign: "center",
                            margin: "0.5rem 0 0.75rem 0",
                            lineHeight: "1.5",
                          }}
                        >
                          {project.description}
                        </p>
                      )}
                    </div>

                    {/* Action Button - Icon only when demo active */}
                    {!showDemo && (
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
                          marginTop: "auto",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDemo(project.id);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(16, 185, 129, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "rgba(16, 185, 129, 0.2)";
                        }}
                      >
                        Launch Demo
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Demo Area - Takes center stage */}
          {showDemo && renderDemo(showDemo)}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MintExample;
