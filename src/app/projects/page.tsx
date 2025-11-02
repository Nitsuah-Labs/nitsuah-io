// PROJECTS - src/app/projects/pages.tsx
"use client";
import { Grid } from "@mui/material";
import Image from "next/image";
import { useMemo, useState } from "react";
import { allProjects } from "../../lib/data/projects";
import { categorizeProjects } from "../../lib/utils/projectCategories";
import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";
import "../_components/_styles/SelectedProjects.css";
import "../_components/_styles/global.css";

// Project card transform constants
const FEATURED_SCALE = 1;
const NON_FEATURED_SCALE = 0.72;
const HOVER_TRANSLATE_Y_FEATURED = "-4px";
const HOVER_TRANSLATE_Y_NON_FEATURED = "-2px";

// Import project images
import dev from "../crypto/_assets/dao.png";
import nitsuah from "./_assets/NITSUAH.png";
import aiarf from "./_assets/arf-ai.png";
import arfg from "./_assets/arf-guild.gif";
import arf from "./_assets/arf.gif";
import blendeth from "./_assets/blend-eth.gif";
import buildspace from "./_assets/buildspace.png";
import cat from "./_assets/cat.png";
import darkmoon from "./_assets/darkmoon.gif";
import polyens from "./_assets/ens.gif";
import hedge from "./_assets/hedge-ref.png";
import ngx from "./_assets/ng-game.png";
import nwb from "./_assets/nights+weekends.png";
import solApp from "./_assets/sol-dapp.gif";
import solPay from "./_assets/sol-store.gif";
import solana from "./_assets/solana-logo.png";
import spline from "./_assets/spline.gif";
import web3intro from "./_assets/web3-intro.png";
import web3mint from "./_assets/web3-mint.png";

// Map project IDs to their images
const projectImages: Record<string, any> = {
  github: cat,
  labs: nitsuah,
  darkmoon: darkmoon,
  spline3d: spline,
  nextgen: ngx,
  clients: cat,
  buildspace: buildspace,
  "ens-nft": polyens,
  "nft-store": solPay,
  "nft-game": hedge,
  "nights-weekends": nwb,
  "eth-dapp": web3mint,
  "sol-dapp": solApp,
  blender: blendeth,
  autogpt: arf,
  "eth-core": web3intro,
  devdao: dev,
  "sol-core": solana,
  paint3d: arfg,
  imagen: aiarf,
  kryptos: cat,
  gcp: cat,
  stash: cat,
  "nitsuah-io": nitsuah,
};

// Categorize projects
const categorizedProjects = categorizeProjects(allProjects);

const Projects = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract all unique tags from all projects
  const allUniqueTags = useMemo(() => {
    const tagsSet = new Set<string>();
    allProjects.forEach((project) => {
      project.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, []);

  // Filter projects based on selected tags
  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return allProjects;
    return allProjects.filter((project) =>
      selectedTags.some((tag) => project.tags.includes(tag)),
    );
  }, [selectedTags]);

  // Separate featured from other projects
  const featuredProjects = useMemo(
    () => categorizedProjects["Featured Projects"] || [],
    [],
  );

  // Get non-featured filtered projects
  const nonFeaturedFilteredProjects = useMemo(
    () => filteredProjects.filter((p) => !p.featured),
    [filteredProjects],
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const resetFilters = () => {
    setSelectedTags([]);
  };

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

        {/* Featured Projects Section - Always Visible */}
        {featuredProjects.length > 0 && (
          <section style={{ marginBottom: "4rem" }}>
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
              Featured Projects
            </h2>
            <Grid container spacing={3} rowSpacing={6}>
              {featuredProjects.map((project) => {
                const image = projectImages[project.id] || cat;
                const isFeatured = true;
                return (
                  <Grid
                    key={project.id}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={isFeatured ? 4 : 3}
                  >
                    <div
                      className={`portfolio-card ${isFeatured ? "featured-card" : "non-featured-card"}`}
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
                        e.currentTarget.style.transform = isFeatured
                          ? `translateY(${HOVER_TRANSLATE_Y_FEATURED})`
                          : `scale(${NON_FEATURED_SCALE}) translateY(${HOVER_TRANSLATE_Y_NON_FEATURED})`;
                        e.currentTarget.style.boxShadow =
                          "0 8px 24px rgba(249, 115, 22, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(249, 115, 22, 0.3)";
                        e.currentTarget.style.transform = isFeatured
                          ? "translateY(0)"
                          : `scale(${NON_FEATURED_SCALE}) translateY(0)`;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {/* Project Image */}
                      <div
                        style={{
                          position: "relative",
                          height: "200px",
                          width: "100%",
                          borderBottom: "1px solid rgba(249, 115, 22, 0.2)",
                        }}
                      >
                        <Image
                          alt={project.title}
                          src={image}
                          fill
                          style={{ objectFit: "cover" }}
                          unoptimized={
                            image === darkmoon ||
                            image === spline ||
                            image === polyens ||
                            image === solPay ||
                            image === solApp ||
                            image === blendeth ||
                            image === arf ||
                            image === arfg
                          }
                        />
                      </div>
                      <div
                        style={{
                          padding: "1.5rem",
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
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
                            flex: 1,
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
                            justifyContent: "flex-end",
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
                );
              })}
            </Grid>
          </section>
        )}

        {/* Filter Bar */}
        <section style={{ marginBottom: "3rem" }}>
          <div
            style={{
              background: "rgba(20, 20, 20, 0.6)",
              border: "2px solid rgba(249, 115, 22, 0.3)",
              borderRadius: "12px",
              padding: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#f97316",
                  margin: 0,
                }}
              >
                Filter by Technology
              </h3>
              {selectedTags.length > 0 && (
                <button
                  onClick={resetFilters}
                  style={{
                    padding: "0.5rem 1.25rem",
                    background: "rgba(239, 68, 68, 0.2)",
                    border: "2px solid #ef4444",
                    borderRadius: "6px",
                    color: "#ef4444",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontSize: "0.9rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(239, 68, 68, 0.3)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  Reset Filters
                </button>
              )}
            </div>

            {selectedTags.length > 0 && (
              <div
                style={{
                  marginBottom: "1.5rem",
                  padding: "1rem",
                  background: "rgba(249, 115, 22, 0.1)",
                  borderRadius: "8px",
                  border: "1px solid rgba(249, 115, 22, 0.3)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Active Filters:
                </div>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                >
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "0.375rem 0.75rem",
                        background: "rgba(249, 115, 22, 0.3)",
                        border: "2px solid #f97316",
                        borderRadius: "6px",
                        color: "#f97316",
                        fontWeight: "600",
                        fontSize: "0.875rem",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              {allUniqueTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    style={{
                      padding: "0.625rem 1.25rem",
                      background: isSelected
                        ? "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
                        : "rgba(249, 115, 22, 0.1)",
                      border: isSelected
                        ? "2px solid #f97316"
                        : "2px solid rgba(249, 115, 22, 0.3)",
                      borderRadius: "8px",
                      color: isSelected ? "#000" : "rgba(255, 255, 255, 0.8)",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontSize: "0.9rem",
                      textTransform: "capitalize",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background =
                          "rgba(249, 115, 22, 0.2)";
                        e.currentTarget.style.borderColor =
                          "rgba(249, 115, 22, 0.6)";
                      }
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(249, 115, 22, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background =
                          "rgba(249, 115, 22, 0.1)";
                        e.currentTarget.style.borderColor =
                          "rgba(249, 115, 22, 0.3)";
                      }
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            {selectedTags.length > 0 && (
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "0.75rem 1rem",
                  background: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                <i
                  className="fa fa-info-circle"
                  aria-hidden="true"
                  style={{ marginRight: "0.5rem", color: "#3b82f6" }}
                ></i>
                Showing {nonFeaturedFilteredProjects.length} project
                {nonFeaturedFilteredProjects.length !== 1 ? "s" : ""} matching
                your filters
              </div>
            )}
          </div>
        </section>

        {/* Filtered Projects Section */}
        {selectedTags.length === 0 ? (
          // Show all categorized projects when no filter is active
          Object.entries(categorizedProjects).map(
            ([category, projects]) =>
              category !== "Featured Projects" &&
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
                    {projects.map((project) => {
                      const image = projectImages[project.id] || cat;
                      return (
                        <Grid
                          key={project.id}
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                        >
                          <div
                            className="portfolio-card non-featured-card"
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
                              e.currentTarget.style.transform = `scale(${NON_FEATURED_SCALE}) translateY(${HOVER_TRANSLATE_Y_NON_FEATURED})`;
                              e.currentTarget.style.boxShadow =
                                "0 8px 24px rgba(249, 115, 22, 0.2)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor =
                                "rgba(249, 115, 22, 0.3)";
                              e.currentTarget.style.transform = `scale(${NON_FEATURED_SCALE}) translateY(0)`;
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            {/* Project Image */}
                            <div
                              style={{
                                position: "relative",
                                height: "200px",
                                width: "100%",
                                borderBottom:
                                  "1px solid rgba(249, 115, 22, 0.2)",
                              }}
                            >
                              <Image
                                alt={project.title}
                                src={image}
                                fill
                                style={{ objectFit: "cover" }}
                                unoptimized={
                                  image === darkmoon ||
                                  image === spline ||
                                  image === polyens ||
                                  image === solPay ||
                                  image === solApp ||
                                  image === blendeth ||
                                  image === arf ||
                                  image === arfg
                                }
                              />
                            </div>
                            <div
                              style={{
                                padding: "1.5rem",
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
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
                                  flex: 1,
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
                                      border:
                                        "1px solid rgba(249, 115, 22, 0.4)",
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
                                  justifyContent: "flex-end",
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
                      );
                    })}
                  </Grid>
                </section>
              ),
          )
        ) : (
          // Show only filtered projects in a single section
          <section style={{ marginBottom: "4rem" }}>
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
              Filtered Projects
            </h2>
            {nonFeaturedFilteredProjects.length > 0 ? (
              <Grid container spacing={3} rowSpacing={6}>
                {nonFeaturedFilteredProjects.map((project) => {
                  const image = projectImages[project.id] || cat;
                  return (
                    <Grid key={project.id} item xs={12} sm={6} md={4} lg={3}>
                      <div
                        className="portfolio-card non-featured-card"
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
                          e.currentTarget.style.transform = `scale(${NON_FEATURED_SCALE}) translateY(${HOVER_TRANSLATE_Y_NON_FEATURED})`;
                          e.currentTarget.style.boxShadow =
                            "0 8px 24px rgba(249, 115, 22, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(249, 115, 22, 0.3)";
                          e.currentTarget.style.transform = `scale(${NON_FEATURED_SCALE}) translateY(0)`;
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        {/* Project Image */}
                        <div
                          style={{
                            position: "relative",
                            height: "200px",
                            width: "100%",
                            borderBottom: "1px solid rgba(249, 115, 22, 0.2)",
                          }}
                        >
                          <Image
                            alt={project.title}
                            src={image}
                            fill
                            style={{ objectFit: "cover" }}
                            unoptimized={
                              image === darkmoon ||
                              image === spline ||
                              image === polyens ||
                              image === solPay ||
                              image === solApp ||
                              image === blendeth ||
                              image === arf ||
                              image === arfg
                            }
                          />
                        </div>
                        <div
                          style={{
                            padding: "1.5rem",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
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
                              flex: 1,
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
                              justifyContent: "flex-end",
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
                  );
                })}
              </Grid>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "4rem 2rem",
                  background: "rgba(20, 20, 20, 0.6)",
                  border: "2px solid rgba(249, 115, 22, 0.3)",
                  borderRadius: "12px",
                }}
              >
                <i
                  className="fa fa-filter"
                  aria-hidden="true"
                  style={{
                    fontSize: "3rem",
                    color: "rgba(249, 115, 22, 0.5)",
                    marginBottom: "1rem",
                  }}
                ></i>
                <p
                  style={{
                    fontSize: "1.2rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "0.5rem",
                  }}
                >
                  No projects found matching your filter criteria
                </p>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  Try selecting different tags or reset the filters
                </p>
              </div>
            )}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
