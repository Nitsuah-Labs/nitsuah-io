// src/components/_labs/LabNav.tsx
"use client";

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import { useAccount } from "wagmi";
import "../_styles/labs.css";

// Replace empty interface with object type
type LabNavProps = object;

const LAB_PAGES = ["register", "mint", "domains"];
const SUB_PAGES = ["dao", "lookup", "stake", "token", "ai"];
const WIP_PAGES = ["dao", "lookup", "stake", "token", "ai"]; // Work in progress pages
const SETTINGS = ["Profile", "Logout"];

// Replace any with proper Menu props type
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
        backgroundColor: "black", // Set the background color here
      },
    }}
  />
);

const LabNav: React.FC<LabNavProps> = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const { address, isConnected } = useAccount();
  const [copied, setCopied] = React.useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#181818" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/labs/" passHref legacyBehavior>
            <a style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                variant="h1"
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
                }}
              >
                <div className="center">
                  <p className="title">LABS</p>
                </div>
              </Typography>
            </a>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Link href="/">
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  HOME
                </Button>
              </Link>
              {LAB_PAGES.map((page) => (
                <Link key={page} href={`/labs/${page}`}>
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    {page}
                  </Button>
                </Link>
              ))}
              {SUB_PAGES.map((page) => {
                const isWIP = WIP_PAGES.includes(page);
                return (
                  <span
                    key={page}
                    style={{
                      pointerEvents: isWIP ? "none" : "auto",
                      opacity: isWIP ? 0.5 : 1,
                    }}
                  >
                    <Link href={`/labs/${page}`}>
                      <Button
                        sx={{
                          my: 2,
                          color: "white",
                          display: "block",
                          "&:hover": isWIP
                            ? { color: "#ff6b6b", cursor: "not-allowed" }
                            : {},
                        }}
                      >
                        {page} {isWIP && "(WIP)"}
                      </Button>
                    </Link>
                  </span>
                );
              })}
            </StyledMenu>
          </Box>

          {/* Wallet Status Display */}
          {isConnected && address && (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                marginRight: "1rem",
                padding: "0.5rem 1rem",
                background: "rgba(192, 132, 252, 0.1)",
                border: "1px solid rgba(192, 132, 252, 0.3)",
                borderRadius: "6px",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  background: "#10b981",
                  borderRadius: "50%",
                  boxShadow: "0 0 6px rgba(16, 185, 129, 0.6)",
                }}
              />
              <code
                style={{
                  fontSize: "0.9rem",
                  fontFamily: "monospace",
                  color: "#c084fc",
                  cursor: "pointer",
                }}
                onClick={handleCopyAddress}
                title={copied ? "Copied!" : "Click to copy address"}
              >
                {truncateAddress(address)}
              </code>
              {copied && (
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#10b981",
                    fontWeight: 600,
                  }}
                >
                  ✓
                </span>
              )}
            </Box>
          )}

          {/* Profile and Logout buttons as links */}
          <Box sx={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}>
            <Link href="/profile">
              <Button
                color="inherit"
                sx={{
                  background:
                    "linear-gradient(135deg, #c084fc 0%, #a855f7 100%)",
                  color: "#000",
                  fontWeight: 600,
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(168, 85, 247, 0.4)",
                  },
                }}
              >
                {SETTINGS[0]}
              </Button>
            </Link>
            <Link href="/logout">
              <Button
                color="inherit"
                sx={{
                  background:
                    "linear-gradient(135deg, #c084fc 0%, #a855f7 100%)",
                  color: "#000",
                  fontWeight: 600,
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(168, 85, 247, 0.4)",
                  },
                }}
              >
                {SETTINGS[1]}
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default LabNav;
