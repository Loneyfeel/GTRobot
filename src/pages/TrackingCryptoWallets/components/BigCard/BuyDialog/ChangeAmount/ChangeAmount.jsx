import React, {useEffect} from 'react';
import style from './changeAmount.module.sass'
import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const ChangeAmount = ({setChoiseAmoin, goToNextSlide, getPurchasedAssets, answerPurchasedAssets}) => {
    const {t} = useTranslation();
    function handleButtonsItemClick(value) {
        setChoiseAmoin(value)
        if (answerPurchasedAssets) {
            goToNextSlide()
        }
        getPurchasedAssets()
    }

    useEffect(() => {
        if (answerPurchasedAssets) {
            goToNextSlide()
        }
    }, [answerPurchasedAssets]);
    return (
        <>
            <Box className={style.changeAmount}>
                <Box className={style.changeAmount__top}>
                    <Typography className={style.changeAmount__top__title}
                                sx={{
                                    fontSize: '24px',
                                    fontWeight: '600',
                                    fontFamily: 'Gilroy, sans-serif',
                                    textAlign: 'center'
                                }}>
                        {t("tracking.buyCard.title")}
                    </Typography>
                </Box>
                <Box className={style.changeAmount__buttons}>
                    <Box
                        onClick={() => {
                            handleButtonsItemClick(100)
                        }}
                        className={style.changeAmount__buttons_item}
                    >100$
                    </Box>
                    <Box
                        onClick={() => {
                            handleButtonsItemClick(200)
                        }}
                        className={style.changeAmount__buttons_item}
                    >200$
                    </Box>
                    <Box
                        onClick={() => {
                            handleButtonsItemClick(400)
                        }}
                        className={style.changeAmount__buttons_item}
                    >400$
                    </Box>
                    <Box
                        onClick={() => {
                            handleButtonsItemClick(600)
                        }}
                        className={style.changeAmount__buttons_item}
                    >600$
                    </Box>
                    <Box
                        onClick={() => {
                            handleButtonsItemClick(800)
                        }}
                        className={style.changeAmount__buttons_item}
                    >800$
                    </Box>
                    <Box
                        onClick={() => {
                            handleButtonsItemClick(1000)
                        }}
                        className={style.changeAmount__buttons_item}
                    >1000$
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ChangeAmount;