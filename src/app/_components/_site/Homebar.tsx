// src/components/Homebar.tsx
"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { usePathname } from "next/navigation";
import React from "react";
import "../_styles/global.css";
// Search intentionally removed per UX feedback
import Brand from "./_comp/homebar/Brand";
import DesktopNav from "./_comp/homebar/DesktopNav";
import MobileNav from "./_comp/homebar/MobileNav";
import { navStyles, pages } from "./homebarConfig";

// Replace empty interface with object type
type HomeBarProps = object;

// Extract navigation content to avoid duplication
const NavigationContent: React.FC<{
  showFullName: boolean;
  isHovering: boolean;
  setIsHovering: (value: boolean) => void;
  pathname: string;
}> = ({ showFullName, isHovering, setIsHovering, pathname }) => {
  const [showMobileNav, setShowMobileNav] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Mobile breakpoint constants
    const MOBILE_BREAKPOINT_RATIO = 0.5; // 50% of screen width
    const MOBILE_BREAKPOINT_PX = 900; // Fixed pixel breakpoint

    const checkWidth = () => {
      // Show mobile nav if window width is less than 50% of screen width
      const isNarrow =
        window.innerWidth < window.screen.width * MOBILE_BREAKPOINT_RATIO;
      setShowMobileNav(isNarrow || window.innerWidth < MOBILE_BREAKPOINT_PX); // Also show on actual mobile
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Prevent hydration mismatch by not rendering nav until mounted
  if (!mounted) {
    return (
      <>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Brand
            showFullName={showFullName}
            isHovering={isHovering}
            setIsHovering={setIsHovering}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }} />
      </>
    );
  }

  return (
    <>
      {showMobileNav ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            width: "100%",
            justifyContent: "flex-start",
          }}
        >
          <div style={{ marginLeft: 0 }}>
            <MobileNav pages={pages} />
          </div>
          <div style={{ marginLeft: "0.75rem" }}>
            <Brand
              showFullName={showFullName}
              isHovering={isHovering}
              setIsHovering={setIsHovering}
            />
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Brand
            showFullName={showFullName}
            isHovering={isHovering}
            setIsHovering={setIsHovering}
          />

          <Box sx={{ marginLeft: "1rem" }}>
            <DesktopNav pages={pages} />
          </Box>
        </div>
      )}
    </>
  );
};

const HomeBar: React.FC<HomeBarProps> = () => {
  const pathname = usePathname();
  const [showFullName, setShowFullName] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Auto-animate to Austin H. after 3 seconds in nav
    const timer = setTimeout(() => {
      setShowFullName(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <AppBar
      position="fixed"
      sx={navStyles.appBar}
      component="header"
      role="banner"
    >
      <Container maxWidth="xl" sx={{ px: { xs: 0.5, sm: 2 } }}>
        <Toolbar disableGutters sx={{ pl: { xs: 0, sm: 0 } }}>
          <NavigationContent
            showFullName={showFullName}
            isHovering={isHovering}
            setIsHovering={setIsHovering}
            pathname={pathname}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HomeBar;
