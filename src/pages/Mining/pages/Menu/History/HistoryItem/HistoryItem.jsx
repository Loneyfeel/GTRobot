import React, {useEffect, useState} from 'react';
import style from './historyItem.module.sass'
import {Box} from "@mui/material";
import ton from '../../../../assets/Menu/Widthdraw/tonIcon.png'
import tether from '../../../../assets/Menu/History/tether.svg'
import error from '../../../../assets/Menu/History/error.svg'
import withdraw from '../../../../assets/Menu/History/arrowUp.svg'
import auto from '../../../../assets/Menu/History/auto.svg'

import {useTranslation} from "react-i18next";

const HistoryItem = ({
    amount,
    cryptoCurrency,
    date,
    status,
    type}
) => {

    const {t} = useTranslation()

    const [icon, setIcon] = useState()
    useEffect(() => {
        if (type === 'holding') {
            setIcon(auto)
        } else {
            if (status === -1) {
                setIcon(error)
            } else {
                setIcon(withdraw)
            }
        }
    }, []);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp*1000);
        const formattedDate = `${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth() + 1)).slice(-2)}.${date
            .getFullYear()
            .toString()
            .slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
        return formattedDate;
    };

    return (
        <>
            <Box className={style.historyItem}>
                <Box className={style.historyItem__box}>
                    <Box className={style.historyItem__box_icon}>
                        <img src={icon} alt={'icon'} className={style.historyItem__box_icon_img}/>
                    </Box>
                    <Box className={style.historyItem__box__text}>
                        <Box className={style.historyItem__box__text__title}>
                            {type === "withdraws" ? (
                                <>
                                    {t("mining.pages.menu.history.title.withdraw")}
                                </>
                            ) : (
                                <>
                                    {t("mining.pages.menu.history.title.holding")}
                                </>
                            )}
                        </Box>
                        <Box className={style.historyItem__box__text__status}>
                            {type === "withdraws" ? (
                                status == 1 ? (
                                    <>
                                        <span style={{color: '#67FF76'}}>
                                        {t("mining.pages.menu.history.status.success")}
                                            </span>
                                    </>
                                ) : (
                                    status == -1 ? (
                                        <>
                                        <span style={{color: '#FF2257'}}>
                                            {t("mining.pages.menu.history.status.error")}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                        <span style={{color: '#3DD0FF'}}>
                                            {t("mining.pages.menu.history.status.wait")}
                                            </span>
                                        </>
                                    )
                                )
                            ) : (
                                <>
                                <span style={{color: 'var(--text-color)'}}>
                                    {t("mining.pages.menu.history.status.holding")}
                                    </span>
                                </>
                            )}
                        </Box>
                    </Box>
                </Box>
                <Box className={style.historyItem__info}>
                    <Box className={style.historyItem__info__count}>
                        <Box className={style.historyItem__info__count_icon}>
                            {cryptoCurrency === 'ton' ? (
                                <img src={ton} alt={'tether'} className={style.historyItem__info__count_icon_img}/>
                            ) : (
                                <img src={tether} alt={'tether'} className={style.historyItem__info__count_icon_img}/>
                            )}
                        </Box>
                        <Box className={style.historyItem__info__count_number}>
                            {amount.toFixed(5)}
                        </Box>
                    </Box>
                    <Box className={style.historyItem__info__time}>
                        {formatTime(date)}
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default HistoryItem;