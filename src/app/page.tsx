// HOMEPAGE - src/app/page.tsx
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Footer from "./_components/_site/Footer";
import HomeBar from "./_components/_site/Homebar";
import SplineScene from "./_components/_spline/spline-home";
import { featuredProjects } from "../lib/data/projects";

const HomePage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showSpline, setShowSpline] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 300) {
        setShowSpline(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      <HomeBar />
      <main>
        <h1 className="sr-only">Welcome to Nitsuah Labs</h1>

        {/* Hero Section */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d1a3a 100%)",
            position: "relative",
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              textAlign: "center",
              zIndex: 10,
            }}
          >
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: "700",
                marginBottom: "1.5rem",
                lineHeight: "1.2",
                color: "#ffffff",
              }}
            >
              Hi, I&apos;m Austin Hardy
              <br />
              <span style={{ color: "#f97316" }}>
                Developer Productivity Engineer & Researcher
              </span>
            </h2>
            <p
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                color: "rgba(255, 255, 255, 0.85)",
                marginBottom: "2.5rem",
                lineHeight: "1.6",
              }}
            >
              I build tools and platforms that help engineers move faster and
              systems scale smarter.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/projects"
                style={{
                  backgroundColor: "#f97316",
                  color: "white",
                  padding: "1rem 2rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  transition: "all 0.2s ease",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#ea580c";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f97316";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Explore My Work
              </Link>
              <Link
                href="/about"
                style={{
                  backgroundColor: "transparent",
                  color: "#f97316",
                  padding: "1rem 2rem",
                  border: "2px solid #f97316",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  transition: "all 0.2s ease",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f97316";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#f97316";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                About Me
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              animation: "bounce 2s infinite",
              opacity: scrollY > 100 ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          >
            <div
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "0.875rem",
                marginBottom: "0.5rem",
              }}
            >
              Scroll to explore
            </div>
            <div
              style={{
                width: "24px",
                height: "40px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "12px",
                margin: "0 auto",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "4px",
                  height: "8px",
                  backgroundColor: "#f97316",
                  borderRadius: "2px",
                  position: "absolute",
                  left: "50%",
                  top: "8px",
                  transform: "translateX(-50%)",
                  animation: "scroll 1.5s infinite",
                }}
              />
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section
          style={{
            padding: "4rem 2rem",
            background: "#1a1a1a",
            minHeight: "100vh",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "1rem",
                textAlign: "center",
                color: "#ffffff",
              }}
            >
              Featured Projects
            </h2>
            <p
              style={{
                textAlign: "center",
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: "3rem",
                fontSize: "1.1rem",
              }}
            >
              Recent work that showcases my approach to developer productivity
              and system design
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
              }}
            >
              {featuredProjects.slice(0, 5).map((project, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor =
                      "rgba(249, 115, 22, 0.5)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(249, 115, 22, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <h3
                    style={{
                      color: "#f97316",
                      fontSize: "1.5rem",
                      marginBottom: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.85)",
                      marginBottom: "0.75rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {project.description}
                  </p>
                  {project.highlight && (
                    <p
                      style={{
                        color: "rgba(249, 115, 22, 0.9)",
                        fontSize: "0.9rem",
                        marginBottom: "1rem",
                        fontStyle: "italic",
                      }}
                    >
                      💡 {project.highlight}
                    </p>
                  )}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        style={{
                          backgroundColor: "rgba(249, 115, 22, 0.15)",
                          color: "#f97316",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "4px",
                          fontSize: "0.8rem",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {(project.github || project.demo || project.externalLink) && (
                    <a
                      href={
                        project.github ||
                        project.demo ||
                        project.externalLink ||
                        "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#f97316",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontSize: "0.9rem",
                      }}
                    >
                      View Project →
                    </a>
                  )}
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link
                href="/projects"
                style={{
                  color: "#f97316",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                }}
              >
                View All Projects →
              </Link>
            </div>
          </div>
        </section>

        {/* Spline Scene (Revealed on Scroll) */}
        {showSpline && (
          <section
            style={{
              minHeight: "100vh",
              position: "relative",
              opacity: Math.min((scrollY - 300) / 500, 1),
              transition: "opacity 0.3s ease",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "2rem",
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
                zIndex: 10,
              }}
            >
              <h2
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "2rem",
                  fontWeight: "600",
                }}
              >
                Behind the Scenes
              </h2>
              <p style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                Interactive 3D visualization
              </p>
            </div>
            <SplineScene />
          </section>
        )}

        <style jsx>{`
          @keyframes bounce {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes scroll {
            0% {
              opacity: 0;
              top: 8px;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              top: 24px;
            }
          }
        `}</style>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
