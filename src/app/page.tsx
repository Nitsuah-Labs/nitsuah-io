// HOMEPAGE - src/app/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { HeroSection } from "./_components/HeroSection";
import Footer from "./_components/_site/Footer";
import HomeBar from "./_components/_site/Homebar";
import SplineScene from "./_components/_spline/spline-home";

const HomePage: React.FC = () => {
  const [showSpline, setShowSpline] = useState(false);

  useEffect(() => {
    setShowSpline(true);
  }, []);

  return (
    <div className="App">
      <HomeBar />
      <main tabIndex={-1}>
        {/* Hero Section - Fixed overlay that fades as you scroll */}
        <HeroSection />

        {/* Spline Scene - Revealed as hero peels away */}
        {showSpline && (
          <section
            style={{
              minHeight: "150vh",
              paddingTop: "100vh",
              padding: "4rem 2rem",
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
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
