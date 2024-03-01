import "./miniTVW.sass";
import RefreshIcon from "@mui/icons-material/Refresh";

import React, { useEffect, useRef } from "react";
import { useThemeParams } from "@vkruglikov/react-telegram-web-app";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

let tvScriptLoadingPromise;

export default function MiniTVW({ symbol }) {
  const [colorScheme, themeParams] = useThemeParams(); //тема тг
  const themeColor = {
    bg_color: themeParams.bg_color,
    button_color: themeParams.button_color,
    button_text_color: themeParams.button_text_color,
    hint_color: themeParams.hint_color,
    link_color: themeParams.link_color,
    secondary_bg_color: themeParams.secondary_bg_color,
    text_color: themeParams.text_color,
  };

  const onLoadScriptRef = useRef();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    onLoadScriptRef.current = createWidget;
    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }
    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current(),
    );
    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_b9a65") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          width: "100%",
          height: "300",
          symbol: symbol,
          interval: "30",
          timezone: "Etc/UTC",
          theme: `${colorScheme}`,
          style: "1",
          locale: `${t("screener.chart_lang")}`,
          enable_publishing: false,
          hide_top_toolbar: true,
          backgroundColor: `${themeColor.bg_color}`,
          save_image: false,
          studies: ["Volume@tv-basicstudies", "STD;Supertrend"],
          hide_volume: true,
          container_id: "tradingview_b9a65",
        });
      }
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "300px",
          zIndex: "100",
          backgroundColor: "var(--tg-theme-bg-color)",
        }}
      >
        <Box
          id="tradingview_b9a65"
          sx={{
            position: "relative",
            zIndex: "10",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            width: "10px",
            height: "10px",
            top: "50%",
            left: "50%",
            zIndex: "5",
            animation: "rotate 1s linear infinite",
          }}
        >
          <RefreshIcon fontSize={"large"} />
        </Box>
      </Box>
    </>
  );
}
