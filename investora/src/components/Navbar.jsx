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
import { Link, useLocation } from "react-router-dom";
import investoraLogo from "../assets/logo.png";

const pages = [
  { label: "Ana Sayfa", path: "/" },
  { label: "Hisseler", path: "/stocks" },
  { label: "Favoriler", path: "/favorites" },
  { label: "Dönüştürücü", path: "/convert" },
  { label: "Hakkında", path: "/about" },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 70,
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 40px)",
        maxWidth: "1200px",
        zIndex: 999,
        borderRadius: "30px",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        backdropFilter: "blur(20px)",
        backgroundColor: "transparent",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          background: "transparent",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 3,
            py: 1,
            minHeight: "50px !important",
          }}
        >
          {/* Logo ve Brand */}
          {/* Logo */}
          <Box
            sx={{
              height: 50,
              width: 55,
              borderRadius: 1,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "8px", // Üstten mesafe
              marginBottom: "4px", // Alttan az mesafe
            }}
          >
            <Box
              component="img"
              src={investoraLogo}
              alt="Logo"
              sx={{
                height: 70,
                width: 75,
                objectFit: "cover",
                objectPosition: "center center", // Tam ortalama
                transform: "scale(1.5) translateY(3px)", // Zoom + yukarı kaydır
                borderRadius: 1,
              }}
            />
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu aç"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#fff" }}
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
                "& .MuiPaper-root": {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "12px",
                  mt: 1,
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.path}
                  sx={{
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  {page.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Menu Buttons */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                component={Link}
                to={page.path}
                sx={{
                  textTransform: "none",
                  fontWeight: "500",
                  fontSize: "0.95rem",
                  color:
                    location.pathname === page.path
                      ? "#fff"
                      : "rgba(255,255,255,0.7)",
                  px: 2,
                  py: 1,
                  borderRadius: "10px",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                  ...(location.pathname === page.path && {
                    backgroundColor: "rgba(255,255,255,0.15)",
                  }),
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
