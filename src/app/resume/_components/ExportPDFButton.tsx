"use client";

import React from "react";

export const ExportPDFButton: React.FC = () => {
  const handleExportPDF = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <button
      onClick={handleExportPDF}
      aria-label="Export resume as PDF"
      style={{
        padding: "0.75rem 1.5rem",
        background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
        color: "#000",
        border: "none",
        borderRadius: "8px",
        fontSize: "1rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(249, 115, 22, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <i
        className="fa fa-file-pdf-o"
        aria-hidden="true"
        style={{ marginRight: "0.5rem" }}
      ></i>
      Export PDF
    </button>
  );
};
