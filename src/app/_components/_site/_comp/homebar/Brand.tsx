"use client";
import Link from "next/link";
import React from "react";

const Brand: React.FC<{
  showFullName: boolean;
  isHovering: boolean;
  setIsHovering: (v: boolean) => void;
}> = ({ showFullName, isHovering, setIsHovering }) => (
  <Link
    href="/"
    style={{ textDecoration: "none", color: "inherit" }}
    aria-label="Austin H home - Navigate to homepage"
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
  >
    <span
      aria-hidden
      style={{
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "#f97316",
        textDecoration: "none",
        cursor: "pointer",
        transition: "all 0.3s ease",
        textShadow: "0 2px 10px rgba(249,115,22,0.5)",
        display: "inline-block",
      }}
    >
      {showFullName || isHovering ? "AUSTIN H." : "NITSUAH"}
    </span>
  </Link>
);

export default Brand;
