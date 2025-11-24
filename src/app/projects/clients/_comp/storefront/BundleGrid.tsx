// Bundle Grid Component for Storefront Demo
import type { Bundle } from "@/lib/data/demos/storefront-data";
import React from "react";

interface BundleGridProps {
  bundles: Bundle[];
  onBundleClick: (bundleId: string) => void;
}

export const BundleGrid: React.FC<BundleGridProps> = ({
  bundles,
  onBundleClick,
}) => {
  return (
    <div
      className="store-bundle-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
        marginBottom: "2rem",
      }}
    >
      {bundles.map((bundle) => (
        <div
          key={bundle.id}
          onClick={() => onBundleClick(bundle.id)}
          style={{
            background: "rgba(245, 158, 11, 0.1)",
            border: "2px solid rgba(245, 158, 11, 0.3)",
            borderRadius: "8px",
            padding: "1rem",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#f59e0b";
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.3)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div style={{ fontSize: "3rem", textAlign: "center" }}>
            {bundle.img}
          </div>
          <h3
            style={{
              fontWeight: "600",
              color: "#f59e0b",
              margin: "0.5rem 0",
            }}
          >
            {bundle.name}
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ color: "#fff", fontWeight: "700" }}>
                ${bundle.price}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#10b981" }}>
                Save ${bundle.savings}!
              </div>
            </div>
            <span
              style={{
                background: "#10b981",
                color: "#fff",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                fontSize: "0.75rem",
                fontWeight: "600",
              }}
            >
              {bundle.products.length} items
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
