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
import AdbIcon from '@mui/icons-material/Adb';
import HomeIcon from '@mui/icons-material/Home';

interface LabBarProps {}

// PAGES =  'token', 'stake', 'etc'
const pages = ['register', 'mint', 'domains'];
const settings = ['Profile', 'Logout'];

const LabNav: React.FC<LabBarProps> = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/">
            <Typography
              variant="h1"
              noWrap
              component="a"
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
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link href="/">
                <Button sx={{ my: 2, color: 'black', display: 'block' }}>HOME</Button>
              </Link>
              {pages.map((page) => (
                <Link key={page} href={`/${page}`}>
                  <Button sx={{ my: 2, color: 'black', display: 'block' }}>{page}</Button>
                </Link>
              ))}
            </Menu>
          </Box>

          {/* Profile and Logout buttons as links */}
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Link href="/profile">
              <Button color="inherit" sx={{ mr: 2 }}>{settings[0]}</Button>
            </Link>
            <Link href="/logout">
              <Button color="inherit">{settings[1]}</Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default LabNav;
