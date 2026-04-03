// HOMEPAGE - src/app/page.tsx
"use client";
import React from "react";
import { HeroSection } from "./_components/HeroSection";
import Footer from "./_components/_site/Footer";
import HomeBar from "./_components/_site/Homebar";

const HomePage: React.FC = () => {
  return (
    <div className="App">
      <HomeBar />
      <main id="main" tabIndex={-1} role="main" aria-label="Homepage Content">
        <HeroSection showScrollIndicator={false} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
