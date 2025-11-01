import {
  AI_TAGS,
  EXCLUDED_FROM_WEBSITES_TAGS,
  GRAPHICS_3D_TAGS,
  WEB3_TAGS,
} from "../constants/projectCategories";
import type { Project } from "../data/projects";

export function categorizeProjects(
  projects: Project[],
): Record<string, Project[]> {
  const featured = projects.filter((p) => p.featured);
  const nonFeatured = projects.filter((p) => !p.featured);

  return {
    "Featured Projects": featured,
    "Websites & Apps": nonFeatured.filter(
      (p) =>
        p.tags.includes("nextjs") ||
        p.tags.includes("portfolio") ||
        p.tags.includes("typescript") ||
        p.id === "nitsuah-io" ||
        (!p.tags.some((tag) => EXCLUDED_FROM_WEBSITES_TAGS.includes(tag)) &&
          !p.tags.includes("github")),
    ),
    "Web3 & Blockchain": nonFeatured.filter((p) =>
      p.tags.some((tag) => WEB3_TAGS.includes(tag)),
    ),
    "AI & Machine Learning": nonFeatured.filter((p) =>
      p.tags.some((tag) => AI_TAGS.includes(tag)),
    ),
    "3D Graphics & Design": nonFeatured.filter((p) =>
      p.tags.some((tag) => GRAPHICS_3D_TAGS.includes(tag)),
    ),
  };
}
