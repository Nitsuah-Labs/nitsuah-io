"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { Project } from "../../../lib/data/projects";
import styles from "../_styles/Projects.module.css";

interface ProjectCardProps {
  project: Project;
  image: StaticImageData | string;
  isFeatured?: boolean;
  isGif?: boolean;
  onToggleFeatured?: (projectId: string) => void;
  getTagColors?: (tag: string) => { bg: string; border: string; text: string };
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  image,
  isFeatured = false,
  isGif = false,
  onToggleFeatured,
  getTagColors,
}) => {
  const handleCardClick = () => {
    if (project.externalLink) {
      window.open(project.externalLink, "_blank");
    } else if (project.demo) {
      window.open(project.demo, "_blank");
    } else if (project.github) {
      // If only GitHub link exists, use it as the card click target
      window.open(project.github, "_blank");
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const handleStarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onToggleFeatured) {
      onToggleFeatured(project.id);
    }
  };

  const isComingSoon = project.isComingSoon || false;

  return (
    <div
      className={`${styles.card} ${isComingSoon ? styles.comingSoonCard : ""}`}
      onClick={handleCardClick}
    >
      {/* Featured Star - Always visible, interactive */}
      <button
        className={`${styles.featuredStar} ${isFeatured ? styles.featured : ""}`}
        onClick={handleStarClick}
        title={isFeatured ? "Remove from featured" : "Mark as featured"}
        aria-label={isFeatured ? "Remove from featured" : "Mark as featured"}
      >
        {isFeatured ? "★" : "☆"}
      </button>

      {/* Project Image */}
      <div className={styles.cardImage}>
        <Image
          alt={project.title}
          src={image}
          fill
          style={{ objectFit: "cover" }}
          unoptimized={isGif}
        />
      </div>

      {/* Card Content */}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDescription}>{project.description}</p>

        {/* Tags */}
        <div className={styles.cardTags}>
          {project.tags.map((tag) => {
            const colors = getTagColors ? getTagColors(tag) : null;
            return (
              <span
                key={tag}
                className={styles.cardTag}
                style={
                  colors
                    ? {
                        backgroundColor: colors.bg,
                        borderColor: colors.border,
                        color: colors.text,
                      }
                    : undefined
                }
              >
                {tag}
              </span>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className={styles.cardActions}>
          {(project.demo || project.externalLink) && (
            <a
              href={project.demo || project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.cardButton} ${styles.viewButton}`}
              onClick={handleLinkClick}
            >
              View
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.cardButton} ${styles.githubButton}`}
              onClick={(e) => handleLinkClick(e)}
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
