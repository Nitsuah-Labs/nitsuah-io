/**
 * RestaurantDemo.tsx
 *
 * TODO: This is a wrapper for ServicesDemo (type="restaurant")
 * REFACTORING NEEDED: ServicesDemo.tsx is 2,604 LOC and needs to be split
 *
 * This file serves as a placeholder for the future refactored Restaurant demo.
 * When refactoring ServicesDemo.tsx, extract all restaurant-specific logic here.
 *
 * Target: ~800 LOC standalone component
 *
 * Components to extract:
 * - Menu display and filtering
 * - Reservation booking system
 * - Pickup order system
 * - Restaurant homepage
 * - Photo gallery
 *
 * Use shared components from src/components/demos/:
 * - DemoCard, DemoHeader, DemoButton, DemoSection, DemoTable
 */

"use client";
import React from "react";
import { ServicesDemo } from "./ServicesDemo";

export const RestaurantDemo: React.FC = () => {
  return <ServicesDemo type="restaurant" />;
};
