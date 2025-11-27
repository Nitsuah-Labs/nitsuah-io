// src/lib/data/project-filters.ts
import { ProjectType } from "./client-projects";

export interface ProjectFilter {
  type: ProjectType;
  label: string;
  color: string;
}

export const projectFilters: ProjectFilter[] = [
  { type: "all", label: "All Projects", color: "#10b981" },
  { type: "web3", label: "Web3", color: "#8b5cf6" },
  { type: "ecommerce", label: "E-Commerce", color: "#f59e0b" },
  { type: "saas", label: "SaaS", color: "#3b82f6" },
  { type: "service", label: "Services", color: "#22c55e" },
  { type: "portfolio", label: "Portfolio", color: "#ec4899" },
];
