// HOMEPAGE - src/app/page.tsx
import type { Metadata } from "next";
import React from "react";
import { DEFAULT_TITLE, pageMetadata } from "../lib/seo";
import { LandingHero } from "./_components/LandingHero";
import FeaturedProjects from "./_components/_site/FeaturedProjects";
import Footer from "./_components/_site/Footer";
import HomeBar from "./_components/_site/Homebar";

export const metadata: Metadata = pageMetadata({
  title: DEFAULT_TITLE,
  absoluteTitle: true,
  description:
    "Senior Platform & AI Engineer — 15 years building Atlassian enterprise platforms, MCP servers, and AI-powered developer tooling at Netflix, Coinbase, and Blackboard.",
  path: "/",
});

const HomePage: React.FC = () => {
  return (
    <div className="App home-single-page">
      <HomeBar />
      <main
        id="main"
        tabIndex={-1}
        role="main"
        aria-label="Homepage Content"
        className="home-main"
      >
        <LandingHero />
        <FeaturedProjects />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
