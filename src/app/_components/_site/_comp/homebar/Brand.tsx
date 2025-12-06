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
    style={{ textDecoration: "none", color: "inherit", position: "relative" }}
    aria-label="Austin H home - Navigate to homepage"
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
  >
    <style jsx>{`
      @keyframes glow-pulse {
        0%,
        100% {
          text-shadow:
            0 0 10px rgba(249, 115, 22, 0.8),
            0 0 20px rgba(249, 115, 22, 0.6),
            0 0 30px rgba(249, 115, 22, 0.4);
        }
        50% {
          text-shadow:
            0 0 15px rgba(249, 115, 22, 1),
            0 0 30px rgba(249, 115, 22, 0.8),
            0 0 45px rgba(249, 115, 22, 0.6);
        }
      }

      @keyframes orbit {
        0% {
          transform: rotate(0deg) translateX(25px) rotate(0deg);
        }
        100% {
          transform: rotate(360deg) translateX(25px) rotate(-360deg);
        }
      }
    `}</style>

    <span
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      {/* Orbiting glow particle */}
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "4px",
          height: "4px",
          background: "#f97316",
          borderRadius: "50%",
          boxShadow: "0 0 8px 2px rgba(249,115,22,0.8)",
          animation: "orbit 4s linear infinite",
          pointerEvents: "none",
        }}
      />

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
          display: "inline-block",
          animation: "glow-pulse 2s ease-in-out infinite",
        }}
      >
        {showFullName || isHovering ? "AUSTIN H." : "NITSUAH"}
      </span>
    </span>
  </Link>
);

export default Brand;
