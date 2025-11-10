import React from "react";

type ProjectType =
  | "web3"
  | "ecommerce"
  | "saas"
  | "service"
  | "portfolio"
  | "all";

interface ProjectTypeFilterProps {
  selectedType: ProjectType;
  onTypeChange: (type: ProjectType) => void;
  showDemo?: boolean;
}

const filterOptions = [
  { type: "all" as ProjectType, label: "All Projects", color: "#10b981" },
  { type: "web3" as ProjectType, label: "Web3", color: "#8b5cf6" },
  { type: "ecommerce" as ProjectType, label: "E-Commerce", color: "#f59e0b" },
  { type: "saas" as ProjectType, label: "SaaS", color: "#3b82f6" },
  { type: "service" as ProjectType, label: "Services", color: "#22c55e" },
  { type: "portfolio" as ProjectType, label: "Portfolio", color: "#ec4899" },
];

export const ProjectTypeFilter: React.FC<ProjectTypeFilterProps> = ({
  selectedType,
  onTypeChange,
  showDemo = false,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      {filterOptions.map(({ type, label, color }) => (
        <button
          key={type}
          className="client-filter-btn"
          onClick={() => onTypeChange(type)}
          style={{
            padding: showDemo ? "0.5rem 1rem" : "0.75rem 1.5rem",
            borderRadius: "8px",
            border:
              selectedType === type
                ? `2px solid ${color}`
                : "2px solid rgba(255, 255, 255, 0.2)",
            background:
              selectedType === type ? `${color}20` : "rgba(20, 20, 20, 0.8)",
            color: selectedType === type ? color : "rgba(255, 255, 255, 0.7)",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontSize: showDemo ? "0.875rem" : "1rem",
          }}
          onMouseEnter={(e) => {
            if (selectedType !== type) {
              e.currentTarget.style.background = `${color}20`;
              e.currentTarget.style.borderColor = `${color}80`;
              e.currentTarget.style.color = color;
            }
          }}
          onMouseLeave={(e) => {
            if (selectedType !== type) {
              e.currentTarget.style.background = "rgba(20, 20, 20, 0.8)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
            }
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
