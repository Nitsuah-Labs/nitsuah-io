// src/lib/utils/project-helpers.ts
import { ClientProject } from "../data/client-projects";

export const getProjectIcon = (project: ClientProject): string => {
  // Use custom icon if available, otherwise fall back to type-based icon
  if (project.icon) {
    return project.icon;
  }

  switch (project.type) {
    case "web3":
      return "🔗";
    case "ecommerce":
      return "🛒";
    case "saas":
      return "📊";
    case "service":
      return "🏢";
    case "portfolio":
      return "🎨";
    default:
      return "💼";
  }
};

export const getProjectTypeColor = (type: string): string => {
  switch (type) {
    case "web3":
      return "#c084fc";
    case "ecommerce":
      return "#fb923c";
    case "saas":
      return "#60a5fa";
    case "service":
      return "#4ade80";
    case "portfolio":
      return "#f472b6";
    default:
      return "#9ca3af";
  }
};

export const getProjectTypeBackground = (type: string): string => {
  switch (type) {
    case "web3":
      return "rgba(147, 51, 234, 0.2)";
    case "ecommerce":
      return "rgba(249, 115, 22, 0.2)";
    case "saas":
      return "rgba(59, 130, 246, 0.2)";
    case "service":
      return "rgba(34, 197, 94, 0.2)";
    case "portfolio":
      return "rgba(236, 72, 153, 0.2)";
    default:
      return "rgba(156, 163, 175, 0.2)";
  }
};

export const getProjectTypeBorder = (type: string): string => {
  switch (type) {
    case "web3":
      return "rgba(147, 51, 234, 0.4)";
    case "ecommerce":
      return "rgba(249, 115, 22, 0.4)";
    case "saas":
      return "rgba(59, 130, 246, 0.4)";
    case "service":
      return "rgba(34, 197, 94, 0.4)";
    case "portfolio":
      return "rgba(236, 72, 153, 0.4)";
    default:
      return "rgba(156, 163, 175, 0.4)";
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "live":
      return "#10b981";
    case "demo":
      return "#3b82f6";
    case "mockup":
      return "#9ca3af";
    default:
      return "#9ca3af";
  }
};

export const getStatusBackground = (status: string): string => {
  switch (status) {
    case "live":
      return "#10b98120";
    case "demo":
      return "#3b82f620";
    case "mockup":
      return "#6b728020";
    default:
      return "#6b728020";
  }
};

export const getStatusBorder = (status: string): string => {
  switch (status) {
    case "live":
      return "#10b98140";
    case "demo":
      return "#3b82f640";
    case "mockup":
      return "#6b728040";
    default:
      return "#6b728040";
  }
};
