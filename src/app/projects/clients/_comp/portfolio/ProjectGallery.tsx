"use client";
import React from "react";

export type Project = {
  id: number;
  icon: string;
  category: string;
  title: string;
  description: string;
};

export const ProjectGallery: React.FC<{
  projects: Project[];
  onSelectProject: (id: number) => void;
}> = ({ projects, onSelectProject }) => {
  return (
    <div>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#8b5cf6",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        Featured Work
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              background: "rgba(139, 92, 246, 0.1)",
              border: "2px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onClick={() => onSelectProject(project.id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.borderColor = "#8b5cf6";
              e.currentTarget.style.boxShadow =
                "0 12px 24px rgba(139, 92, 246, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                fontSize: "5rem",
                textAlign: "center",
                padding: "2rem 1rem",
                background:
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(109, 40, 217, 0.2) 100%)",
              }}
            >
              {project.icon}
            </div>
            <div style={{ padding: "1rem" }}>
              <div
                style={{
                  display: "inline-block",
                  padding: "0.25rem 0.75rem",
                  background: "rgba(139, 92, 246, 0.2)",
                  border: "1px solid rgba(139, 92, 246, 0.4)",
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#8b5cf6",
                  marginBottom: "0.5rem",
                }}
              >
                {project.category}
              </div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#fff",
                  margin: "0 0 0.5rem 0",
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(255, 255, 255, 0.7)",
                  margin: 0,
                }}
              >
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
