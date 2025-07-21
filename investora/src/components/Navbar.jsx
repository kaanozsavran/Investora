import React from "react";
import {
  AppBar,
  Toolbar,
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
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "rgba(10, 31, 68, 0.8)",
        backdropFilter: "blur(10px)",
        marginTop: "10px",
        borderRadius: "12px", // sadece alt köşeleri yuvarla
        paddingX: 2,
        paddingY: 1,
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        overflow: "hidden",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo büyük ekranlarda göster */}
        <Box
          component="img"
          src={investoraLogo}
          alt="Investora Logo"
          sx={{
            height: 60,
            width: 65,
            display: { xs: "none", sm: "block" },
            borderRadius: 1,
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
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                mx: 1,
              }}
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
