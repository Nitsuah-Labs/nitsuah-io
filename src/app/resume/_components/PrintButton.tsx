"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="resume-export-btn"
      aria-label="Print resume or save as PDF"
      style={{
        background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
        color: "#1a1a1a", // Dark grey for better contrast
        border: "2px solid #000",
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        fontWeight: "700",
        borderRadius: "8px",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 12px rgba(249, 115, 22, 0.3)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(249, 115, 22, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(249, 115, 22, 0.3)";
      }}
    >
      <i className="fa fa-file-pdf-o" aria-hidden="true"></i> Export PDF
    </button>
  );
}
