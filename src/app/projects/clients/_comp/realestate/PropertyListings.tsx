import React from "react";

interface Property {
  id: number;
  title: string;
  type: "sale" | "rent";
  price: string;
  priceNum: number;
  beds: number;
  baths: number;
  sqft: string;
  icon: string;
  location: string;
  description: string;
  features: string[];
}

interface PropertyListingsProps {
  properties: Property[];
  layoutView: "grid" | "list";
  onPropertyClick: (id: number) => void;
}

export const PropertyListings: React.FC<PropertyListingsProps> = ({
  properties,
  layoutView,
  onPropertyClick,
}) => {
  return (
    <>
      <div
        style={{
          marginBottom: "1rem",
          color: "rgba(255, 255, 255, 0.7)",
        }}
      >
        Showing {properties.length} properties
      </div>
      <div
        style={{
          display: layoutView === "grid" ? "grid" : "flex",
          gridTemplateColumns:
            layoutView === "grid"
              ? "repeat(auto-fill, minmax(280px, 1fr))"
              : undefined,
          flexDirection: layoutView === "list" ? "column" : undefined,
          gap: "1.5rem",
        }}
      >
        {properties.map((property) => (
          <div
            key={property.id}
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "2px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onClick={() => onPropertyClick(property.id - 1)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "#10b981";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.3)";
            }}
          >
            <div
              style={{
                fontSize: "6rem",
                textAlign: "center",
                padding: "2rem 1rem",
                background: "rgba(16, 185, 129, 0.05)",
              }}
            >
              {property.icon}
            </div>
            <div style={{ padding: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "0.5rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#fff",
                    margin: 0,
                  }}
                >
                  {property.title}
                </h3>
                <span
                  style={{
                    padding: "0.25rem 0.5rem",
                    background:
                      property.type === "sale"
                        ? "rgba(16, 185, 129, 0.2)"
                        : "rgba(59, 130, 246, 0.2)",
                    border: `1px solid ${property.type === "sale" ? "#10b981" : "#3b82f6"}`,
                    color: property.type === "sale" ? "#10b981" : "#3b82f6",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  {property.type}
                </span>
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#10b981",
                  marginBottom: "0.75rem",
                }}
              >
                {property.price}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  fontSize: "0.875rem",
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                <span>🛏️ {property.beds} beds</span>
                <span>🚿 {property.baths} baths</span>
                <span>📏 {property.sqft} sqft</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
