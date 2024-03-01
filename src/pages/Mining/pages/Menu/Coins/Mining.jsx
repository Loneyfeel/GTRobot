import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import btcIcon from "../../../assets/bitcoin-btc-logo.svg";
import tonIcon from "../../../assets/ton_symbol.svg";
import shibIcon from "../../../assets/shiba-inu-shib-logo.svg";
import dogeIcon from "../../../assets/dogecoin-doge-logo.svg";

const Mining = ({ setIsSectionOpen }) => {
  useEffect(() => {
    setIsSectionOpen(true);
    return () => setIsSectionOpen(false);
  }, [setIsSectionOpen]);
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          bgcolor: "var(--tg-theme-bg-color)",
          color: "var(--tg-theme-text-color)",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                margin: "10px",
              }}
            >
              <Box
                component="img"
                src={btcIcon}
                sx={{
                  width: "30px",
                  marginRight: "10px",
                  marginTop: "5px",
                }}
              />
              <Typography>{t("mining.pages.menu.coins.text_btc")}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                margin: "10px",
              }}
            >
              <Box
                component="img"
                src={tonIcon}
                sx={{
                  width: "30px",
                  marginRight: "10px",
                  marginTop: "5px",
                }}
              />
              <Typography>{t("mining.pages.menu.coins.text_ton")}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                margin: "10px",
              }}
            >
              <Box
                component="img"
                src={shibIcon}
                sx={{
                  width: "30px",
                  marginRight: "10px",
                  marginTop: "5px",
                }}
              />
              <Typography>{t("mining.pages.menu.coins.text_shib")}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                margin: "10px",
              }}
            >
              <Box
                component="img"
                src={dogeIcon}
                sx={{
                  width: "30px",
                  marginRight: "10px",
                  marginTop: "5px",
                }}
              />
              <Typography>{t("mining.pages.menu.coins.text_doge")}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Mining;
