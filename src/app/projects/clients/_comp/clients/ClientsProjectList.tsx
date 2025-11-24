"use client";
import type { ProjectType } from "@/lib/data/client-projects";
import {
  getProjectIcon,
  getProjectTypeBackground,
  getProjectTypeBorder,
  getProjectTypeColor,
  getStatusBackground,
  getStatusBorder,
  getStatusColor,
} from "@/lib/utils/project-helpers";
import React from "react";

type Project = {
  id: string;
  name: string;
  description: string;
  type: ProjectType;
  status: string;
};

const ClientsProjectList: React.FC<{
  filteredProjects: Project[];
  showDemo: string | null;
  cardsVisible: number;
  carouselIndex: number;
  setCarouselIndex: (i: number) => void;
  setShowDemo: (id: string | null) => void;
}> = ({
  filteredProjects,
  showDemo,
  cardsVisible,
  carouselIndex,
  setCarouselIndex,
  setShowDemo,
}) => {
  const getTransformPercent = () => {
    const cardWidthPercent = 100 / cardsVisible;
    return carouselIndex * cardWidthPercent;
  };

  const scrollCarousel = (direction: "left" | "right") => {
    const maxIndex = Math.max(0, filteredProjects.length - cardsVisible);
    if (direction === "left") {
      setCarouselIndex(Math.max(0, carouselIndex - 1));
    } else {
      setCarouselIndex(Math.min(maxIndex, carouselIndex + 1));
    }
  };

  if (!showDemo) {
    return (
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
          >
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
                  background: getProjectTypeBackground(project.type),
                  color: getProjectTypeColor(project.type),
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  border: `1px solid ${getProjectTypeBorder(project.type)}`,
                }}
              >
                {project.type}
              </span>
            </div>

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
                  background: getStatusBackground(project.status),
                  color: getStatusColor(project.status),
                  textTransform: "capitalize",
                  border: `1px solid ${getStatusBorder(project.status)}`,
                }}
              >
                {project.status}
              </span>
            </div>

            <div
              style={{
                fontSize: "2.5rem",
                textAlign: "center",
                marginBottom: "0.75rem",
                marginTop: "1.5rem",
              }}
            >
              {getProjectIcon(project as any)}
            </div>

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

            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.875rem",
                textAlign: "center",
                margin: "0.5rem 0 0.75rem 0",
                lineHeight: "1.5",
                flex: 1,
              }}
            >
              {project.description}
            </p>

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
            >
              Launch Demo
            </button>
          </div>
        ))}
      </div>
    );
  }

  // Carousel layout when demo active
  return (
    <div
      className={`carousel-wrapper demo-active`}
      style={{
        position: "relative",
        marginBottom: "1.5rem",
        paddingTop: "0.5rem",
        transition: "all 0.3s ease",
      }}
    >
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
          >
            ‹
          </button>
          <button
            className="carousel-nav-btn"
            onClick={() => scrollCarousel("right")}
            disabled={carouselIndex >= filteredProjects.length - cardsVisible}
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
          >
            ›
          </button>
        </>
      )}

      <div
        className="carousel-container"
        style={{
          overflow: "hidden",
          padding: filteredProjects.length > cardsVisible ? "0 52px" : "0 52px",
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
            const isSingleCard = filteredProjects.length === 1;
            const cardWidth = isSingleCard
              ? "calc(100% - 2rem)"
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
                  border: `2px solid ${showDemo === project.id ? "rgba(16, 185, 129, 0.8)" : "rgba(16, 185, 129, 0.3)"}`,
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
                  setShowDemo(project.id === showDemo ? null : project.id)
                }
              >
                <div style={{ fontSize: "1.5rem", flexShrink: 0 }}>
                  {getProjectIcon(project as any)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
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
  );
};

export default ClientsProjectList;
