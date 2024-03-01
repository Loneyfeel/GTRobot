import React from "react";
import { Box, Typography } from "@mui/material";

function MenuTitle({ text }) {
  return (
    <>
      <Box
        sx={{
          paddingBlock: "40px 40px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Roboto,sans-serif",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "500",
            lineHeight: "28px",
            color: "var(--tg-theme-text-color)",
          }}
        >
          {text}:
        </Typography>
      </Box>
    </>
  );
}

export default MenuTitle;
