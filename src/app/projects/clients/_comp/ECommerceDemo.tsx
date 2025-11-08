// E-Commerce Storefront Demo
"use client";
import React, { useState } from "react";

export const ECommerceDemo: React.FC = () => {
  const [cart, setCart] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<"home" | "cart" | "product">(
    "home",
  );

  const products = [
    { id: 1, name: "Premium Headphones", price: 299, img: "🎧" },
    { id: 2, name: "Smart Watch", price: 399, img: "⌚" },
    { id: 3, name: "Laptop Pro", price: 1299, img: "💻" },
    { id: 4, name: "Camera Kit", price: 899, img: "📷" },
  ];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Navigation Bar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
          background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <span
            style={{ fontSize: "1.5rem", fontWeight: "700", color: "#fff" }}
          >
            🛒 ShopNow
          </span>
          <button
            onClick={() => setCurrentPage("home")}
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
            }}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentPage("product")}
            style={{
              background:
                currentPage === "product"
                  ? "rgba(255,255,255,0.3)"
                  : "transparent",
              border: "none",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Products
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
          }}
        >
          Cart ({cart})
        </button>
      </nav>

      {/* Page Content */}
      <div style={{ padding: "2rem 1.5rem", minHeight: "400px" }}>
        {currentPage === "home" && (
          <div>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#f59e0b",
                marginBottom: "1rem",
              }}
            >
              Featured Products
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
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
                  }}
                  onClick={() => setCurrentPage("product")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#f59e0b";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(245, 158, 11, 0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
                    {product.img}
                  </div>
                  <div
                    style={{
                      fontWeight: "600",
                      color: "#f59e0b",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {product.name}
                  </div>
                  <div
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: "1.25rem",
                      fontWeight: "700",
                    }}
                  >
                    ${product.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === "product" && (
          <div>
            <button
              onClick={() => setCurrentPage("home")}
              style={{
                background: "transparent",
                border: "1px solid #f59e0b",
                color: "#f59e0b",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
                marginBottom: "1rem",
              }}
            >
              ← Back
            </button>
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <div
                style={{
                  fontSize: "6rem",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                🎧
              </div>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#f59e0b",
                  textAlign: "center",
                }}
              >
                Premium Headphones
              </h2>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  textAlign: "center",
                  marginBottom: "1.5rem",
                }}
              >
                High-quality audio with noise cancellation. Perfect for music
                lovers and professionals.
              </p>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#fff",
                  marginBottom: "2rem",
                }}
              >
                $299
              </div>
              <button
                onClick={() => setCart(cart + 1)}
                style={{
                  width: "100%",
                  padding: "1rem",
                  background:
                    "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "8px",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}

        {currentPage === "cart" && (
          <div>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#f59e0b",
                marginBottom: "1rem",
              }}
            >
              Shopping Cart
            </h2>
            {cart === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</div>
                <p>Your cart is empty</p>
                <button
                  onClick={() => setCurrentPage("home")}
                  style={{
                    marginTop: "1rem",
                    padding: "0.75rem 1.5rem",
                    background: "#f59e0b",
                    border: "none",
                    color: "#fff",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    background: "rgba(245, 158, 11, 0.1)",
                    border: "2px solid rgba(245, 158, 11, 0.3)",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "1.5rem" }}>🎧</div>
                      <div style={{ color: "#fff", fontWeight: "600" }}>
                        Premium Headphones
                      </div>
                      <div style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                        Qty: {cart}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#f59e0b",
                      }}
                    >
                      ${299 * cart}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "right",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#fff",
                    marginBottom: "1rem",
                  }}
                >
                  Total: ${299 * cart}
                </div>
                <button
                  style={{
                    width: "100%",
                    padding: "1rem",
                    background:
                      "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
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
            )}
          </div>
        )}
      </div>

      {/* Footer */}
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
