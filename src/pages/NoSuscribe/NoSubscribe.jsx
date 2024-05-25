import React from "react";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import animation from './assets/AnimatedSticker.json'
import {tg} from "../../shared/telegram/telegram.js";

const NoSubscribe = () => {
    window.Telegram.WebApp.BackButton.isVisible = false;

  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "var(--tg-viewport-height)",
          backgroundColor: "var(--tg-theme-bg-color)",
          color: "var(--tg-theme-text-color)",
        }}
      >
        <Box>
          <Box
            sx={{
              margin: "40px 0",
              width: "170px",
              height: "170px",
            }}
          >
              <Lottie
                  animationData={animation}
                  style={{
                      willChange: 'transform'
                  }}
              />
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            {t("noSubscribe.title")}
          </Typography>
          <Typography
            sx={{
              margin: "20px",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {t("noSubscribe.text")}
          </Typography>
        </Box>
        <Box>
          <Button
            onClick={() => {
                window.Telegram.WebApp.openTelegramLink('https://t.me/GTRaibot/shop')
            }}
            variant="contained"
            sx={{
              color: "var(--tg-theme-text-color)",
            }}
          >
            {t("noSubscribe.button")}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default NoSubscribe;
