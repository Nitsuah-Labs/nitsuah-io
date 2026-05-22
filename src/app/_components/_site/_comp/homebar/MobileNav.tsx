"use client";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import React from "react";
import { navStyles, portfolioSub } from "../../homebarConfig";

const MobileNav: React.FC<{ pages: string[] }> = ({ pages }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  return (
    <div>
      <IconButton
        aria-label="open navigation"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        size="large"
        color="inherit"
        sx={{
          color: "var(--color-text-primary)",
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "12px",
          "&:hover": {
            backgroundColor: "var(--color-surface-elevated)",
            borderColor: "var(--color-border-hover)",
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#1a1a1a",
              border: "2px solid #f97316",
              borderRadius: "8px",
            },
          },
        }}
      >
        {pages
          .filter((p) => p !== "projects")
          .map((p) => (
            <MenuItem key={p} onClick={() => setAnchorEl(null)}>
              <Link
                href={`/${p}`}
                style={{
                  textDecoration: "none",
                  color: navStyles.link.color,
                }}
              >
                {p}
              </Link>
            </MenuItem>
          ))}

        {/* Projects label - not clickable, just a divider */}
        <MenuItem
          disabled
          sx={{
            opacity: 0.5,
            color: "#888",
            cursor: "default",
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          projects
        </MenuItem>

        {/* Projects subitems for mobile */}
        {portfolioSub.map((item, index) => {
          // Handle expandable Labs item - show its children instead
          if (item.expandable && item.children) {
            return item.children.map((child, childIndex) => {
              // Special styling for each labs item
              let color = "rgba(168, 85, 247, 0.7)"; // Purple with transparency for sub-items
              let label = child.label.toLowerCase();
              let paddingLeft = "1rem"; // Default indent for sub-items

              // Hub becomes "labs" with test tube emoji at the end
              if (child.label === "Hub") {
                label = "labs 🧪";
                color = "#a855f7"; // Solid purple for main labs
                paddingLeft = "0"; // No indent for labs
              }

              return (
                <MenuItem key={child.href} onClick={() => setAnchorEl(null)}>
                  <Link
                    href={child.href}
                    style={{
                      textDecoration: "none",
                      color: color,
                      paddingLeft: paddingLeft,
                    }}
                  >
                    {label}
                  </Link>
                </MenuItem>
              );
            });
          }

          // Style for Clients, Blogs, crypto
          let color = navStyles.link.color; // Default orange
          let label = item.label;

          if (item.label === "Clients") {
            label = "clients";
            color = "#10b981"; // Green
          } else if (item.label === "Blogs") {
            label = "blogs";
            color = "#3b82f6"; // Blue
          } else if (item.label === "crypto") {
            label = "crypto";
            color = navStyles.link.color as string;
          }

          return (
            <MenuItem
              key={item.href || `portfolio-${index}`}
              onClick={() => setAnchorEl(null)}
            >
              <Link
                href={item.href!}
                style={{
                  textDecoration: "none",
                  color: color,
                  paddingLeft: "1rem",
                }}
              >
                {label}
              </Link>
            </MenuItem>
          );
        })}
        {/* Labs subitems already included above in portfolio expandable */}
      </Menu>
    </div>
  );
};

export default MobileNav;
