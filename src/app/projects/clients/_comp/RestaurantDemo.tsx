/**
 * RestaurantDemo.tsx
 * Standalone Italian Restaurant Demo - "Bella Vista"
 *
 * Features:
 * - Homepage with story and gallery
 * - Interactive menu with categories
 * - Table reservation system
 * - Pickup order system with cart
 */

"use client";
import React, { useState } from "react";
import {
  DemoButton,
  DemoCard,
  DemoHeader,
  DemoSection,
} from "../../../../components/demos";

type PageType = "home" | "menu" | "booking" | "pickup";

interface MenuItem {
  name: string;
  price: string;
  description: string;
  emoji: string;
}

interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export const RestaurantDemo: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [reservationDate, setReservationDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [pickupPhone, setPickupPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const menuData: MenuCategory[] = [
    {
      name: "Antipasti",
      items: [
        {
          name: "Bruschetta al Pomodoro",
          price: "$12",
          description: "Grilled bread with tomatoes, basil, and olive oil",
          emoji: "🍞",
        },
        {
          name: "Calamari Fritti",
          price: "$16",
          description: "Crispy fried calamari with marinara sauce",
          emoji: "🦑",
        },
        {
          name: "Caprese Salad",
          price: "$14",
          description: "Fresh mozzarella, tomatoes, and basil",
          emoji: "🧀",
        },
      ],
    },
    {
      name: "Pasta",
      items: [
        {
          name: "Spaghetti Carbonara",
          price: "$22",
          description: "Creamy sauce with pancetta and pecorino",
          emoji: "🍝",
        },
        {
          name: "Penne Arrabbiata",
          price: "$20",
          description: "Spicy tomato sauce with garlic",
          emoji: "🌶️",
        },
        {
          name: "Fettuccine Alfredo",
          price: "$21",
          description: "Rich cream sauce with parmesan",
          emoji: "🧈",
        },
        {
          name: "Lasagna Bolognese",
          price: "$24",
          description: "Layered pasta with meat sauce and béchamel",
          emoji: "🥘",
        },
      ],
    },
    {
      name: "Pizza",
      items: [
        {
          name: "Margherita",
          price: "$18",
          description: "Classic tomato, mozzarella, and basil",
          emoji: "🍕",
        },
        {
          name: "Diavola",
          price: "$21",
          description: "Spicy salami with chili flakes",
          emoji: "🔥",
        },
        {
          name: "Quattro Formaggi",
          price: "$23",
          description: "Four cheese blend",
          emoji: "🧀",
        },
      ],
    },
    {
      name: "Secondi",
      items: [
        {
          name: "Osso Buco",
          price: "$38",
          description: "Braised veal shanks in wine sauce",
          emoji: "🥩",
        },
        {
          name: "Branzino al Forno",
          price: "$34",
          description: "Oven-roasted Mediterranean sea bass",
          emoji: "🐟",
        },
        {
          name: "Pollo alla Parmigiana",
          price: "$28",
          description: "Breaded chicken with marinara and mozzarella",
          emoji: "🍗",
        },
      ],
    },
    {
      name: "Dolci",
      items: [
        {
          name: "Tiramisu",
          price: "$10",
          description: "Coffee-soaked ladyfingers with mascarpone",
          emoji: "☕",
        },
        {
          name: "Panna Cotta",
          price: "$9",
          description: "Silky vanilla cream with berry compote",
          emoji: "🍮",
        },
        {
          name: "Cannoli Siciliani",
          price: "$11",
          description: "Crispy shells filled with sweet ricotta",
          emoji: "🥐",
        },
      ],
    },
  ];

  const addToCart = (itemName: string) => {
    setCart((prev) => ({
      ...prev,
      [itemName]: (prev[itemName] || 0) + 1,
    }));
  };

  const removeFromCart = (itemName: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[itemName] > 1) {
        newCart[itemName]--;
      } else {
        delete newCart[itemName];
      }
      return newCart;
    });
  };

  const cartTotal = () => {
    let total = 0;
    Object.entries(cart).forEach(([itemName, quantity]) => {
      const item = menuData
        .flatMap((cat) => cat.items)
        .find((i) => i.name === itemName);
      if (item) {
        total += parseFloat(item.price.substring(1)) * quantity;
      }
    });
    return total.toFixed(2);
  };

  const filteredMenu =
    selectedCategory === "All"
      ? menuData
      : menuData.filter((cat) => cat.name === selectedCategory);

  const categories = ["All", ...menuData.map((cat) => cat.name)];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%)",
        color: "white",
        padding: "2rem 1rem",
      }}
    >
      {/* Header */}
      <DemoHeader
        title="🍽️ Bella Vista"
        subtitle="Authentic Italian Restaurant"
        actions={
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <DemoButton
              variant={currentPage === "home" ? "primary" : "ghost"}
              onClick={() => setCurrentPage("home")}
            >
              Home
            </DemoButton>
            <DemoButton
              variant={currentPage === "menu" ? "primary" : "ghost"}
              onClick={() => setCurrentPage("menu")}
            >
              Menu
            </DemoButton>
            <DemoButton
              variant={currentPage === "booking" ? "primary" : "ghost"}
              onClick={() => setCurrentPage("booking")}
            >
              Book Table
            </DemoButton>
            <DemoButton
              variant={currentPage === "pickup" ? "primary" : "ghost"}
              onClick={() => setCurrentPage("pickup")}
            >
              Pickup Order{" "}
              {Object.keys(cart).length > 0 && `(${Object.keys(cart).length})`}
            </DemoButton>
          </div>
        }
      />

      {/* Home Page */}
      {currentPage === "home" && (
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <DemoSection>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#ec4899",
                  marginBottom: "1rem",
                }}
              >
                Benvenuti a Bella Vista
              </h2>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "1.2rem",
                  maxWidth: "700px",
                  margin: "0 auto 1rem",
                  lineHeight: "1.6",
                }}
              >
                Experience authentic Italian cuisine crafted with passion,
                tradition, and the finest ingredients. From our family to yours
                since 1985.
              </p>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "1rem",
                  fontStyle: "italic",
                }}
              >
                "La cucina italiana è una dichiarazione d'amore"
              </p>
            </div>

            {/* Story Section */}
            <DemoCard
              style={{
                background: "rgba(236, 72, 153, 0.1)",
                border: "2px solid rgba(236, 72, 153, 0.3)",
                marginBottom: "3rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#ec4899",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                Our Story
              </h3>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: "1.8",
                  marginBottom: "1rem",
                }}
              >
                Founded by Chef Antonio Rossi in the heart of Little Italy,
                Bella Vista brings the warmth and flavors of Tuscany to your
                table. Every dish is prepared using recipes passed down through
                generations, combined with locally-sourced ingredients and
                imported Italian specialties.
              </p>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: "1.8",
                }}
              >
                Our wood-fired oven, handmade pasta, and commitment to
                excellence have made us a beloved destination for authentic
                Italian dining.
              </p>
            </DemoCard>

            {/* Gallery */}
            <h3
              style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                color: "#ec4899",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Gallery
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                marginBottom: "3rem",
              }}
            >
              {[
                { emoji: "🍝", label: "Fresh Pasta" },
                { emoji: "🍕", label: "Wood-Fired Pizza" },
                { emoji: "🥩", label: "Prime Cuts" },
                { emoji: "🍷", label: "Wine Cellar" },
                { emoji: "🏛️", label: "Dining Room" },
                { emoji: "🕯️", label: "Romantic Ambiance" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(236, 72, 153, 0.05)",
                    border: "2px solid rgba(236, 72, 153, 0.2)",
                    borderRadius: "8px",
                    padding: "2rem 1rem",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#ec4899";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(236, 72, 153, 0.2)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>
                    {item.emoji}
                  </div>
                  <div style={{ fontWeight: "600", color: "#ec4899" }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <h3
              style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                color: "#ec4899",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Why Choose Bella Vista
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1rem",
              }}
            >
              {[
                {
                  icon: "👨‍🍳",
                  title: "Master Chefs",
                  desc: "Trained in Italy with 40+ years experience",
                },
                {
                  icon: "🍷",
                  title: "Wine Selection",
                  desc: "300+ Italian wines in our cellar",
                },
                {
                  icon: "🌟",
                  title: "Award Winning",
                  desc: "Michelin recommended since 2010",
                },
                {
                  icon: "🥖",
                  title: "Fresh Daily",
                  desc: "Bread & pasta made fresh every morning",
                },
                {
                  icon: "🎵",
                  title: "Live Music",
                  desc: "Italian classics Friday & Saturday nights",
                },
                {
                  icon: "🎉",
                  title: "Private Events",
                  desc: "Beautiful space for your special occasions",
                },
              ].map((feature, idx) => (
                <DemoCard
                  key={idx}
                  style={{
                    background: "rgba(236, 72, 153, 0.1)",
                    border: "2px solid rgba(236, 72, 153, 0.3)",
                  }}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                    {feature.icon}
                  </div>
                  <h4
                    style={{
                      fontWeight: "700",
                      color: "#ec4899",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {feature.title}
                  </h4>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {feature.desc}
                  </p>
                </DemoCard>
              ))}
            </div>
          </DemoSection>
        </div>
      )}

      {/* Menu Page */}
      {currentPage === "menu" && (
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <DemoSection title="Our Menu">
            {/* Category Filters */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "2rem",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {categories.map((cat) => (
                <DemoButton
                  key={cat}
                  variant={selectedCategory === cat ? "primary" : "secondary"}
                  size="small"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </DemoButton>
              ))}
            </div>

            {/* Menu Categories */}
            {filteredMenu.map((category) => (
              <div key={category.name} style={{ marginBottom: "3rem" }}>
                <h3
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "700",
                    color: "#ec4899",
                    marginBottom: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  {category.name}
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  {category.items.map((item) => (
                    <DemoCard
                      key={item.name}
                      style={{
                        background: "rgba(236, 72, 153, 0.05)",
                        border: "2px solid rgba(236, 72, 153, 0.2)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              marginBottom: "0.25rem",
                            }}
                          >
                            <span style={{ fontSize: "1.5rem" }}>
                              {item.emoji}
                            </span>
                            <h4
                              style={{
                                fontWeight: "700",
                                color: "#ec4899",
                                fontSize: "1.1rem",
                              }}
                            >
                              {item.name}
                            </h4>
                          </div>
                          <p
                            style={{
                              color: "rgba(255, 255, 255, 0.7)",
                              fontSize: "0.9rem",
                              marginBottom: "0.75rem",
                            }}
                          >
                            {item.description}
                          </p>
                        </div>
                        <span
                          style={{
                            fontWeight: "700",
                            color: "#ec4899",
                            fontSize: "1.2rem",
                            marginLeft: "1rem",
                          }}
                        >
                          {item.price}
                        </span>
                      </div>
                      <DemoButton
                        variant="primary"
                        size="small"
                        onClick={() => addToCart(item.name)}
                        style={{ width: "100%" }}
                      >
                        Add to Pickup Order
                      </DemoButton>
                    </DemoCard>
                  ))}
                </div>
              </div>
            ))}
          </DemoSection>
        </div>
      )}

      {/* Booking Page */}
      {currentPage === "booking" && (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <DemoSection title="Reserve a Table">
            <DemoCard>
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#ec4899",
                    fontWeight: "600",
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
                    background: "rgba(236, 72, 153, 0.1)",
                    border: "2px solid rgba(236, 72, 153, 0.3)",
                    borderRadius: "8px",
                    color: "white",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#ec4899",
                    fontWeight: "600",
                  }}
                >
                  Number of Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(236, 72, 153, 0.1)",
                    border: "2px solid rgba(236, 72, 153, 0.3)",
                    borderRadius: "8px",
                    color: "white",
                    fontSize: "1rem",
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  background: "rgba(236, 72, 153, 0.1)",
                  border: "2px solid rgba(236, 72, 153, 0.3)",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <h4
                  style={{
                    color: "#ec4899",
                    marginBottom: "0.5rem",
                    fontWeight: "700",
                  }}
                >
                  📝 Reservation Details
                </h4>
                <p style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                  <strong>Date:</strong>{" "}
                  {reservationDate
                    ? new Date(reservationDate).toLocaleString()
                    : "Not selected"}
                </p>
                <p style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                  <strong>Guests:</strong> {guests}
                </p>
              </div>

              <DemoButton
                variant="success"
                onClick={() =>
                  alert(
                    `Reservation confirmed!\nDate: ${new Date(reservationDate).toLocaleString()}\nGuests: ${guests}`,
                  )
                }
                disabled={!reservationDate}
                style={{ width: "100%" }}
              >
                Confirm Reservation
              </DemoButton>
            </DemoCard>
          </DemoSection>
        </div>
      )}

      {/* Pickup Order Page */}
      {currentPage === "pickup" && (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <DemoSection title="Pickup Order">
            {Object.keys(cart).length === 0 ? (
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
                <DemoButton
                  variant="primary"
                  onClick={() => setCurrentPage("menu")}
                >
                  View Menu
                </DemoButton>
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
                  {Object.entries(cart).map(([itemName, quantity]) => {
                    const item = menuData
                      .flatMap((cat) => cat.items)
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
                  <div style={{ marginBottom: "1rem" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        color: "#ec4899",
                        fontWeight: "600",
                      }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={pickupPhone}
                      onChange={(e) => setPickupPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        background: "rgba(236, 72, 153, 0.1)",
                        border: "2px solid rgba(236, 72, 153, 0.3)",
                        borderRadius: "8px",
                        color: "white",
                        fontSize: "1rem",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        color: "#ec4899",
                        fontWeight: "600",
                      }}
                    >
                      Pickup Time
                    </label>
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        background: "rgba(236, 72, 153, 0.1)",
                        border: "2px solid rgba(236, 72, 153, 0.3)",
                        borderRadius: "8px",
                        color: "white",
                        fontSize: "1rem",
                      }}
                    >
                      <option value="">Select a time</option>
                      <option value="ASAP">ASAP (30-45 min)</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="12:30 PM">12:30 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="1:30 PM">1:30 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                      <option value="6:30 PM">6:30 PM</option>
                      <option value="7:00 PM">7:00 PM</option>
                      <option value="7:30 PM">7:30 PM</option>
                    </select>
                  </div>

                  <DemoButton
                    variant="success"
                    onClick={() => {
                      alert(
                        `Order placed!\nTotal: $${cartTotal()}\nPickup: ${pickupTime}\nPhone: ${pickupPhone}`,
                      );
                      setCart({});
                      setPickupPhone("");
                      setPickupTime("");
                    }}
                    disabled={!pickupPhone || !pickupTime}
                    style={{ width: "100%" }}
                  >
                    Place Order
                  </DemoButton>
                </DemoCard>
              </>
            )}
          </DemoSection>
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.6)",
          padding: "2rem 1rem",
          borderTop: "2px solid rgba(236, 72, 153, 0.2)",
          marginTop: "3rem",
        }}
      >
        © 2025 Bella Vista - Restaurant Demo | 📞 (555) 123-4567
      </div>
    </div>
  );
};
