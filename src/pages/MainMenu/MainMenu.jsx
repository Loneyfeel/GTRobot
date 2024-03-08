import MainButtons from "./MainButtons/index.js";
import MainTitle from "./MainTitle/index.js";
import { Box } from "@mui/material";
import {tg} from "../../shared/telegram/telegram.js";

const MainMenu = () => {
    tg.setHeaderColor('#000')


    window.Telegram.WebApp.BackButton.isVisible = false;
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.BackButton.onClick(async () => {
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");

    window.location.href = "/";
  });
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "var(--tg-viewport-height)",
          backgroundColor: "var(--tg-theme-bg-color)",
        }}
      >
        <MainTitle />
        <MainButtons />
      </Box>
    </>
  );
};

export default MainMenu;
