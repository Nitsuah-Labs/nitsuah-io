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

      @keyframes binarySystem {
        0% {
          left: -30px;
        }
        100% {
          left: calc(100% + 30px);
        }
      }

      @keyframes orbit1 {
        0% {
          transform: rotate(0deg) translateX(20px) rotate(0deg);
        }
        100% {
          transform: rotate(360deg) translateX(20px) rotate(-360deg);
        }
      }

      @keyframes orbit2 {
        0% {
          transform: rotate(180deg) translateX(20px) rotate(-180deg);
        }
        100% {
          transform: rotate(540deg) translateX(20px) rotate(-540deg);
        }
      }
    `}</style>

    <span
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      {/* Binary star system container */}
      <span
        style={{
          position: "absolute",
          top: "50%",
          animation: "binarySystem 8s linear infinite",
          pointerEvents: "none",
        }}
      >
        {/* Binary star 1 - Orange */}
        <span
          style={{
            position: "absolute",
            width: "8px",
            height: "8px",
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            borderRadius: "50%",
            boxShadow: "0 0 12px rgba(249, 115, 22, 0.8)",
            animation: "orbit1 3s linear infinite",
            pointerEvents: "none",
          }}
        />

        {/* Binary star 2 - Purple */}
        <span
          style={{
            position: "absolute",
            width: "8px",
            height: "8px",
            background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
            borderRadius: "50%",
            boxShadow: "0 0 12px rgba(168, 85, 247, 0.8)",
            animation: "orbit2 3s linear infinite",
            pointerEvents: "none",
          }}
        />
      </span>

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
          position: "relative",
          zIndex: 2,
        }}
      >
        {showFullName || isHovering ? "AUSTIN H." : "NITSUAH"}
      </span>
    </span>
  </Link>
);

export default Brand;
