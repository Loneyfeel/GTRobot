import React from "react";
import { IconButton } from "@mui/material";

const ResetButton = ({ id, onClick, disabled, children }) => {
  return (
    <div>
      <IconButton
        id={id}
        variant="contained"
        onClick={onClick}
        disabled={disabled}
        sx={{
          color: "var(--tg-theme-button-color)",
          minWidth: "35px",
          maxWidth: "35px",
          padding: "0 3px",
          "&.Mui-disabled": {
            color: "var(--tg-theme-hint-color)",
          },
        }}
      >
        {children}
      </IconButton>
    </div>
  );
};

export default ResetButton;
