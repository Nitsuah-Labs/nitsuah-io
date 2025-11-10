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
  icon?: string; // Custom icon for each project
}

const clientProjects: ClientProject[] = [
  {
    id: "storefront",
    name: "Storefront",
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
    icon: "🛒",
  },
  {
    id: "restaurant",
    name: "Restaurant",
    type: "service",
    description:
      "Italian restaurant website with menu, reservations, and gallery",
    technologies: ["React", "Node.js", "PostgreSQL"],
    features: [
      "Menu Display",
      "Table Reservations",
      "Online Ordering",
      "Photo Gallery",
    ],
    status: "demo",
    icon: "🍝",
  },
  {
    id: "realestate",
    name: "Real Estate",
    type: "service",
    description:
      "Property listing platform with search, filters, and map views",
    technologies: ["Next.js", "Mapbox", "Sanity CMS"],
    features: [
      "Property Search",
      "Map Integration",
      "Virtual Tours",
      "Agent Profiles",
    ],
    status: "demo",
    icon: "🏠",
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
    icon: "📈",
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
    icon: "🎨",
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
    icon: "📄",
  },
  {
    id: "booking",
    name: "Dental Office",
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
    icon: "🦷",
  },
  {
    id: "nft-mint",
    name: "NFT Minting",
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
    icon: "✨",
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
    icon: "🖼️",
  },
  {
    id: "blog-cms",
    name: "Content Mgmt",
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
    icon: "📝",
  },
  {
    id: "dashboard",
    name: "SaaS Analytics",
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
    icon: "📊",
  },
];

const getProjectIcon = (project: ClientProject): string => {
  // Use custom icon if available, otherwise fall back to type-based icon
  if (project.icon) {
    return project.icon;
  }

  switch (project.type) {
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
  const [cardsVisible, setCardsVisible] = useState(3);

  // Update cards visible based on screen size (only matters when demo is active)
  React.useEffect(() => {
    const updateCardsVisible = () => {
      if (!showDemo) {
        setCardsVisible(3); // Default, doesn't matter for grid
        return;
      }

      const width = window.innerWidth;
      if (width <= 480) {
        // Mobile: 2 cards when demo active
        setCardsVisible(2);
      } else if (width <= 768) {
        // Tablet: 3 cards when demo active
        setCardsVisible(3);
      } else if (width <= 1200) {
        // Small desktop: 4 cards when demo active
        setCardsVisible(4);
      } else {
        // Large desktop: 5 cards when demo active
        setCardsVisible(5);
      }
    };

    updateCardsVisible();
    window.addEventListener("resize", updateCardsVisible);
    return () => window.removeEventListener("resize", updateCardsVisible);
  }, [showDemo]);

  const filteredProjects =
    selectedType === "all"
      ? clientProjects
      : clientProjects.filter((p) => p.type === selectedType);

  // Reset carousel index only when filters change (not when demo toggles)
  React.useEffect(() => {
    setCarouselIndex(0);
  }, [selectedType]);

  // Ensure carousel index is within bounds when cards visible changes
  React.useEffect(() => {
    if (showDemo) {
      const maxIndex = Math.max(0, filteredProjects.length - cardsVisible);
      if (carouselIndex > maxIndex) {
        setCarouselIndex(maxIndex);
      }
    }
  }, [cardsVisible, showDemo, filteredProjects.length, carouselIndex]);

  // Carousel navigation
  const scrollCarousel = (direction: "left" | "right") => {
    const maxIndex = Math.max(0, filteredProjects.length - cardsVisible);
    if (direction === "left") {
      setCarouselIndex(Math.max(0, carouselIndex - 1));
    } else {
      setCarouselIndex(Math.min(maxIndex, carouselIndex + 1));
    }
  };

  // Calculate transform percentage based on cards visible
  const getTransformPercent = () => {
    const cardWidthPercent = 100 / cardsVisible;
    return carouselIndex * cardWidthPercent;
  };

  // Helper function to render the appropriate demo
  const renderDemo = (projectId: string) => {
    const project = clientProjects.find((p) => p.id === projectId);
    if (!project) return null;

    const demoContent = (() => {
      switch (projectId) {
        case "nft-mint":
          return <NFTDemo initialView="mint" />;
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
          return <ServicesDemo type="restaurant" />;
        case "blog-cms":
          return <ServicesDemo type="blog-cms" />;
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
      <style>{`
        /* Grid layout for no demo mode */
        .projects-grid {
          display: grid;
          gap: 1.5rem;
        }
        
        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (min-width: 768px) and (max-width: 1023px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 767px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
        
        /* Carousel - only used when demo is active */
        @media (max-width: 768px) {
          .carousel-wrapper.demo-active {
            --cards-visible: 3;
          }
          
          .carousel-nav-btn {
            width: 36px !important;
            height: 36px !important;
            font-size: 1.25rem !important;
          }
          
          .carousel-container {
            padding: 0 40px !important;
          }
        }
        
        @media (max-width: 480px) {
          .carousel-wrapper.demo-active {
            --cards-visible: 2;
          }
          
          .client-filter-btn {
            padding: 0.4rem 0.6rem !important;
            font-size: 0.75rem !important;
            flex: 0 0 auto;
          }
          
          .filter-container {
            gap: 0.4rem !important;
            padding: 0 0.5rem;
          }
          
          .carousel-nav-btn {
            width: 32px !important;
            height: 32px !important;
            font-size: 1.1rem !important;
            left: 4px !important;
          }
          
          .carousel-nav-btn:last-of-type {
            right: 4px !important;
            left: auto !important;
          }
          
          .carousel-container {
            padding: 0 36px !important;
          }
          
          .client-card.demo-active {
            padding: 0.4rem !important;
            font-size: 0.75rem !important;
          }
        }
      `}</style>
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
            className="filter-container"
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
                className="client-filter-btn"
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

          {/* Project Cards - Grid when no demo, Carousel when demo active */}
          {!showDemo ? (
            // GRID LAYOUT - No demo active
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.5rem",
                marginBottom: "3rem",
                paddingTop: "1rem",
              }}
              className="projects-grid"
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="client-card"
                  style={{
                    background: "rgba(20, 20, 20, 0.8)",
                    border: "2px solid rgba(16, 185, 129, 0.3)",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                  }}
                  onClick={() => setShowDemo(project.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(16, 185, 129, 0.8)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(16, 185, 129, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(16, 185, 129, 0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Type Badge - Upper Left */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      left: "0.75rem",
                      zIndex: 5,
                    }}
                  >
                    <span
                      style={{
                        padding: "0.35rem 0.85rem",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        background:
                          project.type === "web3"
                            ? "rgba(147, 51, 234, 0.2)"
                            : project.type === "ecommerce"
                              ? "rgba(249, 115, 22, 0.2)"
                              : project.type === "saas"
                                ? "rgba(59, 130, 246, 0.2)"
                                : project.type === "service"
                                  ? "rgba(34, 197, 94, 0.2)"
                                  : "rgba(236, 72, 153, 0.2)",
                        color:
                          project.type === "web3"
                            ? "#c084fc"
                            : project.type === "ecommerce"
                              ? "#fb923c"
                              : project.type === "saas"
                                ? "#60a5fa"
                                : project.type === "service"
                                  ? "#4ade80"
                                  : "#f472b6",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        border: `1px solid ${
                          project.type === "web3"
                            ? "rgba(147, 51, 234, 0.4)"
                            : project.type === "ecommerce"
                              ? "rgba(249, 115, 22, 0.4)"
                              : project.type === "saas"
                                ? "rgba(59, 130, 246, 0.4)"
                                : project.type === "service"
                                  ? "rgba(34, 197, 94, 0.4)"
                                  : "rgba(236, 72, 153, 0.4)"
                        }`,
                      }}
                    >
                      {project.type}
                    </span>
                  </div>

                  {/* Status Badge - Upper Right */}
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
                      }}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    style={{
                      fontSize: "2.5rem",
                      textAlign: "center",
                      marginBottom: "0.75rem",
                      marginTop: "1.5rem",
                    }}
                  >
                    {getProjectIcon(project)}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#10b981",
                      textAlign: "center",
                      margin: "0 0 0.5rem 0",
                    }}
                  >
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "0.875rem",
                      textAlign: "center",
                      margin: "0.5rem 0 0.75rem 0",
                      lineHeight: "1.5",
                      flex: 1,
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Action Button */}
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
                </div>
              ))}
            </div>
          ) : (
            // CAROUSEL LAYOUT - Demo is active
            <div
              className={`carousel-wrapper demo-active`}
              style={{
                position: "relative",
                marginBottom: "1.5rem",
                paddingTop: "0.5rem",
                transition: "all 0.3s ease",
              }}
            >
              {/* Carousel Navigation */}
              {filteredProjects.length > cardsVisible && (
                <>
                  <button
                    className="carousel-nav-btn"
                    onClick={() => scrollCarousel("left")}
                    disabled={carouselIndex === 0}
                    style={{
                      position: "absolute",
                      left: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(16, 185, 129, 0.2)",
                      border: "2px solid rgba(16, 185, 129, 0.4)",
                      color: "#10b981",
                      fontSize: "1.4rem",
                      cursor: carouselIndex === 0 ? "not-allowed" : "pointer",
                      opacity: carouselIndex === 0 ? 0.3 : 1,
                      zIndex: 10,
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => {
                      if (carouselIndex > 0) {
                        e.currentTarget.style.background =
                          "rgba(16, 185, 129, 0.4)";
                        e.currentTarget.style.transform =
                          "translateY(-50%) scale(1.1)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(16, 185, 129, 0.2)";
                      e.currentTarget.style.transform = "translateY(-50%)";
                    }}
                  >
                    ‹
                  </button>
                  <button
                    className="carousel-nav-btn"
                    onClick={() => scrollCarousel("right")}
                    disabled={
                      carouselIndex >= filteredProjects.length - cardsVisible
                    }
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(16, 185, 129, 0.2)",
                      border: "2px solid rgba(16, 185, 129, 0.4)",
                      color: "#10b981",
                      fontSize: "1.4rem",
                      cursor:
                        carouselIndex >= filteredProjects.length - cardsVisible
                          ? "not-allowed"
                          : "pointer",
                      opacity:
                        carouselIndex >= filteredProjects.length - cardsVisible
                          ? 0.3
                          : 1,
                      zIndex: 10,
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => {
                      if (
                        carouselIndex <
                        filteredProjects.length - cardsVisible
                      ) {
                        e.currentTarget.style.background =
                          "rgba(16, 185, 129, 0.4)";
                        e.currentTarget.style.transform =
                          "translateY(-50%) scale(1.1)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(16, 185, 129, 0.2)";
                      e.currentTarget.style.transform = "translateY(-50%)";
                    }}
                  >
                    ›
                  </button>
                </>
              )}

              {/* Carousel Container */}
              <div
                className="carousel-container"
                style={{
                  overflow: "hidden",
                  padding:
                    filteredProjects.length > cardsVisible
                      ? "0 52px"
                      : "0 52px",
                  transition: "padding 0.3s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    transform: `translateX(-${getTransformPercent()}%)`,
                    transition: "all 0.4s ease",
                  }}
                >
                  {filteredProjects.map((project) => {
                    // Better card width calculation
                    const isSingleCard = filteredProjects.length === 1;
                    const cardWidth = isSingleCard
                      ? "calc(100% - 2rem)" // Single card: max width with margin
                      : `calc(${100 / cardsVisible}% - 0.5rem)`;

                    return (
                      <div
                        key={project.id}
                        className="client-card demo-active"
                        style={{
                          minWidth: cardWidth,
                          maxWidth: cardWidth,
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
                          borderRadius: "8px",
                          padding: "0.5rem",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "0.5rem",
                          position: "relative",
                          margin: isSingleCard ? "0 auto" : "0",
                        }}
                        onClick={() =>
                          setShowDemo(
                            project.id === showDemo ? null : project.id,
                          )
                        }
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(16, 185, 129, 0.8)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            showDemo === project.id
                              ? "rgba(16, 185, 129, 0.8)"
                              : "rgba(16, 185, 129, 0.3)";
                        }}
                      >
                        {/* Icon - Compact for carousel */}
                        <div
                          style={{
                            fontSize: "1.5rem",
                            flexShrink: 0,
                          }}
                        >
                          {getProjectIcon(project)}
                        </div>

                        {/* Title - Compact */}
                        <div
                          style={{
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          <h3
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: "600",
                              color: "#10b981",
                              margin: 0,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {project.name}
                          </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Demo Area - Takes center stage */}
          {showDemo && renderDemo(showDemo)}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MintExample;
