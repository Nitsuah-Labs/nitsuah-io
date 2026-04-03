import React from "react";
import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";
import SplineScene from "../_components/_spline/spline-home";

const ThreeDPage: React.FC = () => {
  return (
    <div className="App">
      <HomeBar />
      <main id="main" tabIndex={-1} role="main" aria-label="3D Scene Content">
        <section
          style={{
            minHeight: "100vh",
            padding: "6rem 2rem 4rem",
            background: "var(--color-background)",
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
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              <h1
                style={{
                  color: "var(--color-text-primary)",
                  fontSize: "2.5rem",
                  fontWeight: 600,
                  marginBottom: "0.75rem",
                }}
              >
                3D Experience
              </h1>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                Interactive Spline scene moved off the home page for faster landing performance.
              </p>
            </div>
            <div
              style={{
                width: "100%",
                height: "70vh",
                minHeight: "480px",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
              }}
            >
              <SplineScene />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ThreeDPage;
