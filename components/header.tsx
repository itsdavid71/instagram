import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../app/firebaseApp";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { signOut } from "firebase/auth";
import { LinkedCamera } from "@mui/icons-material";

type Setting = {
  key: string;
  text: string;
  href?: string;
  onClick?: () => void;
};
const pages = [
  { href: "/posts/", text: "Лента" },
  { href: "/posts/create/", text: "Создать публикацию" },
];
const settings = [
  { key: "profile", href: "/auth/profile", text: "Профиль" },
  { key: "logout", text: "Выйти", onClick: () => signOut(auth) },
];

const ResponsiveAppBar = () => {
  const [user] = useAuthState(auth);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting: Setting) => {
    setAnchorElUser(null);
    if (typeof setting?.onClick === "function") {
      setting.onClick();
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalSeeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link href="/">
            <Typography
              variant="h6"
              noWrap
              component="a"
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
              Nordic
            </Typography>
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
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.href} onClick={handleCloseNavMenu}>
                  <Link href={page.href}>
                    <Typography textAlign="center">{page.text}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LocalSeeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Nordic
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link key={page.href} href={page.href}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.text}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!user && <Link href="/auth/login/">Войти</Link>}
            {user && (
              <Tooltip title="Открыть настройки">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  color="inherit"
                >
                  <small>{user.email}</small>
                  <AccountCircle sx={{ ml: 2 }} />
                </IconButton>
              </Tooltip>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.key}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  {setting.href ? (
                    <Link href={setting.href}>
                      <Typography textAlign="center">{setting.text}</Typography>
                    </Link>
                  ) : (
                    <Typography textAlign="center">{setting.text}</Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
