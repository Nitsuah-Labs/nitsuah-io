// PROJECTS - src/app/projects/page.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { allProjects } from "../../lib/data/projects";
import Footer from "../_components/_site/Footer";
import HomeBar from "../_components/_site/Homebar";
import { ProjectCard } from "./_components/ProjectCard";
import styles from "./_styles/Projects.module.css";

// Tag categories for color coding
const TAG_CATEGORIES = {
  Platform: ["Ethereum", "Polygon", "Solana", "GCP"],
  Technology: [
    "Python",
    "TypeScript",
    "JavaScript",
    "Solidity",
    "Rust",
    "PowerShell",
    "NextJS",
    "React",
  ],
  Type: [
    "NFT",
    "DAO",
    "DApp",
    "Blockchain",
    "Web3",
    "3D",
    "AI",
    "ML",
    "Games",
    "Portfolio",
    "Clients",
  ],
  Domain: [
    "Cryptography",
    "Research",
    "Automation",
    "DevOps",
    "Sysadmin",
    "Enterprise",
    "Graphics",
    "Animation",
    "Image-Generation",
    "Art",
    "Modeling",
  ],
  Other: ["Algorithms", "Canvas", "Spline", "Blender", "Coming-Soon", "VBA"],
};

const getTagCategory = (tag: string): keyof typeof TAG_CATEGORIES => {
  const normalizedTag =
    tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
  for (const [category, tags] of Object.entries(TAG_CATEGORIES)) {
    if (tags.some((t) => t.toLowerCase() === normalizedTag.toLowerCase())) {
      return category as keyof typeof TAG_CATEGORIES;
    }
  }
  return "Other";
};

const getCategoryColors = (category: keyof typeof TAG_CATEGORIES) => {
  const colorMap = {
    Platform: {
      bg: "rgba(59, 130, 246, 0.2)",
      border: "rgba(59, 130, 246, 0.5)",
      text: "#60a5fa",
    },
    Technology: {
      bg: "rgba(34, 197, 94, 0.2)",
      border: "rgba(34, 197, 94, 0.5)",
      text: "#4ade80",
    },
    Type: {
      bg: "rgba(249, 115, 22, 0.2)",
      border: "rgba(249, 115, 22, 0.5)",
      text: "#fb923c",
    },
    Domain: {
      bg: "rgba(168, 85, 247, 0.2)",
      border: "rgba(168, 85, 247, 0.5)",
      text: "#c084fc",
    },
    Other: {
      bg: "rgba(107, 114, 128, 0.2)",
      border: "rgba(107, 114, 128, 0.5)",
      text: "#9ca3af",
    },
  };
  return colorMap[category];
};

// Import project images
import nitsuah from "./_assets/NITSUAH.png";
import aiarf from "./_assets/arf-ai.png";
import arfg from "./_assets/arf-guild.gif";
import blendeth from "./_assets/blend-eth.gif";
import cat from "./_assets/cat.png";
import darkmoon from "./_assets/darkmoon.gif";
import ngx from "./_assets/ng-game.png";
import spline from "./_assets/spline.gif";

// Map project IDs to their images
const projectImages: Record<string, any> = {
  labs: nitsuah,
  darkmoon: darkmoon,
  spline3d: spline,
  clients: cat,
  blender: blendeth,
  paint3d: arfg,
  imagen: aiarf,
  kryptos: cat,
  gcp: cat,
  stash: cat,
  "nitsuah-io": nitsuah,
  games: ngx,
};

// GIF projects for unoptimized loading
const gifProjects = new Set(["darkmoon", "spline3d", "blender", "paint3d"]);

const Projects = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filtersExpanded, setFiltersExpanded] = useState(true);
  const [featuredProjects, setFeaturedProjects] = useState<Set<string>>(
    new Set(allProjects.filter((p) => p.featured).map((p) => p.id)),
  );

  const handleToggleFeatured = (projectId: string) => {
    setFeaturedProjects((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  // Auto-collapse filters on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setFiltersExpanded(false);
      } else {
        setFiltersExpanded(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sort projects: featured first (using dynamic state), then by original order
  const sortedProjects = useMemo(() => {
    return [...allProjects].sort((a, b) => {
      const aFeatured = featuredProjects.has(a.id);
      const bFeatured = featuredProjects.has(b.id);
      if (aFeatured && !bFeatured) return -1;
      if (!aFeatured && bFeatured) return 1;
      return 0;
    });
  }, [featuredProjects]);

  // Get available tags based on currently visible projects (category + selected tags)
  const availableTags = useMemo(() => {
    let projectsForTags = sortedProjects;

    // Apply category filter
    if (selectedCategory !== "all") {
      if (selectedCategory === "Featured") {
        projectsForTags = projectsForTags.filter((p) =>
          featuredProjects.has(p.id),
        );
      } else {
        projectsForTags = projectsForTags.filter(
          (p) => p.category === selectedCategory,
        );
      }
    }

    // Apply tag filters (only show tags from projects that match currently selected tags)
    if (selectedTags.length > 0) {
      projectsForTags = projectsForTags.filter((project) =>
        selectedTags.every((tag) => project.tags.includes(tag)),
      );
    }

    const tagsSet = new Set<string>();
    projectsForTags.forEach((project) => {
      project.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [sortedProjects, selectedCategory, selectedTags, featuredProjects]);

  // Filter projects by category and tags
  const filteredProjects = useMemo(() => {
    let filtered = sortedProjects;

    // Filter by category
    if (selectedCategory !== "all") {
      if (selectedCategory === "Featured") {
        filtered = filtered.filter((p) => featuredProjects.has(p.id));
      } else {
        filtered = filtered.filter((p) => p.category === selectedCategory);
      }
    }

    // Filter by tags (AND logic - must have ALL selected tags)
    if (selectedTags.length > 0) {
      filtered = filtered.filter((project) =>
        selectedTags.every((tag) => project.tags.includes(tag)),
      );
    }

    return filtered;
  }, [sortedProjects, selectedCategory, selectedTags, featuredProjects]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const categories = ["all", "Featured", "Apps", "Web3", "AI/ML", "Design"];

  return (
    <div className={styles.pageWrapper}>
      <HomeBar />
      <main className={styles.projectsPage}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>PROJECTS</h1>
            <h2 className={styles.subtitle}>
              Explore projects organized by category
            </h2>
          </div>

          {/* Filter Panel */}
          <div className={styles.filterPanel}>
            <div className={styles.filterHeader}>
              <div className={styles.filterHeaderLeft}>
                <button
                  className={styles.filterToggle}
                  onClick={() => setFiltersExpanded(!filtersExpanded)}
                >
                  <i className="fa fa-filter" aria-hidden="true"></i>
                  <span>Filters</span>
                  <span className={styles.expandIndicator}>
                    {filtersExpanded ? "▲" : "▼"}
                  </span>
                </button>

                {/* Category Filters Inline */}
                <div className={styles.categoryButtonsInline}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`${styles.categoryButton} ${
                        selectedCategory === cat ? styles.active : ""
                      }`}
                      aria-label={cat === "Featured" ? "⭐ Featured" : cat}
                    >
                      {cat === "all" ? "All" : cat === "Featured" ? "⭐" : cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {filtersExpanded && (
              <div className={styles.filterContent}>
                {/* Tag Filters */}
                <div className={styles.tagFilters}>
                  <label className={styles.filterLabel}>
                    Filter by Tags
                    {selectedTags.length > 0 && (
                      <span style={{ marginLeft: "0.5rem", opacity: 0.7 }}>
                        ({selectedTags.length} selected)
                      </span>
                    )}
                  </label>
                  <div className={styles.tagButtons}>
                    {availableTags.map((tag) => {
                      const category = getTagCategory(tag);
                      const colors = getCategoryColors(category);
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`${styles.tagButton} ${
                            isSelected ? styles.selected : ""
                          }`}
                          style={{
                            backgroundColor: isSelected
                              ? colors.bg
                              : "transparent",
                            borderColor: isSelected
                              ? colors.border
                              : `${colors.border}80`,
                            color: isSelected
                              ? colors.text
                              : "rgba(255, 255, 255, 0.6)",
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor = colors.border;
                              e.currentTarget.style.color = colors.text;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor = `${colors.border}80`;
                              e.currentTarget.style.color =
                                "rgba(255, 255, 255, 0.6)";
                            }
                          }}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedTags.length > 0 || selectedCategory !== "all") && (
                  <div style={{ marginTop: "1rem" }}>
                    <button
                      onClick={() => {
                        setSelectedTags([]);
                        setSelectedCategory("all");
                      }}
                      style={{
                        padding: "0.5rem 1rem",
                        background: "rgba(249, 115, 22, 0.2)",
                        border: "1px solid rgba(249, 115, 22, 0.4)",
                        borderRadius: "6px",
                        color: "#f97316",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                      }}
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Projects Grid */}
          <section
            className={styles.projectGrid}
            aria-label="Project Repositories"
            data-testid="projects-section"
          >
            {filteredProjects.map((project) => {
              const image = projectImages[project.id] || cat;
              const isGif = gifProjects.has(project.id);
              const isFeatured = featuredProjects.has(project.id);

              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  image={image}
                  isFeatured={isFeatured}
                  isGif={isGif}
                  onToggleFeatured={handleToggleFeatured}
                  getTagColors={(tag: string) => {
                    const category = getTagCategory(tag);
                    return getCategoryColors(category);
                  }}
                />
              );
            })}
          </section>

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <i
                className="fa fa-search"
                aria-hidden="true"
                style={{ fontSize: "3rem", marginBottom: "1rem" }}
              ></i>
              <p style={{ fontSize: "1.2rem" }}>
                No projects found matching your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedTags([]);
                  setSelectedCategory("all");
                }}
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem 1.5rem",
                  background:
                    "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  color: "#000",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
