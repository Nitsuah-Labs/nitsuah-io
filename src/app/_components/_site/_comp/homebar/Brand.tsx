"use client";
import Link from "next/link";
import React from "react";

const Brand: React.FC<{
  showFullName: boolean;
  isHovering: boolean;
  setIsHovering: (v: boolean) => void;
}> = ({ showFullName, isHovering, setIsHovering }) => {
  // Generate 7-10 binary star systems with random properties
  const binarySystems = React.useMemo(() => {
    const count = 7 + Math.floor(Math.random() * 4); // 7-10 systems
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: 3 + Math.random() * 4, // 3-7px (smaller)
      speed: 6 + Math.random() * 8, // 6-14s
      orbitSpeed: 1.2 + Math.random() * 2, // 1.2-3.2s
      delay: -Math.random() * 10, // Random start position
      direction: Math.random() > 0.5 ? 1 : -1, // Left-to-right or right-to-left
      color: i % 2 === 0 ? "orange" : "purple",
    }));
  }, []);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
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

        @keyframes binarySystem1 {
          0% {
            left: -30px;
          }
          100% {
            left: calc(100% + 30px);
          }
        }

        @keyframes binarySystem2 {
          0% {
            left: -40px;
          }
          100% {
            left: calc(100% + 40px);
          }
        }

        @keyframes binarySystem3 {
          0% {
            left: -25px;
          }
          100% {
            left: calc(100% + 25px);
          }
        }

        @keyframes orbit1 {
          0% {
            top: -12px;
            left: 0px;
            transform: translateX(0) scale(0.7);
            opacity: 0.5;
            z-index: 1;
          }
          10% {
            top: -10px;
            left: -2px;
            transform: translateX(0) scale(0.75);
            opacity: 0.55;
          }
          20% {
            top: -6px;
            left: 1px;
            transform: translateX(0) scale(0.9);
            opacity: 0.7;
          }
          30% {
            top: 0px;
            left: -1px;
            transform: translateX(0) scale(1.05);
            opacity: 0.85;
          }
          40% {
            top: 6px;
            left: 2px;
            transform: translateX(0) scale(1.15);
            opacity: 0.95;
          }
          50% {
            top: 12px;
            left: 0px;
            transform: translateX(0) scale(1.2);
            opacity: 1;
            z-index: 4;
          }
          60% {
            top: 10px;
            left: -2px;
            transform: translateX(0) scale(1.15);
            opacity: 0.95;
          }
          70% {
            top: 4px;
            left: 1px;
            transform: translateX(0) scale(0.95);
            opacity: 0.75;
          }
          80% {
            top: -2px;
            left: -1px;
            transform: translateX(0) scale(0.8);
            opacity: 0.6;
          }
          90% {
            top: -8px;
            left: 2px;
            transform: translateX(0) scale(0.75);
            opacity: 0.55;
          }
          100% {
            top: -12px;
            left: 0px;
            transform: translateX(0) scale(0.7);
            opacity: 0.5;
            z-index: 1;
          }
        }

        @keyframes orbit2 {
          0% {
            top: 12px;
            left: 0px;
            transform: translateX(0) scale(1.2);
            opacity: 1;
            z-index: 4;
          }
          10% {
            top: 10px;
            left: 2px;
            transform: translateX(0) scale(1.15);
            opacity: 0.95;
          }
          20% {
            top: 6px;
            left: -1px;
            transform: translateX(0) scale(1);
            opacity: 0.8;
          }
          30% {
            top: 0px;
            left: 1px;
            transform: translateX(0) scale(0.85);
            opacity: 0.65;
          }
          40% {
            top: -6px;
            left: -2px;
            transform: translateX(0) scale(0.75);
            opacity: 0.55;
          }
          50% {
            top: -12px;
            left: 0px;
            transform: translateX(0) scale(0.7);
            opacity: 0.5;
            z-index: 1;
          }
          60% {
            top: -10px;
            left: 2px;
            transform: translateX(0) scale(0.75);
            opacity: 0.55;
          }
          70% {
            top: -4px;
            left: -1px;
            transform: translateX(0) scale(0.9);
            opacity: 0.7;
          }
          80% {
            top: 2px;
            left: 1px;
            transform: translateX(0) scale(1.05);
            opacity: 0.85;
          }
          90% {
            top: 8px;
            left: -2px;
            transform: translateX(0) scale(1.15);
            opacity: 0.95;
          }
          100% {
            top: 12px;
            left: 0px;
            transform: translateX(0) scale(1.2);
            opacity: 1;
            z-index: 4;
          }
        }

        @keyframes orbit3 {
          0% {
            top: -8px;
            left: 1px;
            transform: scale(0.6);
            opacity: 0.4;
          }
          25% {
            top: 8px;
            left: -1px;
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            top: -8px;
            left: 1px;
            transform: scale(0.6);
            opacity: 0.4;
          }
          75% {
            top: 8px;
            left: -1px;
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            top: -8px;
            left: 1px;
            transform: scale(0.6);
            opacity: 0.4;
          }
        }

        @keyframes orbit4 {
          0% {
            top: 8px;
            left: -1px;
            transform: scale(1);
            opacity: 0.8;
          }
          25% {
            top: -8px;
            left: 1px;
            transform: scale(0.6);
            opacity: 0.4;
          }
          50% {
            top: 8px;
            left: -1px;
            transform: scale(1);
            opacity: 0.8;
          }
          75% {
            top: -8px;
            left: 1px;
            transform: scale(0.6);
            opacity: 0.4;
          }
          100% {
            top: 8px;
            left: -1px;
            transform: scale(1);
            opacity: 0.8;
          }
        }
      `}</style>

      {/* Particle Container for Binary Star Systems */}
      <span
        style={{
          position: "absolute",
          top: "-30px",
          left: "0px",
          width: "calc(100% - 30px)",
          height: "calc(100% + 60px)",
          pointerEvents: "none",
          overflow: "visible",
          zIndex: 0,
        }}
      >
        {binarySystems.map((system) => {
          const colors =
            system.color === "orange"
              ? {
                  primary: "#f97316",
                  secondary: "#ea580c",
                  shadow: "249, 115, 22",
                }
              : {
                  primary: "#a855f7",
                  secondary: "#7c3aed",
                  shadow: "168, 85, 247",
                };

          const oppositeColors =
            system.color === "purple"
              ? {
                  primary: "#f97316",
                  secondary: "#ea580c",
                  shadow: "249, 115, 22",
                }
              : {
                  primary: "#a855f7",
                  secondary: "#7c3aed",
                  shadow: "168, 85, 247",
                };

          return (
            <span
              key={system.id}
              style={{
                position: "absolute",
                display: "inline-block",
                top: "50%",
                left: system.direction > 0 ? "-20px" : "calc(100% + 20px)",
                transform: "translateY(-50%)",
                animation: `binarySystem${(system.id % 3) + 1} ${system.speed}s linear infinite`,
                animationDelay: `${system.delay}s`,
                animationDirection: system.direction > 0 ? "normal" : "reverse",
              }}
            >
              {/* Star 1 with black hole center */}
              <span
                style={{
                  position: "absolute",
                  width: `${system.size}px`,
                  height: `${system.size}px`,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, #000 0%, #111 15%, ${colors.primary} 30%, ${colors.secondary} 65%, transparent 100%)`,
                  boxShadow: `
                    0 0 ${system.size * 1.5}px ${system.size * 0.3}px rgba(${colors.shadow}, 0.8),
                    0 0 ${system.size * 2.5}px ${system.size * 0.6}px rgba(${colors.shadow}, 0.5),
                    0 0 ${system.size * 3.5}px ${system.size * 0.8}px rgba(${colors.shadow}, 0.3),
                    inset 0 0 ${system.size * 0.4}px ${system.size * 0.15}px rgba(0, 0, 0, 0.9)
                  `,
                  animation: `orbit${(system.id % 4) + 1} ${system.orbitSpeed}s ease-in-out infinite`,
                  filter: `blur(${system.size * 0.05}px)`,
                }}
              />
              {/* Star 2 with black hole center */}
              <span
                style={{
                  position: "absolute",
                  width: `${system.size}px`,
                  height: `${system.size}px`,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, #000 0%, #111 15%, ${oppositeColors.primary} 30%, ${oppositeColors.secondary} 65%, transparent 100%)`,
                  boxShadow: `
                    0 0 ${system.size * 1.5}px ${system.size * 0.3}px rgba(${oppositeColors.shadow}, 0.8),
                    0 0 ${system.size * 2.5}px ${system.size * 0.6}px rgba(${oppositeColors.shadow}, 0.5),
                    0 0 ${system.size * 3.5}px ${system.size * 0.8}px rgba(${oppositeColors.shadow}, 0.3),
                    inset 0 0 ${system.size * 0.4}px ${system.size * 0.15}px rgba(0, 0, 0, 0.9)
                  `,
                  animation: `orbit${((system.id + 1) % 4) + 1} ${system.orbitSpeed}s ease-in-out infinite`,
                  filter: `blur(${system.size * 0.05}px)`,
                }}
              />
            </span>
          );
        })}
      </span>

      <Link
        href="/"
        style={{ textDecoration: "none", color: "inherit" }}
        aria-label="Austin H home - Navigate to homepage"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <span
          style={{
            position: "relative",
            display: "inline-block",
          }}
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
    </div>
  );
};

export default Brand;
