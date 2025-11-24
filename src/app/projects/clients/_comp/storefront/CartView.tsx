// Cart View Component for Storefront Demo
import type { Product } from "@/lib/data/demos/storefront-data";
import {
  calculateCartTotal,
  getTotalCartItems,
} from "@/lib/utils/demo-helpers";
import React from "react";

interface CartViewProps {
  cart: { [key: number]: number };
  products: Product[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cart,
  products,
  onUpdateQuantity,
  onContinueShopping,
  onCheckout,
}) => {
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

      {getTotalCartItems(cart) === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</div>
          <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Your cart is empty
          </p>
          <button
            onClick={onContinueShopping}
            style={{
              padding: "0.75rem 1.5rem",
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              border: "none",
              color: "#fff",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {Object.entries(cart).map(([id, qty]) => {
            const product = products.find((p) => p.id === Number(id));
            if (!product || qty === 0) return null;

            return (
              <div
                key={id}
                className="store-cart-items"
                style={{
                  background: "rgba(245, 158, 11, 0.1)",
                  border: "2px solid rgba(245, 158, 11, 0.3)",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
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
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <button
                      onClick={() => onUpdateQuantity(Number(id), qty - 1)}
                      style={{
                        width: "32px",
                        height: "32px",
                        background: "rgba(245, 158, 11, 0.2)",
                        border: "1px solid rgba(245, 158, 11, 0.4)",
                        color: "#f59e0b",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "700",
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        color: "#fff",
                        fontWeight: "600",
                        minWidth: "20px",
                        textAlign: "center",
                      }}
                    >
                      {qty}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(Number(id), qty + 1)}
                      style={{
                        width: "32px",
                        height: "32px",
                        background: "rgba(245, 158, 11, 0.3)",
                        border: "1px solid rgba(245, 158, 11, 0.4)",
                        color: "#f59e0b",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "700",
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div
                    style={{
                      fontWeight: "700",
                      color: "#f59e0b",
                      fontSize: "1.25rem",
                      minWidth: "80px",
                      textAlign: "right",
                    }}
                  >
                    ${product.price * qty}
                  </div>
                </div>
              </div>
            );
          })}

          <div
            style={{
              marginTop: "2rem",
              padding: "1.5rem",
              background: "rgba(245, 158, 11, 0.1)",
              border: "2px solid rgba(245, 158, 11, 0.3)",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
                fontSize: "1.25rem",
                fontWeight: "700",
                color: "#f59e0b",
              }}
            >
              <span>Total:</span>
              <span>${calculateCartTotal(cart, products)}</span>
            </div>
            <button
              onClick={onCheckout}
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
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};
