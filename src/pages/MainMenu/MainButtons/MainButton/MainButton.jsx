import React from "react";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { Box, Button, Typography } from "@mui/material";

const MainButton = ({ icon, text, url }) => {
  // Открываем ссылку
  const handleClick = () => {
    if (url === "/tools") {
      window.location.href = url;
    } else {
      window.Telegram.WebApp.openTelegramLink(url);
      window.Telegram.WebApp.close();
    }
  };
  return (
    <>
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          height: "50px",
          width: "170px",
          backgroundColor: "var(--tg-theme-secondary-bg-color)",
          borderRadius: "10px",
          color: "var(--tg-theme-text-color)",
          padding: "0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "32px",
            height: "32px",
            borderRadius: "30px",
            backgroundColor: "var(--tg-theme-button-color)",
            marginRight: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "var(--tg-theme-text-color)",
            }}
          >
            {icon}
          </Box>
        </Box>
        <Typography
          sx={{
            width: "80px",
            textAlign: "center",
            fontWeight: "500",
            fontSize: "11px",
            cursor: "unset",
            marginRight: "7px",
          }}
        >
          {text}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "var(--tg-theme-button-color)",
          }}
        >
          <KeyboardArrowRightOutlinedIcon />
        </Box>
      </Button>
    </>
  );
};

export default MainButton;
