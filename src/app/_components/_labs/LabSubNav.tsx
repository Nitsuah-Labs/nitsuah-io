// Lab Sub-Navigation - Horizontal nav for lab pages
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LAB_PAGES = [
  { href: "/labs", label: "Labs Home" },
  { href: "/labs/register", label: "Register" },
  { href: "/labs/mint", label: "Mint NFT" },
  { href: "/labs/domains", label: "Domains" },
  { href: "/labs/lookup", label: "Lookup", isWIP: true },
  { href: "/labs/stake", label: "Stake", isWIP: true },
  { href: "/labs/token", label: "Token", isWIP: true },
  { href: "/labs/dao", label: "DAO", isWIP: true },
  { href: "/labs/ai", label: "AI", isWIP: true },
];

const LabSubNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Lab pages navigation"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "0.75rem 1rem",
        display: "flex",
        gap: "0.75rem",
        justifyContent: "center",
        flexWrap: "wrap",
        position: "sticky",
        top: "64px",
        zIndex: 50,
        backdropFilter: "blur(10px)",
      }}
    >
      {LAB_PAGES.map((page) => {
        const isActive = pathname === page.href;
        return (
          <Link
            key={page.href}
            href={page.href}
            aria-current={isActive ? "page" : undefined}
            style={{
              color: isActive ? "#f97316" : "rgba(255, 255, 255, 0.7)",
              textDecoration: "none",
              padding: "0.5rem 0.875rem",
              borderRadius: "6px",
              background: isActive ? "rgba(249, 115, 22, 0.15)" : "transparent",
              border: isActive
                ? "1px solid rgba(249, 115, 22, 0.4)"
                : "1px solid transparent",
              transition: "all 0.2s ease",
              fontSize: "0.875rem",
              fontWeight: isActive ? 600 : 400,
              position: "relative",
              opacity: page.isWIP ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.color = "#fff";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
              }
            }}
            title={page.isWIP ? `${page.label} (Work in Progress)` : page.label}
          >
            {page.label}
            {page.isWIP && (
              <span
                style={{
                  fontSize: "0.65rem",
                  marginLeft: "0.25rem",
                  opacity: 0.6,
                }}
              >
                WIP
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default LabSubNav;
