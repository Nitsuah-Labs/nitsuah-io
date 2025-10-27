// src/components/_labs/LabNav.tsx
'use client'

import React from 'react';
import Link from 'next/link';
import "../_styles/labs.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Replace empty interface with object type
type LabNavProps = object;

const LAB_PAGES = ['register', 'mint', 'domains'];
const SUB_PAGES = ['dao', 'lookup', 'stake', 'token', 'ai'];
const SETTINGS = ['Profile', 'Logout'];

// Replace any with proper Menu props type
const StyledMenu = (props: React.ComponentProps<typeof Menu>) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
    sx={{
      '& .MuiPaper-root': {
        backgroundColor: 'black', // Set the background color here
      },
    }}
  />
);

const LabNav: React.FC<LabNavProps> = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'red' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/labs/" passHref legacyBehavior>
            <a style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography
                variant="h1"
                noWrap
                component="span"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <div className="center">
                  <p className="title">NITSUAH</p>
                </div>
              </Typography>
            </a>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link href="/">
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>HOME</Button>
              </Link>
              {LAB_PAGES.map((page) => (
                <Link key={page} href={`/labs/${page}`}>
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>{page}</Button>
                </Link>
              ))}
              {SUB_PAGES.map((page) => (
                <Link key={page} href={`/labs/${page}`}>
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>{page}</Button>
                </Link>
              ))}
            </StyledMenu>
          </Box>

          {/* Profile and Logout buttons as links */}
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Link href="/profile">
              <Button color="inherit" sx={{ mr: 2, color: 'white' }}>{SETTINGS[0]}</Button>
            </Link>
            <Link href="/logout">
              <Button color="inherit" >{SETTINGS[1]}</Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default LabNav;