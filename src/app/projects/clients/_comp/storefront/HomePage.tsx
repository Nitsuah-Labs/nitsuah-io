// Home Page View for Storefront Demo
import type { Bundle, Product } from "@/lib/data/demos/storefront-data";
import React from "react";
import { BundleGrid } from "./BundleGrid";
import { ProductGrid } from "./ProductGrid";

interface HomePageProps {
  products: Product[];
  bundles: Bundle[];
  onProductClick: (productId: number) => void;
  onBundleClick: (bundleId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  bundles,
  onProductClick,
  onBundleClick,
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

      {/* Bundles Section */}
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
      <BundleGrid bundles={bundles} onBundleClick={onBundleClick} />

      {/* Products Section */}
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
      <ProductGrid products={products} onProductClick={onProductClick} />
    </div>
  );
};
