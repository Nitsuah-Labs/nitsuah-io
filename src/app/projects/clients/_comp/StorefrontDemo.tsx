// Enhanced E-Commerce Storefront Demo
"use client";
import {
  initialCheckoutInfo,
  mockBundles,
  mockProducts,
  type CheckoutInfo,
} from "@/lib/data/demos/storefront-data";
import {
  calculateCartTotal,
  generateOrderNumber,
  getTotalCartItems,
} from "@/lib/utils/demo-helpers";
import React, { useState } from "react";

// Subcomponents
import { BundleView } from "./storefront/BundleView";
import { CartView } from "./storefront/CartView";
import { CheckoutView } from "./storefront/CheckoutView";
import { ConfirmationView } from "./storefront/ConfirmationView";
import { HomePage } from "./storefront/HomePage";
import { ProductDetail } from "./storefront/ProductDetail";
import { UploadView } from "./storefront/UploadView";

export const StorefrontDemo: React.FC = () => {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [currentPage, setCurrentPage] = useState<
    | "home"
    | "cart"
    | "product"
    | "upload"
    | "bundle"
    | "checkout"
    | "confirmation"
  >("home");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [checkoutInfo, setCheckoutInfo] =
    useState<CheckoutInfo>(initialCheckoutInfo);
  const [orderNumber, setOrderNumber] = useState<string>("");

  // Use imported data
  const products = mockProducts;
  const bundles = mockBundles;

  const addToCart = (productId: number) => {
    setCart({ ...cart, [productId]: (cart[productId] || 0) + 1 });
  };

  const addBundleToCart = (bundleId: string) => {
    const bundle = bundles.find((b) => b.id === bundleId);
    if (!bundle) return;

    const newCart = { ...cart };
    bundle.products.forEach((productId) => {
      newCart[productId] = (newCart[productId] || 0) + 1;
    });
    setCart(newCart);
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      const newCart = { ...cart };
      delete newCart[productId];
      setCart(newCart);
    } else {
      setCart({ ...cart, [productId]: quantity });
    }
  };

  const clearCart = () => {
    setCart({});
  };

  const viewProduct = (productId: number) => {
    setSelectedProduct(productId);
    setCurrentPage("product");
  };

  const viewBundle = (bundleId: string) => {
    setSelectedBundle(bundleId);
    setCurrentPage("bundle");
  };

  const proceedToCheckout = () => {
    setCurrentPage("checkout");
  };

  const completeOrder = () => {
    const orderNum = generateOrderNumber();
    setOrderNumber(orderNum);
    setCurrentPage("confirmation");
    clearCart();
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <style>{`
        @media (max-width: 768px) {
          .store-nav {
            flex-direction: column;
            align-items: stretch !important;
          }
          
          .store-nav-buttons {
            width: 100%;
            justify-content: space-around;
          }
          
          .store-product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          .store-bundle-grid {
            grid-template-columns: 1fr !important;
          }
          
          .store-cart-items {
            padding: 1rem !important;
          }
          
          .store-form-grid {
            grid-template-columns: 1fr !important;
          }
          
          .store-product-detail {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (max-width: 480px) {
          .store-product-grid {
            grid-template-columns: 1fr !important;
          }
          
          .store-nav button {
            font-size: 0.75rem !important;
            padding: 0.4rem 0.8rem !important;
          }
          
          .store-cart-items {
            padding: 0.75rem !important;
          }
          
          .store-product-card {
            padding: 1rem !important;
          }
        }
      `}</style>
      {/* Navigation Bar */}
      <nav
        className="store-nav"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
          background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          borderRadius: "8px 8px 0 0",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div
          className="store-nav-buttons"
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{ fontSize: "1.5rem", fontWeight: "700", color: "#fff" }}
          >
            🛒 ShopNow
          </span>
          <button
            onClick={() => {
              setCurrentPage("home");
              setSelectedProduct(null);
            }}
            style={{
              background:
                currentPage === "home"
                  ? "rgba(255,255,255,0.3)"
                  : "transparent",
              border: "none",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.875rem",
            }}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentPage("upload")}
            style={{
              background:
                currentPage === "upload"
                  ? "rgba(255,255,255,0.3)"
                  : "transparent",
              border: "none",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.875rem",
            }}
          >
            + Sell Item
          </button>
        </div>
        <button
          onClick={() => setCurrentPage("cart")}
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            border: "2px solid #fff",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            position: "relative",
            fontSize: "0.875rem",
          }}
        >
          Cart ({getTotalCartItems(cart)})
        </button>
      </nav>

      {/* Page Content */}
      <div style={{ padding: "1.5rem", minHeight: "400px" }}>
        {currentPage === "home" && (
          <HomePage
            products={products}
            bundles={bundles}
            onProductClick={viewProduct}
            onBundleClick={viewBundle}
          />
        )}

        {currentPage === "product" &&
          selectedProduct !== null &&
          (() => {
            const product = products.find((p) => p.id === selectedProduct);
            if (!product) return null;
            return (
              <ProductDetail
                product={product}
                onBack={() => setCurrentPage("home")}
                onAddToCart={addToCart}
              />
            );
          })()}

        {currentPage === "cart" && (
          <CartView
            cart={cart}
            products={products}
            onUpdateQuantity={updateCartQuantity}
            onContinueShopping={() => setCurrentPage("home")}
            onCheckout={proceedToCheckout}
          />
        )}

        {currentPage === "bundle" &&
          selectedBundle &&
          (() => {
            const bundle = bundles.find((b) => b.id === selectedBundle);
            if (!bundle) return null;

            return (
              <BundleView
                bundle={bundle}
                products={products}
                onBack={() => setCurrentPage("home")}
                onAddToCart={() => {
                  addBundleToCart(bundle.id);
                  setCurrentPage("cart");
                }}
              />
            );
          })()}

        {currentPage === "checkout" && (
          <CheckoutView
            cart={cart}
            products={products}
            checkoutInfo={checkoutInfo}
            onCheckoutInfoChange={setCheckoutInfo}
            onBack={() => setCurrentPage("cart")}
            onComplete={completeOrder}
            calculateTotal={calculateCartTotal}
          />
        )}

        {currentPage === "confirmation" && (
          <ConfirmationView
            orderNumber={orderNumber}
            checkoutInfo={checkoutInfo}
            onContinueShopping={() => {
              setCurrentPage("home");
              setCheckoutInfo(initialCheckoutInfo);
            }}
          />
        )}

        {currentPage === "upload" && (
          <UploadView onSubmit={() => setCurrentPage("home")} />
        )}
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "1rem",
          borderTop: "2px solid rgba(245, 158, 11, 0.3)",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "0.875rem",
        }}
      >
        © 2025 ShopNow - E-Commerce Demo
      </div>
    </div>
  );
};
