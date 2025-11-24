"use client";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import React from "react";

const DesktopNav: React.FC<{ pages: string[] }> = ({ pages }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      {pages.map((p) => (
        <Link
          key={p}
          href={`/${p}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button color="inherit">{p}</Button>
        </Link>
      ))}

      <div>
        <Button color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
          Projects
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
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
    </div>
  );
};

export default DesktopNav;
