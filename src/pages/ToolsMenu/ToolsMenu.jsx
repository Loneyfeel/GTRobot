import React, {useEffect, useState} from 'react';
import style from './toolsMenu.module.sass'
import {tg} from "../../shared/telegram/telegram.js";
import Title from './Title'
import Buttons from './Buttons'
import {Box} from "@mui/material";
import GTRobotTitle from "@components/GTRobotTitle/";

const ToolsMenu = () => {

    window.Telegram.WebApp.BackButton.isVisible = true;
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.BackButton.onClick(async () => {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");

        window.location.href = "/";
    });


    const [gtrobotTheme, setGtrobotTheme] = useState(false)

    const root = document.documentElement; // Получение элемента root
    useEffect(() => {
        switch (gtrobotTheme) {
            case 'gtrobot':
                root.classList.add('gtrobot-theme'); // Добавление класса gtrsobot-theme к :root
                tg.setHeaderColor('#000');
                tg.setBackgroundColor('#000');
                break;
            case 'telegram':
                root.classList.add('telegram-theme'); // Добавление класса telegram-theme к :root
                tg.setHeaderColor('bg_color');
                tg.setBackgroundColor('bg_color');
                break;
            default:
                break;
        }
    }, [gtrobotTheme]);

    useEffect(() => {
        tg.CloudStorage.getItem('gtrobotSettings', (error, value) => {
            if (error) {
                // Handle error
                console.error("Error:", error);
            } else {
                if (value !== '' && value !== null && value !== undefined) {
                    setGtrobotTheme(JSON.parse(value).theme);
                }
            }
        });
    }, [])
    return (
        <>
            <Box className={style.toolsMenu}>
                <Title/>
                <Buttons/>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'fixed',
                    bottom: '0'
                }}>
                    <GTRobotTitle gtrobotTheme={gtrobotTheme}/>
                </Box>
            </Box>
        </>
    );
};

export default ToolsMenu;