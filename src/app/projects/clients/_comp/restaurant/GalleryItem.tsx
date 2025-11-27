import React from "react";

interface Props {
  emoji: string;
  label: string;
}

export const GalleryItem: React.FC<Props> = ({ emoji, label }) => {
  return (
    <div
      className="restaurant-gallery-item"
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
        (e.currentTarget as HTMLElement).style.borderColor = "#ec4899";
        (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(236, 72, 153, 0.2)";
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}
    >
      <div style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>{emoji}</div>
      <div style={{ fontWeight: 600, color: "#ec4899" }}>{label}</div>
    </div>
  );
};

export default GalleryItem;
