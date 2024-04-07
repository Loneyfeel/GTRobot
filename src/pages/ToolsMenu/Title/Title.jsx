import React from 'react';
import style from './title.module.sass'
import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";

const Title = () => {
    const {t} = useTranslation();

    return (
        <>
            <Box className={style.title}>
                <Box className={style.title__text}>
                    {t("toolsMenu.title")}:
                </Box>
            </Box>
        </>
    );
}

export default Title;