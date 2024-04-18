import React, { useEffect, useState } from 'react';
import style from './cloudCard.module.sass'
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import BalanceBox from "../../../GTRobotMining/components/shared/BalanceBox/index.js";

const CloudCard = ({ userCloudMiningBalance, userCurrencyPrice, cryptoCurrency }) => {
    const {t, i18n} = useTranslation();

    // Функция для форматирования баланса с заданным количеством знаков после запятой
    const formatBalance = (balance, digits) => {
        let formattedBalance = balance.toFixed(digits);
        if (formattedBalance.length > digits) {
            formattedBalance = formattedBalance.slice(0, digits);
        }
        return formattedBalance;
    };

    // Расчет будущего баланса
    const futureBalance = userCloudMiningBalance * userCurrencyPrice * 57;

    return (
        <>
            <Box>
                <BalanceBox balance={userCloudMiningBalance} currensy={cryptoCurrency} count={13} text={t("mining.pages.cloudMining.balance")}/>
                <Box className={style.cloudCard}>
                    <Box className={style.cloudCard__future}>
                        <Box className={style.cloudCard__future_text}>
                            {t("mining.pages.cloudMining.future_balance_1")}
                        </Box>
                        <Box className={style.cloudCard__future_count}
                             sx={{
                                 fontSize: futureBalance > 1000000 ? '12px' : '16px'
                             }}>
                            {futureBalance > 0 ? (
                                <>
                                    {futureBalance > 1000000 ? (
                                        <>
                                            ${formatBalance(futureBalance, 12)}
                                        </>
                                    ) : (
                                        <>
                                            ${formatBalance(futureBalance, 9)}
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    ------
                                </>
                            )}
                        </Box>
                        {i18n.language === 'uz' && (
                            <Box className={style.cloudCard__future_text}>
                                {t("mining.pages.cloudMining.future_balance_2")}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default CloudCard;
