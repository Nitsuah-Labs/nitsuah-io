// PROJECTS - src/app/projects/pages.tsx
"use client";
import { Grid } from "@mui/material";
import type { Project } from "../../lib/data/projects";
import { allProjects } from "../../lib/data/projects";
import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";
import "../_components/_styles/SelectedProjects.css";
import "../_components/_styles/global.css";

// Categorize projects
const categorizedProjects: Record<string, Project[]> = {
  "Featured Projects": allProjects.filter((p) => p.featured),
  "Websites & Apps": allProjects.filter(
    (p) =>
      !p.featured &&
      (p.tags.includes("nextjs") ||
        p.tags.includes("portfolio") ||
        p.tags.includes("typescript") ||
        p.id === "nitsuah-io" ||
        (!p.tags.some((tag) =>
          [
            "web3",
            "blockchain",
            "dao",
            "nft",
            "ai",
            "ml",
            "3d",
            "spline",
            "blender",
          ].includes(tag),
        ) &&
          !p.tags.includes("github"))),
  ),
  "Web3 & Blockchain": allProjects.filter(
    (p) =>
      !p.featured &&
      (p.tags.includes("web3") ||
        p.tags.includes("blockchain") ||
        p.tags.includes("dao") ||
        p.tags.includes("nft") ||
        p.tags.includes("ethereum") ||
        p.tags.includes("solana")),
  ),
  "AI & Machine Learning": allProjects.filter(
    (p) => !p.featured && (p.tags.includes("ai") || p.tags.includes("ml")),
  ),
  "3D Graphics & Design": allProjects.filter(
    (p) =>
      !p.featured &&
      (p.tags.includes("3d") ||
        p.tags.includes("spline") ||
        p.tags.includes("blender")),
  ),
};

const Projects = () => {
  return (
    <div className="App">
      <HomeBar />
      <main
        className="content-container"
        style={{
          marginTop: "80px",
          marginBottom: "60px",
          paddingBottom: "80px",
          minHeight: "calc(100vh - 140px)",
          background: "#0a0a0a",
          padding: "2rem 1rem",
        }}
      >
        <div className="projects-header" style={{ marginBottom: "3rem" }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "700",
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "0.5rem",
            }}
          >
            Projects Portfolio
          </h1>
          <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "1.2rem" }}>
            Explore projects organized by category
          </p>
        </div>

        {Object.entries(categorizedProjects).map(
          ([category, projects]) =>
            projects.length > 0 && (
              <section key={category} style={{ marginBottom: "4rem" }}>
                <h2
                  style={{
                    fontSize: "2rem",
                    fontWeight: "600",
                    color: "#f97316",
                    marginBottom: "1.5rem",
                    paddingBottom: "0.5rem",
                    borderBottom: "2px solid rgba(249, 115, 22, 0.3)",
                  }}
                >
                  {category}
                </h2>
                <Grid container spacing={3} rowSpacing={6}>
                  {projects.map((project) => (
                    <Grid key={project.id} item xs={12} sm={6} md={4}>
                      <div
                        className="portfolio-card"
                        style={{
                          background: "rgba(20, 20, 20, 0.8)",
                          border: "2px solid rgba(249, 115, 22, 0.3)",
                          borderRadius: "12px",
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                        onClick={() =>
                          project.externalLink
                            ? window.open(project.externalLink, "_blank")
                            : project.demo
                              ? window.open(project.demo, "_blank")
                              : null
                        }
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(249, 115, 22, 0.8)";
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 24px rgba(249, 115, 22, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(249, 115, 22, 0.3)";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <div style={{ padding: "1.5rem", flex: 1 }}>
                          <h3
                            style={{
                              fontSize: "1.5rem",
                              fontWeight: "600",
                              color: "#fff",
                              marginBottom: "0.75rem",
                            }}
                          >
                            {project.title}
                          </h3>
                          <p
                            style={{
                              color: "rgba(255, 255, 255, 0.7)",
                              marginBottom: "1rem",
                              fontSize: "0.95rem",
                            }}
                          >
                            {project.description}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "0.5rem",
                              marginBottom: "1rem",
                            }}
                          >
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                style={{
                                  padding: "0.25rem 0.75rem",
                                  background: "rgba(249, 115, 22, 0.2)",
                                  border: "1px solid rgba(249, 115, 22, 0.4)",
                                  borderRadius: "4px",
                                  fontSize: "0.85rem",
                                  color: "#f97316",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "0.75rem",
                              marginTop: "auto",
                            }}
                          >
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                  padding: "0.5rem 1rem",
                                  background:
                                    "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                                  color: "#000",
                                  border: "2px solid #000",
                                  borderRadius: "6px",
                                  fontWeight: "600",
                                  fontSize: "0.9rem",
                                  textDecoration: "none",
                                  transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform =
                                    "translateY(-2px)";
                                  e.currentTarget.style.boxShadow =
                                    "0 4px 12px rgba(249, 115, 22, 0.4)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform =
                                    "translateY(0)";
                                  e.currentTarget.style.boxShadow = "none";
                                }}
                              >
                                GitHub
                              </a>
                            )}
                            {(project.demo || project.externalLink) && (
                              <a
                                href={project.demo || project.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                  padding: "0.5rem 1rem",
                                  background:
                                    "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                                  color: "#000",
                                  border: "2px solid #000",
                                  borderRadius: "6px",
                                  fontWeight: "600",
                                  fontSize: "0.9rem",
                                  textDecoration: "none",
                                  transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform =
                                    "translateY(-2px)";
                                  e.currentTarget.style.boxShadow =
                                    "0 4px 12px rgba(249, 115, 22, 0.4)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform =
                                    "translateY(0)";
                                  e.currentTarget.style.boxShadow = "none";
                                }}
                              >
                                View
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </section>
            ),
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
