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
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            backgroundColor: "#1a1a1a",
            border: "2px solid #f97316",
            borderRadius: "8px",
          },
        }}
      >
        {pages
          .filter((p) => p !== "portfolio") // Remove portfolio from main list
          .map((p) => (
            <MenuItem key={p} onClick={() => setAnchorEl(null)}>
              <Link
                href={`/${p}`}
                style={{
                  textDecoration: "none",
                  color: (navStyles.link as any).color,
                }}
              >
                {p}
              </Link>
            </MenuItem>
          ))}

        {/* Portfolio label - not clickable, just a divider */}
        <MenuItem
          disabled
          sx={{
            opacity: 0.5,
            color: "#888",
            cursor: "default",
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          portfolio
        </MenuItem>

        {/* Portfolio subitems for mobile */}
        {portfolioSub.map((item, index) => {
          // Handle expandable Labs item - show its children instead
          if ((item as any).expandable && (item as any).children) {
            return (item as any).children.map(
              (child: any, childIndex: number) => {
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
              },
            );
          }

          // Style for Projects, Clients, Blogs
          let color = (navStyles.link as any).color; // Default orange
          let label = item.label;

          if (item.label === "Projects") {
            label = "projects"; // Keep orange
          } else if (item.label === "Clients") {
            label = "clients";
            color = "#10b981"; // Green
          } else if (item.label === "Blogs") {
            label = "blogs";
            color = "#3b82f6"; // Blue
          }

          return (
            <MenuItem
              key={(item as any).href || `portfolio-${index}`}
              onClick={() => setAnchorEl(null)}
            >
              <Link
                href={(item as any).href}
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
