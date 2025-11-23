// Services Demo - Restaurant & Blog CMS
"use client";
import React from "react";
import { BlogCMSDemo } from "./BlogCMSDemo";
import { RestaurantDemo } from "./RestaurantDemo";

interface ServicesDemoProps {
  type?: "restaurant" | "blog-cms";
}

export const ServicesDemo: React.FC<ServicesDemoProps> = ({
  type = "restaurant",
}) => {
  if (type === "blog-cms") {
    return <BlogCMSDemo />;
  }

  return <RestaurantDemo />;
};
