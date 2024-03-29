import React, { useEffect, useState } from "react";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import CoinCard from "./CoinCard";
import {
  getMiningUserData,
  saveMiningUserCryptoCurrency,
} from "../../../components/Requests/Requests.js";
import bitcoinIcon from "../../../assets/bitcoin-btc-logo.svg";
import dogeIcon from "../../../assets/dogecoin-doge-logo.svg";
import shibaIcon from "../../../assets/shiba-inu-shib-logo.svg";
import tonIcon from "../../../assets/ton_symbol.svg";
import { useTranslation } from "react-i18next";

const ChangeCrypto = ({ setIsSectionOpen }) => {
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [showBackdrop, setShowBackdrop] = useState(false);

  useEffect(() => {
    setIsSectionOpen(true);
    // Загрузка данных пользователя из local.storage при монтировании компонента
    const storedData = JSON.parse(localStorage.getItem("miningUserData")) || {};
    setSelectedCrypto(storedData.cryptoCurrency || "btc");
    return () => setIsSectionOpen(false);
  }, [setIsSectionOpen]);

  const fetchDataAndUpdateLocalStorage = async () => {
    try {
      const response = await getMiningUserData();
      const userDataResponse = response.data;
      localStorage.setItem("miningUserData", JSON.stringify(userDataResponse));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleCardClick = async (crypto) => {
    window.Telegram.WebApp.showConfirm(
      `${t("mining.pages.menu.changeCrypto.change_alert_1")}\n\n${t("mining.pages.menu.changeCrypto.change_alert_2")}`,
      (confirm) => {
        if (confirm) {
          setShowBackdrop(true);
          // Обновление локального состояния выбранной криптовалюты
          setSelectedCrypto(crypto);

          // Сохранение данных в local.storage
          const storedData =
            JSON.parse(localStorage.getItem("miningUserData")) || {};
          storedData.cryptoCurrency = crypto;
          localStorage.setItem("miningUserData", JSON.stringify(storedData));

          // Отправка запроса на изменение криптовалюты
          saveMiningUserCryptoCurrency(crypto);

          setTimeout(() => {
            fetchDataAndUpdateLocalStorage();
          }, 1000);

          try {
            saveMiningUserCryptoCurrency(crypto);
            setTimeout(() => {
              fetchDataAndUpdateLocalStorage();
            }, 1000);
          } catch (error) {
            console.error("An error occurred:", error);
          }
          setTimeout(() => {
            setShowBackdrop(false);
          }, 1500);
        }
      },
    );
  };

  const { t } = useTranslation();

  return (
    <>
      <Backdrop open={showBackdrop} style={{ zIndex: 9999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          bgcolor: "var(--tg-theme-bg-color)",
          color: "var(--tg-theme-text-color)",
          minHeight: "30vh",
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
          <Typography
            sx={{
              margin: "20px",
              color: "var(--tg-theme-text-color)",
              fontSize: "18px",
              cursor: "default",
            }}
          >
            {t("mining.pages.menu.changeCrypto.title")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <CoinCard
              icon={bitcoinIcon}
              text={"BTC"}
              selected={selectedCrypto === "btc"}
              onClick={() => handleCardClick("btc")}
            />
            <CoinCard
              icon={dogeIcon}
              text={"DOGE"}
              selected={selectedCrypto === "doge"}
              onClick={() => handleCardClick("doge")}
            />
            <CoinCard
              icon={tonIcon}
              text={"TON"}
              selected={selectedCrypto === "ton"}
              onClick={() => handleCardClick("ton")}
            />
            <CoinCard
              icon={shibaIcon}
              text={"SHIBA"}
              selected={selectedCrypto === "shib"}
              onClick={() => handleCardClick("shib")}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChangeCrypto;
