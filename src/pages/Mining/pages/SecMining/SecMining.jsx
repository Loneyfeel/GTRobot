import React, { useEffect, useState } from 'react';
import { Box, Button, Fade, Typography, Snackbar, Alert } from "@mui/material";
import Lottie from 'lottie-react';
import animationDataDay from '../../assets/AnimationDay.json';
import animationDataNight from '../../assets/AnimationNight.json';

import bitcoinIcon from '../../assets/bitcoin-btc-logo.svg';
import dogeIcon from '../../assets/dogecoin-doge-logo.svg';
import shibaIcon from '../../assets/shiba-inu-shib-logo.svg';
import tonIcon from '../../assets/ton_symbol.svg';

import TouchAppIcon from '@mui/icons-material/TouchApp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
    getMiningUserData,
    getMiningTickersPrice,
    saveMiningUserTask,
    startMining
} from '../../components/Requests/Requests';
import TaskList from '../../components/TaskList';
import { Backdrop, CircularProgress } from "@mui/material";

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

const getIconByCurrency = (currency) => {
    switch (currency) {
        case 'BTC':
            return bitcoinIcon;
        case 'DOGE':
            return dogeIcon;
        case 'SHIB':
            return shibaIcon;
        case 'TON':
            return tonIcon;
        default:
            return bitcoinIcon;
    }
};

const SecMining = () => {
    const [showLoader, setShowLoader] = useState(true);
    const [userData, setUserData] = useState({});
    const [activeTasks, setActiveTasks] = useState([]);
    const [tickersPrice, setTickersPrice] = useState({});
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [animationData, setAnimationData] = useState(determineAnimationData());
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [showBalanceChange, setShowBalanceChange] = useState(false);
    const [randomIncrement, setRandomIncrement] = useState(0);
    const [buttonState, setButtonState] = useState({
        textVisible: true,
        disabled: false,
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        let intervalId;

        const updateRandomIncrement = () => {
            // Генерируем случайное число от 0.000001 до 0.0001
            const randomValue = (Math.random() * (0.0001 - 0.000001) + 0.000001).toFixed(7);
            setRandomIncrement(randomValue);
        };

        // Запускаем первое обновление случайного значения
        updateRandomIncrement();

        // Задаем интервал для обновления случайного значения каждые 5 секунд, только если таймер активен
        intervalId = setInterval(() => {
            if (isTimerActive) {
                updateRandomIncrement();
            }
        }, 5000);

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(intervalId);
    }, [isTimerActive]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userDataResponse, tickersPriceResponse] = await Promise.all([
                    getMiningUserData(),
                    getMiningTickersPrice()
                ]);

                console.log(userDataResponse);
                console.log(tickersPriceResponse);

                setUserData(userDataResponse?.data || {});
                setActiveTasks(userDataResponse?.data?.active_tasks || []);
                setTickersPrice(tickersPriceResponse?.data || {});

                // Отправляем запросы на сохранение заданий
                userDataResponse?.data?.active_tasks.forEach(task => {
                    saveMiningUserTask(task.task_id);
                });

                // Если у пользователя есть активные задания, сразу отображаем Snackbar с ошибкой
                if (userDataResponse?.data?.active_tasks.length > 0) {
                    setSnackbarOpen(true);
                }

                // Если у пользователя есть время окончания, сразу запускаем таймер
                if (userDataResponse?.data?.end_user_daily_mining_timestamp !== null) {
                    startTimer(userDataResponse?.data);
                }

                setTimeout(() => {
                    setShowLoader(false);
                }, 2000);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
                icon: <TouchAppIcon
                    sx={{
                        position: 'absolute',
                        top: '30px',
                        width: '40px',
                        height: '40px',
                    }} />,
                textVisible: true,
                disabled: false,
            });
        }
    }, [timeRemaining]);

    const handleStartMining = async () => {
        try {
            // Отправляем запрос на старт майнинга с типом 'daily'
            await startMining('daily');
        } catch (error) {
            console.error('Error starting mining:', error);
        }
    };

    const startTimer = (userData) => {
        if (userData && userData.active_tasks && userData.active_tasks.length > 0) {
            // Показываем Snackbar с ошибкой, так как есть активные задания
            setSnackbarOpen(true);
            return;
        }

        setButtonState({
            icon: <CheckCircleOutlineIcon
                sx={{
                    width: '40px',
                    height: '40px',
                }} />,
            background: 'var(--tg-theme-button-color)',
            textVisible: false,
            disabled: true,
        });

        setShowBalanceChange(true);

        setTimeout(() => {
            setShowBalanceChange(false);
            setAnimationData(determineAnimationData());

            // Получаем timestamp текущего времени
            const currentTimeStamp = new Date().getTime();

            // Получаем timestamp времени окончания
            const endMiningTimeStamp = userData.end_user_daily_mining_timestamp * 1000;

            // Устанавливаем время до окончания в таймере
            setTimeRemaining(endMiningTimeStamp - currentTimeStamp);
            handleStartMining();

            setIsTimerActive(true);
        }, 2000);
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
                                            marginTop: '50px'
                                        }}
                                    >
                                        запустить
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
                                            src={getIconByCurrency(userData.crypto_currency)}
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
                            <Typography
                                sx={{
                                    cursor: 'default'
                                }}
                            >
                                {userData.daily_mining_balance !== undefined && tickersPrice[userData.crypto_currency.toLowerCase()] !== undefined
                                    ? (userData.daily_mining_balance / tickersPrice[userData.crypto_currency.toLowerCase()]).toFixed(8)
                                    : '0'} {userData && userData.crypto_currency && userData.crypto_currency.toUpperCase()}
                            </Typography>
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
                                    +{isTimerActive ? randomIncrement : '0.0000523'} {userData.crypto_currency}
                                </Typography>
                            </Fade>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <TaskList activeTasks={activeTasks} />
                </Box>
            </Box>
            {/* Snackbar при наличии активных заданий */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    Вы не выполнили задание
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{
                    color: '#fff',
                    bgcolor: 'var(--tg-theme-bg-color)',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                open={showLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default SecMining;
