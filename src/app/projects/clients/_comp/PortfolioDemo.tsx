// Creative Portfolio Demo
"use client";
import { mockProjects } from "@/lib/data/demos/portfolio-data";
import React, { useState } from "react";
import "./_styles/portfolio.css";
import ProjectGallery from "./portfolio/ProjectGallery";
import ProjectModal from "./portfolio/ProjectModal";

export const PortfolioDemo: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "gallery" | "about" | "contact"
  >("gallery");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = mockProjects;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div
        className="portfolio-header"
        style={{
          background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
          padding: "2rem 1.5rem",
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
          ✨ Creative Studio
        </h1>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.9)",
            margin: 0,
            fontSize: "1rem",
          }}
        >
          Photography • Design • Branding
        </p>
      </div>

      {/* Navigation */}
      <nav
        className="portfolio-nav"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          padding: "1rem",
          background: "rgba(139, 92, 246, 0.1)",
          borderBottom: "2px solid rgba(139, 92, 246, 0.3)",
        }}
      >
        {[
          { id: "gallery", label: "Gallery", icon: "🖼️" },
          { id: "about", label: "About", icon: "👤" },
          { id: "contact", label: "Contact", icon: "✉️" },
        ].map((item) => (
          <button
            key={item.id}
            className="portfolio-nav-btn"
            onClick={() => setCurrentView(item.id as any)}
            style={{
              padding: "0.75rem 1.5rem",
              background:
                currentView === item.id
                  ? "rgba(139, 92, 246, 0.3)"
                  : "transparent",
              border:
                currentView === item.id
                  ? "2px solid #8b5cf6"
                  : "2px solid rgba(139, 92, 246, 0.3)",
              color:
                currentView === item.id
                  ? "#8b5cf6"
                  : "rgba(255, 255, 255, 0.7)",
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
      </nav>

      {/* Content */}
      <div style={{ padding: "2rem 1.5rem", minHeight: "450px" }}>
        {currentView === "gallery" && selectedProject === null && (
          <ProjectGallery
            projects={projects}
            onSelectProject={setSelectedProject}
          />
        )}

        {selectedProject !== null && (
          <ProjectModal
            project={
              projects.find((p) => p.id === selectedProject) ?? undefined
            }
            onClose={() => setSelectedProject(null)}
          />
        )}

        {currentView === "about" && (
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div
              style={{
                background: "rgba(139, 92, 246, 0.1)",
                border: "2px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "12px",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  fontSize: "5rem",
                  textAlign: "center",
                  marginBottom: "1.5rem",
                }}
              >
                👨‍🎨
              </div>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#8b5cf6",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                About Me
              </h2>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: "1.8",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                I'm a creative professional with over 8 years of experience in
                photography, design, and branding. My work focuses on creating
                memorable visual experiences that tell compelling stories.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                {[
                  { number: "50+", label: "Projects" },
                  { number: "8", label: "Years" },
                  { number: "30+", label: "Clients" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "1rem",
                      background: "rgba(139, 92, 246, 0.2)",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        color: "#8b5cf6",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {stat.number}
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#8b5cf6",
                  marginBottom: "0.75rem",
                }}
              >
                Skills & Expertise
              </h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                {[
                  "Photography",
                  "Graphic Design",
                  "Branding",
                  "UI/UX",
                  "Adobe Suite",
                  "Figma",
                  "Video Editing",
                  "Art Direction",
                ].map((skill) => (
                  <span
                    key={skill}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "rgba(139, 92, 246, 0.2)",
                      border: "1px solid rgba(139, 92, 246, 0.4)",
                      borderRadius: "20px",
                      color: "#8b5cf6",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === "contact" && (
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#8b5cf6",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Get In Touch
            </h2>
            <div
              style={{
                background: "rgba(139, 92, 246, 0.1)",
                border: "2px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "12px",
                padding: "2rem",
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#8b5cf6",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#8b5cf6",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#8b5cf6",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Project Type
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                >
                  <option>Photography</option>
                  <option>Branding</option>
                  <option>Design</option>
                  <option>Other</option>
                </select>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#8b5cf6",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project..."
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "1rem",
                    fontFamily: "system-ui, sans-serif",
                    resize: "none",
                  }}
                />
              </div>

              <button
                style={{
                  width: "100%",
                  padding: "1rem",
                  background:
                    "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "8px",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "1rem",
          borderTop: "2px solid rgba(139, 92, 246, 0.3)",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "0.875rem",
        }}
      >
        © 2025 Creative Studio - Portfolio Demo
      </div>
    </div>
  );
};
