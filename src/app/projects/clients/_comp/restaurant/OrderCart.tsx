// OrderCart component for RestaurantDemo
"use client";
import type { MenuCategory } from "@/lib/data/demos/restaurant-data";
import React from "react";
import {
  DemoButton,
  DemoCard,
  DemoSection,
} from "../../../../../components/demos";

interface Props {
  cart: { [key: string]: number };
  menuData: MenuCategory[];
  addToCart: (itemName: string) => void;
  removeFromCart: (itemName: string) => void;
  cartTotal: () => string;
}

export const OrderCart: React.FC<Props> = ({
  cart,
  menuData,
  addToCart,
  removeFromCart,
  cartTotal,
}) => {
  const entries = Object.entries(cart);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <DemoSection>
        {entries.length === 0 ? (
          <DemoCard style={{ textAlign: "center", padding: "3rem" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</div>
            <h3
              style={{
                color: "#ec4899",
                marginBottom: "1rem",
                fontSize: "1.5rem",
              }}
            >
              Your cart is empty
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: "1.5rem",
              }}
            >
              Browse our menu and add items to get started
            </p>
            <DemoButton variant="primary">View Menu</DemoButton>
          </DemoCard>
        ) : (
          <>
            <DemoCard style={{ marginBottom: "1.5rem" }}>
              <h3
                style={{
                  color: "#ec4899",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                }}
              >
                Your Order
              </h3>
              {entries.map(([itemName, quantity]) => {
                const item = menuData
                  .flatMap((c) => c.items)
                  .find((i) => i.name === itemName);
                if (!item) return null;
                return (
                  <div
                    key={itemName}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1rem",
                      background: "rgba(236, 72, 153, 0.05)",
                      border: "2px solid rgba(236, 72, 153, 0.2)",
                      borderRadius: "8px",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "700", color: "#ec4899" }}>
                        {item.emoji} {item.name}
                      </div>
                      <div
                        style={{
                          color: "rgba(255, 255, 255, 0.7)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.price} × {quantity}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                      }}
                    >
                      <DemoButton
                        variant="danger"
                        size="small"
                        onClick={() => removeFromCart(itemName)}
                      >
                        −
                      </DemoButton>
                      <span
                        style={{
                          color: "#ec4899",
                          fontWeight: "700",
                          minWidth: "2rem",
                          textAlign: "center",
                        }}
                      >
                        {quantity}
                      </span>
                      <DemoButton
                        variant="success"
                        size="small"
                        onClick={() => addToCart(itemName)}
                      >
                        +
                      </DemoButton>
                    </div>
                  </div>
                );
              })}
              <div
                style={{
                  marginTop: "1rem",
                  paddingTop: "1rem",
                  borderTop: "2px solid rgba(236, 72, 153, 0.3)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#ec4899",
                  }}
                >
                  Total:
                </span>
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#ec4899",
                  }}
                >
                  ${cartTotal()}
                </span>
              </div>
            </DemoCard>

            <DemoCard>
              <h3
                style={{
                  color: "#ec4899",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                }}
              >
                Pickup Details
              </h3>
              {/* Pickup UI is managed in the parent demo; this card can remain simple here */}
              <DemoButton variant="success">Place Order</DemoButton>
            </DemoCard>
          </>
        )}
      </DemoSection>
    </div>
  );
};
