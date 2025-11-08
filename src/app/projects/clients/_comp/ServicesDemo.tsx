// Services Demo - Restaurant & Booking
"use client";
import React, { useState } from "react";

export const ServicesDemo: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<"home" | "menu" | "booking">(
    "home",
  );
  const [reservationDate, setReservationDate] = useState("");
  const [guests, setGuests] = useState(2);

  const menuItems = [
    { name: "Margherita Pizza", price: "$18", category: "Mains", icon: "🍕" },
    { name: "Caesar Salad", price: "$12", category: "Starters", icon: "🥗" },
    { name: "Pasta Carbonara", price: "$16", category: "Mains", icon: "🍝" },
    { name: "Tiramisu", price: "$8", category: "Desserts", icon: "🍰" },
  ];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
          padding: "2rem 1.5rem",
          borderRadius: "8px 8px 0 0",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#fff",
            margin: "0 0 0.5rem 0",
          }}
        >
          🍽️ Bella Vista
        </h1>
        <p style={{ color: "rgba(255, 255, 255, 0.9)", margin: 0 }}>
          Authentic Italian Cuisine
        </p>
      </div>

      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          padding: "1rem",
          background: "rgba(236, 72, 153, 0.1)",
          borderBottom: "2px solid rgba(236, 72, 153, 0.3)",
        }}
      >
        {[
          { id: "home", label: "Home", icon: "🏠" },
          { id: "menu", label: "Menu", icon: "📋" },
          { id: "booking", label: "Reservations", icon: "📅" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id as any)}
            style={{
              padding: "0.75rem 1.5rem",
              background:
                currentPage === item.id
                  ? "rgba(236, 72, 153, 0.3)"
                  : "transparent",
              border:
                currentPage === item.id
                  ? "2px solid #ec4899"
                  : "2px solid rgba(236, 72, 153, 0.3)",
              color:
                currentPage === item.id
                  ? "#ec4899"
                  : "rgba(255, 255, 255, 0.7)",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Page Content */}
      <div style={{ padding: "2rem 1.5rem", minHeight: "400px" }}>
        {currentPage === "home" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🍝</div>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#ec4899",
                  marginBottom: "1rem",
                }}
              >
                Welcome to Bella Vista
              </h2>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "1.1rem",
                  maxWidth: "600px",
                  margin: "0 auto 2rem",
                }}
              >
                Experience the finest Italian cuisine in an elegant atmosphere.
                Perfect for family dinners, romantic dates, and special
                occasions.
              </p>
            </div>

            {/* Features Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              {[
                {
                  icon: "👨‍🍳",
                  title: "Expert Chefs",
                  desc: "Authentic recipes",
                },
                { icon: "🍷", title: "Wine Selection", desc: "Premium wines" },
                { icon: "🌟", title: "5 Star Rating", desc: "Top reviews" },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(236, 72, 153, 0.1)",
                    border: "2px solid rgba(236, 72, 153, 0.3)",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
                    {feature.icon}
                  </div>
                  <div
                    style={{
                      fontWeight: "600",
                      color: "#ec4899",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {feature.title}
                  </div>
                  <div
                    style={{
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: "0.875rem",
                    }}
                  >
                    {feature.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === "menu" && (
          <div>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#ec4899",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Our Menu
            </h2>
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              {menuItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(236, 72, 153, 0.1)",
                    border: "2px solid rgba(236, 72, 153, 0.3)",
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
                    <span style={{ fontSize: "2rem" }}>{item.icon}</span>
                    <div>
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#fff",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                      >
                        {item.category}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "700",
                      color: "#ec4899",
                    }}
                  >
                    {item.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === "booking" && (
          <div>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#ec4899",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Make a Reservation
            </h2>
            <div
              style={{
                maxWidth: "500px",
                margin: "0 auto",
                background: "rgba(236, 72, 153, 0.1)",
                border: "2px solid rgba(236, 72, 153, 0.3)",
                borderRadius: "12px",
                padding: "2rem",
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#ec4899",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(236, 72, 153, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#ec4899",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Number of Guests
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(236, 72, 153, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#ec4899",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Special Requests
                </label>
                <textarea
                  rows={3}
                  placeholder="Dietary restrictions, special occasion, etc."
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(236, 72, 153, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                    fontFamily: "system-ui, sans-serif",
                    resize: "none",
                  }}
                />
              </div>

              <button
                style={{
                  width: "100%",
                  padding: "1rem",
                  background:
                    "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
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
                Confirm Reservation
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "1rem",
          borderTop: "2px solid rgba(236, 72, 153, 0.3)",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "0.875rem",
        }}
      >
        © 2025 Bella Vista - Restaurant Demo | 📞 (555) 123-4567
      </div>
    </div>
  );
};
