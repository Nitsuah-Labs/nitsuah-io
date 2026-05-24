// src/app/projects/clients/page.tsx
"use client";
import React, { useState } from "react";
import Footer from "../../_components/_site/Footer";
import HomeBar from "../../_components/_site/Homebar";
import ClientsFilters from "./_comp/clients/ClientsFilters";
import ClientsHeader from "./_comp/clients/ClientsHeader";
import ClientsProjectList from "./_comp/clients/ClientsProjectList";
import "./_styles/client.css";

// Data and Config
import { clientProjects, type ProjectType } from "@/lib/data/client-projects";
import { getDemo } from "@/lib/data/demo-registry";

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

  const activeProject = showDemo
    ? filteredProjects.find((p) => p.id === showDemo) ||
      clientProjects.find((p) => p.id === showDemo)
    : null;

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

  // Render demo with styled wrapper
  const renderDemo = (projectId: string) => {
    const project = clientProjects.find((p) => p.id === projectId);
    if (!project) return null;

    return (
      <div
        style={{
          background: "var(--color-surface)",
          border: "2px solid rgba(16, 185, 129, 0.5)",
          borderRadius: "16px",
          padding: "1rem",
          maxWidth: "1200px",
          margin: "0 auto",
          animation: "fadeIn 0.3s ease",
        }}
      >
        {/* Demo Content Area */}
        <div
          style={{
            height: "min(78vh, calc(100vh - 220px))",
            maxHeight: "calc(100vh - 220px)",
            minHeight: "420px",
            overflowY: "auto",
            overflowX: "hidden",
            padding: "0.5rem",
          }}
        >
          {getDemo(projectId)}
        </div>
      </div>
    );
  };

  return (
    <div
      className="App"
      style={{ background: "var(--color-background)", minHeight: "100vh" }}
    >
      <HomeBar />
      <main
        style={{
          marginTop: "80px",
          marginBottom: showDemo ? "20px" : "60px",
          paddingBottom: showDemo ? "20px" : "80px",
          minHeight: showDemo ? "calc(100vh - 160px)" : "calc(100vh - 140px)",
          padding: showDemo ? "0.5rem 1rem" : "2rem 1rem",
          transition: "padding 0.3s ease, margin-bottom 0.3s ease",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {!showDemo && (
            <>
              <ClientsHeader showDemo={showDemo} />

              <ClientsFilters
                selectedType={selectedType}
                onSelectType={(t) => {
                  setSelectedType(t);
                  setCarouselIndex(0);
                }}
                showDemo={showDemo}
              />

              <ClientsProjectList
                filteredProjects={filteredProjects as any}
                showDemo={showDemo}
                cardsVisible={cardsVisible}
                carouselIndex={carouselIndex}
                setCarouselIndex={setCarouselIndex}
                setShowDemo={setShowDemo}
              />
            </>
          )}

          {showDemo && activeProject && (
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: "0.75rem",
              }}
            >
              <button
                onClick={() => setShowDemo(null)}
                style={{
                  padding: "0.5rem 0.9rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(16, 185, 129, 0.5)",
                  background: "rgba(16, 185, 129, 0.12)",
                  color: "#10b981",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Back To Picker
              </button>

              <select
                value={selectedType}
                onChange={(event) => {
                  const nextType = event.target.value as ProjectType;
                  setSelectedType(nextType);
                  const nextProjects =
                    nextType === "all"
                      ? clientProjects
                      : clientProjects.filter((p) => p.type === nextType);
                  if (
                    !nextProjects.some((project) => project.id === showDemo)
                  ) {
                    setShowDemo(nextProjects[0]?.id ?? null);
                  }
                }}
                style={{
                  padding: "0.5rem 0.75rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.25)",
                  background: "rgba(20,20,20,0.85)",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                <option value="all">All Projects</option>
                <option value="web3">Web3</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="saas">SaaS</option>
                <option value="service">Services</option>
                <option value="portfolio">Portfolio</option>
              </select>

              <select
                value={showDemo}
                onChange={(event) => setShowDemo(event.target.value || null)}
                style={{
                  minWidth: "220px",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.25)",
                  background: "rgba(20,20,20,0.85)",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {filteredProjects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
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
