// Real Estate Listings Demo
"use client";
import React, { useState } from "react";

export const RealEstateDemo: React.FC = () => {
  const [currentView, setCurrentView] = useState<"listings" | "detail" | "map">(
    "listings",
  );
  const [selectedProperty, setSelectedProperty] = useState(0);
  const [filterType, setFilterType] = useState<"all" | "sale" | "rent">("all");

  const properties = [
    {
      id: 1,
      title: "Modern Downtown Loft",
      type: "sale",
      price: "$850,000",
      beds: 2,
      baths: 2,
      sqft: "1,200",
      icon: "🏢",
      location: "Downtown",
    },
    {
      id: 2,
      title: "Suburban Family Home",
      type: "sale",
      price: "$625,000",
      beds: 4,
      baths: 3,
      sqft: "2,500",
      icon: "🏡",
      location: "Suburbs",
    },
    {
      id: 3,
      title: "Luxury Penthouse",
      type: "rent",
      price: "$4,500/mo",
      beds: 3,
      baths: 3,
      sqft: "2,100",
      icon: "🏙️",
      location: "City Center",
    },
    {
      id: 4,
      title: "Cozy Studio Apartment",
      type: "rent",
      price: "$1,800/mo",
      beds: 1,
      baths: 1,
      sqft: "650",
      icon: "🏠",
      location: "Midtown",
    },
  ];

  const filteredProperties =
    filterType === "all"
      ? properties
      : properties.filter((p) => p.type === filterType);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          padding: "1.5rem",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#fff",
                margin: "0 0 0.25rem 0",
              }}
            >
              🏘️ Prime Realty
            </h1>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                margin: 0,
                fontSize: "0.95rem",
              }}
            >
              Find Your Dream Home
            </p>
          </div>
          <button
            style={{
              padding: "0.75rem 1.5rem",
              background: "#fff",
              border: "none",
              color: "#10b981",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            📞 Contact Agent
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
          background: "rgba(16, 185, 129, 0.1)",
          borderBottom: "2px solid rgba(16, 185, 129, 0.3)",
        }}
      >
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {[
            { id: "all", label: "All" },
            { id: "sale", label: "For Sale" },
            { id: "rent", label: "For Rent" },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterType(filter.id as any)}
              style={{
                padding: "0.5rem 1rem",
                background:
                  filterType === filter.id
                    ? "rgba(16, 185, 129, 0.3)"
                    : "transparent",
                border:
                  filterType === filter.id
                    ? "2px solid #10b981"
                    : "2px solid rgba(16, 185, 129, 0.3)",
                color:
                  filterType === filter.id
                    ? "#10b981"
                    : "rgba(255, 255, 255, 0.7)",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.875rem",
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setCurrentView("listings")}
            style={{
              padding: "0.5rem 1rem",
              background:
                currentView === "listings"
                  ? "rgba(16, 185, 129, 0.3)"
                  : "transparent",
              border: "2px solid rgba(16, 185, 129, 0.3)",
              color: "#10b981",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.875rem",
            }}
          >
            📋 List
          </button>
          <button
            onClick={() => setCurrentView("map")}
            style={{
              padding: "0.5rem 1rem",
              background:
                currentView === "map"
                  ? "rgba(16, 185, 129, 0.3)"
                  : "transparent",
              border: "2px solid rgba(16, 185, 129, 0.3)",
              color: "#10b981",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.875rem",
            }}
          >
            🗺️ Map
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "2rem 1.5rem", minHeight: "450px" }}>
        {currentView === "listings" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {filteredProperties.map((property) => (
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
                onClick={() => {
                  setSelectedProperty(property.id - 1);
                  setCurrentView("detail");
                }}
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
        )}

        {currentView === "detail" && (
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <button
              onClick={() => setCurrentView("listings")}
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
                {filteredProperties[selectedProperty]?.icon}
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
                      {filteredProperties[selectedProperty]?.title}
                    </h2>
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 0.7)",
                        margin: 0,
                        fontSize: "1rem",
                      }}
                    >
                      📍 {filteredProperties[selectedProperty]?.location}
                    </p>
                  </div>
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      color: "#10b981",
                    }}
                  >
                    {filteredProperties[selectedProperty]?.price}
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
                      {filteredProperties[selectedProperty]?.beds}
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
                      {filteredProperties[selectedProperty]?.baths}
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
                      {filteredProperties[selectedProperty]?.sqft}
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
                    Property Features
                  </h3>
                  <ul
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      lineHeight: "1.8",
                      paddingLeft: "1.5rem",
                    }}
                  >
                    <li>Modern kitchen with stainless steel appliances</li>
                    <li>Hardwood floors throughout</li>
                    <li>In-unit washer/dryer</li>
                    <li>Central heating and A/C</li>
                    <li>Walking distance to public transit</li>
                  </ul>
                </div>

                <button
                  style={{
                    width: "100%",
                    padding: "1rem",
                    background:
                      "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    border: "none",
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    cursor: "pointer",
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
        )}

        {currentView === "map" && (
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
                {filteredProperties.map((prop) => (
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
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "1rem",
          borderTop: "2px solid rgba(16, 185, 129, 0.3)",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "0.875rem",
        }}
      >
        © 2025 Prime Realty - Real Estate Demo
      </div>
    </div>
  );
};
