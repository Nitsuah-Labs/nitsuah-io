/**
 * ShoppingCart.tsx
 *
 * TODO: Extract from StorefrontDemo.tsx (1,777 LOC)
 *
 * This will handle the shopping cart page, showing:
 * - Cart items with quantity controls
 * - Item removal
 * - Cart totals (subtotal, tax, shipping, total)
 * - Empty cart state
 * - Proceed to checkout button
 *
 * Target: ~350 LOC
 *
 * Can use shared components:
 * - DemoTable for cart items (columns: product, price, quantity, subtotal)
 * - DemoButton for quantity controls and checkout
 * - DemoCard for cart summary
 *
 * Lines to extract from StorefrontDemo: ~694-1087
 */

"use client";
import React from "react";

export const ShoppingCart: React.FC = () => {
  return (
    <div>
      <p style={{ color: "#888", textAlign: "center", padding: "2rem" }}>
        Shopping Cart - To be extracted from StorefrontDemo
      </p>
    </div>
  );
};
