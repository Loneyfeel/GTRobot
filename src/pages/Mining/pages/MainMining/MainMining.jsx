import React, { useEffect, useState } from 'react';
import { Box, Button, Fade, Typography } from "@mui/material";
import TouchAppIcon from '@mui/icons-material/TouchApp';
import Lottie from 'lottie-react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import animationDataDay from '../../assets/AnimationDay.json';
import animationDataNight from '../../assets/AnimationNight.json';
import bitcoinIcon from '../../assets/bitcoin-btc-logo.svg';
import TaskList from "../../components/TaskList/index.js";

const animationStyle = {
    width: '150px',
    transform: 'scaleX(-1) scale(1.2)',
    paddingBottom: '30px',
};

const determineAnimationData = () => {
    const currentHour = new Date().getHours();
    const isDaytime = currentHour >= 6 && currentHour < 21;

    return isDaytime ? animationDataDay : animationDataNight;
};

const MainMining = () => {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [animationData, setAnimationData] = useState(determineAnimationData());
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [showBalanceChange, setShowBalanceChange] = useState(false);

    const [buttonState, setButtonState] = useState({
        textVisible: true,
        disabled: false,
    });

    useEffect(() => {
        let timer;

        if (isTimerActive) {
            timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1000);
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isTimerActive]);

    useEffect(() => {
        if (timeRemaining <= 0) {
            setIsTimerActive(false);
            setAnimationData(determineAnimationData());
            setButtonState({
                icon:<TouchAppIcon
                    sx={{
                        width: '40px',
                        height: '40px',
                        paddingBottom: '5px'
                    }}/>,
                textVisible: true,
                disabled: false,
            });
        }
    }, [timeRemaining]);

    const startTimer = () => {
        setButtonState({
            icon: <CheckCircleOutlineIcon
                sx={{
                    width: '40px',
                    height: '40px',
                }}/>,
            background: 'var(--tg-theme-button-color)',
            textVisible: false,
            disabled: true,
        });

        setShowBalanceChange(true);

        setTimeout(() => {
            setShowBalanceChange(false);
            setAnimationData(determineAnimationData());
            setIsTimerActive(true);
            setTimeRemaining(1000 * 5);
        }, 3000);
    };

    const formatTime = () => {
        const hours = Math.floor(timeRemaining / 3600000);
        const minutes = Math.floor((timeRemaining % 3600000) / 60000);
        const seconds = Math.floor((timeRemaining % 60000) / 1000);
        return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    return (
        <>
            <Box
                sx={{
                    minHeight: '90vh',
                    bgcolor: 'var(--tg-theme-bg-color)',
                    color: 'var(--tg-theme-text-color)',
                }}
            >
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            height: '270px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: '140px',
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={startTimer}
                                disabled={buttonState.disabled}
                                sx={{
                                    display: isTimerActive ? 'none' : 'flex', // условие для видимости кнопки
                                    flexDirection: 'column',
                                    paddingTop: '12px',
                                    width: '125px',
                                    height: '125px',
                                    borderRadius: '100px',
                                    color: 'var(--tg-theme-text-color)',
                                    backgroundColor: buttonState.background,
                                    '&.Mui-disabled': {
                                        bgcolor: 'var(--tg-theme-button-color)',
                                        color: '#fff'
                                    }
                                }}
                            >
                                {buttonState.icon}
                                {buttonState.textVisible && (
                                    <Typography
                                        sx={{
                                            fontSize: '12px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        собрать
                                    </Typography>
                                )}
                            </Button>
                            {isTimerActive && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        {formatTime()}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <Lottie
                                            animationData={animationData}
                                            style={animationStyle}
                                        />
                                        <Box
                                            component="img"
                                            src={bitcoinIcon}
                                            alt={'Current coin'}
                                            sx={{
                                                position: 'absolute',
                                                bottom: '58px',
                                                right: '20px',
                                                width: '30px',
                                            }}
                                        />
                                    </Box>
                                </Box>
                            )}
                        </Box>
                        <Box
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <Typography>0,0000132 BTC</Typography>
                            <Fade in={showBalanceChange}>
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        right: '7%',
                                        bottom: '12%',
                                        fontSize: '12px',
                                        color: 'rgba(45, 176, 25, 0.8)',
                                    }}
                                >
                                    +0.0000523 BTC
                                </Typography>
                            </Fade>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <TaskList />
                </Box>
            </Box>
        </>
    );
};

export default MainMining;
