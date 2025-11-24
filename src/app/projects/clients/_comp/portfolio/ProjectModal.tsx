"use client";
import React from "react";
import { Project } from "./ProjectGallery";

export const ProjectModal: React.FC<{
  project: Project | undefined;
  onClose: () => void;
}> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <button
        onClick={onClose}
        style={{
          padding: "0.5rem 1rem",
          background: "transparent",
          border: "2px solid rgba(139, 92, 246, 0.3)",
          color: "#8b5cf6",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "1.5rem",
          fontWeight: "600",
        }}
      >
        ← Back to Gallery
      </button>

      <div
        style={{
          background: "rgba(139, 92, 246, 0.1)",
          border: "2px solid rgba(139, 92, 246, 0.3)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: "12rem",
            textAlign: "center",
            padding: "3rem",
            background:
              "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(109, 40, 217, 0.2) 100%)",
          }}
        >
          {project.icon}
        </div>

        <div style={{ padding: "2rem" }}>
          <div
            style={{
              display: "inline-block",
              padding: "0.375rem 1rem",
              background: "rgba(139, 92, 246, 0.2)",
              border: "1px solid rgba(139, 92, 246, 0.4)",
              borderRadius: "16px",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "#8b5cf6",
              marginBottom: "1rem",
            }}
          >
            {project.category}
          </div>

          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#fff",
              margin: "0 0 1rem 0",
            }}
          >
            {project.title}
          </h2>

          <p
            style={{
              fontSize: "1.1rem",
              color: "rgba(255, 255, 255, 0.7)",
              marginBottom: "2rem",
              lineHeight: "1.6",
            }}
          >
            {project.description}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            {[
              { label: "Client", value: "Acme Corp" },
              { label: "Year", value: "2025" },
              { label: "Duration", value: "3 weeks" },
            ].map((detail, idx) => (
              <div
                key={idx}
                style={{
                  padding: "1rem",
                  background: "rgba(139, 92, 246, 0.05)",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255, 255, 255, 0.6)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {detail.label}
                </div>
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#fff",
                  }}
                >
                  {detail.value}
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
            Project Details
          </h3>

          <p
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              lineHeight: "1.6",
              marginBottom: "2rem",
            }}
          >
            This project involved a comprehensive approach to creating a unique
            visual identity. We focused on modern design principles while
            maintaining brand consistency across all deliverables. The final
            result exceeded client expectations and received positive feedback
            from their target audience.
          </p>

          <button
            style={{
              width: "100%",
              padding: "1rem",
              background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
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
            Hire Me for Similar Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
