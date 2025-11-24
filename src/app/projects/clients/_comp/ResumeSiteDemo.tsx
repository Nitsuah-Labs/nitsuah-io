// Resume Website Demo - Professional template inspired by resume page
"use client";
import React, { useState } from "react";
import "./_styles/resumesite.css";
import ContactForm from "./resume/ContactForm";
import ExperienceSection from "./resume/ExperienceSection";
import SkillsSection from "./resume/SkillsSection";

export const ResumeSiteDemo: React.FC = () => {
  const [view, setView] = useState<"resume" | "contact">("resume");

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div
        className="resume-header"
        style={{
          background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          padding: "2.5rem 2rem",
          borderRadius: "8px 8px 0 0",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#fff",
            margin: "0 0 0.5rem 0",
          }}
        >
          Jordan Smith
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "rgba(255, 255, 255, 0.9)",
            margin: "0 0 0.5rem 0",
            fontWeight: "500",
          }}
        >
          Senior Software Engineer
        </p>
        <p
          style={{
            fontSize: "0.95rem",
            color: "rgba(255, 255, 255, 0.8)",
            margin: 0,
          }}
        >
          📍 San Francisco, CA • 📧 person@email.com • 💼 LinkedIn • 🐙 GitHub
        </p>
      </div>

      {/* Navigation */}
      <div
        className="resume-nav"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          padding: "1rem",
          background: "rgba(99, 102, 241, 0.1)",
          borderBottom: "2px solid rgba(99, 102, 241, 0.3)",
        }}
      >
        {[
          { id: "resume", label: "Resume", icon: "📄" },
          { id: "contact", label: "Contact", icon: "✉️" },
        ].map((item) => (
          <button
            key={item.id}
            className="resume-nav-btn"
            onClick={() => setView(item.id as any)}
            style={{
              padding: "0.75rem 1.5rem",
              background:
                view === item.id ? "rgba(99, 102, 241, 0.3)" : "transparent",
              border:
                view === item.id
                  ? "2px solid #6366f1"
                  : "2px solid rgba(99, 102, 241, 0.3)",
              color: view === item.id ? "#6366f1" : "rgba(255, 255, 255, 0.7)",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
        <button
          style={{
            padding: "0.75rem 1.5rem",
            background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            border: "none",
            color: "#fff",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <span>⬇️</span>
          Download PDF
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: "2rem 1.5rem", minHeight: "450px" }}>
        {view === "resume" && (
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <ExperienceSection />
            <SkillsSection />
          </div>
        )}

        {view === "contact" && <ContactForm />}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "1rem",
          borderTop: "2px solid rgba(99, 102, 241, 0.3)",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "0.875rem",
        }}
      >
        © 2025 Jordan Smith - Resume Website Demo
      </div>
    </div>
  );
};
