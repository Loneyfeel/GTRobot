import './App.css'

// import Menu from "./pages/Tools Menu";
import Screener from "./pages/Screener_2.0";
// import MainMenu from "./pages/Main Menu/index.js";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import axios from "axios";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {useThemeParams} from "@vkruglikov/react-telegram-web-app";

function App() {

    const userId = "tg.initDataUnsafe.user.id"; // Установите значение userId
    const [language, setLanguage] = useState()
    useEffect(() => {
        const data = { userId };
        axios.post('https://gtrobot.ngrok.dev/api/user-locale', data)
            .then((response) => {
                setLanguage(response.data); // Получить значение language из ответа
                console.log('Полученный язык:', language);
            })
            .catch((error) => {
                console.error('Произошла ошибка при выполнении POST-запроса:', error);
            });
    }, []); // useEffect выполняется при монтировании компонента

    // const language = 'uz'

    //локализация
    const {t, i18n} = useTranslation()
    useEffect(() => {
        i18n.changeLanguage(language); // Измените текущий язык
    }, [i18n, language]);

    const [colorScheme, themeParams] = useThemeParams() //тг тема
    const themeColor = ({
        bg_color: themeParams.bg_color,
        button_color: themeParams.button_color,
        button_text_color: themeParams.button_text_color,
        hint_color: themeParams.hint_color,
        link_color: themeParams.link_color,
        secondary_bg_color: themeParams.secondary_bg_color,
        text_color: themeParams.text_color,
    });

    const theme = createTheme({
        palette: {
            primary: {
                main: themeColor.button_color,
            },
            secondary: {
                main: '#ffffff',
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
        {/*<MainMenu/>*/}
        {/*<Menu/>*/}
        <Screener/>
        </ThemeProvider>
    </>
  )
}

export default App