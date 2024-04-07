import React from 'react';
import style from './buttons.module.sass'
import CustomButton from "@components/CustomButton/index.js";
import {Box} from "@mui/material";
import AccessibleForwardSharpIcon from '@mui/icons-material/AccessibleForwardSharp';
import MenuButton from "./MenuButton/index.js";
import {useTranslation} from "react-i18next";

import search from '../assets/search.svg'
import diagram from '../assets/diagram.svg'
import cloud from '../assets/cloud.svg'

const Buttons = () => {
    const { t, i18n } = useTranslation();

    const appendLocaleToUrl = (url) => {
        const currentLocale = i18n.language;
        return `${url}/?locale=${currentLocale}`;
    };

    return (
        <>
            <Box className={style.buttons}>
                <MenuButton icon={search} text={t("toolsMenu.buttons.analysis")} url={appendLocaleToUrl("/signals")}/>
                <MenuButton icon={diagram} text={t("toolsMenu.buttons.monitoring")}  url={appendLocaleToUrl("/klines")}/>
                {/*<MenuButton icon={cloud} text={t("toolsMenu.buttons.mining")} url={appendLocaleToUrl("/mining?v=1")}/>*/}
            </Box>
        </>
    );
};

export default Buttons;