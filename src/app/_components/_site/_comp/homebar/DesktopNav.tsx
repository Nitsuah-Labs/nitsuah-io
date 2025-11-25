"use client";
import Button from "@mui/material/Button";
import Link from "next/link";
import React from "react";
import { labsSub, navStyles, projectsSub } from "../../homebarConfig";

const DesktopNav: React.FC<{ pages: string[] }> = ({ pages }) => {
  const [projectsOpen, setProjectsOpen] = React.useState(false);
  const [labsOpen, setLabsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Close when clicking outside or pressing Escape (for either menu)
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        (projectsOpen || labsOpen) &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setProjectsOpen(false);
        setLabsOpen(false);
      }
    }

    function handleKey(e: KeyboardEvent) {
      if ((projectsOpen || labsOpen) && e.key === "Escape") {
        setProjectsOpen(false);
        setLabsOpen(false);
      }
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [projectsOpen, labsOpen]);

  return (
    <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      {pages
        .filter((p) => p !== "projects" && p !== "labs")
        .map((p) => (
          <Link key={p} href={`/${p}`} style={navStyles.link as any}>
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
          onClick={() => {
            setProjectsOpen((s) => !s);
            setLabsOpen(false);
          }}
        >
          Projects
        </Button>

        {projectsOpen && (
          <div
            id="projects-inline"
            role="menu"
            style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
          >
            {projectsSub.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ textDecoration: "none" }}
              >
                <Button color="inherit" onClick={() => setProjectsOpen(false)}>
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        )}

        {/* Labs inline toggle */}
        <Button
          color="inherit"
          aria-expanded={labsOpen}
          aria-controls="labs-inline"
          onClick={() => {
            setLabsOpen((s) => !s);
            setProjectsOpen(false);
          }}
        >
          Labs
        </Button>

        {labsOpen && (
          <div
            id="labs-inline"
            role="menu"
            style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
          >
            {labsSub.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ textDecoration: "none" }}
              >
                <Button color="inherit" onClick={() => setLabsOpen(false)}>
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default DesktopNav;
