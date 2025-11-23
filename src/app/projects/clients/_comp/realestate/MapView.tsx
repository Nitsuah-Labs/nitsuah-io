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

interface MapViewProps {
  properties: Property[];
}

export const MapView: React.FC<MapViewProps> = ({ properties }) => {
  return (
    <div>
      <div
        style={{
          background: "rgba(16, 185, 129, 0.1)",
          border: "2px solid rgba(16, 185, 129, 0.3)",
          borderRadius: "12px",
          padding: "3rem",
          textAlign: "center",
          minHeight: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>🗺️</div>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#10b981",
            marginBottom: "0.5rem",
          }}
        >
          Interactive Map View
        </h3>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: "1rem",
          }}
        >
          Map integration with property markers
        </p>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {properties.map((prop) => (
            <div
              key={prop.id}
              style={{
                padding: "0.5rem 1rem",
                background: "rgba(16, 185, 129, 0.2)",
                border: "2px solid rgba(16, 185, 129, 0.4)",
                borderRadius: "8px",
                color: "#10b981",
                fontWeight: "600",
                fontSize: "0.875rem",
              }}
            >
              📍 {prop.location}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
