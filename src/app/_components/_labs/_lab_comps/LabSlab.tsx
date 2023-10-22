import * as React from 'react';
import "../_components/_styles/labs.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import WalletPanel from "./OldWallet";

// PAGES =  'token', 'stake',
const pages = ['register','mint','domains'];

const Labslab = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar style={{ background: '#d60000' }} position="static">
      <Container maxWidth="x2">
        <Toolbar disableGutters>
        <div className="eth-wallet" >
                <IconButton
                    component="a"
                    href="/"
                >
                    <HomeIcon color="primary" sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} size="large"/>
                </IconButton>
            </div>
        <IconButton
            component="a"
            href="/labs"
          >
        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} size="large"/>
        </IconButton>
        <Typography
            variant="h1"
            noWrap
            component="a"
            href="/labs"
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
              <p className="title">LABS</p>
        </div>
          </Typography> 
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
              {pages.map((page) => (
              <Button
                key={page}
                href={`/labs/${page}`}
                onClick={handleCloseNavMenu}
              >
                {page}
              </Button>
            ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                href={`/labs/${page}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Labslab;
