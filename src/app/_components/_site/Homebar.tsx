// src/components/Homebar.tsx
"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { usePathname } from "next/navigation";
import React from "react";
import "../_styles/global.css";
import GitHubButton from "./GitHubButton";
// Search intentionally removed per UX feedback
import ThemeToggle from "./ThemeToggle";
import Brand from "./_comp/homebar/Brand";
import DesktopNav from "./_comp/homebar/DesktopNav";
import ExportPDF from "./_comp/homebar/ExportPDF";
import MobileNav from "./_comp/homebar/MobileNav";
import { navStyles, pages } from "./homebarConfig";

// Replace empty interface with object type
type HomeBarProps = object;

const HomeBar: React.FC<HomeBarProps> = () => {
  const pathname = usePathname();
  const [showFullName, setShowFullName] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);

  React.useEffect(() => {
    // Auto-animate to Austin H. after 3 seconds in nav
    const timer = setTimeout(() => {
      setShowFullName(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={navStyles.appBar}
      component="header"
      role="banner"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Brand
              showFullName={showFullName}
              isHovering={isHovering}
              setIsHovering={setIsHovering}
            />

            <Box
              sx={{ display: { xs: "none", md: "flex" }, marginLeft: "1rem" }}
              className="desktopOnly"
            >
              <DesktopNav pages={pages} />
            </Box>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <ThemeToggle />
            <ExportPDF visible={pathname === "/resume"} />
            <GitHubButton />
            <div className="mobileOnly">
              <MobileNav pages={pages} />
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HomeBar;
