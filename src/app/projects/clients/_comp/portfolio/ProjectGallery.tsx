import React from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  icon: string;
  description: string;
}

interface ProjectGalleryProps {
  projects: Project[];
  selectedProject: number | null;
  onProjectClick: (id: number) => void;
  onBackToGallery: () => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  projects,
  selectedProject,
  onProjectClick,
  onBackToGallery,
}) => {
  if (selectedProject !== null) {
    const project = projects.find((p) => p.id === selectedProject);

    return (
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <button
          onClick={onBackToGallery}
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
            {project?.icon}
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
              {project?.category}
            </div>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: "#fff",
                marginBottom: "1rem",
              }}
            >
              {project?.title}
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: "1.7",
                marginBottom: "2rem",
              }}
            >
              {project?.description}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              {["Client Name", "Year", "Services", "Awards"].map(
                (label, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "1rem",
                      background: "rgba(139, 92, 246, 0.1)",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "rgba(255, 255, 255, 0.6)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "#8b5cf6",
                      }}
                    >
                      {label === "Client Name" && "Acme Corp"}
                      {label === "Year" && "2024"}
                      {label === "Services" && project?.category}
                      {label === "Awards" && "Featured"}
                    </div>
                  </div>
                ),
              )}
            </div>

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
            >
              View Full Case Study
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            onClick={() => onProjectClick(project.id)}
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
