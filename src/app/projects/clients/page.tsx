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
            maxHeight: "50vh",
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

          {/* Demo Area - Takes center stage */}
          {showDemo && renderDemo(showDemo)}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MintExample;
