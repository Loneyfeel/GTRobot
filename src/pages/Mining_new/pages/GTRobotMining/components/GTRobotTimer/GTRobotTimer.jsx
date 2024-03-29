import React, {useEffect, useState} from 'react';
import style from './gtrobotTimer.module.sass';
import { Box } from '@mui/material';
import Countdown from 'react-countdown';
import { fetchDataAndUpdateLocalStorageInSession } from '../../../../helps/dataHelps.js';
import HalfCircleProgressBar from '../shared/HalfCircleProgressBar';

const GtRobotTimer = ({
                          userGTRobotMiningBalance,
                          setUserGTRobotMiningBalance,
                          isEndUserDailyMiningTimestamp,
                          isStartUserDailyMiningTimestamp,
                          userSubscription
                      }) => {

    const [isUserGTRobotMiningBalance,] = useState(userGTRobotMiningBalance)

    const calculateTimeDifference = () => {
        const endTime = isEndUserDailyMiningTimestamp * 1000;
        return endTime - Date.now();
    };

    useEffect(() => {
        const secondsSinceStart = Math.floor(Date.now() / 1000) - isStartUserDailyMiningTimestamp;

        const miningRate = userSubscription !== 'ultra' ? 0.00011 : 0.00033;

        setUserGTRobotMiningBalance(isUserGTRobotMiningBalance + (secondsSinceStart * miningRate));

        const interval = setInterval(() => {
            setUserGTRobotMiningBalance(prevBalance => prevBalance + miningRate);
        }, 1000);

        return () => clearInterval(interval);
    }, [isStartUserDailyMiningTimestamp, setUserGTRobotMiningBalance]);

    const [speedBalance, setSpeedBalance] = useState(0)

    useEffect(() => {
        setTimeout( () => {
            setSpeedBalance(95)
        }, 500);
    }, []);

    useEffect(() => {
        setTimeout( () => {
            setSpeedBalance((userGTRobotMiningBalance % 10) * 10)
        }, 1500);
    }, [userGTRobotMiningBalance]);

    return (
        <Box className={style.gtrobotTimer}>
            <Box className={style.gtrobotTimer__speedometer_box}>
                <HalfCircleProgressBar
                    value={speedBalance}
                    max={100}
                    width={'300px'}
                    height={'100px'}
                    gradient={[{stop: 0.0, color: '#fff'}, {stop: 1, color: '#fff'}]}
                    widthStick={'5px'}
                    text={true}
                />
                <Countdown
                    className={style.gtrobotTimer__timer}
                    date={Date.now() + calculateTimeDifference()}
                    onComplete={fetchDataAndUpdateLocalStorageInSession}
                    renderer={({ hours, minutes, seconds }) => (
                        <span className={style.gtrobotTimer__timer_text}>
              <b>{String(hours).padStart(2, '0')}</b>:
              <b>{String(minutes).padStart(2, '0')}</b>:
              <b>{String(seconds).padStart(2, '0')}</b>
            </span>
                    )}
                />
            </Box>
        </Box>
    );
};

export default GtRobotTimer;