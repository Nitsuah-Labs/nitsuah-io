// HOMEPAGE - src/app/page.tsx
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Footer from "./_components/_site/Footer";
import HomeBar from "./_components/_site/Homebar";
import SplineScene from "./_components/_spline/spline-home";

const HomePage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showSpline, setShowSpline] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Show Spline immediately when page loads
      if (window.scrollY > 50) {
        setShowSpline(true);
      }
    };

    // Show Spline on mount
    setShowSpline(true);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate hero opacity based on scroll (fade out 0-800px)
  const heroOpacity = Math.max(0, 1 - scrollY / 800);
  // Calculate hero scale (slight zoom effect as it fades)
  const heroScale = 1 + (scrollY / 800) * 0.1;

  return (
    <div className="App">
      <HomeBar />
      <main>
        {/* Hero Section - Fixed overlay that fades as you scroll */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d1a3a 100%)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: heroOpacity > 0.01 ? 5 : -1, // Hide when fully scrolled
            opacity: heroOpacity,
            transform: `scale(${heroScale})`,
            transition: "z-index 0s linear 0.3s", // Delay z-index change
            pointerEvents: heroOpacity < 0.5 ? "none" : "auto", // Disable clicks when fading out
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              textAlign: "center",
              zIndex: 10,
            }}
          >
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: "700",
                marginBottom: "1.5rem",
                lineHeight: "1.2",
                color: "#ffffff",
              }}
            >
              Hi, I&apos;m Austin Hardy
              <br />
              <span style={{ color: "#f97316" }}>
                Developer Productivity Engineer & Researcher
              </span>
            </h1>
            <p
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                color: "rgba(255, 255, 255, 0.85)",
                marginBottom: "2.5rem",
                lineHeight: "1.6",
              }}
            >
              I build tools and platforms that help engineers move faster and
              systems scale smarter.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/projects"
                style={{
                  backgroundColor: "#c2410c",
                  color: "white",
                  padding: "1rem 2rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  transition: "all 0.2s ease",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#9a3412";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#c2410c";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Explore My Work
              </Link>
              <Link
                href="/about"
                style={{
                  backgroundColor: "transparent",
                  color: "#f97316",
                  padding: "1rem 2rem",
                  border: "2px solid #f97316",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  transition: "all 0.2s ease",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f97316";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#f97316";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                About Me
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              animation: "bounce 2s infinite",
              opacity: scrollY > 100 ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          >
            <div
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "0.875rem",
                marginBottom: "0.5rem",
              }}
            >
              Scroll to explore
            </div>
            <div
              style={{
                width: "24px",
                height: "40px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "12px",
                margin: "0 auto",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "4px",
                  height: "8px",
                  backgroundColor: "#f97316",
                  borderRadius: "2px",
                  position: "absolute",
                  left: "50%",
                  top: "8px",
                  transform: "translateX(-50%)",
                  animation: "scroll 1.5s infinite",
                }}
              />
            </div>
          </div>
        </section>

        {/* Spline Scene - Revealed as hero peels away */}
        {showSpline && (
          <section
            style={{
              minHeight: "150vh", // Extended height for full Spline visibility
              paddingTop: "100vh", // Start after hero viewport
              padding: "4rem 2rem", // Breathing room around Spline
              background: "#0a0a0a",
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "2rem",
                  zIndex: 10,
                  position: "relative",
                }}
              >
                <h2
                  style={{
                    color: "rgba(255, 255, 255, 0.9)",
                    fontSize: "2.5rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Behind the Scenes
                </h2>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "1.1rem",
                  }}
                >
                  Interactive 3D visualization
                </p>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "600px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                }}
              >
                <SplineScene />
              </div>
            </div>
          </section>
        )}

        {/* Back to Top Button */}
        {scrollY > 300 && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              backgroundColor: "#f97316",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              fontSize: "1.5rem",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(249, 115, 22, 0.4)",
              zIndex: 1000,
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 6px 16px rgba(249, 115, 22, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(249, 115, 22, 0.4)";
            }}
            aria-label="Scroll to top"
          >
            ↑
          </button>
        )}

        <style jsx>{`
          @keyframes bounce {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes scroll {
            0% {
              opacity: 0;
              top: 8px;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              top: 24px;
            }
          }
        `}</style>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
