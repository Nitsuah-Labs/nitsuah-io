// Creative Portfolio Demo
"use client";
import React, { useState } from "react";
import { ProjectGallery, AboutSection, ContactForm } from "./portfolio";

export const PortfolioDemo: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "projects" | "about" | "contact"
  >("projects");

  if (currentView === "about") {
    return <AboutSection onBack={() => setCurrentView("projects")} />;
  }

  if (currentView === "contact") {
    return <ContactForm onBack={() => setCurrentView("projects")} />;
  }

  return (
    <ProjectGallery
      onViewAbout={() => setCurrentView("about")}
      onViewContact={() => setCurrentView("contact")}
    />
  );
};
