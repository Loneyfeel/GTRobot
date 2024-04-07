import React, {useEffect, useState} from 'react';
import style from './menuButtons.module.sass'
import {Box} from "@mui/material";
import MainMenuButton from "./MainMenuButton/index.js";

import buy_crypto from '../assets/buy_crypto.svg'
import about_bot from '../assets/about_bot.svg'
import call from '../assets/call.svg'
import about_us from '../assets/about_us.svg'
import referral from '../assets/referral.svg'
import commands from '../assets/commands.svg'
import cloud from '../assets/cloud.svg'

import {useTranslation} from "react-i18next";


const MenuButtons = ({setCommandsX}) => {
    const { t } = useTranslation();

    return (
        <>
            <Box className={style.menuButtons}>
                <MainMenuButton icon={buy_crypto} text={t("mainMenu.buttons.trading")} url="/tools/" center={'flex-start'} type={'link'}/>
                <MainMenuButton icon={cloud} text={"Cloud Mining"} url={'/mining'} setCommandsX={setCommandsX} center={'flex-start'} type={'link'}/>
                <MainMenuButton icon={call} text={t("mainMenu.buttons.call")} url="call" center={'flex-start'} type={'menu'}/>
                <MainMenuButton icon={referral} text={t("mainMenu.buttons.referral")} url="referrals" center={'flex-start'} type={'menu'}/>
                <MainMenuButton icon={about_bot} text={t("mainMenu.buttons.bot_descr")} url="aboutBot" center={'flex-start'} type={'menu'}/>
                <MainMenuButton icon={about_us} text={t("mainMenu.buttons.about")} url="aboutUs" center={'flex-start'} type={'menu'}/>
                <MainMenuButton icon={commands} text={t("mainMenu.buttons.commands")} url={'commands'} setCommandsX={setCommandsX} width={'94%'} center={'center'} type={'commands'}/>
            </Box>
        </>
    );
};

export default MenuButtons;