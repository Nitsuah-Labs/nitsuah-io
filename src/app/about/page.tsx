// ABOUT - src/app/pages/about.tsx
"use client";
import React from "react";
import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";
import SplineScene from "../_components/_spline/spline-about";
import { ProfileSection } from "./_components";

const AboutPage: React.FC = () => {
  return (
    <div className="App">
      <HomeBar />
      <main id="main" role="main" aria-label="About Page Content">
        {/* Section 1: Profile & Bio - Fades as you scroll */}
        <ProfileSection />

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
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
