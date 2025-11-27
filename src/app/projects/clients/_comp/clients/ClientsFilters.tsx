"use client";
import type { ProjectType } from "@/lib/data/client-projects";
import { projectFilters } from "@/lib/data/project-filters";
import React from "react";

const ClientsFilters: React.FC<{
  selectedType: ProjectType;
  onSelectType: (t: ProjectType) => void;
  showDemo: string | null;
}> = ({ selectedType, onSelectType, showDemo }) => {
  return (
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
      {projectFilters.map(({ type, label, color }) => (
        <button
          key={type}
          className="client-filter-btn"
          onClick={() => {
            onSelectType(type as ProjectType);
          }}
          style={{
            padding: showDemo ? "0.5rem 1rem" : "0.75rem 1.5rem",
            borderRadius: "8px",
            border:
              selectedType === type
                ? `2px solid ${color}`
                : "2px solid rgba(255, 255, 255, 0.2)",
            background:
              selectedType === type ? `${color}20` : "rgba(20, 20, 20, 0.8)",
            color: selectedType === type ? color : "rgba(255,255,255,0.7)",
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
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "translateY(0)";
            }
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ClientsFilters;
