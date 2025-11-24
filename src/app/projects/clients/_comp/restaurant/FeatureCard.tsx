import React from "react";

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export const FeatureCard: React.FC<Feature> = ({ icon, title, desc }) => {
  return (
    <div
      className="restaurant-feature-card"
      style={{
        padding: "1rem",
        background: "rgba(236, 72, 153, 0.1)",
        border: "2px solid rgba(236, 72, 153, 0.3)",
        borderRadius: "8px",
      }}
    >
      <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{icon}</div>
      <h4
        style={{ fontWeight: 700, color: "#ec4899", marginBottom: "0.25rem" }}
      >
        {title}
      </h4>
      <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.9rem" }}>
        {desc}
      </p>
    </div>
  );
};

export default FeatureCard;
