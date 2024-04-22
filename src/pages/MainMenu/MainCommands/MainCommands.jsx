import React, {useEffect, useState} from 'react';
import style from './mainCommands.module.sass'
import {Box} from "@mui/material";

import close from '../assets/close.svg'
import CustomButton from "@components/CustomButton/index.js";
import MainCommandItem from "./MainCommandItem/index.js";

import start from '../assets/Commands/start.svg'
import language from '../assets/Commands/language.svg'
import id from '../assets/Commands/id.svg'
import kurs from '../assets/Commands/kurs.svg'
import {useTranslation} from "react-i18next";
import axios from "axios";
import {initData} from "../../../shared/telegram/telegram.js";

const MainCommands = ({commandsX, setCommandsX, assets, assetsLength}) => {
    const {t} = useTranslation()

    return (
        <>
            <Box className={style.menuCommands}
                 sx={{
                     top: commandsX,
                 }}>
                <Box className={style.menuCommands__list}>
                    <MainCommandItem command={'start'} description={t("mainMenu.buttons.start")} icon={start}/>
                    <MainCommandItem command={'language'} description={t("mainMenu.buttons.language")} icon={language}/>
                    <MainCommandItem command={'getid'} description={t("mainMenu.buttons.getid")} icon={id}/>
                    <MainCommandItem command={'kurs'} description={t("mainMenu.buttons.kurs")} textInput={true} icon={kurs} assets={assets} assetsLength={assetsLength}/>
                </Box>
                <Box className={style.menuCommands__close}
                     onClick={() => {
                         setCommandsX('100vh')
                     }}
                >
                    <CustomButton
                        content={<img src={close} alt={'close'} className={style.menuCommands__close_img}/>}
                        style={{
                            color: 'var(--text_color)',
                            margin: '10px'
                        }}
                    />
                </Box>
            </Box>
        </>
    );
};

export default MainCommands;