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
import { Link } from "react-router-dom";
import { useState } from "react";
import { LogoAcme as Logo } from "../../Components";

import { useNavigate } from "react-router-dom";
import { auth } from "../../Services/firebaseConfig";
import { signOut } from "firebase/auth";

import { useEffect } from "react";
import { Grid } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

function ResponsiveAppBar({ setLogar, admin, setUserLogin, userLogin }) {
  useEffect(() => {
    if (admin) {
      setPages([
        { name: "Home", path: "/home" },
        { name: "Cotações", path: "/cotacoes/form" },
        { name: "Fornecedores", path: "/fornecedores" },
        { name: "Contatos", path: "/contato" },
        { name: "Produtos", path: "/produtos" },
        { name: "Controle de Usuários", path: "/register" },
        //{ name: "Requisições", path: "/requisicoes" },
      ]);
    } else {
      setPages([
        { name: "Home", path: "/home" },
        { name: "Cotações", path: "/cotacoes" },
        { name: "Requisição de Compra", path: "/requisicao-de-compra" },
        // { name: "Adicionar Usuários", path: "/register" },
      ]);
    }
  }, [admin]);

  const settings = [
    { name: "Configurações", path: "/settings" },
    { name: "Sair", path: "" },
  ];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [pages, setPages] = useState([]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  function logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setLogar("");
        setUserLogin({});
        navigate("/");
        alert("Deslogado com sucesso");
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <AppBar position="static" color="error">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/*<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />*/}
          <Logo />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/home"}
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
            ACME
          </Typography>

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
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.path}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />*/}

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
            ACME
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Logout">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {userLogin.photoURL ? (
                  <Avatar src={userLogin.photoURL} />
                ) : (
                  <Avatar />
                )}
              </IconButton>
            </Tooltip>
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
              {
                <ul>
                  <li style={style}>{userLogin.nome}</li>
                  <li style={style}>{userLogin.email}</li>
                </ul>
              }
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  {setting.name == "Configurações" ? (
                    <Typography
                      style={{ textDecoration: "none", color: "inherit" }}
                      textAlign="center"
                      component={Link}
                      to={setting.path}
                    >
                      {setting.name}
                    </Typography>
                  ) : (
                    <Typography textAlign="center" onClick={logout}>
                      {setting.name}
                    </Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

const style = {
  marginLeft: "-40px", // Mantém o alinhamento à esquerda
  listStyleType: "none", // Remove o marcador padrão
  fontFamily: "Arial, sans-serif",
  fontSize: "16px", // Ajusta o tamanho da fonte para um layout mais refinado
  fontWeight: "normal", // Usa fonte normal para melhorar a legibilidade
  padding: "8px 12px", // Adiciona espaçamento interno
  marginBottom: "8px", // Adiciona espaço entre os itens da lista
  backgroundColor: "#f5f5f5", // Cor de fundo suave
  borderRadius: "8px", // Bordas arredondadas
  color: "#333", // Cor do texto
  maxWidth: "200px", // Limita a largura para manter um layout compacto
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", // Sombra suave para destaque
};
