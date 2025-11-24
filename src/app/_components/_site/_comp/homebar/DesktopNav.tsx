"use client";
import Button from "@mui/material/Button";
import Link from "next/link";
import React from "react";

const DesktopNav: React.FC<{ pages: string[] }> = ({ pages }) => {
  const [projectsOpen, setProjectsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Close when clicking outside
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        projectsOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setProjectsOpen(false);
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (projectsOpen && e.key === "Escape") {
        setProjectsOpen(false);
      }
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [projectsOpen]);

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
      <div
        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        ref={containerRef}
      >
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
              <Button color="inherit" onClick={() => setProjectsOpen(false)}>
                All Projects
              </Button>
            </Link>
            <Link href="/projects/clients" style={{ textDecoration: "none" }}>
              <Button color="inherit" onClick={() => setProjectsOpen(false)}>
                Clients
              </Button>
            </Link>
            <Link href="/projects/blogs" style={{ textDecoration: "none" }}>
              <Button color="inherit" onClick={() => setProjectsOpen(false)}>
                Blogs
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DesktopNav;
