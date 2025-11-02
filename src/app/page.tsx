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
  const [showFullName, setShowFullName] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [displayedText, setDisplayedText] = useState("nitsuah");
  const [isTyping, setIsTyping] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  // Auto-type animation after 1.5 seconds
  useEffect(() => {
    const startTyping = setTimeout(() => {
      setIsTyping(true);
      const fullName = "Austin H.";
      let currentIndex = 0;

      // Clear the text first
      setDisplayedText("");

      const typeInterval = setInterval(() => {
        if (currentIndex < fullName.length) {
          setDisplayedText(fullName.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setTypingComplete(true);
          setIsTyping(false);
        }
      }, 100); // 100ms per character

      return () => clearInterval(typeInterval);
    }, 1500); // Start after 1.5 seconds

    return () => clearTimeout(startTyping);
  }, []);

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

    // Delay scroll hint by 2 seconds
    const scrollHintTimer = setTimeout(() => {
      setShowScrollHint(true);
    }, 2000);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollHintTimer);
    };
  }, []);

  // Calculate hero opacity based on scroll (fade out 0-300px for very fast hide)
  const heroOpacity = Math.max(0, 1 - scrollY / 300);
  // Calculate hero scale (slight zoom effect as it fades)
  const heroScale = 1 + (scrollY / 300) * 0.1;

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
            <div
              style={{
                fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                fontWeight: "400",
                marginBottom: "0.75rem",
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              Hi, I&apos;m
            </div>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                fontWeight: "900",
                marginBottom: "0.75rem",
                lineHeight: "1.1",
                color: "#ffffff",
                transition: "all 0.5s ease",
                borderBottom: "3px solid #f97316",
                paddingBottom: "0.25rem",
                display: "inline-block",
                cursor: "pointer",
                minWidth: "300px",
                textAlign: "left",
              }}
              onMouseEnter={() => {
                if (typingComplete) {
                  setShowFullName(true);
                }
              }}
              onMouseLeave={() => setShowFullName(false)}
            >
              {showFullName && typingComplete ? "Austin H." : displayedText}
              {isTyping && (
                <span
                  className="typing-cursor"
                  style={{
                    opacity: 0.7,
                  }}
                >
                  |
                </span>
              )}
            </h1>
            <h2
              style={{
                fontSize: "clamp(1.3rem, 3.5vw, 2rem)",
                fontWeight: "600",
                marginBottom: "1.5rem",
                lineHeight: "1.3",
                color: "#f97316",
              }}
            >
              Developer Productivity Engineer & Researcher
            </h2>
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
              marginTop: "2rem",
              animation: "bounce 2s infinite",
              opacity: scrollY > 100 || !showScrollHint ? 0 : 1,
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
