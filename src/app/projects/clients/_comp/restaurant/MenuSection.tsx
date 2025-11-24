// MenuSection component for RestaurantDemo
"use client";
import type { MenuCategory } from "@/lib/data/demos/restaurant-data";
import React from "react";
import {
  DemoButton,
  DemoCard,
  DemoSection,
} from "../../../../../components/demos";

interface Props {
  menuData: MenuCategory[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (s: string) => void;
  addToCart: (itemName: string) => void;
}

export const MenuSection: React.FC<Props> = ({
  menuData,
  categories,
  selectedCategory,
  setSelectedCategory,
  addToCart,
}) => {
  const filteredMenu =
    selectedCategory === "All"
      ? menuData
      : menuData.filter((c) => c.name === selectedCategory);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <DemoSection title="Our Menu">
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
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
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
                        <span style={{ fontSize: "1.5rem" }}>{item.emoji}</span>
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
                          color: "rgba(255,255,255,0.7)",
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
  );
};
