// Real Estate Listings Demo
"use client";
import { mockProperties } from "@/lib/data/demos/realestate-data";
import React, { useState } from "react";
import { PropertyCard } from "./realestate/PropertyCard";
import { PropertyDetail } from "./realestate/PropertyDetail";

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
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={() => {
                    setSelectedProperty(property.id - 1);
                    setCurrentView("detail");
                  }}
                />
              ))}
            </div>
          </>
        )}

        {currentView === "detail" && (
          <PropertyDetail
            property={filteredProperties[selectedProperty]}
            onBack={() => setCurrentView("listings")}
          />
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
