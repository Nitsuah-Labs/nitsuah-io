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
import { mockRestaurantMenu } from "@/lib/data/demos/restaurant-data";
import React, { useState } from "react";
import {
  DemoButton,
  DemoCard,
  DemoHeader,
  DemoSection,
} from "../../../../components/demos";
import styles from "./_styles/restaurant.module.css";
import FeatureCard from "./restaurant/FeatureCard";
import GalleryItem from "./restaurant/GalleryItem";
import { MenuSection } from "./restaurant/MenuSection";
import { OrderCart } from "./restaurant/OrderCart";
import { ReservationForm } from "./restaurant/ReservationForm";

type PageType = "home" | "menu" | "booking" | "pickup";

export const RestaurantDemo: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [reservationDate, setReservationDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [pickupPhone, setPickupPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const menuData = mockRestaurantMenu;

  const addToCart = (itemName: string) => {
    setCart((prev) => ({ ...prev, [itemName]: (prev[itemName] || 0) + 1 }));
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
      if (item) total += parseFloat(item.price.substring(1)) * quantity;
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
            <div className={styles.galleryGrid}>
              {[
                { emoji: "🍝", label: "Fresh Pasta" },
                { emoji: "🍕", label: "Wood-Fired Pizza" },
                { emoji: "🥩", label: "Prime Cuts" },
                { emoji: "🍷", label: "Wine Cellar" },
                { emoji: "🏛️", label: "Dining Room" },
                { emoji: "🕯️", label: "Romantic Ambiance" },
              ].map((item, idx) => (
                <GalleryItem key={idx} emoji={item.emoji} label={item.label} />
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
            <div className={styles.featureGrid}>
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
                <FeatureCard key={idx} {...feature} />
              ))}
            </div>
          </DemoSection>
        </div>
      )}

      {/* Menu Page */}
      {currentPage === "menu" && (
        <MenuSection
          menuData={menuData}
          categories={["All", ...menuData.map((c) => c.name)]}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          addToCart={addToCart}
        />
      )}

      {/* Booking Page */}
      {currentPage === "booking" && (
        <ReservationForm
          reservationDate={reservationDate}
          setReservationDate={setReservationDate}
          guests={guests}
          setGuests={setGuests}
        />
      )}

      {/* Pickup Order Page */}
      {currentPage === "pickup" && (
        <OrderCart
          cart={cart}
          menuData={menuData}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cartTotal={cartTotal}
        />
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
