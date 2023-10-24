// src/components/Homebar.tsx
'use client'

import React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import '../_styles/global.css';

interface HomeBarProps {}

const pages = ['about', 'crypto', 'projects', 'labs'];
const settings = ['Profile', 'Logout'];

const HomeBar: React.FC<HomeBarProps> = () => {
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
                color: 'blue'
              }}
            >
              <Link href="/">
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>HOME</Button>
              </Link>
              {pages.map((page) => (
                <Link key={page} href={`/${page}`}>
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>{page}</Button>
                </Link>
              ))}
            </Menu>
          </Box>

          {/* Profile and Logout buttons as links */}
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Link href="/profile">
              <Button color="inherit" sx={{ mr: 2, color: 'white' }}>{settings[0]}</Button>
            </Link>
            <Link href="/logout">
              <Button color="inherit" sx={{ color: 'white' }}>{settings[1]}</Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HomeBar;
