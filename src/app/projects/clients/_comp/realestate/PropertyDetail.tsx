// Property Detail Component for Real Estate Demo
import { Property } from "@/lib/data/demos/realestate-data";
import React from "react";

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
}

export const PropertyDetail: React.FC<PropertyDetailProps> = ({
  property,
  onBack,
}) => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <button
        onClick={onBack}
        style={{
          padding: "0.5rem 1rem",
          background: "transparent",
          border: "2px solid rgba(16, 185, 129, 0.3)",
          color: "#10b981",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "1.5rem",
          fontWeight: "600",
        }}
      >
        ← Back to Listings
      </button>

      <div
        style={{
          background: "rgba(16, 185, 129, 0.1)",
          border: "2px solid rgba(16, 185, 129, 0.3)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: "10rem",
            textAlign: "center",
            padding: "3rem",
            background: "rgba(16, 185, 129, 0.05)",
          }}
        >
          {property.icon}
        </div>
        <div style={{ padding: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              marginBottom: "1rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#fff",
                  margin: "0 0 0.5rem 0",
                }}
              >
                {property.title}
              </h2>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  margin: 0,
                  fontSize: "1rem",
                }}
              >
                📍 {property.location}
              </p>
            </div>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#10b981",
              }}
            >
              {property.price}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
              marginBottom: "1.5rem",
              padding: "1rem",
              background: "rgba(16, 185, 129, 0.05)",
              borderRadius: "8px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2rem",
                  marginBottom: "0.25rem",
                }}
              >
                🛏️
              </div>
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  color: "#fff",
                }}
              >
                {property.beds}
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                Bedrooms
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2rem",
                  marginBottom: "0.25rem",
                }}
              >
                🚿
              </div>
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  color: "#fff",
                }}
              >
                {property.baths}
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                Bathrooms
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2rem",
                  marginBottom: "0.25rem",
                }}
              >
                📏
              </div>
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  color: "#fff",
                }}
              >
                {property.sqft}
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                Square Feet
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#10b981",
                marginBottom: "0.75rem",
              }}
            >
              Description
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              {property.description}
            </p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#10b981",
                marginBottom: "0.75rem",
              }}
            >
              Property Features
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "0.75rem",
              }}
            >
              {property.features.map((feature, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  <span style={{ color: "#10b981", fontSize: "1.25rem" }}>
                    ✓
                  </span>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <button
            style={{
              width: "100%",
              padding: "1rem",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              border: "none",
              color: "#fff",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "700",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Schedule a Tour
          </button>
        </div>
      </div>
    </div>
  );
};
