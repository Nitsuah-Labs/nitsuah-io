// src/components/Homebar.tsx
"use client";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import "../_styles/global.css";

// Replace empty interface with object type
type HomeBarProps = object;

const StyledMenu = (props: React.ComponentProps<typeof Menu>) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
    sx={{
      "& .MuiPaper-root": {
        backgroundColor: "#1a1a1a",
        border: "2px solid #f97316",
        borderRadius: "8px",
      },
    }}
  />
);

const pages = ["about", "resume", "crypto", "projects"];

const HomeBar: React.FC<HomeBarProps> = () => {
  const pathname = usePathname();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [showFullName, setShowFullName] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);

  React.useEffect(() => {
    // Auto-animate to Austin H. after 3 seconds in nav
    const timer = setTimeout(() => {
      setShowFullName(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "rgba(24, 24, 24, 0.9)", zIndex: 1000 }}
      component="header"
      role="banner"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            href="/"
            style={{ textDecoration: "none", color: "inherit" }}
            aria-label="Austin H home - Navigate to homepage"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Typography
              variant="h6"
              noWrap
              component="span"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#f97316",
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                textShadow: "0 2px 10px rgba(249, 115, 22, 0.5)",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              {showFullName || isHovering ? "AUSTIN H." : "NITSUAH"}
            </Typography>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "#f97316",
                marginLeft: "16px",
                transition: "all 0.3s ease",
              }}
              aria-label="Austin H home - Navigate to homepage"
            >
              <Typography
                variant="h6"
                noWrap
                component="span"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "#f97316",
                  textDecoration: "none",
                  cursor: "pointer",
                  textShadow: "0 2px 10px rgba(249, 115, 22, 0.5)",
                }}
              >
                AUSTIN H.
              </Typography>
            </Link>
            <StyledMenu
              id="menu-appbar"
              anchorEl={anchorElNav}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <Link
                href="/"
                aria-label="Navigate to home"
                aria-current={pathname === "/" ? "page" : undefined}
                style={{
                  color: pathname === "/" ? "#f97316" : "#fff",
                  display: "block",
                  padding: "12px 16px",
                  backgroundColor:
                    pathname === "/"
                      ? "rgba(249, 115, 22, 0.2)"
                      : "transparent",
                  fontWeight: pathname === "/" ? 600 : 400,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#f97316";
                  e.currentTarget.style.backgroundColor =
                    "rgba(249, 115, 22, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    pathname === "/" ? "#f97316" : "#fff";
                  e.currentTarget.style.backgroundColor =
                    pathname === "/"
                      ? "rgba(249, 115, 22, 0.2)"
                      : "transparent";
                }}
              >
                HOME
              </Link>
              {pages.flatMap((page) => {
                const isActive = pathname === `/${page}`;
                const isProjectsActive =
                  pathname.startsWith("/projects") ||
                  pathname.startsWith("/labs");
                const items = [
                  <Link
                    key={page}
                    href={`/${page}`}
                    aria-label={`Navigate to ${page}`}
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      color: isActive ? "#f97316" : "#fff",
                      display: "block",
                      padding: "12px 16px",
                      textTransform: "none",
                      backgroundColor: isActive
                        ? "rgba(249, 115, 22, 0.2)"
                        : "transparent",
                      fontWeight: isActive ? 600 : 400,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#f97316";
                      e.currentTarget.style.backgroundColor =
                        "rgba(249, 115, 22, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = isActive
                        ? "#f97316"
                        : "#fff";
                      e.currentTarget.style.backgroundColor = isActive
                        ? "rgba(249, 115, 22, 0.2)"
                        : "transparent";
                    }}
                  >
                    {page}
                  </Link>,
                ];
                if (page === "projects" && isProjectsActive) {
                  items.push(
                    <Link
                      key="projects-blogs"
                      href="/projects/blogs"
                      aria-label="Navigate to blogs"
                      style={{
                        color:
                          pathname === "/projects/blogs"
                            ? "#f97316"
                            : "rgba(255, 255, 255, 0.8)",
                        display: "block",
                        padding: "8px 16px 8px 32px",
                        fontSize: "0.9rem",
                        backgroundColor:
                          pathname === "/projects/blogs"
                            ? "rgba(249, 115, 22, 0.15)"
                            : "transparent",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#f97316";
                        e.currentTarget.style.backgroundColor =
                          "rgba(249, 115, 22, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color =
                          pathname === "/projects/blogs"
                            ? "#f97316"
                            : "rgba(255, 255, 255, 0.8)";
                        e.currentTarget.style.backgroundColor =
                          pathname === "/projects/blogs"
                            ? "rgba(249, 115, 22, 0.15)"
                            : "transparent";
                      }}
                    >
                      → blogs
                    </Link>,
                    <Link
                      key="projects-clients"
                      href="/projects/clients"
                      aria-label="Navigate to clients"
                      style={{
                        color:
                          pathname === "/projects/clients"
                            ? "#f97316"
                            : "rgba(255, 255, 255, 0.8)",
                        display: "block",
                        padding: "8px 16px 8px 32px",
                        fontSize: "0.9rem",
                        backgroundColor:
                          pathname === "/projects/clients"
                            ? "rgba(249, 115, 22, 0.15)"
                            : "transparent",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#f97316";
                        e.currentTarget.style.backgroundColor =
                          "rgba(249, 115, 22, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color =
                          pathname === "/projects/clients"
                            ? "#f97316"
                            : "rgba(255, 255, 255, 0.8)";
                        e.currentTarget.style.backgroundColor =
                          pathname === "/projects/clients"
                            ? "rgba(249, 115, 22, 0.15)"
                            : "transparent";
                      }}
                    >
                      → clients
                    </Link>,
                    <Link
                      key="projects-labs"
                      href="/labs"
                      aria-label="Navigate to labs"
                      style={{
                        color: pathname.startsWith("/labs")
                          ? "#f97316"
                          : "rgba(255, 255, 255, 0.8)",
                        display: "block",
                        padding: "8px 16px 8px 32px",
                        fontSize: "0.9rem",
                        backgroundColor: pathname.startsWith("/labs")
                          ? "rgba(249, 115, 22, 0.15)"
                          : "transparent",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#f97316";
                        e.currentTarget.style.backgroundColor =
                          "rgba(249, 115, 22, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = pathname.startsWith(
                          "/labs",
                        )
                          ? "#f97316"
                          : "rgba(255, 255, 255, 0.8)";
                        e.currentTarget.style.backgroundColor =
                          pathname.startsWith("/labs")
                            ? "rgba(249, 115, 22, 0.15)"
                            : "transparent";
                      }}
                    >
                      → labs
                    </Link>,
                  );
                }
                return items;
              })}
            </StyledMenu>
          </Box>

          {/* Desktop navigation (md and up) */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              const isActive = pathname === `/${page}`;
              const isProjectsActive =
                pathname.startsWith("/projects") ||
                pathname.startsWith("/labs");
              return (
                <React.Fragment key={page}>
                  <Link
                    href={`/${page}`}
                    aria-label={`Navigate to ${page}`}
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      color: "white",
                      margin: "0 12px",
                      textDecoration: "none",
                      textTransform: "none",
                      borderBottom: isActive
                        ? "2px solid #f97316"
                        : "2px solid transparent",
                      paddingBottom: "4px",
                      transition: "border-color 0.2s ease",
                    }}
                  >
                    {page}
                  </Link>
                  {page === "projects" && isProjectsActive && (
                    <>
                      <Link
                        href="/projects/blogs"
                        aria-label="Navigate to blogs"
                        style={{
                          color:
                            pathname === "/projects/blogs"
                              ? "#f97316"
                              : "rgba(255, 255, 255, 0.7)",
                          margin: "0 8px",
                          textDecoration: "none",
                          textTransform: "none",
                          fontSize: "0.9rem",
                          borderBottom:
                            pathname === "/projects/blogs"
                              ? "2px solid #f97316"
                              : "2px solid transparent",
                          paddingBottom: "4px",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#f97316";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color =
                            pathname === "/projects/blogs"
                              ? "#f97316"
                              : "rgba(255, 255, 255, 0.7)";
                        }}
                      >
                        blogs
                      </Link>
                      <Link
                        href="/projects/clients"
                        aria-label="Navigate to clients"
                        style={{
                          color:
                            pathname === "/projects/clients"
                              ? "#f97316"
                              : "rgba(255, 255, 255, 0.7)",
                          margin: "0 8px",
                          textDecoration: "none",
                          textTransform: "none",
                          fontSize: "0.9rem",
                          borderBottom:
                            pathname === "/projects/clients"
                              ? "2px solid #f97316"
                              : "2px solid transparent",
                          paddingBottom: "4px",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#f97316";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color =
                            pathname === "/projects/clients"
                              ? "#f97316"
                              : "rgba(255, 255, 255, 0.7)";
                        }}
                      >
                        clients
                      </Link>
                      <Link
                        href="/labs"
                        aria-label="Navigate to labs"
                        style={{
                          color: pathname.startsWith("/labs")
                            ? "#f97316"
                            : "rgba(255, 255, 255, 0.7)",
                          margin: "0 8px",
                          textDecoration: "none",
                          textTransform: "none",
                          fontSize: "0.9rem",
                          borderBottom: pathname.startsWith("/labs")
                            ? "2px solid #f97316"
                            : "2px solid transparent",
                          paddingBottom: "4px",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#f97316";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = pathname.startsWith(
                            "/labs",
                          )
                            ? "#f97316"
                            : "rgba(255, 255, 255, 0.7)";
                        }}
                      >
                        labs
                      </Link>
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </Box>

          {/* Export PDF button - visible on all screens on resume page */}
          {pathname === "/resume" && (
            <Box sx={{ display: "block", position: "relative", zIndex: 9999 }}>
              <button
                onClick={() => window.print()}
                aria-label="Print resume or save as PDF"
                className="export-pdf-button"
                style={{
                  background:
                    "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  color: "#1a1a1a",
                  border: "2px solid #000",
                  padding: "0.5rem",
                  fontSize: "0.9rem",
                  fontWeight: "700",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(249, 115, 22, 0.3)",
                  minWidth: "auto",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(249, 115, 22, 0.4)";
                  e.currentTarget.style.padding = "0.5rem 1rem";
                  const textSpan = e.currentTarget.querySelector(
                    ".pdf-text",
                  ) as HTMLElement;
                  if (textSpan) {
                    textSpan.style.maxWidth = "150px";
                    textSpan.style.marginLeft = "0.5rem";
                    textSpan.style.opacity = "1";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(249, 115, 22, 0.3)";
                  e.currentTarget.style.padding = "0.5rem";
                  const textSpan = e.currentTarget.querySelector(
                    ".pdf-text",
                  ) as HTMLElement;
                  if (textSpan) {
                    textSpan.style.maxWidth = "0";
                    textSpan.style.marginLeft = "0";
                    textSpan.style.opacity = "0";
                  }
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>💾</span>
                <span
                  className="pdf-text"
                  style={{
                    maxWidth: 0,
                    overflow: "hidden",
                    opacity: 0,
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  Export PDF
                </span>
              </button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HomeBar;
