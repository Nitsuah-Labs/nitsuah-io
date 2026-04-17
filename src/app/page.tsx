// HOMEPAGE - src/app/page.tsx
import React from "react";
import { LandingHero } from "./_components/LandingHero";
import FeaturedProjects from "./_components/_site/FeaturedProjects";
import Footer from "./_components/_site/Footer";
import HomeBar from "./_components/_site/Homebar";

const HomePage: React.FC = () => {
  return (
    <div className="App">
      <HomeBar />
      <main id="main" tabIndex={-1} role="main" aria-label="Homepage Content">
        <LandingHero />
        <FeaturedProjects />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
