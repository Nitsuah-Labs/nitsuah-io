// Product Detail View for Storefront Demo
import type { Product } from "@/lib/data/demos/storefront-data";
import React from "react";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (productId: number) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onBack,
  onAddToCart,
}) => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <button
        onClick={onBack}
        style={{
          background: "rgba(245, 158, 11, 0.2)",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          color: "#f59e0b",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "1.5rem",
          fontWeight: "600",
        }}
      >
        ← Back to Shop
      </button>

      <div
        className="store-product-detail"
        style={{
          background: "rgba(245, 158, 11, 0.1)",
          border: "2px solid rgba(245, 158, 11, 0.3)",
          borderRadius: "12px",
          padding: "2rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "8rem" }}>{product.img}</div>
        </div>

        <div>
          <div
            style={{
              fontSize: "0.875rem",
              color: "rgba(255, 255, 255, 0.6)",
              marginBottom: "0.5rem",
            }}
          >
            {product.category}
          </div>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#f59e0b",
              margin: "0 0 1rem 0",
            }}
          >
            {product.name}
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: "1.5rem",
            }}
          >
            {product.description}
          </p>

          <div style={{ marginBottom: "1.5rem" }}>
            {product.originalPrice && (
              <div style={{ marginBottom: "0.5rem" }}>
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "rgba(255, 255, 255, 0.4)",
                    fontSize: "1.25rem",
                    marginRight: "1rem",
                  }}
                >
                  ${product.originalPrice}
                </span>
                <span
                  style={{
                    background: "#10b981",
                    color: "#fff",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                  }}
                >
                  Save ${product.originalPrice - product.price}
                </span>
              </div>
            )}
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: product.isOnSale ? "#dc2626" : "#f59e0b",
              }}
            >
              ${product.price}
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product.id)}
            style={{
              width: "100%",
              padding: "1rem",
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              border: "none",
              color: "#fff",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
