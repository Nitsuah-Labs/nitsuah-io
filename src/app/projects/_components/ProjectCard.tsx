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
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  image,
  isFeatured = false,
  isGif = false,
  onToggleFeatured,
}) => {
  const handleCardClick = () => {
    if (project.externalLink) {
      window.open(project.externalLink, "_blank");
    } else if (project.demo) {
      window.open(project.demo, "_blank");
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
          {project.tags.map((tag) => (
            <span key={tag} className={styles.cardTag}>
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className={styles.cardActions}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardButton}
              onClick={(e) => handleLinkClick(e)}
            >
              GitHub
            </a>
          )}
          {(project.demo || project.externalLink) && (
            <a
              href={project.demo || project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardButton}
              onClick={handleLinkClick}
            >
              View
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
