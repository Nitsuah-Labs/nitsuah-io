// ABOUT - src/app/pages/about.tsx
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import arf from "../_components/_labs/_assets/arf.png";
import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";
import SplineScene from "../_components/_spline/spline-about";

const AboutPage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate section 1 opacity based on scroll
  const section1Opacity = Math.max(0, 1 - scrollY / 600);

  return (
    <div className="App">
      <HomeBar />
      <main>
        {/* Section 1: Profile & Bio - Fades as you scroll */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "5rem 2rem 4rem",
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d1a3a 100%)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: section1Opacity > 0.01 ? 5 : -1,
            opacity: section1Opacity,
            transition: "z-index 0s linear 0.3s",
            pointerEvents: section1Opacity < 0.5 ? "none" : "auto",
          }}
        >
          <div
            style={{
              maxWidth: "900px",
              textAlign: "center",
              zIndex: 10,
            }}
          >
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "700",
                marginBottom: "1.5rem",
                color: "#ffffff",
              }}
            >
              About Me
            </h2>

            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                overflow: "hidden",
                margin: "0 auto 1.5rem",
                border: "4px solid #f97316",
                boxShadow: "0 8px 32px rgba(249, 115, 22, 0.3)",
              }}
            >
              <Image
                src={arf}
                alt="Austin Hardy Profile"
                width={150}
                height={150}
                style={{ objectFit: "cover" }}
              />
            </div>

            <div
              style={{
                fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: "1.7",
                textAlign: "left",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              <p style={{ marginBottom: "1.2rem" }}>
                I&apos;m a{" "}
                <strong style={{ color: "#f97316" }}>
                  Developer Productivity Engineer
                </strong>{" "}
                and <strong style={{ color: "#f97316" }}>Researcher</strong>{" "}
                passionate about building tools that empower engineers to work
                smarter and systems to scale efficiently.
              </p>
              <p style={{ marginBottom: "1.2rem" }}>
                With a focus on <strong>automation</strong>,{" "}
                <strong>developer experience</strong>, and{" "}
                <strong>Web3 innovation</strong>, I create solutions that bridge
                the gap between complex technology and practical implementation.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring
                blockchain technologies, contributing to open-source projects,
                and experimenting with new ways to optimize development
                workflows.
              </p>
            </div>

            {/* Scroll Indicator */}
            <div
              style={{
                marginTop: "2rem",
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
                Scroll for more
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
          </div>
        </section>

        {/* Section 2: Spline Scene - Revealed on scroll */}
        <section
          style={{
            minHeight: "100vh",
            paddingTop: "100vh",
            background: "#0a0a0a",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="spline-container">
            <SplineScene />
          </div>
        </section>

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

export default AboutPage;
