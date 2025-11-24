// Bundle View Component for Storefront Demo
import React from "react";

interface Bundle {
  id: string;
  name: string;
  img: string;
  price: number;
  savings: number;
  products: number[];
}

interface Product {
  id: number;
  name: string;
  img: string;
  description: string;
  price: number;
  category: string;
}

interface BundleViewProps {
  bundle: Bundle;
  products: Product[];
  onBack: () => void;
  onAddToCart: () => void;
}

export const BundleView: React.FC<BundleViewProps> = ({
  bundle,
  products,
  onBack,
  onAddToCart,
}) => {
  const bundleProducts = products.filter((p) => bundle.products.includes(p.id));

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <button
        onClick={onBack}
        style={{
          padding: "0.5rem 1rem",
          background: "rgba(245, 158, 11, 0.2)",
          border: "1px solid rgba(245, 158, 11, 0.4)",
          color: "#f59e0b",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "1.5rem",
          fontWeight: "600",
        }}
      >
        ← Back to Store
      </button>

      <div
        style={{
          background: "rgba(245, 158, 11, 0.1)",
          border: "2px solid rgba(245, 158, 11, 0.3)",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            fontSize: "4rem",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          {bundle.img}
        </div>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#f59e0b",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          {bundle.name}
        </h2>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#f59e0b",
              marginBottom: "0.5rem",
            }}
          >
            ${bundle.price}
          </div>
          <div
            style={{
              fontSize: "1.25rem",
              color: "#10b981",
              fontWeight: "600",
            }}
          >
            💰 Save ${bundle.savings}!
          </div>
          <div
            style={{
              fontSize: "0.9rem",
              color: "rgba(255, 255, 255, 0.6)",
              marginTop: "0.5rem",
            }}
          >
            Bundle includes {bundle.products.length} premium items
          </div>
        </div>

        <button
          onClick={onAddToCart}
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
          🛒 Add Bundle to Cart
        </button>
      </div>

      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#f59e0b",
          marginBottom: "1.5rem",
        }}
      >
        Included Products
      </h3>

      <div style={{ display: "grid", gap: "1rem" }}>
        {bundleProducts.map((product) => (
          <div
            key={product.id}
            style={{
              background: "rgba(245, 158, 11, 0.05)",
              border: "1px solid rgba(245, 158, 11, 0.2)",
              borderRadius: "8px",
              padding: "1.5rem",
              display: "flex",
              gap: "1.5rem",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "3rem", flexShrink: 0 }}>{product.img}</div>
            <div style={{ flex: 1 }}>
              <h4
                style={{
                  fontWeight: "600",
                  color: "#f59e0b",
                  marginBottom: "0.5rem",
                }}
              >
                {product.name}
              </h4>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.9rem",
                  marginBottom: "0.5rem",
                }}
              >
                {product.description}
              </p>
              <div
                style={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontSize: "0.85rem",
                }}
              >
                Category: {product.category}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div
                style={{
                  fontWeight: "700",
                  color: "#f59e0b",
                  fontSize: "1.25rem",
                }}
              >
                ${product.price}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#10b981",
                  marginTop: "0.25rem",
                }}
              >
                ✓ In Stock
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
