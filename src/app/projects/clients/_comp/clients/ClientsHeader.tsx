"use client";
import React from "react";

const ClientsHeader: React.FC<{ showDemo: string | null }> = ({ showDemo }) => {
  return (
    <div
      style={{
        marginBottom: showDemo ? "1rem" : "2rem",
        textAlign: "center",
        transition: "all 0.3s ease",
      }}
    >
      <h1
        style={{
          fontSize: showDemo ? "1.5rem" : "3rem",
          fontWeight: "700",
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: showDemo ? "0" : "0.5rem",
          transition: "all 0.3s ease",
        }}
      >
        CLIENT PROJECTS
      </h1>
      {!showDemo && (
        <p
          style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "1.2rem",
            marginBottom: "0",
          }}
        >
          Professional service, freelance, and commercial app demonstrations
        </p>
      )}
    </div>
  );
};

export default ClientsHeader;
