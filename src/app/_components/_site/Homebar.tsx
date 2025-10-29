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
        backgroundColor: "darkgrey",
      },
    }}
  />
);

const pages = ["about", "resume", "crypto", "projects", "labs"];

const HomeBar: React.FC<HomeBarProps> = () => {
  const pathname = usePathname();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [showAltName, setShowAltName] = React.useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogoClick = () => {
    setShowAltName((prev) => !prev);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "rgba(24, 24, 24, 0.9)" }}
      component="header"
      role="banner"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" legacyBehavior>
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              aria-label="Nitsuah home"
              onClick={(e) => {
                e.preventDefault();
                handleLogoClick();
              }}
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
                  color: "inherit",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "opacity 0.3s ease",
                }}
              >
                <div className="center">
                  <p
                    className="title"
                    style={{
                      transition: "opacity 0.3s ease, transform 0.3s ease",
                      opacity: showAltName ? 0 : 1,
                      transform: showAltName
                        ? "translateY(-10px)"
                        : "translateY(0)",
                      position: showAltName ? "absolute" : "relative",
                    }}
                  >
                    NITSUAH
                  </p>
                  <p
                    className="title"
                    style={{
                      transition: "opacity 0.3s ease, transform 0.3s ease",
                      opacity: showAltName ? 1 : 0,
                      transform: showAltName
                        ? "translateY(0)"
                        : "translateY(10px)",
                      position: showAltName ? "relative" : "absolute",
                    }}
                  >
                    AUSTIN H.
                  </p>
                </div>
              </Typography>
            </a>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
            <StyledMenu
              id="menu-appbar"
              anchorEl={anchorElNav}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <Link href="/" legacyBehavior>
                <a
                  aria-label="Navigate to home"
                  aria-current={pathname === "/" ? "page" : undefined}
                  style={{
                    color: "white",
                    display: "block",
                    padding: "12px 16px",
                    backgroundColor:
                      pathname === "/"
                        ? "rgba(249, 115, 22, 0.2)"
                        : "transparent",
                  }}
                >
                  HOME
                </a>
              </Link>
              {pages.map((page) => {
                const isActive = pathname === `/${page}`;
                return (
                  <Link key={page} href={`/${page}`} legacyBehavior>
                    <a
                      aria-label={`Navigate to ${page}`}
                      aria-current={isActive ? "page" : undefined}
                      style={{
                        color: "white",
                        display: "block",
                        padding: "12px 16px",
                        textTransform: "none",
                        backgroundColor: isActive
                          ? "rgba(249, 115, 22, 0.2)"
                          : "transparent",
                      }}
                    >
                      {page}
                    </a>
                  </Link>
                );
              })}
            </StyledMenu>
          </Box>

          {/* Desktop navigation (md and up) */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              const isActive = pathname === `/${page}`;
              return (
                <Link key={page} href={`/${page}`} legacyBehavior>
                  <a
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
                  </a>
                </Link>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HomeBar;
