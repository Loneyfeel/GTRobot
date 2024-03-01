import React, { useState, useEffect } from 'react';
import style from './startButton.module.sass'
import {Box} from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Lottie from "lottie-react";
import animationData_waves from "../../../../assets/CloudMining/waves.json";
import animationData_cloud from "../../../../assets/CloudMining/cloud.json";
import { useTranslation } from "react-i18next";
import Countdown from 'react-countdown';
import { DateTime } from 'luxon';
import {fetchDataAndUpdateLocalStorageInSession} from "../../../../helps/dataHelps.js";
import {startMining} from "../../../../api/api.js";
import CustomButton from "@components/CustomButton/index.js";

const StartButton = ({isMiningActive, setContentVisible}) => {
    const {t} = useTranslation();
    const [timerStarted, setTimerStarted] = useState(!isMiningActive);

    useEffect(() => {

    }, []);

    async function handleStartButtonClick(){
        await startMining("regular")
        await fetchDataAndUpdateLocalStorageInSession()
        setContentVisible(false);
        setTimeout(() => setContentVisible(true), 3500); // Подождать 1 секунду для завершения анимации (время может варьироваться в зависимости от анимации)
    }
    return (
        <>
            {timerStarted ? (
                <Box className={style.startButton_timer}>
                    <Box className={style.startButton_timer__text}>
                        {t("mining.pages.cloudMining.startButtonTimer")}:
                    </Box>
                    <Countdown
                        date={DateTime.now().setZone('Asia/Tashkent').endOf('day').toJSDate()} // Устанавливаем конечное время на сегодня 23:59:59 по Ташкенту
                        onComplete={() => fetchDataAndUpdateLocalStorageInSession()}
                        renderer={({hours, minutes}) => (
                            <span className={style.startButton_timer__count}>{hours} ч : {minutes} мин</span>
                        )}
                    />
                    <CustomButton
                    content={'Что это?'}
                    onClick={() => {
                        window.Telegram.WebApp.showAlert(
                        `${t("mining.pages.cloudMining.alert_1")}\n\n${t("mining.pages.cloudMining.alert_2")}`,
                        );
                    }}
                    startIcon={<InfoOutlinedIcon sx={{marginRight: '10px'}}/>}
                    style={{
                        padding: '10px 20px'
                    }}
                    />
                </Box>
            ) : (
                <Box className={style.startButton}>
                    <Box className={style.startButton__box}>
                        <Box className={`gray ${style.startButton__box__animation_1}`}>
                            <Lottie
                                animationData={animationData_waves}
                            />
                        </Box>
                        <Box
                            className={`gray ${style.startButton__box__animation_2}`}
                            onClick={() => {
                                handleStartButtonClick()
                            }}
                        >
                            <Lottie
                                animationData={animationData_cloud}
                            />
                        </Box>
                        <Box
                            className={style.startButton__box__text}
                            onClick={() => {
                                handleStartButtonClick()
                            }}>
                            {t("mining.pages.cloudMining.start_btn")}
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
}

export default StartButton;
