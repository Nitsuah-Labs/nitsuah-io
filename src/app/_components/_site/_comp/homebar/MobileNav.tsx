"use client";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import React from "react";

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
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {pages.map((p) => (
          <MenuItem key={p} onClick={() => setAnchorEl(null)}>
            <Link
              href={`/${p}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {p}
            </Link>
          </MenuItem>
        ))}
        {/* Projects subitems for mobile */}
        <MenuItem onClick={() => setAnchorEl(null)}>
          <Link
            href="/projects"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            All Projects
          </Link>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <Link
            href="/projects/clients"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Clients
          </Link>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <Link
            href="/projects/blogs"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Blogs
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MobileNav;
