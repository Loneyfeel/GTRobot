import React, {useEffect, useState} from 'react';
import style from './timer.module.sass'
import Countdown from 'react-countdown';
import {Box } from "@mui/material";
import {useTranslation} from "react-i18next";

import btcTimerIcon from '../../../../assets/CloudMining/Timer/btcTimerIcon.svg'
import dogeTimerIcon from '../../../../assets/CloudMining/Timer/dogeTimerIcon.svg'
import tonTimerIcon from '../../../../assets/CloudMining/Timer/tonTimerIcon.svg'
import notTimerIcon from '../../../../assets/CloudMining/Timer/notTimerIcon.svg'
import shibTimerIcon from '../../../../assets/CloudMining/Timer/shibTimerIcon.svg'

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
    const miningUserData = JSON.parse(localStorage.getItem("miningUserData")) //Получаем цены

    const timerIcons = {
        btc: btcTimerIcon,
        doge: dogeTimerIcon,
        ton: tonTimerIcon,
        not: notTimerIcon,
        shib: shibTimerIcon,
    };

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
                            progress={100 - percentage}
                            hideBall={true}
                            hideValue={true}
                            strokeWidth={7}
                            background={'rgba(255, 255, 255, 0.15)'}
                            gradient={[{stop: 0.0, color: 'var(--timer-circle-progress-bar-one)'}, {
                                stop: 1,
                                color: 'var(--timer-circle-progress-bar-two)'
                            }]}
                            reduction={0}
                            transitionDuration={1}
                            transitionTimingFunction={'ease-in-out'}
                            style={{
                                width: '25vh'
                            }}
                        />
                    </Box>
                    <Box className={style.cloudTimer__timer__animation__box__progress}>
                        <Progress
                            progress={percentage}
                            hideBall={true}
                            hideValue={true}
                            strokeWidth={7}
                            background={'rgba(255, 255, 255, 0.15)'}
                            gradient={[{stop: 0.0, color: 'var(--timer-circle-progress-bar-one)'}, {
                                stop: 1,
                                color: 'var(--timer-circle-progress-bar-two)'
                            }]}
                            reduction={0}
                            transitionDuration={1}
                            transitionTimingFunction={'ease-in-out'}
                            style={{
                                width: '22vh',
                                transform: 'scaleX(-1)'
                            }}
                        />
                    </Box>
                    <Box className={style.cloudTimer__timer__animation__box__waves_box}>
                        <Box className={style.cloudTimer__timer__animation__box__waves_box__animation}
                             sx={{
                                 top: `${90 - percentage * 1.1}%`
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
                                    <use xlinkHref="#gentle-wave" x="48" y="0"
                                         fill="var(--timer-circle-progress-bar-two)"/>
                                    <use xlinkHref="#gentle-wave" x="48" y="3"
                                         fill="var(--timer-circle-progress-bar-one)"/>
                                </g>
                            </svg>
                            <Box className={style.cloudTimer__timer__animation__box__waves_box__animation__bgc}/>
                        </Box>
                    </Box>
                    <img
                        src={timerIcons[miningUserData.cryptoCurrency] || btcTimerIcon}
                        alt={miningUserData.cryptoCurrency}
                        className={style.cloudTimer__timer__box__timerIcon}
                        style={{
                            width: miningUserData.cryptoCurrency === 'shib' ? '110px' : '80px'
                        }}
                    />
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
