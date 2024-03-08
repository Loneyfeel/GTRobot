import React from 'react';
import style from './gtrobotCard.module.sass'
import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";
import BalanceBox from "../shared/BalanceBox/index.js";

const GTRobotCard = ({userGTRobotMiningBalance}) => {
    const { t } = useTranslation();

    return (
        <>
            <Box className={style.gtrobotCard}>
                <BalanceBox balance={userGTRobotMiningBalance} currensy={'usdt'} count={8}/>
                <Box className={style.gtrobotCard__info}>
                    {t("mining.pages.gtrobotMining.gtrobot_alert_2")} <b> {t("mining.pages.gtrobotMining.gtrobot_alert_3")}</b> {t("mining.pages.gtrobotMining.gtrobot_alert_4")}
                </Box>
            </Box>
        </>
    );
};

export default GTRobotCard;