// Lab Sub-Navigation - Horizontal nav for lab pages
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LAB_PAGES = [
  { href: "/labs/register", label: "Register" },
  { href: "/labs/mint", label: "Mint" },
  { href: "/labs/domains", label: "Domains" },
  { href: "/labs/lookup", label: "Lookup" },
  { href: "/labs/stake", label: "Stake" },
  { href: "/labs/token", label: "Token" },
  { href: "/labs/dao", label: "DAO" },
  { href: "/labs/ai", label: "AI" },
];

const LabSubNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "0.75rem 1rem",
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        flexWrap: "wrap",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {LAB_PAGES.map((page) => (
        <Link
          key={page.href}
          href={page.href}
          style={{
            color: pathname === page.href ? "#fff" : "rgba(255, 255, 255, 0.7)",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            background:
              pathname === page.href ? "rgba(117, 6, 145, 0.3)" : "transparent",
            border:
              pathname === page.href
                ? "1px solid rgba(117, 6, 145, 0.5)"
                : "1px solid transparent",
            transition: "all 0.2s ease",
            fontSize: "0.9rem",
            fontWeight: pathname === page.href ? 600 : 400,
          }}
          onMouseEnter={(e) => {
            if (pathname !== page.href) {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            }
          }}
          onMouseLeave={(e) => {
            if (pathname !== page.href) {
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          {page.label}
        </Link>
      ))}
    </nav>
  );
};

export default LabSubNav;
