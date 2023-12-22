import './App.css'

import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useThemeParams} from "@vkruglikov/react-telegram-web-app";
import {host} from "./shared/host/host.js";
import {userId} from './shared/telegram/telegram.js'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


// import MainMenu from "./pages/MainMenu";
// import ToolsMenu from "./pages/ToolsMenu";
// import Screener from "./pages/Screener";
// import Forex from "./pages/Forex";
// import NoSubscribe from "./pages/NoSuscribe";
// import Copyright from "./pages/Copyright";
import Mining from "./pages/Mining";

function App() {
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState('');

    useEffect(() => {
        const fetchUserLanguage = async () => {
            try {
                const response = await axios.post(`${host}/api/user-locale`, { userId });
                setLoading(false);
                setLanguage(response.data);
            } catch (error) {
                console.error('Произошла ошибка при выполнении POST-запроса:', error);
                if (error.response.data.errorCode === 1006) {
                    // Перенаправление на другую страницу
                    window.location.href = '/premium';
                }
            }
        };

        if (loading) {
            fetchUserLanguage();
        }
    }, [loading]); // Выполняется только при изменении loading

// Локализация
    const { i18n } = useTranslation();
    useEffect(() => {
        const updateLanguage = async () => {
            await i18n.changeLanguage(language);
        };

        if (!loading) {
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
                        marginLeft: '2px',
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
    return (
        <>
            <ThemeProvider theme={theme}>
                {/*<MainMenu/>*/}
                {/*<ToolsMenu/>*/}
                {/*<Screener/>*/}
                {/*<Forex/>*/}
                {/*<NoSubscribe/>*/}
                {/*<Copyright/>*/}
                <Router basename="">
                    <Routes>
                        <Route path="/*" exact element={<Mining/>} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </>
    )
}

export default App