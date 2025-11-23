// Professional Resume Site Demo
"use client";
import React, { useState } from "react";
import { ResumeView, ContactView } from "./resumesite";

export const ResumeSiteDemo: React.FC = () => {
  const [currentView, setCurrentView] = useState<"resume" | "contact">(
    "resume",
  );

  if (currentView === "contact") {
    return <ContactView onBack={() => setCurrentView("resume")} />;
  }

  return <ResumeView onViewContact={() => setCurrentView("contact")} />;
};
