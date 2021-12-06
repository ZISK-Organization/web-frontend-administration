import React from "react";
import { AppBar, Theme, Typography, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const ZISKBar = styled(AppBar)({
  height: "88px",
  paddingLeft: "122px",
  paddingTop: "8px",
});

const Logo = styled.img({
  width: "72px",
  height: "72px",
  top: "8px",
  left: "22px",
  position: "absolute",
});

const MenuBar = styled.div(({ theme }: { theme: Theme }) => ({
  height: "42px",
  width: "100%",
  zIndex: 999,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  position: "absolute",
}));

const MenuItem = styled(Typography)({
  fontSize: "1.1rem",
  marginLeft: "16px",
  marginTop: "6px",
  float: "left",
  cursor: "pointer",
  height: "32px",
  "&:hover": {
    color: "#757575",
  },
});

const LoginButton = styled.div({
  top: "20px",
  right: "22px",
  position: "absolute",
  cursor: "pointer",
  color: "white",
  textAlign: "center",
});

const ZISKAvatar = styled.img({
  height: 44,
  width: 44,
  borderRadius: "50%",
});

const MenuRapierer = styled.div({
  width: "100%",
  height: 42,
});

interface IProps {
  loginWithRedirect: () => void;
  logout: (info: { returnTo: string }) => void;
  user?: {
    picture?: string;
    name?: string;
    email?: string;
  };
  isAuthenticated: boolean;
}

export default function Header({ isAuthenticated, loginWithRedirect, user }: IProps) {
  const location = useLocation();
  const nav = useNavigate();
  const theme = useTheme();

  return (
    <>
      <ZISKBar position="relative">
        <span onClick={() => nav("/")} style={{ cursor: "pointer" }}>
          <Logo src={"/img/logo.svg"} alt="Logo" />
          <Typography variant="h2" style={{ flexGrow: 1, fontFamily: "Lato, Roboto, Helvetica, Arial, sans-serif" }}>
            ZISK
            <Typography component="span"> Administrace</Typography>
          </Typography>
        </span>
        {isAuthenticated ? (
          <LoginButton
            style={{ top: 8 }}
            onClick={() => {
              // TODO logout
            }}
          >
            <ZISKAvatar alt={user?.name || user?.email} src={user?.picture} />
            <br />
            <Typography variant="button">{user?.name || user?.email}</Typography>
          </LoginButton>
        ) : (
          <LoginButton onClick={loginWithRedirect}>
            <Typography variant="button">Přihlásit se</Typography>
          </LoginButton>
        )}
      </ZISKBar>
      <MenuBar theme={theme} className={`navbarTop`}>
        <MenuItem
          variant="h6"
          onClick={() => nav("/Correction")}
          style={{ borderBottom: location.pathname === "/Tasks" ? "4px solid black" : "none" }}
        >
          Opravování
        </MenuItem>
        <MenuItem
          variant="h6"
          onClick={() => nav("/Tutorials")}
          style={{ borderBottom: location.pathname === "/Tasks" ? "4px solid black" : "none" }}
        >
          Deploy úloh
        </MenuItem>
        <MenuItem
          variant="h6"
          onClick={() => nav("/TasksBase")}
          style={{ borderBottom: location.pathname === "/Tasks" ? "4px solid black" : "none" }}
        >
          Databáze úloh
        </MenuItem>
        <MenuItem
          variant="h6"
          onClick={() => nav("/Mails")}
          style={{ borderBottom: location.pathname === "/Tasks" ? "4px solid black" : "none" }}
        >
          Emailing
        </MenuItem>
      </MenuBar>
      <MenuRapierer />
    </>
  );
}
