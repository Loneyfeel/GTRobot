import React, { useEffect, useState } from 'react';
import style from './cloudCard.module.sass'
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const CloudCard = ({ userCloudMiningBalance, userCurrencyPrice, cryptoCurrency }) => {
    const { t } = useTranslation();

    // Функция для форматирования баланса с заданным количеством знаков после запятой
    const formatBalance = (balance, digits) => {
        let formattedBalance = balance.toFixed(digits);
        if (formattedBalance.length > digits) {
            formattedBalance = formattedBalance.slice(0, digits);
        }
        return formattedBalance;
    };

    // Форматирование текущего баланса
    const currentBalance = formatBalance(userCloudMiningBalance, 12);

    // Расчет будущего баланса
    const futureBalance = userCloudMiningBalance * userCurrencyPrice * 57;

    return (
        <Box className={style.cloudCard}>
            <Box className={style.cloudCard__balance}>
                <Box className={style.cloudCard__balance_text}>
                    {t("mining.pages.cloudMining.balance")}
                </Box>
                <Box className={style.cloudCard__balance_count}>
                    <span className={style.cloudCard__balance_count_big}>{currentBalance.split('.')[0]}</span>.<span className={style.cloudCard__balance_count_small}>{currentBalance.split('.')[1]} </span>
                    <span>{cryptoCurrency.toUpperCase()}</span>
                </Box>
            </Box>
            <Box className={style.cloudCard__future}>
                <Box className={style.cloudCard__future_text}>
                    {t("mining.pages.cloudMining.future_balance_1")}
                    <br />{t("mining.pages.cloudMining.future_balance_2")}:
                </Box>
                <Box className={style.cloudCard__future_count}
                sx={{
                    fontSize: futureBalance > 1000000 ? '22px' : '32px'
                }}>
                {futureBalance > 0 ? (
                    <>
                        {futureBalance > 1000000 ? (
                            <>
                            ${formatBalance(futureBalance, 9)}
                                </>
                        ) : (
                            <>
                            ${formatBalance(futureBalance, 6)}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        ------
                    </>
                )}
                </Box>
                <Box className={style.cloudCard__future_text}>
                    {t("mining.pages.cloudMining.future_balance_3")}
                </Box>
            </Box>
        </Box>
    );
};

export default CloudCard;
