import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import investoraLogo from "../assets/logo.png";

const pages = [
  { label: "Dashboard", path: "/" },
  { label: "Hisseler", path: "/stocks" },
  { label: "Favoriler", path: "/favorites" },
  { label: "Dönüştürücü", path: "/convert" },
  { label: "Hakkında", path: "/about" },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#0A1F44" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo büyük ekranlarda göster */}
        <Box
          component="img"
          src={investoraLogo}
          alt="Investora Logo"
          sx={{
            height: 65,
            width: 70,
            display: { xs: "none", sm: "block" },
          }}
        />

        {/* Hamburger Menü İkonu - Küçük ekran */}
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <IconButton
            size="large"
            aria-label="menu aç"
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
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", sm: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.label}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page.path}
              >
                {page.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Menü Butonları - Büyük ekran */}
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page.label}
              component={Link}
              to={page.path}
              color="inherit"
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              {page.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
