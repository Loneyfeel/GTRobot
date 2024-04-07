import React from 'react';
import style from './toolsMenu.module.sass'
import {tg} from "../../shared/telegram/telegram.js";
import Title from './Title'
import Buttons from './Buttons'
import {Box} from "@mui/material";
import GTRobotTitle from "@components/GTRobotTitle/";

const ToolsMenu = () => {
    tg.setHeaderColor('#000')

    window.Telegram.WebApp.BackButton.isVisible = true;
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.BackButton.onClick(async () => {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");

        window.location.href = "/";
    });

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
                    <GTRobotTitle/>
                </Box>
            </Box>
        </>
    );
};

export default ToolsMenu;