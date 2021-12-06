import React, { useState, createContext, useContext } from "react";
import { LinearProgress, Snackbar, Alert } from "@mui/material";
import Layout from "./Layout";

export const LayoutContext = createContext({
  success: (message: string) => {},
  error: (message: string) => {},
  warning: (message: string) => {},
  info: (message: string) => {},
  customAlert: (message: string, bg: string, color: string) => {},
  setIsLoading: (isLoading: boolean) => {},
  isLoading: false,
});

export enum AlertSeverity {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export function LayoutProvider(props: { children?: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState(AlertSeverity.SUCCESS);
  const [customAlertProps, setCustomAlertProps] = useState({
    message: "",
    color: "",
    bg: "",
  });

  const success = (message: string) => {
    setAlertSeverity(AlertSeverity.SUCCESS);
    setAlertMessage(message);
  };
  const error = (message: string) => {
    setAlertSeverity(AlertSeverity.ERROR);
    setAlertMessage(message);
  };
  const warning = (message: string) => {
    setAlertSeverity(AlertSeverity.WARNING);
    setAlertMessage(message);
  };
  const info = (message: string) => {
    setAlertSeverity(AlertSeverity.INFO);
    setAlertMessage(message);
  };

  const customAlert = (message: string, bg: string, color: string) =>
    setCustomAlertProps({
      message: message,
      bg: bg,
      color: color,
    });

  return (
    <LayoutContext.Provider
      value={{
        success: success,
        error: error,
        warning: warning,
        info: info,
        customAlert: customAlert,
        setIsLoading: setLoading,
        isLoading: loading,
      }}
    >
      <Layout>
        {props.children}
        <Snackbar
          open={Boolean(alertMessage)}
          onClose={() => setAlertMessage("")}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={() => setAlertMessage("")} severity={alertSeverity}>
            {alertMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={Boolean(customAlertProps.message)}
          onClose={() => setCustomAlertProps({ ...customAlertProps, message: "" })}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            style={{ color: customAlertProps.color, backgroundColor: customAlertProps.bg }}
            onClose={() => setCustomAlertProps({ ...customAlertProps, message: "" })}
            icon={false}
          >
            {customAlertProps.message}
          </Alert>
        </Snackbar>
        <LinearProgress style={{ position: "fixed", bottom: "0", height: "4px", width: "100%" }} hidden={!loading} />
      </Layout>
    </LayoutContext.Provider>
  );
}

export const useLayout = () => useContext(LayoutContext);
