import React, {lazy} from 'react';
import MainButton from "./MainButton";

const InfoOutlinedIcon = lazy(() => import('@mui/icons-material/InfoOutlined'));
const HomeRepairServiceRoundedIcon = lazy(() => import('@mui/icons-material/HomeRepairServiceRounded'));
const SmartToyRoundedIcon = lazy(() => import('@mui/icons-material/SmartToyRounded'));
const MessageRoundedIcon = lazy(() => import('@mui/icons-material/MessageRounded'));
const PersonAddAltRoundedIcon = lazy(() => import('@mui/icons-material/PersonAddAltRounded'));

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
                <MainButton id="Bot_Descr" icon={<SmartToyRoundedIcon/>} text={t('mainMenu.buttons.bot_descr')} url="https://t.me/GTRaibot?start=YWJvdXRfYm90"/>
                <MainButton id="Call" icon={<MessageRoundedIcon/>} text={t('mainMenu.buttons.call')} url="https://t.me/GTRaibot?start=c3VwcG9ydA"/>
                <MainButton id="About" icon={<InfoOutlinedIcon/>} text={t('mainMenu.buttons.about')} url="https://t.me/GTRaibot?start=YWJvdXRfdGVhbQ"/>
                <MainButton id="Ref" icon={<PersonAddAltRoundedIcon/>} text={t('mainMenu.buttons.referal')} url="https://t.me/GTRaibot?start=cmVmZXJyYWw"/>
            </Box>
        </>
    );
}

export default MainButtons;
