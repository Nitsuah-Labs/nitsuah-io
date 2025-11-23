// Real Estate Listings Demo
"use client";
import { mockProperties } from "@/lib/data/demos/realestate-data";
import React, { useState } from "react";

export const RealEstateDemo: React.FC = () => {
  const [currentView, setCurrentView] = useState<"listings" | "detail" | "map">(
    "listings",
  );
  const [selectedProperty, setSelectedProperty] = useState(0);
  const [filterType, setFilterType] = useState<"all" | "sale" | "rent">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<"all" | "low" | "mid" | "high">(
    "all",
  );
  const [bedrooms, setBedrooms] = useState<"all" | "1" | "2" | "3" | "4+">(
    "all",
  );
  const [layoutView, setLayoutView] = useState<"grid" | "list">("grid");

  const properties = mockProperties;

  const filteredProperties = properties.filter((p) => {
    // Type filter
    if (filterType !== "all" && p.type !== filterType) return false;

    // Search filter
    if (
      searchTerm &&
      !p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !p.location.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Price range filter
    if (priceRange === "low" && p.priceNum > 500000 && p.type === "sale")
      return false;
    if (priceRange === "low" && p.priceNum > 2000 && p.type === "rent")
      return false;
    if (
      priceRange === "mid" &&
      (p.priceNum < 500000 || p.priceNum > 900000) &&
      p.type === "sale"
    )
      return false;
    if (
      priceRange === "mid" &&
      (p.priceNum < 2000 || p.priceNum > 3500) &&
      p.type === "rent"
    )
      return false;
    if (priceRange === "high" && p.priceNum < 900000 && p.type === "sale")
      return false;
    if (priceRange === "high" && p.priceNum < 3500 && p.type === "rent")
      return false;

    // Bedrooms filter
    if (bedrooms === "1" && p.beds !== 1) return false;
    if (bedrooms === "2" && p.beds !== 2) return false;
    if (bedrooms === "3" && p.beds !== 3) return false;
    if (bedrooms === "4+" && p.beds < 4) return false;

    return true;
  });

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
          padding: "1.5rem",
          background: "rgba(16, 185, 129, 0.1)",
          borderBottom: "2px solid rgba(16, 185, 129, 0.3)",
        }}
      >
        {/* Search Bar */}
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="🔍 Search by location or property name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              background: "rgba(0, 0, 0, 0.3)",
              border: "2px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "1rem",
            }}
          />
        </div>

        {/* Filters Row */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem" }}>
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

          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value as any)}
            style={{
              padding: "0.5rem 1rem",
              background: "rgba(0, 0, 0, 0.3)",
              border: "2px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "6px",
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            <option value="all">All Bedrooms</option>
            <option value="1">1 Bed</option>
            <option value="2">2 Beds</option>
            <option value="3">3 Beds</option>
            <option value="4+">4+ Beds</option>
          </select>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value as any)}
            style={{
              padding: "0.5rem 1rem",
              background: "rgba(0, 0, 0, 0.3)",
              border: "2px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "6px",
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            <option value="all">All Prices</option>
            <option value="low">
              {filterType === "rent" ? "< $2,000/mo" : "< $500k"}
            </option>
            <option value="mid">
              {filterType === "rent" ? "$2k-$3.5k/mo" : "$500k-$900k"}
            </option>
            <option value="high">
              {filterType === "rent" ? "> $3,500/mo" : "> $900k"}
            </option>
          </select>

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "0.875rem",
                marginRight: "0.5rem",
              }}
            >
              View:
            </span>
            <button
              onClick={() => setLayoutView("grid")}
              style={{
                padding: "0.5rem 0.75rem",
                background:
                  layoutView === "grid"
                    ? "rgba(16, 185, 129, 0.3)"
                    : "transparent",
                border:
                  layoutView === "grid"
                    ? "2px solid #10b981"
                    : "2px solid rgba(16, 185, 129, 0.3)",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "1.25rem",
              }}
            >
              ⊞
            </button>
            <button
              onClick={() => setLayoutView("list")}
              style={{
                padding: "0.5rem 0.75rem",
                background:
                  layoutView === "list"
                    ? "rgba(16, 185, 129, 0.3)"
                    : "transparent",
                border:
                  layoutView === "list"
                    ? "2px solid #10b981"
                    : "2px solid rgba(16, 185, 129, 0.3)",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "1.25rem",
              }}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* View Navigation Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "1rem 1.5rem",
          background: "rgba(16, 185, 129, 0.05)",
          borderBottom: "2px solid rgba(16, 185, 129, 0.2)",
        }}
      >
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
          <>
            <div
              style={{
                marginBottom: "1rem",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              Showing {filteredProperties.length} properties
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
                    e.currentTarget.style.borderColor =
                      "rgba(16, 185, 129, 0.3)";
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
                          color:
                            property.type === "sale" ? "#10b981" : "#3b82f6",
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
                    Description
                  </h3>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      lineHeight: "1.7",
                      margin: 0,
                    }}
                  >
                    {filteredProperties[selectedProperty]?.description}
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
                    {filteredProperties[selectedProperty]?.features.map(
                      (feature, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            color: "rgba(255, 255, 255, 0.8)",
                          }}
                        >
                          <span
                            style={{ color: "#10b981", fontSize: "1.25rem" }}
                          >
                            ✓
                          </span>
                          {feature}
                        </div>
                      ),
                    )}
                  </div>
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
