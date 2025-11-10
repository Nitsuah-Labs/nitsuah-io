import React from "react";

interface FilterButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  category?: string;
  count?: number;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  isSelected,
  onClick,
  category,
  count,
}) => {
  const getColorByCategory = (cat?: string) => {
    switch (cat) {
      case "Platform":
        return "#3b82f6"; // blue
      case "Technology":
        return "#22c55e"; // green
      case "Type":
        return "#f59e0b"; // orange
      case "Program":
        return "#a855f7"; // purple
      default:
        return "#6b7280"; // gray
    }
  };

  const color = getColorByCategory(category);

  return (
    <button
      onClick={onClick}
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "20px",
        border: "2px solid",
        borderColor: isSelected ? color : `${color}40`,
        background: isSelected ? `${color}20` : "rgba(20, 20, 20, 0.8)",
        color: isSelected ? color : "rgba(255, 255, 255, 0.7)",
        cursor: "pointer",
        fontSize: "0.875rem",
        fontWeight: "600",
        transition: "all 0.2s ease",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = `${color}60`;
          e.currentTarget.style.color = "#fff";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = `${color}40`;
          e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
        }
      }}
    >
      {label}
      {count !== undefined && (
        <span
          style={{
            background: isSelected ? color : "rgba(255, 255, 255, 0.2)",
            color: isSelected ? "#fff" : "rgba(255, 255, 255, 0.6)",
            padding: "0.125rem 0.375rem",
            borderRadius: "10px",
            fontSize: "0.75rem",
            fontWeight: "700",
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
};
