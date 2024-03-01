import React from "react";
import { Box, Card, CardContent, Checkbox, Typography } from "@mui/material";

const CoinCard = ({ icon, text, selected, onClick }) => {
  return (
    <Card
      sx={{
        display: "flex",
        width: "22%",
        height: "85px",
        borderRadius: "7px",
        bgcolor: selected
          ? "var(--tg-theme-button-color)"
          : "var(--tg-theme-bg-color)",
        cursor: "pointer",
        margin: "3px",
        boxShadow: "none",
      }}
      onClick={onClick}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          border: "none",
          "&.MuiCardContent-root:last-child": {
            paddingBottom: "10px",
          },
        }}
      >
        <Box
          component="img"
          src={icon}
          alt="Icon"
          sx={{
            width: "50px",
            marginBottom: "5px",
          }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            color: selected
              ? "var(--tg-theme-text-color)"
              : "var(--tg-theme-hint-color)",
            fontSize: "12px",
            fontWeight: "700",
          }}
        >
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CoinCard;
