import React from 'react';
import style from './menuButtons.module.sass'
import {Box} from "@mui/material";
import MainMenuButton from "./MainMenuButton/index.js";

import about_us from '../assets/shared/about_us.svg'
import wallet from '../assets/shared/wallet.svg'
import cloud from '../assets/shared/cloud.svg'
import copyTrading from '../assets/shared/copyTrading.svg'
import win from '../assets/shared/win.svg'
import about_bot from '../assets/shared/about_bot.svg'
import call from '../assets/shared/call.svg'
import commands from '../assets/shared/commands.svg'

import {useTranslation} from "react-i18next";
import search from "../../ToolsMenu/assets/search.svg";
import diagram from "../../ToolsMenu/assets/diagram.svg";

// const MenuButtons = ({setCommandsX}) => {
const MenuButtons = () => {
    const { t, i18n } = useTranslation();
    const appendLocaleToUrl = (url) => {
        const currentLocale = i18n.language;
        return `${url}/?locale=${currentLocale}`;
    };

    return (
        <>
            <Box className={style.menuButtons}>
                <MainMenuButton
                    name={'topWhales'}
                    icon={wallet}
                    text={t("mainMenu.buttons.whales")}
                    url="/top-whales/"
                    type={'link'}
                    isForPremium={false}/>
                <MainMenuButton
                    name={'copyTrade'}
                    icon={copyTrading}
                    text={'Copy Trade'}
                    url="/menu_copytrading"
                    type={'link'}
                    isForPremium={true}/>
                <MainMenuButton
                    name={'monitoring'}
                    icon={diagram}
                    text={'Monitoring'}
                    url={appendLocaleToUrl("/klines")}
                    type={'link'}
                    isForPremium={true}/>
                <MainMenuButton
                    name={'analysis'}
                    icon={search}
                    text={'Scan'}
                    url={appendLocaleToUrl("https://t.me/GTRTrade_bot")}
                    type={'link'}
                    isForPremium={true}/>
                <MainMenuButton
                    name={'win'}
                    icon={win}
                    text={'WIN WIN'}
                    url={''}
                    type={'other'}
                    isForPremium={false}/>
                <MainMenuButton
                    name={'mining'}
                    icon={cloud}
                    text={"Cloud Mining"}
                    url={'/mining'}
                    type={'link'}
                    isForPremium={false}/>
                <MainMenuButton
                    name={'aboutUs'}
                    icon={about_us}
                    text={t("mainMenu.buttons.about")}
                    url="aboutUs"
                    type={'menu'}
                    width={'95vw'}
                    isForPremium={false}/>
                {/*<MainMenuButton name={'tools'} icon={buy_crypto} text={t("mainMenu.buttons.trading")} url="/tools/" center={'flex-start'} type={'link'}/>*/}
                {/*<MainMenuButton name={'call'} icon={call} text={t("mainMenu.buttons.call")} url="call" type={'menu'}/>*/}
                {/*<MainMenuButton name={'aboutBot'} icon={about_bot} text={t("mainMenu.buttons.bot_descr")} url="aboutBot" type={'menu'}/>*/}
                {/*<MainMenuButton name={'commands'} icon={commands} text={t("mainMenu.buttons.commands")} url={'commands'} setCommandsX={setCommandsX} width={'94%'} center={'center'} type={'commands'}/>*/}
            </Box>
        </>
    );
};

export default MenuButtons;