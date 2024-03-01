import React from "react";
import AuthPage from "./AuthPage/index.js";

const Forex = () => {
  window.Telegram.WebApp.BackButton.isVisible = true;
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.BackButton.onClick(async () => {
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");

    window.location.href = "/tools";
  });

  return (
    <>
      <AuthPage />
    </>
  );
};

export default Forex;
