import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { LayoutProvider } from "./Layout/LayoutContext";
import ScrollToTop from "./Layout/ScrollToTop";
import "./index.css";

ReactDOM.render(
  <Auth0Provider
    domain="dev-da966h82.eu.auth0.com"
    clientId="ca54COMWeajsVpyS4jXEfkYKYR2NRc08"
    redirectUri={`${window.location.origin}/loginRedirect`}
    cacheLocation="localstorage"
  >
    <BrowserRouter>
      <LayoutProvider>
        <ScrollToTop />
        <App />
      </LayoutProvider>
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
reportWebVitals();
