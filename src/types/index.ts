// Global type definitions for the nitsuah.io portfolio

export interface Project {
  id: string;
  title: string;
  short: string;
  description: string;
  github: string;
  demo?: string;
  highlight: string;
  tags: string[];
  status: 'active' | 'maintained' | 'archived';
  featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  author: string;
  slug: string;
  featured?: boolean;
}

export interface NavigationItem {
  href: string;
  label: string;
  external?: boolean;
  description?: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

export interface SocialLink {
  platform: 'github' | 'twitter' | 'linkedin' | 'email';
  url: string;
  username?: string;
}

export interface ContactInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  socialLinks: SocialLink[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
  icon?: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
  achievements?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: number;
  honors?: string[];
}

// Component prop types
export interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export interface BlogCardProps {
  post: BlogPost;
  compact?: boolean;
}

export interface NavigationProps {
  items: NavigationItem[];
  currentPath?: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Web3 related types
export interface Web3Feature {
  id: string;
  title: string;
  description: string;
  contractAddress?: string;
  chainId?: number;
  enabled: boolean;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// Theme types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  theme: Theme;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
}

// Analytics types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: string;
}

// Environment types
export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_SITE_URL: string;
  NEXT_PUBLIC_GA_ID?: string;
  NEXT_PUBLIC_VERCEL_URL?: string;
}