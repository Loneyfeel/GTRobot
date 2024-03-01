// Компонент для отображения алертов
import { Alert, Snackbar } from "@mui/material";
import React from "react";

const CustomAlert = ({ open, onClose, severity, message }) => (
  <Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={onClose}
    sx={{
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Alert
      onClose={onClose}
      severity={severity}
      sx={{
        width: "100%",
        backgroundColor: "var(--tg-theme-secondary-bg-color)",
        color: "var(--tg-theme-text-color)",
      }}
    >
      {message}
    </Alert>
  </Snackbar>
);
export default CustomAlert;
