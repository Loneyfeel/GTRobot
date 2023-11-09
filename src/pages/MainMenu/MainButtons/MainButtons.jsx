import React from 'react';
import MainButton from "./MainButton";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HomeRepairServiceRoundedIcon from '@mui/icons-material/HomeRepairServiceRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

import { useTranslation } from "react-i18next";
import {Box} from "@mui/material";

const MainButtons = () => {
    const {t} = useTranslation();

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '10px'
                }}>
                <MainButton id="Trading tools" icon={<HomeRepairServiceRoundedIcon/>} text={t('mainMenu.buttons.trading')} url="/tools"/>
                <MainButton id="Bot_Descr" icon={<SmartToyRoundedIcon/>} text={t('mainMenu.buttons.bot_descr')} url="#"/>
                <MainButton id="Call" icon={<MessageRoundedIcon/>} text={t('mainMenu.buttons.call')} url="#"/>
                <MainButton id="About" icon={<InfoOutlinedIcon/>} text={t('mainMenu.buttons.about')} url="#"/>
                <MainButton id="Ref" icon={<PersonAddAltRoundedIcon/>} text={t('mainMenu.buttons.referal')} url="#"/>
            </Box>
        </>
    );
}

export default MainButtons;
