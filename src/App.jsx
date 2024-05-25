import './shared/fonts/Gilroy/fontStylesheet.css'
import "./App.css";

import { useTranslation } from "react-i18next";
import {useEffect, useState} from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useThemeParams } from "@vkruglikov/react-telegram-web-app";
import { host } from "./shared/host/host.js";
import {initData, tg} from "./shared/telegram/telegram.js";
import {useQuery} from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainMenu from "./pages/MainMenu";
// import ToolsMenu from "./pages/ToolsMenu";
// import Screener from "./pages/Screener";
// import Forex from "./pages/Forex";
// import NoSubscribe from "./pages/NoSuscribe";
// import Copyright from "./pages/Copyright";
import TrackingCryptoWallets from "./pages/TrackingCryptoWallets";
import Mining from "./pages/Mining";

function App() {

  tg.expand()

  // Функция для выполнения запроса к API
  async function fetchUserData() {
    try {
      const response = await axios.post(`${host}/api/get-user-data`, { initData: initData });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user data');
    }
  }

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: 'userMainData', // Оберните строку 'userData' в массив
    queryFn: fetchUserData,
    config: {
      keepPreviousData: true,
      refetchOnWindowFocus: false
    }
  });

  const { i18n } = useTranslation();
  useEffect(() => {
    if(isSuccess){
      i18n.changeLanguage(data.data.userLocale);
    }
  }, [isSuccess]);

  const [colorScheme, themeParams] = useThemeParams(); //тг тема
  const themeColor = {
    bg_color: themeParams.bg_color || "#666666",
    button_color: themeParams.button_color || "#666666",
    button_text_color: themeParams.button_text_color || "#666666",
    hint_color: themeParams.hint_color || "#666666",
    link_color: themeParams.link_color || "#666666",
    secondary_bg_color: themeParams.secondary_bg_color || "#666666",
    text_color: themeParams.text_color || "#666666",
  };

  const theme = createTheme({
    components: {
      MuiTableSortLabel: {
        styleOverrides: {
          icon: {
            // Отключаем анимацию для иконки
            transition: "none",
            filter: "invert(0.5)",
            margin: "0",
            marginLeft: "2px",
          },
          root: {
            "&.Mui-active .MuiTableSortLabel-icon": {
              color: "red !important",
            },
          },
        },
      },
    },
  });

  const gtrobotSettingsData = {
    theme: 'gtrobot',
    chartCoin: 'BTCUSDT',
    mining: {
      withdraw: 'ton'
    }
  }

  function tgCloudSettings(){
    tg.CloudStorage.getItem('gtrobotSettings', (error, value) => {
      if (error) {
        // Handle error
        console.error("Error:", error);
      } else {
        if (!value) {
          // Если значение отсутствует, установите его в облаке хранения
          tg.CloudStorage.setItem('gtrobotSettings',  JSON.stringify(gtrobotSettingsData))
          tgCloudSettings()
        }
        if (value !== '' && value !== null && value !== undefined) {
          if (JSON.stringify(value) !== JSON.stringify(gtrobotSettingsData)) {
            // Обновляем данные в облачном хранилище, если они отличаются
            tg.CloudStorage.setItem('gtrobotSettings', JSON.stringify(gtrobotSettingsData));
          }
        }
      }
    });
  }

  useEffect(() => {
    tgCloudSettings()
  }, []);



  return (
    <>
      <ThemeProvider theme={theme}>
        <MainMenu/>
        {/*<ToolsMenu/>*/}
        {/*<Screener/>*/}
        {/*<Forex/>*/}
        {/*<NoSubscribe/>*/}
        {/*<Copyright/>*/}
        {/*<TrackingCryptoWallets/>*/}
        {/*<Router basename="/">*/}
        {/*  <Routes>*/}
        {/*    <Route path="/*" exact element={<Mining />} />*/}
        {/*  </Routes>*/}
        {/*</Router>*/}
      </ThemeProvider>
    </>
  );
}

export default App;
