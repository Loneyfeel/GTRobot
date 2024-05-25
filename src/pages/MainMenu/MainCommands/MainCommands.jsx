import React from 'react';
import style from './mainCommands.module.sass'
import {Box} from "@mui/material";

import close from '../assets/shared/close.svg'
import CustomButton from "@components/CustomButton/index.js";
import MainCommandItem from "./MainCommandItem/index.js";

import start from '../assets/Commands/start.svg'
import language from '../assets/Commands/language.svg'
import id from '../assets/Commands/id.svg'
import kurs from '../assets/Commands/kurs.svg'
import {useTranslation} from "react-i18next";
import {tg} from "../../../shared/telegram/telegram.js";

const MainCommands = ({commandsX, setCommandsX, assets, assetsLength, gtrobotTheme}) => {
    const {t} = useTranslation()

    return (
        <>
            <Box className={style.menuCommands}
                 sx={{
                     top: commandsX,
                 }}>
                <Box className={style.menuCommands__list}>
                    <MainCommandItem
                        command={'start'}
                        description={t("mainMenu.buttons.start")}
                        icon={start}
                        gtrobotTheme={gtrobotTheme}
                    />
                    <MainCommandItem
                        command={'language'}
                        description={t("mainMenu.buttons.language")}
                        icon={language}
                        gtrobotTheme={gtrobotTheme}
                    />
                    <MainCommandItem
                        command={'getid'}
                        description={t("mainMenu.buttons.getid")}
                        icon={id}
                        gtrobotTheme={gtrobotTheme}
                    />
                    <MainCommandItem
                        command={'kurs'}
                        description={t("mainMenu.buttons.kurs")}
                        textInput={true}
                        icon={kurs}
                        assets={assets}
                        assetsLength={assetsLength}
                        gtrobotTheme={gtrobotTheme}
                    />
                </Box>
                <Box className={style.menuCommands__close}
                     onClick={() => {
                         setCommandsX('100vh')
                     }}
                >
                    <CustomButton
                        content={<img src={close} alt={'close'} className={style.menuCommands__close_img}
                                      style={{
                                          filter: gtrobotTheme === 'gtrobot' ? '' : tg.colorScheme === 'dark' ? '' : 'invert(1)',
                                      }}/>}
                        style={{
                            color: 'var(--text-color)',
                            margin: '10px'
                        }}
                    />
                </Box>
            </Box>
        </>
    );
};

export default MainCommands;