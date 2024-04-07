import React, {useEffect, useState} from 'react';
import style from './timer.module.sass'
import Countdown from 'react-countdown';
import {Box } from "@mui/material";
import {useTranslation} from "react-i18next";
import {fetchDataAndUpdateLocalStorageInSession} from "../../../../helps/dataHelps.js";
import HalfCircleProgressBar from "../../../GTRobotMining/components/shared/HalfCircleProgressBar/index.js";

import Progress from "react-circle-progress-bar";

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
    const {t} = useTranslation();

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
            value: speedBalance_1,
            gradient: [{stop: 0.3, color: 'green'}, {stop: 0.5, color: 'rgb(215,215,215)'}]
        },
        {
            text: `${t("mining.pages.cloudMining.timer.speedometer_2")} ${userBoost * 100 + 1}%`,
            value: speedBalance_2,
            gradient: [{stop: 0.3, color: 'green'}, {stop: 0.5, color: 'rgb(215,215,215)'}]
        },
        {
            text: `${t("mining.pages.cloudMining.timer.speedometer_3")}`,
            value: speedBalance_3,
            gradient: [{stop: 0.3, color: 'red'}, {stop: 0.5, color: 'rgb(215,215,215)'}]
        }]


    useEffect(() => {
        setTimeout( () => {
            setSpeedBalance_1(userSubscriptionBoost * 45 + 10)
            setSpeedBalance_2(Math.min(Number(userBoost), 4) * 25 + 1);
            setSpeedBalance_3(userCloudMiningRate * 100)
        }, 200);
    }, []);

    const currentTimestamp = Date.now()/1000;
    const [percentage,] = useState(((currentTimestamp - isStartUserMiningTimestamp) / (isEndUserMiningTimestamp - isStartUserMiningTimestamp)) * 100);

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
                                gradient={speedometer.gradient}
                                text={false}
                            />
                            <Box className={style.cloudTimer__speedometers_box__text}>
                                {speedometer.text}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box className={style.cloudTimer__timer}>
                <Box className={style.cloudTimer__timer__animation__box}>
                    <Box className={style.cloudTimer__timer__animation__box__progress}>
                        <Progress
                            progress={100-percentage}
                            hideBall={true}
                            hideValue={true}
                            strokeWidth={9}
                            background={'rgba(255, 255, 255, 0.15)'}
                            gradient={[{stop: 0.0, color: 'rgba(152, 152, 152, 1)'}, {stop: 1, color: 'rgba(82, 82, 82, 1)'}]}
                            reduction={0}
                            transitionDuration={1}
                            transitionTimingFunction={'ease-in-out'}
                            style={{
                                width: '37vh'
                            }}
                        />
                    </Box>
                    <Box className={style.cloudTimer__timer__animation__box__progress}>
                        <Progress
                            progress={percentage}
                            hideBall={true}
                            hideValue={true}
                            strokeWidth={9}
                            background={'rgba(255, 255, 255, 0.15)'}
                            gradient={[{stop: 0.0, color: 'rgba(152, 152, 152, 1)'}, {stop: 1, color: 'rgba(82, 82, 82, 1)'}]}
                            reduction={0}
                            transitionDuration={1}
                            transitionTimingFunction={'ease-in-out'}
                            style={{
                                width: '32vh',
                                transform: 'scaleX(-1)'
                            }}
                        />
                    </Box>
                    <Box className={style.cloudTimer__timer__animation__box__waves_box}>
                        <Box className={style.cloudTimer__timer__animation__box__waves_box__animation}
                        sx={{
                            top: `${90-percentage*1.1}%`
                        }}>
                            <svg className={style.cloudTimer__timer__animation__box__waves_box__animation__waves}
                                 xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink"
                                 viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                                <defs>
                                    <path id="gentle-wave"
                                          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
                                </defs>
                                <g className={style.parallax}>
                                    <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(82, 82, 82, 1)"/>
                                    <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(152, 152, 152, 1)"/>
                                </g>
                            </svg>
                            <Box className={style.cloudTimer__timer__animation__box__waves_box__animation__bgc}/>
                        </Box>
                    </Box>
                </Box>
                <Box className={style.cloudTimer__timer__box}>
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
            </Box>
        </>
    );
}

export default Timer;
