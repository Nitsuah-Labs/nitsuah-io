// Product Grid Component for Storefront Demo
import type { Product } from "@/lib/data/demos/storefront-data";
import React from "react";

interface ProductGridProps {
  products: Product[];
  onProductClick: (productId: number) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onProductClick,
}) => {
  return (
    <div
      className="store-product-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "1rem",
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          className="store-product-card"
          style={{
            background: "rgba(245, 158, 11, 0.1)",
            border: "2px solid rgba(245, 158, 11, 0.3)",
            borderRadius: "8px",
            padding: "1rem",
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.2s",
            position: "relative",
          }}
          onClick={() => onProductClick(product.id)}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#f59e0b";
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.3)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {product.isOnSale && (
            <div
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                background: "#dc2626",
                color: "#fff",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                fontSize: "0.7rem",
                fontWeight: "700",
              }}
            >
              SALE
            </div>
          )}
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
            {product.img}
          </div>
          <div
            style={{
              fontWeight: "600",
              color: "#f59e0b",
              marginBottom: "0.25rem",
              fontSize: "0.9rem",
            }}
          >
            {product.name}
          </div>
          <div>
            {product.originalPrice && (
              <span
                style={{
                  textDecoration: "line-through",
                  color: "rgba(255, 255, 255, 0.4)",
                  fontSize: "0.875rem",
                  marginRight: "0.5rem",
                }}
              >
                ${product.originalPrice}
              </span>
            )}
            <span
              style={{
                color: product.isOnSale ? "#dc2626" : "#fff",
                fontSize: "1.1rem",
                fontWeight: "700",
              }}
            >
              ${product.price}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
