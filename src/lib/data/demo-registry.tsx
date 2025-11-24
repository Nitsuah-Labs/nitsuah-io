// src/lib/data/demo-registry.tsx
import { AppointmentDemo } from "@/app/projects/clients/_comp/AppointmentDemo";
import { BlogCMSDemo } from "@/app/projects/clients/_comp/BlogCMSDemo";
import { CRMDemo } from "@/app/projects/clients/_comp/CRMDemo";
import { NFTDemo } from "@/app/projects/clients/_comp/NFTDemo";
import { PortfolioDemo } from "@/app/projects/clients/_comp/PortfolioDemo";
import { RealEstateDemo } from "@/app/projects/clients/_comp/RealEstateDemo";
import { RestaurantDemo } from "@/app/projects/clients/_comp/RestaurantDemo";
import { ResumeSiteDemo } from "@/app/projects/clients/_comp/ResumeSiteDemo";
import { SaaSDemo } from "@/app/projects/clients/_comp/SaaSDemo";
import { StorefrontDemo } from "@/app/projects/clients/_comp/StorefrontDemo";
import React from "react";

export const demoRegistry: Record<string, React.ReactNode> = {
  "nft-mint": <NFTDemo initialView="mint" />,
  marketplace: <NFTDemo />,
  storefront: <StorefrontDemo />,
  dashboard: <SaaSDemo />,
  crm: <CRMDemo />,
  portfolio: <PortfolioDemo />,
  "resume-site": <ResumeSiteDemo />,
  realestate: <RealEstateDemo />,
  restaurant: <RestaurantDemo />,
  "blog-cms": <BlogCMSDemo />,
  booking: <AppointmentDemo />,
};

export const getDemo = (projectId: string): React.ReactNode => {
  return (
    demoRegistry[projectId] || (
      <div
        style={{
          textAlign: "center",
          padding: "3rem",
          color: "rgba(255, 255, 255, 0.7)",
        }}
      >
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🚧</div>
        <p>Demo coming soon...</p>
      </div>
    )
  );
};
