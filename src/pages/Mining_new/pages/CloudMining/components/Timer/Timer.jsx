import React, {useEffect, useState} from 'react';
import style from './timer.module.sass'
import Countdown from 'react-countdown';
import {Box } from "@mui/material";
import {useTranslation} from "react-i18next";
import {fetchDataAndUpdateLocalStorageInSession} from "../../../../helps/dataHelps.js";
import HalfCircleProgressBar from "../../../GTRobotMining/components/shared/HalfCircleProgressBar/index.js";

const Timer = ({
                   userCurrencyPrice,
                   userCloudMiningBalance,
                   setUserCloudMiningBalance,
                   isStartUserMiningTimestamp,
                   isEndUserMiningTimestamp,
                   userSubscription,
                   userSubscriptionBoost,
                   userReferralBoost,
                   userCloudMiningRate,
}) => {
    const { t } = useTranslation();

    const addBalance = 0.002;

    const [isUserCloudMiningBalance,] = useState(userCloudMiningBalance)

    const calculateTimeDifference = () => {
        const endTime = isEndUserMiningTimestamp * 1000;
        return endTime - Date.now();
    };

    useEffect(() => {
        const secondsSinceStart = Math.floor(Date.now() / 1000) - isStartUserMiningTimestamp;

        const miningRate = (addBalance / (isEndUserMiningTimestamp - isStartUserMiningTimestamp)) / userCurrencyPrice

        setUserCloudMiningBalance(isUserCloudMiningBalance + (secondsSinceStart * miningRate))

        const interval = setInterval(() => {
            setUserCloudMiningBalance(prevBalance => prevBalance + miningRate);
        }, 1000);

        return () => clearInterval(interval);
    }, [userCurrencyPrice, isStartUserMiningTimestamp, setUserCloudMiningBalance]);


    const [userBoost, setUserBoost] = useState(userSubscriptionBoost + userReferralBoost)

    const [speedBalance_1, setSpeedBalance_1] = useState(0)
    const [speedBalance_2, setSpeedBalance_2] = useState(0)
    const [speedBalance_3, setSpeedBalance_3] = useState(0)

    const speedometersText = [
        {
            text: `${t("mining.pages.cloudMining.timer.speedometer_1")}`,
            value: speedBalance_1
        },
        {
            text: `${t("mining.pages.cloudMining.timer.speedometer_2")} ${userBoost*100}%`,
            value: speedBalance_2
        },
        {
            text: `${t("mining.pages.cloudMining.timer.speedometer_3")}`,
            value: speedBalance_3
        }]



    useEffect(() => {
        setTimeout(async () => {
            setSpeedBalance_1(userSubscriptionBoost*100)
            setSpeedBalance_2(userBoost*33)
            setSpeedBalance_3(userCloudMiningRate*100)
        }, 200);
    }, []);

    return (
        <>
            <Box className={style.cloudTimer}>
                <Box className={style.cloudTimer__speedometers}>
                    {speedometersText.map((speedometer, index) => (
                        <Box key={index} className={style.cloudTimer__speedometers_box}>
                            <HalfCircleProgressBar
                                value={speedometer.value}
                                max={100}
                                width={'20vw'}
                                height={'6.5vw'}
                                widthStick={'3px'}
                                gradient={[{stop: 0.3, color: 'red'}, {stop: 0.5, color: 'rgb(215,215,215)'}]}
                                text={false}
                            />
                            <Box className={style.cloudTimer__speedometers_box__text}>
                                {speedometer.text}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box  className={style.cloudTimer__timer}>
                <Box className={style.cloudTimer__timer__title}>
                    {t('mining.pages.cloudMining.timer_text')}
                </Box>
                <Countdown
                    date={Date.now() + calculateTimeDifference()}
                    onComplete={fetchDataAndUpdateLocalStorageInSession}
                    renderer={({hours, minutes, seconds}) => {
                        return (
                            <span className={style.cloudTimer__timer_text}>
                                <b>{hours.toString().padStart(2, '0')}</b>:<b>{minutes.toString().padStart(2, '0')}</b>:<b>{seconds.toString().padStart(2, '0')}</b>
                             </span>
                        );
                    }}
                />
            </Box>
        </>
    );
}

export default Timer;
