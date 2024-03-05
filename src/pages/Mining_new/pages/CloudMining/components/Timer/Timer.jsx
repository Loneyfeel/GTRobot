import React, {useEffect, useState} from 'react';
import style from './timer.module.sass'
import Countdown from 'react-countdown';
import ellipse from '../../../../assets/CloudMining/ellipse.svg'
import GaugeComponent from 'react-gauge-component'
import {Box } from "@mui/material";
import {useTranslation} from "react-i18next";
import codeVideo from "../../../../assets/CloudMining/codeVideo.mp4"
import {fetchDataAndUpdateLocalStorageInSession} from "../../../../helps/dataHelps.js";

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
    const speedometersText = [
        {
            text: `${t("mining.pages.cloudMining.timer.speedometer_1")}`,
            value: userSubscriptionBoost*100
        },
        {
            text: `${t("mining.pages.cloudMining.timer.speedometer_2")} ${userBoost*100}%`,
            value: userBoost*100
        },
        {
            text: `${t("mining.pages.cloudMining.timer.speedometer_3")}`,
            value: userCloudMiningRate*100
        }
        ]

    return (
        <>
            <Box className={style.cloudTimer}>
                <Box className={style.cloudTimer__speedometers}>
                    {speedometersText.map((speedometer, index) => (
                        <Box key={index} className={style.cloudTimer__speedometers_box}>
                            <img src={ellipse} alt={'ellipse'} className={style.cloudTimer__speedometers_box__img}/>
                            <GaugeComponent
                                id={`gauge-component${index}`}
                                type={'radial'}
                                arc={{
                                    width: 0
                                }}
                                value={speedometer.value}
                                labels={{
                                    valueLabel: {
                                        hide: true
                                    },
                                    tickLabels: {
                                        hideMinMax: true
                                    }
                                }}
                                pointer={{
                                    color: '#848585',
                                }}
                            />
                            <Box className={style.cloudTimer__speedometers_box__text}>
                                {speedometer.text}
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Box className={style.cloudTimer__animation}>
                    <Box className={style.cloudTimer__animation_box}>
                        <video
                            controls={false}
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster="https://cdn.indiawealth.in/public/images/transparent-background-mini.png"
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                        >
                            <source src={codeVideo} type="video/mp4"/>
                        </video>
                    </Box>
                </Box>
                <Countdown
                    className={style.cloudTimer__timer}
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
