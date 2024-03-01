import React from 'react';
import style from './gtrobotCard.module.sass'
import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";

const GTRobotCard = ({userGTRobotMiningBalance}) => {
    const { t } = useTranslation();

    // Форматирование баланса до 8 знаков (с точкой)
    const formatBalanceDefault = (balance) => {
        // Преобразуем число в строку с фиксированным количеством символов
        let formattedBalance = balance.toFixed(8);
        // Если длина строки больше 8, обрезаем до 8 символов
        if (formattedBalance.length > 8) {
            formattedBalance = formattedBalance.slice(0, 8);
        }
        return formattedBalance;
    };

    // Разделение на целую и дробную части
    const [integerPart, decimalPart] = formatBalanceDefault(userGTRobotMiningBalance).split('.');

    return (
        <>
            <Box className={style.gtrobotCard}>
                <Box className={style.gtrobotCard_box}>
                    <Box className={style.gtrobotCard_box__text}>
                        {t("mining.pages.gtrobotMining.balance")}
                    </Box>
                    <Box className={style.gtrobotCard_box__balance}>
                        <span className={style.gtrobotCard_box__balance_big}>{integerPart}</span>.<span className={style.gtrobotCard_box__balance_small}>{decimalPart} USDT</span>
                    </Box>
                </Box>
                <Box className={style.gtrobotCard__info}>
                    {t("mining.pages.gtrobotMining.gtrobot_alert_2")} <b> {t("mining.pages.gtrobotMining.gtrobot_alert_3")}</b>
                </Box>
            </Box>
        </>
    );
};

export default GTRobotCard;