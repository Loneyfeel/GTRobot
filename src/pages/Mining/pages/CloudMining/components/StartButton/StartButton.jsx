import React, { useState, useEffect } from 'react';
import style from './startButton.module.sass';
import { Box } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Lottie from "lottie-react";
import animationData_waves from "../../../../assets/CloudMining/waves.json";
import animationData_cloud from "../../../../assets/CloudMining/cloud.json";
import { useTranslation } from "react-i18next";
import Countdown from 'react-countdown';
import { fetchDataAndUpdateLocalStorageInSession } from "../../../../helps/dataHelps.js";
import { startMining } from "../../../../api/api.js";
import CustomButton from "@components/CustomButton/index.js";
import moment from 'moment-timezone';

const StartButton = ({ isMiningActive, setContentVisible, setIsStartUserMiningTimestamp, setIsEndUserMiningTimestamp }) => {
    const { t } = useTranslation();
    const [timerStarted, setTimerStarted] = useState(!isMiningActive);

    async function handleStartButtonClick() {
        setContentVisible(false)
        await startMining("regular")
        await fetchDataAndUpdateLocalStorageInSession().then(() => {
            const userDataStorage = JSON.parse(localStorage.getItem("miningUserData"));
            setIsStartUserMiningTimestamp(userDataStorage.mining.startUserMiningTimestamp);
            setIsEndUserMiningTimestamp(userDataStorage.mining.endUserMiningTimestamp);
        });
        setTimeout(() => setContentVisible(true), 2200);
    }

    const [endTime, setEndTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    function formattedTime() {
        const currentTime = new Date();
        const currentTimeTashkent = new Date(currentTime.toLocaleString('en-US', { timeZone: 'Asia/Tashkent' }));
        const endOfDay = new Date(currentTimeTashkent);
        endOfDay.setHours(7, 59, 59);
        setEndTime(endOfDay);
        const timeDiff = Math.max(endOfDay - currentTimeTashkent, 0);
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
    }

    const [localTimeAt00, setLocalTimeAt00] = useState('');
    const [localTimeAt08, setLocalTimeAt08] = useState('');
    function localTimeTashkent(){
        // Определяем начальную точку - 00:00 по Ташкенту
        const startAtTashkent = moment.tz('00:00', 'HH:mm', 'Asia/Tashkent');
        // Определяем вторую точку - 08:00 по Ташкенту
        const endAtTashkent = moment.tz('08:00', 'HH:mm', 'Asia/Tashkent');
        // Получаем локальное время, эквивалентное 00:00 по Ташкенту
        const localHourEquivalentAt00 = startAtTashkent.clone().local().format('HH');
        // Получаем локальное время, эквивалентное 08:00 по Ташкенту
        const localHourEquivalentAt08 = endAtTashkent.clone().local().format('HH');
        // Обновляем состояние компонентов
        setLocalTimeAt00(localHourEquivalentAt00);
        setLocalTimeAt08(localHourEquivalentAt08);
    }

    useEffect(() => {
        formattedTime();
        const intervalId = setInterval(() => {
            formattedTime();
        }, 1000);
        localTimeTashkent()



        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            {timerStarted ? (
                <Box className={style.startButton_timer}>
                    <Box className={style.startButton_timer__text}>
                        {t("mining.pages.cloudMining.startButtonTimer")}:
                    </Box>
                    <span
                        className={style.startButton_timer__count}>{timeLeft.hours.toString().padStart(2, '0')} : {timeLeft.minutes.toString().padStart(2, '0')} : {timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <CustomButton
                        content={t("mining.pages.cloudMining.whatIs_btn")}
                        onClick={() => {
                            window.Telegram.WebApp.showAlert(
                                `${t("mining.pages.cloudMining.alert_1")} ${localTimeAt08}:00 - ${localTimeAt00}:00\n\n${t("mining.pages.cloudMining.alert_2")} ${localTimeAt00}:00 ${t("mining.pages.cloudMining.alert_3")}`,
                            );
                        }}
                        startIcon={<InfoOutlinedIcon sx={{ marginRight: '10px' }} />}
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
                                style={{
                                    willChange: 'transform'
                                }}
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
                                style={{
                                    willChange: 'transform'
                                }}
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
