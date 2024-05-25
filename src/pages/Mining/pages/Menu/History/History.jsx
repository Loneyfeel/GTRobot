import React, {useEffect, useState} from 'react';
import style from './history.module.sass'
import {Box} from "@mui/material";
import CustomButton from "@components/CustomButton/index.js";
import arrowLeft from '../../../assets/Menu/History/arrowLeft.svg'
import wallet from '../../../assets/Menu/History/wallet.png'

import {useTranslation} from "react-i18next";
import HistoryItem from "./HistoryItem/index.js";
import {tg} from "../../../../../shared/telegram/telegram.js";

const History = ({historyPageX, setHistoryPageX, gtrobotTheme}) => {

    const [userHistory, setUserHistory] = useState([])
    const [withdrawSum, setWithdrawSum] = useState(0);
    const [textError, setTextError] = useState(false)

    const {t} = useTranslation();

    function handleArrowButtonClick() {
        setHistoryPageX('100vw')
    }

    useEffect(() => {
        const dataHistory = JSON.parse(localStorage.getItem("userHistory"))
        if (dataHistory) {
            dataHistory.data.holding.forEach(item => {
                item.type = "holding";
            });

            // Добавляем тип к каждому элементу массива withdraws
            dataHistory.data.withdraws.forEach(item => {
                item.type = "withdraws";
            });

            // Собираем все элементы в один массив
            let allTransactions = dataHistory.data.holding.concat(dataHistory.data.withdraws);

            const filteredWithdraws = allTransactions.filter((item) => item.status === 1 && item.type === 'withdraws');
            const withdrawsTotal = filteredWithdraws.reduce((total, withdraw) => total + withdraw.amount, 0);
            setWithdrawSum(withdrawsTotal);

            // Сортируем массив по дате
            setUserHistory(allTransactions.sort((a, b) => b.date - a.date))

        } else {
            setTextError(true)
        }

    }, []);

    return (
        <>
            <Box className={style.history}
                 style={{
                     left: historyPageX
                 }}>
                <CustomButton
                    content={<img src={arrowLeft} alt={'left'}/>}
                    onClick={handleArrowButtonClick}
                    style={{
                        margin: '20px',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        filter: !gtrobotTheme ? tg.colorScheme === 'dark' ? '' : 'invert(1)' : '',
                    }}
                />
                <Box className={style.history__title}>
                    <Box className={style.history__title__icon}>
                        <img src={wallet} alt={'wallet'} className={style.history__title__icon_img}/>
                    </Box>
                    <Box className={style.history__title__text}>
                        {t("mining.pages.menu.history.btn")}
                    </Box>
                </Box>
                <Box className={style.history__statistic}>
                    <Box className={style.history__statistic__box}>
                        <Box className={style.history__statistic__box__money}>
                            <Box className={style.history__statistic__box_count}>
                                {withdrawSum.toFixed(5)} USDT
                            </Box>
                            <Box className={style.history__statistic__box_text}>
                                {t("mining.pages.menu.history.withdraw")}
                            </Box>
                        </Box>
                        <Box className={style.history__statistic__box__counting}>
                            <Box className={style.history__statistic__box_count}>
                                {userHistory.length}
                            </Box>
                            <Box className={style.history__statistic__box_text}>
                                {t("mining.pages.menu.history.operations_count")}
                            </Box>
                        </Box>
                    </Box>
                    <Box className={style.history__operations}>
                        {!textError ? (
                            <>
                            {userHistory.map((item) => (
                                    <HistoryItem
                                        amount={item.amount}
                                        cryptoCurrency={item.cryptoCurrency}
                                        date={item.date}
                                        status={item.status}
                                        type={item.type}
                                    />
                                ))}
                            </>
                        ) : (
                            <>
                                <Box className={style.history__operations__empty}>
                                    {t("mining.pages.menu.history.empty")}
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default History;