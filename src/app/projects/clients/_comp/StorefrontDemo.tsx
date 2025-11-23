// Enhanced E-Commerce Storefront Demo
"use client";
import React, { useState } from "react";
import { ProductGallery } from "./storefront/ProductGallery";
import { ShoppingCart } from "./storefront/ShoppingCart";
import { CheckoutFlow } from "./storefront/CheckoutFlow";

export const StorefrontDemo: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<
    "home" | "cart" | "checkout" | "confirmation"
  >("home");
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  if (currentPage === "cart") {
    return (
      <ShoppingCart
        cart={cart}
        setCart={setCart}
        onContinueShopping={() => setCurrentPage("home")}
        onCheckout={() => setCurrentPage("checkout")}
      />
    );
  }

  if (currentPage === "checkout" || currentPage === "confirmation") {
    return <CheckoutFlow cart={cart} onBack={() => setCurrentPage("cart")} />;
  }

  return (
    <ProductGallery
      cart={cart}
      onAddToCart={(productId) => {
        setCart((prev) => ({
          ...prev,
          [productId]: (prev[productId] || 0) + 1,
        }));
      }}
      onViewCart={() => setCurrentPage("cart")}
    />
  );
};
