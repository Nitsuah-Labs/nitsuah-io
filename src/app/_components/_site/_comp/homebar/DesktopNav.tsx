"use client";
import Button from "@mui/material/Button";
import Link from "next/link";
import React from "react";
import { navStyles, projectsSub } from "../../homebarConfig";

const DesktopNav: React.FC<{ pages: string[] }> = ({ pages }) => {
  const [projectsOpen, setProjectsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Close when clicking outside or pressing Escape (for projects menu)
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
      {pages
        .filter((p) => p !== "projects" && p !== "labs")
        .map((p) => (
          <Link key={p} href={`/${p}`} style={{ ...(navStyles.link as any) }}>
            <Button
              color="inherit"
              sx={{ color: (navStyles.link as any).color }}
            >
              {p}
            </Button>
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
          }}
          sx={{ color: (navStyles.link as any).color || undefined }}
        >
          Projects
        </Button>

        {projectsOpen && (
          <div
            id="projects-inline"
            role="menu"
            style={navStyles.inlinePopout as any}
          >
            {projectsSub.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  textDecoration: "none",
                  color: (navStyles.link as any).color,
                }}
              >
                <Button
                  color="inherit"
                  sx={{ color: (navStyles.link as any).color }}
                  onClick={() => setProjectsOpen(false)}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        )}

        {/* Labs intentionally omitted from left nav; shown on the right controls */}
      </div>
    </nav>
  );
};

export default DesktopNav;
