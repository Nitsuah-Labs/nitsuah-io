/**
 * ProductGallery.tsx
 * Storefront home page with product grid, bundles, and featured items
 */

"use client";
import React from "react";
import { DemoButton } from "../../../../../components/demos";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  img: string;
  category: string;
  description: string;
  inStock: number;
  isOnSale?: boolean;
  isFeatured?: boolean;
}

interface Bundle {
  id: string;
  name: string;
  products: number[];
  price: number;
  savings: number;
  img: string;
}

interface ProductGalleryProps {
  products: Product[];
  bundles: Bundle[];
  onProductClick: (productId: number) => void;
  onBundleClick: (bundleId: string) => void;
  onAddToCart: (productId: number) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  products,
  bundles,
  onProductClick,
  onBundleClick,
  onAddToCart,
}) => {
  return (
    <div>
      {/* Deal Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            color: "#fff",
            fontWeight: "700",
            margin: "0 0 0.5rem 0",
          }}
        >
          🔥 Limited Time Deals
        </h3>
        <p style={{ color: "rgba(255,255,255,0.9)", margin: 0 }}>
          Save up to 15% on select items!
        </p>
      </div>

      {/* Exclusive Bundles */}
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#f59e0b",
          marginBottom: "1rem",
        }}
      >
        💎 Exclusive Bundles
      </h2>
      <div
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

      {/* Featured Products Section */}
      {products.some((p) => p.isFeatured) && (
        <>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#f59e0b",
              marginBottom: "1rem",
            }}
          >
            ⭐ Featured Products
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            {products
              .filter((p) => p.isFeatured)
              .map((product) => (
                <div
                  key={product.id}
                  style={{
                    background: "rgba(245, 158, 11, 0.15)",
                    border: "2px solid rgba(245, 158, 11, 0.5)",
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
                    e.currentTarget.style.borderColor =
                      "rgba(245, 158, 11, 0.5)";
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
                  <div style={{ marginBottom: "0.5rem" }}>
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
                  <DemoButton
                    variant="success"
                    size="small"
                    onClick={() => onAddToCart(product.id)}
                    style={{ width: "100%", marginTop: "0.5rem" }}
                  >
                    Add to Cart
                  </DemoButton>
                </div>
              ))}
          </div>
        </>
      )}

      {/* All Products */}
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#f59e0b",
          marginBottom: "1rem",
        }}
      >
        All Products
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "1rem",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
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
            <div style={{ marginBottom: "0.5rem" }}>
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
            <div
              style={{
                fontSize: "0.75rem",
                color: "rgba(255, 255, 255, 0.6)",
                marginBottom: "0.5rem",
              }}
            >
              {product.inStock > 0 ? (
                <span style={{ color: "#10b981" }}>
                  {product.inStock} in stock
                </span>
              ) : (
                <span style={{ color: "#dc2626" }}>Out of stock</span>
              )}
            </div>
            <DemoButton
              variant="success"
              size="small"
              onClick={() => onAddToCart(product.id)}
              disabled={product.inStock === 0}
              style={{ width: "100%" }}
            >
              {product.inStock > 0 ? "Add to Cart" : "Out of Stock"}
            </DemoButton>
          </div>
        ))}
      </div>
    </div>
  );
};
