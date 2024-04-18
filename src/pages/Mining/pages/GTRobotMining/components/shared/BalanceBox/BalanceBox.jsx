import React, {useEffect, useState} from 'react';
import style from './balanceBox.module.sass'
import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";

const BalanceBox = ({balance, currensy, count, text}) => {
    const { t } = useTranslation();

    // Форматирование баланса до count знаков (с точкой)
    const formatBalanceDefault = (balance) => {
        // Преобразуем число в строку с фиксированным количеством символов
        let formattedBalance = balance.toFixed(count);
        // Если длина строки больше count, обрезаем до count символов
        if (formattedBalance.length > count) {
            formattedBalance = formattedBalance.slice(0, count);
        }
        return formattedBalance;
    };

    // Разделение на целую и дробную части
    const [integerPart, decimalPart] = formatBalanceDefault(balance).split('.')
    
    return (
        <>
            <Box className={style.balanceCard_box}>
                <Box className={style.balanceCard_box__text}>
                    {text}
                </Box>
                <Box className={style.balanceCard_box__balance}>
                    <span className={style.balanceCard_box__balance_big}>{integerPart}</span>.<span className={style.balanceCard_box__balance_small}>{decimalPart} {currensy.toUpperCase()}</span>
                </Box>
            </Box>
        </>
    );
};

export default BalanceBox;