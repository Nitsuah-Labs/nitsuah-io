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
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  image,
  isFeatured = false,
  isGif = false,
}) => {
  const handleCardClick = () => {
    if (project.externalLink) {
      window.open(project.externalLink, "_blank");
    } else if (project.demo) {
      window.open(project.demo, "_blank");
    }
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string,
  ) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      {/* Featured Badge */}
      {isFeatured && (
        <div className={styles.featuredBadge}>
          <i className="fa fa-star" aria-hidden="true"></i>
          <span>Featured</span>
        </div>
      )}

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
              onClick={(e) => handleLinkClick(e, project.github!)}
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
              onClick={(e) =>
                handleLinkClick(e, project.demo || project.externalLink!)
              }
            >
              View
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
