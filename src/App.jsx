import './App.css'

import ToolsMenu from "./pages/ToolsMenu";
import Screener from "./pages/Screener_2.0";
import MainMenu from "./pages/MainMenu";
import Forex from "./pages/ForexSettins/index.js";

import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useThemeParams} from "@vkruglikov/react-telegram-web-app";

function App() {
    const [loading, setLoading] = useState(true);

    const proxy = 'https://corsproxy.io/?'

    const userId = window.Telegram.WebApp.initDataUnsafe.user.id // значение userId
    const [language, setLanguage] = useState('')
    const fetchUserLanguage = () => {
        const data = { userId };
        axios.post(`${proxy}https://gtrobot.ngrok.dev/api/user-locale`, data)
            .then((response) => {
                setLanguage(response.data);
                console.log('Полученный язык:', response.data);
            })
            .catch((error) => {
                console.error('Произошла ошибка при выполнении POST-запроса:', error);
            })
            .finally(
                setLoading(false)
            )
    };



    //локализация
    const {i18n} = useTranslation()
    useEffect(() => {
        fetchUserLanguage()
        if (!loading) {
            const updateLanguage = async () => {
                await i18n.changeLanguage(language);
            };// Измените текущий язык
            updateLanguage();
        }
    }, [i18n, language, loading]);


    const [colorScheme, themeParams] = useThemeParams() //тг тема
    const themeColor = ({
        bg_color: themeParams.bg_color || '#666666',
        button_color: themeParams.button_color || '#666666',
        button_text_color: themeParams.button_text_color || '#666666',
        hint_color: themeParams.hint_color || '#666666',
        link_color: themeParams.link_color || '#666666',
        secondary_bg_color: themeParams.secondary_bg_color || '#666666',
        text_color: themeParams.text_color || '#666666',
    });

    const theme = createTheme({
        palette: {
            primary: {
                main: themeColor.button_color,
            },
            secondary: {
                main: themeColor.secondary_bg_color,
            },
            background: {
                default: themeColor.bg_color,
                paper: themeColor.secondary_bg_color,
            },
            text: {
                primary: themeColor.text_color,
            },
            tableSortLabel: {
                disableRipple: true,
            },
        },
        components: {
            MuiTableSortLabel: {
                styleOverrides: {
                    icon: {
                        // Отключаем анимацию для иконки
                        transition: 'none',
                        filter: 'invert(0.5)',
                        margin: '0',
                        marginLeft: '2px'
                    },
                },
            },
        },
    });
  return (
    <>
        <ThemeProvider theme={theme}>
            <MainMenu/>
            <ToolsMenu/>
            <Screener/>
            <Forex/>
        </ThemeProvider>
    </>
  )
}

export default App