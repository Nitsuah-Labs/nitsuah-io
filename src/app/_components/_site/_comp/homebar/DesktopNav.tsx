"use client";
import Button from "@mui/material/Button";
import Link from "next/link";
import React from "react";

const DesktopNav: React.FC<{ pages: string[] }> = ({ pages }) => {
  const [projectsOpen, setProjectsOpen] = React.useState(false);

  return (
    <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      {pages.map((p) => (
        <Link
          key={p}
          href={`/${p}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button color="inherit">{p}</Button>
        </Link>
      ))}

      {/* Projects inline toggle - expands sublinks inside the same nav bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Button
          color="inherit"
          aria-expanded={projectsOpen}
          aria-controls="projects-inline"
          onClick={() => setProjectsOpen((s) => !s)}
        >
          Projects
        </Button>

        {projectsOpen && (
          <div
            id="projects-inline"
            role="menu"
            style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
          >
            <Link href="/projects" style={{ textDecoration: "none" }}>
              <Button color="inherit">All Projects</Button>
            </Link>
            <Link href="/projects/clients" style={{ textDecoration: "none" }}>
              <Button color="inherit">Clients</Button>
            </Link>
            <Link href="/projects/blogs" style={{ textDecoration: "none" }}>
              <Button color="inherit">Blogs</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DesktopNav;
