import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";

const Root = styled(Container)({
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export default function NotAuthenticated() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Root maxWidth="xs">
      <Typography variant="h6" align="center">
        Pro přístup na tyto stránky se musíte přihlásit na účet s administrátorskými právy.
      </Typography>
      <br />
      <br />
      <Button color="primary" variant="contained" onClick={() => loginWithRedirect({ ui_locales: "cs-CZ cs" })}>
        Přihlásit se
      </Button>
    </Root>
  );
}
