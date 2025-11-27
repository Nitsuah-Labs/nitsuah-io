/**
 * Mock data for Portfolio Demo
 */

export interface Project {
  id: number;
  title: string;
  category: string;
  icon: string;
  description: string;
}

export const mockProjects: Project[] = [
  {
    id: 1,
    title: "Brand Identity Design",
    category: "Branding",
    icon: "🎨",
    description: "Complete brand identity for tech startup",
  },
  {
    id: 2,
    title: "Product Photography",
    category: "Photography",
    icon: "📸",
    description: "E-commerce product photo shoot",
  },
  {
    id: 3,
    title: "UI/UX Mobile App",
    category: "Design",
    icon: "📱",
    description: "Fitness tracking app interface",
  },
  {
    id: 4,
    title: "Event Coverage",
    category: "Photography",
    icon: "🎭",
    description: "Annual tech conference photos",
  },
  {
    id: 5,
    title: "Logo Collection",
    category: "Branding",
    icon: "✨",
    description: "Various logo designs for clients",
  },
  {
    id: 6,
    title: "Web Design",
    category: "Design",
    icon: "💻",
    description: "Modern portfolio website",
  },
];
