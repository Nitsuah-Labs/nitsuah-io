/**
 * BlogCMSDemo.tsx
 *
 * TODO: This is a wrapper for ServicesDemo (type="blog-cms")
 * REFACTORING NEEDED: ServicesDemo.tsx is 2,604 LOC and needs to be split
 *
 * This file serves as a placeholder for the future refactored Blog CMS demo.
 * When refactoring ServicesDemo.tsx, extract all blog-cms-specific logic here.
 *
 * Target: ~800 LOC standalone component
 *
 * Components to extract:
 * - Dashboard with stats and charts
 * - Posts list with search/filter
 * - Rich text editor for post creation
 * - Post edit interface
 * - Category and tag management
 *
 * Use shared components from src/components/demos/:
 * - DemoCard, DemoHeader, DemoButton, DemoSection, DemoTable
 */

"use client";
import React from "react";
import { ServicesDemo } from "./ServicesDemo";

export const BlogCMSDemo: React.FC = () => {
  return <ServicesDemo type="blog-cms" />;
};
