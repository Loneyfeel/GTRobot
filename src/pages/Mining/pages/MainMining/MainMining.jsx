import React, {startTransition, useEffect, useRef, useState} from 'react';
import {Box, Button, CircularProgress, IconButton, Snackbar, Typography} from "@mui/material";
import Lottie from 'lottie-react';
import animationCloud from '../../assets/cloud-mining.json';
import animationBtc from '../../assets/bitcoin-mining.json';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import InfoIcon from '@mui/icons-material/Info';
import {getMiningUserData, startMining} from '../../components/Requests/Requests.js';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const Timer = ({ timeRemaining }) => {

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        const pad = (value) => (value < 10 ? `0${value}` : value);

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    // Определяем, осталось ли менее 2 часов
    const isLessThanTwoHours = timeRemaining <= 7200;
    // Выбираем соответствующую анимацию
    const animationData = isLessThanTwoHours ? animationCloud : animationBtc;

    return (
        <Box
            sx={{
                display: 'flex',
                position: 'relative',
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
                {formatTime(timeRemaining)}
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
                    style={{
                        width: '180px',
                    }}
                />
            </Box>
        </Box>
    );
};

const StartButton = ({ onClick, isDisabled, text }) => (
    <Button
        variant="contained"
        onClick={onClick}
        disabled={isDisabled}
        sx={{
            flexDirection: 'column',
            paddingTop: '12px',
            width: '125px',
            height: '125px',
            borderRadius: '100px',
            color: 'var(--tg-theme-text-color)',
        }}
    >
        <TouchAppIcon
            sx={{
                position: 'absolute',
                top: '30px',
                width: '40px',
                height: '40px',
            }}
        />
        <Typography
            sx={{
                fontSize: '12px',
                fontWeight: '600',
                marginTop: '40px'
            }}
        >
            {text}
        </Typography>
    </Button>
);

const Balance = ({ showBalanceChange, randomIncrement, setRandomIncrement, endUserMiningTimestamp, t }) => {
    const [cryptoPrices, setCryptoPrices] = useState({});
    const [balance, setBalance] = useState(0);
    const [cryptoCurrency, setCryptoCurrency] = useState('');
    const [isCryptoDataLoaded, setIsCryptoDataLoaded] = useState(false);
    const [referralBonus, setReferralBonus] = useState(0);

    const maxTotalLength = 12;
    const startTimerRef = useRef(new Date().getTime())
    const endTimerRef = endUserMiningTimestamp*1000
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (endTimerRef !== 0 && endTimerRef !== null) {
            setValue(Math.abs(0.1 - (endTimerRef - startTimerRef.current) / 1000 * 0.000006));
        }
    }, [endTimerRef]); // Зависимость добавлена для пересчета значения при изменении endTimerRef

    // Функция для обновления счетчика
    const updateCounter = () => {
        // Увеличиваем значение
        setValue((prevValue) => prevValue + 0.000006);

        // Увеличиваем start_timer
        startTimerRef.current += 1;
    };
    // Вызываем функцию updateCounter каждую секунду
    useEffect(() => {
        const intervalId = setInterval(updateCounter, 1000);

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(intervalId);
    }, []); // Пустой массив зависимостей, чтобы useEffect выполнился только при монтировании

    useEffect(() => {
        // Загружаем данные из local.storage при монтировании компонента
        const storedData = JSON.parse(localStorage.getItem('miningUserData')) || {};
        setBalance(storedData.balance || 0);
        setReferralBonus(storedData.referral_bonus || 0);
        setCryptoCurrency(storedData.crypto_currency || 'btc');

        // Запрашиваем цены криптовалют при монтировании компонента
        const fetchCryptoPrices = async () => {
            try {
                const prices = JSON.parse(localStorage.getItem('prices')) || {};
                setCryptoPrices(prices);

                setIsCryptoDataLoaded(true);
            } catch (error) {
                console.error('Ошибка при получении цен криптовалют:', error);
            }
        };

        fetchCryptoPrices();
    }, []);

    function roundToDecimal(number, decimalPlaces) {
        if(Math.floor(number) == 0 ){
            return (number % 1).toFixed(decimalPlaces)
        }
        else {
            return (number % 1).toFixed(decimalPlaces).replace(/^0/, '');
        }
    }

    // Отображение баланса после получения цен криптовалют
    const getDisplayedBalance = () => {
        if (cryptoPrices[cryptoCurrency]) {
            const price = cryptoPrices[cryptoCurrency];
            const displayedBalance = balance / price;
            let newDisplayedBalance = Math.floor(displayedBalance).toString();
            if (newDisplayedBalance.length < maxTotalLength - 1) {
                newDisplayedBalance += roundToDecimal(displayedBalance, maxTotalLength - newDisplayedBalance.length-1);
                newDisplayedBalance = newDisplayedBalance.toString().replace(/^0/, '');
                return newDisplayedBalance;
            }
        }
    };

    const getTimerDisplayedBalance = () => {
        if (cryptoPrices[cryptoCurrency]) {
            const price = cryptoPrices[cryptoCurrency];
            const displayedBalance = (balance + value) / price;
            let newDisplayedBalance = Math.floor(displayedBalance).toString();
            if (newDisplayedBalance.length < maxTotalLength - 1) {
                newDisplayedBalance += roundToDecimal(displayedBalance, maxTotalLength - newDisplayedBalance.length-1);
                newDisplayedBalance = newDisplayedBalance.toString().replace(/^0/, '');
                return newDisplayedBalance;
            }
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRandomIncrement(0.00001 + Math.random() * (0.000001 - 0.000008));
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    if (!isCryptoDataLoaded) {
        // Пока данные о ценах криптовалют загружаются, можно показывать начальный баланс
        return (
            <Typography>
                - - - - - - - - - -
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '70px'
            }}
        >
            <Typography
                sx={{
                    cursor: 'default'
                }}
            >
                {
                    endUserMiningTimestamp !== null ? getTimerDisplayedBalance() : getDisplayedBalance()
                } {cryptoCurrency.toUpperCase()}
            </Typography>
            {showBalanceChange && (
                <Box
                    sx={{
                        display: 'flex',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '12px',
                            color: 'rgba(45, 176, 25, 0.8)',
                        }}
                    >
                        {`+${randomIncrement.toFixed(7)}$`}
                    </Typography>
                    <Typography
                    sx={{
                        fontSize: '12px',
                        color: 'rgba(45, 176, 25, 0.8)',
                        marginLeft: '10px'
                    }}>
                        Boost +{referralBonus}%
                    </Typography>
                </Box>
            )}
            <Typography
                sx={{
                    fontSize: '11px',
                    marginTop: '10px'
                }}>
                {t("mining.pages.mainMining.future_balance_1")}: {
                endUserMiningTimestamp !== null ?
                    (100 * cryptoPrices[cryptoCurrency] * parseFloat(getTimerDisplayedBalance())).toFixed(5)
                    : (100 * cryptoPrices[cryptoCurrency] *  parseFloat(getDisplayedBalance())).toFixed(5)}$
                {t("mining.pages.mainMining.future_balance_2")}
            </Typography>
        </Box>
    );
}

const getRandomHashrate = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz01234567890123456789';
    const randomText = Array.from({ length: 40 }, () => characters[Math.floor(Math.random() * characters.length)]);
    return `${randomText.join('')}`;
};

const RandomTextComponent = () => {
    const [randomText, setRandomText] = useState(getRandomHashrate());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRandomText(getRandomHashrate());
        }, 1000);

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Typography
            sx={{
                marginBlock: '12px',
                textAlign: 'center',
                fontSize: '12px',
                color: 'var(--tg-theme-hint-color)'
            }}
        >
            {randomText}
        </Typography>
    );
};

const CountdownTimer = () => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    function calculateTimeRemaining() {
        const now = new Date();
        const targetTime = new Date();
        targetTime.setHours(16, 0, 0, 0); // Установка времени 16:00
        const timezoneOffset = 5 * 60; // Смещение для Ташкента (UTC+5)
        const targetTimeAdjusted = new Date(targetTime.getTime() + timezoneOffset * 60 * 1000);

        let timeDiff = targetTimeAdjusted - now;
        if (timeDiff < 0) {
            // Если время прошло, устанавливаем таймер на следующий день
            targetTimeAdjusted.setDate(targetTimeAdjusted.getDate() + 1);
            timeDiff = targetTimeAdjusted - now;
        }

        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        return { hours, minutes, seconds };
    }

    return (
        <Typography>
            {`${timeRemaining.hours}:${String(timeRemaining.minutes).padStart(2, '0')}:${String(timeRemaining.seconds).padStart(2, '0')}`}
        </Typography>
    );
};

const MainMining = ({setValue, setActiveMenuSection}) => {
    const {t} = useTranslation();

    const [timeRemaining, setTimeRemaining] = useState(0);
    const [showBalanceChange, setShowBalanceChange] = useState(false);
    const [randomIncrement, setRandomIncrement] = useState(0);
    const [isMiningActive, setIsMiningActive] = useState(false);
    const [endUserMiningTimestamp, setEndUserMiningTimestamp] = useState(null);
    const [cryptoCurrency, setCryptoCurrency] = useState('');
    const [hasUpdatedMiningData, setHasUpdatedMiningData] = useState(false);
    const [daysUntilWithdrawal, setDaysUntilWithdrawal] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const updateMiningData = (data) => {
        const storedData = data ? data.data : JSON.parse(localStorage.getItem('miningUserData')) || {};
        setIsMiningActive(storedData.is_mining_active || false);
        setEndUserMiningTimestamp(storedData.end_user_mining_timestamp || null);
        setShowBalanceChange(storedData.end_user_mining_timestamp !== null);
        setCryptoCurrency(storedData.crypto_currency || 'btc');
        if (storedData.end_user_mining_timestamp !== null) {
            const currentTime = Math.floor(Date.now() / 1000);
            const remainingTime = storedData.end_user_mining_timestamp - currentTime;
            setTimeRemaining(remainingTime > 0 ? remainingTime : 0);
        }
    };

    const onClickStartButton = async () => {
        if (isMiningActive) {
            setIsLoading(true);
            let currentProgress = 0;

            const intervalId = setInterval(async () => {
                currentProgress += 20;
                setProgress(currentProgress);

                if (currentProgress >= 100) {
                    clearInterval(intervalId);

                    setTimeout(() => {
                        setIsLoading(false);
                    }, 100);

                    // Выполняйте вашу логику для начала майнинга (startMining) здесь
                    await startMining('regular');

                    // Загружайте новые данные для таймера
                    const newData = await getMiningUserData();
                    updateMiningData(newData);
                    localStorage.setItem('miningUserData', JSON.stringify(newData.data));
                }
            }, 1000);
        } else {
            window.Telegram.WebApp.showAlert(
                `${t('mining.pages.mainMining.alert_1')}\n\n${t('mining.pages.mainMining.alert_2')}`
            );
        }
    };


    // useEffect для сброса прогресса после монтирования компонента
    useEffect(() => {
        setProgress(0);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        // Функция возвращается из useEffect и будет вызвана при размонтировании компонента
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (!hasUpdatedMiningData) {
            updateMiningData();
            setHasUpdatedMiningData(true);
        }
    }, [hasUpdatedMiningData]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('miningUserData')) || {};
        const registrationDate = storedData.registration_date || 0;

        // Рассчитываем разницу в днях
        const currentDate = new Date();
        const registrationDateObject = new Date(registrationDate * 1000); // Преобразуем timestamp в объект Date
        const timeDifference = currentDate - registrationDateObject;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        setDaysUntilWithdrawal(20 - daysDifference);
    }, []);

    const handleWithdrawal = () => {
        if (daysUntilWithdrawal >= 0) {
            setSnackbarOpen(true);
        } else {
            startTransition(() => {
                setActiveMenuSection('withdraw');
                navigate('/menu');
                setValue(3);
            });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const navigate = useNavigate();

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '80vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'var(--tg-theme-bg-color)',
                    color: 'var(--tg-theme-text-color)',
                }}
            >
                {!isMiningActive && (
                    <Box
                        sx={{
                            margin: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                        <Typography>
                            {t('mining.pages.mainMining.deactiveTimer')}:
                        </Typography>
                        <CountdownTimer/>
                    </Box>
                )}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <IconButton
                        onClick={() => {
                            startTransition(() => {
                                setActiveMenuSection('mining')
                                navigate('/menu');
                                setValue(3);
                            });
                        }}
                        sx={{
                            position: 'absolute',
                            top: '44px',
                            right: '0',
                            color: 'var(--tg-theme-text-color)'
                        }}
                    >
                        <InfoIcon/>
                    </IconButton>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '44px',
                                cursor: 'default'
                            }}>
                            {endUserMiningTimestamp !== null && (
                                <RandomTextComponent/>
                            )}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            {isLoading &&
                                <Box
                                sx={{
                                    position: 'relative',
                                    height: '125px',
                                    width: '100vw',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <CircularProgress
                                        variant="determinate"
                                        value={progress}
                                        size={100}
                                        sx={{
                                            position: 'absolute',
                                            top: '0',
                                            left: '37%',
                                    }}
                                    />
                                    <Typography
                                    sx={{
                                        paddingBottom: '25px'
                                    }}>
                                        {progress}%
                                    </Typography>
                                </Box>
                            }
                            {!isLoading && !endUserMiningTimestamp && (
                                <StartButton
                                    onClick={onClickStartButton}
                                    text={t('mining.pages.mainMining.start_btn')}
                                />
                            )}
                            {!isLoading && endUserMiningTimestamp !== null && (
                                <Timer timeRemaining={timeRemaining} cryptoCurrency={cryptoCurrency} />
                            )}
                        </Box>
                        <Balance
                            showBalanceChange={showBalanceChange}
                            randomIncrement={randomIncrement}
                            setRandomIncrement={setRandomIncrement}
                            endUserMiningTimestamp={endUserMiningTimestamp}
                            t={t}
                        />
                    </Box>
                </Box>
                <Button
                    onClick={handleWithdrawal}
                    variant='contained'
                    sx={{
                        marginTop: '20px',
                        width: 'max-content',
                        borderRadius: '7px'
                    }}
                >
                    <Typography
                        sx={{
                            marginTop: '2px',
                            fontSize: '14px',
                            color: 'var(--tg-theme-text-color)'
                        }}
                    >
                        {t('mining.pages.menu.withdraw.main_btn')}
                    </Typography>
                </Button>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={`${t('mining.pages.mainMining.days_snackbar_1')} ${daysUntilWithdrawal} ${t('mining.pages.mainMining.days_snackbar_2')}`}
            />
        </>
    );
}

export default MainMining;