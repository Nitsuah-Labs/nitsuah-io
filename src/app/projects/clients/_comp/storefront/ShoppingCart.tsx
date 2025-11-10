/**
 * ShoppingCart.tsx
 * Shopping cart page with item management and checkout
 */

"use client";
import React from "react";
import { DemoButton, DemoCard } from "../../../../../components/demos";

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  category: string;
  description: string;
  inStock: number;
}

interface ShoppingCartProps {
  cart: { [key: number]: number };
  products: Product[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  cart,
  products,
  onUpdateQuantity,
  onRemoveItem,
  onContinueShopping,
  onCheckout,
}) => {
  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const getCartTotal = () => {
    return Object.entries(cart)
      .reduce((total, [id, qty]) => {
        const product = products.find((p) => p.id === Number(id));
        return total + (product ? product.price * qty : 0);
      }, 0)
      .toFixed(2);
  };

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => {
      const product = products.find((p) => p.id === Number(id));
      return product && qty > 0 ? { product, qty } : null;
    })
    .filter(Boolean) as Array<{ product: Product; qty: number }>;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#f59e0b",
          marginBottom: "1.5rem",
        }}
      >
        Shopping Cart
      </h2>

      {getTotalItems() === 0 ? (
        <DemoCard style={{ textAlign: "center", padding: "3rem" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</div>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              marginBottom: "1.5rem",
            }}
          >
            Your cart is empty
          </p>
          <DemoButton variant="primary" onClick={onContinueShopping}>
            Continue Shopping
          </DemoButton>
        </DemoCard>
      ) : (
        <>
          {/* Cart Items */}
          {cartItems.map(({ product, qty }) => (
            <div
              key={product.id}
              style={{
                background: "rgba(245, 158, 11, 0.1)",
                border: "2px solid rgba(245, 158, 11, 0.3)",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  flex: "1 1 200px",
                }}
              >
                <div style={{ fontSize: "2rem" }}>{product.img}</div>
                <div>
                  <div style={{ fontWeight: "600", color: "#f59e0b" }}>
                    {product.name}
                  </div>
                  <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    ${product.price} each
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "rgba(255, 255, 255, 0.5)",
                      marginTop: "0.25rem",
                    }}
                  >
                    {product.category}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  flex: "0 0 auto",
                }}
              >
                {/* Quantity Controls */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <button
                    onClick={() =>
                      qty > 1
                        ? onUpdateQuantity(product.id, qty - 1)
                        : onRemoveItem(product.id)
                    }
                    style={{
                      width: "32px",
                      height: "32px",
                      background: "rgba(245, 158, 11, 0.2)",
                      border: "1px solid rgba(245, 158, 11, 0.4)",
                      color: "#f59e0b",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "700",
                      fontSize: "1.2rem",
                    }}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span
                    style={{
                      color: "#fff",
                      fontWeight: "600",
                      minWidth: "30px",
                      textAlign: "center",
                    }}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(product.id, qty + 1)}
                    disabled={qty >= product.inStock}
                    style={{
                      width: "32px",
                      height: "32px",
                      background:
                        qty >= product.inStock
                          ? "rgba(128, 128, 128, 0.2)"
                          : "rgba(245, 158, 11, 0.3)",
                      border: "1px solid rgba(245, 158, 11, 0.4)",
                      color: qty >= product.inStock ? "#666" : "#f59e0b",
                      borderRadius: "4px",
                      cursor:
                        qty >= product.inStock ? "not-allowed" : "pointer",
                      fontWeight: "700",
                      fontSize: "1.2rem",
                    }}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Item Total */}
                <div
                  style={{
                    fontWeight: "700",
                    color: "#f59e0b",
                    fontSize: "1.25rem",
                    minWidth: "80px",
                    textAlign: "right",
                  }}
                >
                  ${(product.price * qty).toFixed(2)}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => onRemoveItem(product.id)}
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "rgba(239, 68, 68, 0.2)",
                    border: "1px solid rgba(239, 68, 68, 0.4)",
                    color: "#ef4444",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "1.2rem",
                  }}
                  aria-label="Remove item"
                  title="Remove from cart"
                >
                  ×
                </button>
              </div>
            </div>
          ))}

          {/* Cart Summary */}
          <DemoCard
            style={{
              marginTop: "2rem",
              background: "rgba(245, 158, 11, 0.1)",
              border: "2px solid rgba(245, 158, 11, 0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                <span>Items ({getTotalItems()}):</span>
                <span>${getCartTotal()}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                <span>Shipping:</span>
                <span style={{ color: "#10b981" }}>FREE</span>
              </div>

              <div
                style={{
                  borderTop: "2px solid rgba(245, 158, 11, 0.3)",
                  paddingTop: "0.75rem",
                  marginTop: "0.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    color: "#f59e0b",
                  }}
                >
                  <span>Total:</span>
                  <span>${getCartTotal()}</span>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginTop: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              <DemoButton
                variant="secondary"
                onClick={onContinueShopping}
                style={{ flex: "1 1 150px" }}
              >
                Continue Shopping
              </DemoButton>
              <DemoButton
                variant="success"
                onClick={onCheckout}
                style={{ flex: "2 1 200px" }}
              >
                Proceed to Checkout →
              </DemoButton>
            </div>
          </DemoCard>

          {/* Trust Badges */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.5rem",
              marginTop: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "0.875rem",
              }}
            >
              <span style={{ fontSize: "1.25rem" }}>🔒</span>
              <span>Secure Checkout</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "0.875rem",
              }}
            >
              <span style={{ fontSize: "1.25rem" }}>🚚</span>
              <span>Free Shipping</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "0.875rem",
              }}
            >
              <span style={{ fontSize: "1.25rem" }}>↩️</span>
              <span>30-Day Returns</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
