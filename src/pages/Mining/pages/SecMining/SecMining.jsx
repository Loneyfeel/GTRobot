import React, { useState, useEffect } from 'react';
import {Box, Button, Typography, Backdrop, CircularProgress, Snackbar, Alert, IconButton} from "@mui/material";
import Lottie from 'lottie-react';
import animationDataDay from '../../assets/AnimationDay.json';
import animationDataNight from '../../assets/AnimationNight.json';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import CloseIcon from '@mui/icons-material/Close';
import TaskList from '../../components/TaskList';
import {startMining, getMiningTickersPrice, getMiningUserData} from '../../components/Requests/Requests.js';
import bitcoinIcon from '../../assets/bitcoin-btc-logo.svg';
import dogeIcon from '../../assets/dogecoin-doge-logo.svg';
import shibaIcon from '../../assets/shiba-inu-shib-logo.svg';
import tonIcon from '../../assets/ton_symbol.svg';
import {useTranslation} from "react-i18next";

const determineAnimationData = () => {
    const currentHour = new Date().getHours();
    const isDaytime = currentHour >= 6 && currentHour < 21;

    return isDaytime ? animationDataDay : animationDataNight;
};

const getIconByCurrency = (currency) => {
    switch (currency) {
        case 'btc':
            return bitcoinIcon;
        case 'doge':
            return dogeIcon;
        case 'shib':
            return shibaIcon;
        case 'ton':
            return tonIcon;
        default:
            return bitcoinIcon;
    }
};

const Timer = ({ timeRemaining, cryptoCurrency }) => {
    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        const pad = (value) => (value < 10 ? `0${value}` : value);

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    return (
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
                    animationData={determineAnimationData()}
                    style={{
                        width: '150px',
                        transform: 'scaleX(-1) scale(1.2)',
                        paddingBottom: '30px',
                    }}
                />
            </Box>
            <Box
                component="img"
                src={getIconByCurrency(cryptoCurrency)}
                alt={'Current coin'}
                sx={{
                    position: 'absolute',
                    bottom: '90px',
                    right: '140px',
                    width: '30px',
                }}
            />
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
                marginTop: '50px'
            }}
        >
            {text}
        </Typography>
    </Button>
);

const Balance = ({ showBalanceChange, randomIncrement, setRandomIncrement }) => {
    const [cryptoPrices, setCryptoPrices] = useState({});
    const [balance, setBalance] = useState(0);
    const [cryptoCurrency, setCryptoCurrency] = useState('');
    const [isCryptoDataLoaded, setIsCryptoDataLoaded] = useState(false);

    useEffect(() => {
        // Загружаем данные из local.storage при монтировании компонента
        const storedData = JSON.parse(localStorage.getItem('miningUserData')) || {};
        setBalance(storedData.daily_mining_balance || 0);
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

    // Отображение баланса после получения цен криптовалют
    const getDisplayedBalance = () => {
        if (cryptoPrices[cryptoCurrency]) {
            const price = cryptoPrices[cryptoCurrency];
            const displayedBalance = balance / price;
            return displayedBalance.toFixed(6);
        } else {
            // Если цена не найдена, возвращаем исходный баланс
            return balance.toFixed(6);
        }
    };

    useEffect(() => {
        // Установка интервала для обновления числа каждые 5 секунд
        const intervalId = setInterval(() => {
            setRandomIncrement(0.00001 + Math.random() * (0.0001 - 0.000001));
        }, 5000);

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
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <Typography
                sx={{
                    cursor: 'default'
                }}
            >
                {getDisplayedBalance()} {cryptoCurrency.toUpperCase()}
            </Typography>
            {showBalanceChange && (
                <Typography
                    sx={{
                        position: 'absolute',
                        right: '3%',
                        bottom: '12%',
                        fontSize: '12px',
                        color: 'rgba(45, 176, 25, 0.8)',
                    }}
                >
                    {`+${randomIncrement.toFixed(7)} ${cryptoCurrency.toUpperCase()}`}
                </Typography>
            )}
        </Box>
    );
};


const SecMining = () => {
    const { t } = useTranslation();

    const [timeRemaining, setTimeRemaining] = useState(0);
    const [showBalanceChange, setShowBalanceChange] = useState(false);
    const [randomIncrement, setRandomIncrement] = useState(0);
    const [activeTasks, setActiveTasks] = useState([]);
    const [isMiningActive, setIsMiningActive] = useState(true);
    const [endUserMiningTimestamp, setEndUserMiningTimestamp] = useState(null);
    const [cryptoCurrency, setCryptoCurrency] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [hasUpdatedMiningData, setHasUpdatedMiningData] = useState(false);

    const updateMiningData = (data) => {
        const storedData = data ? data.data : JSON.parse(localStorage.getItem('miningUserData')) || {};
        setActiveTasks(storedData.active_tasks || []);
        setIsMiningActive(storedData.is_daily_mining_active || true);
        setEndUserMiningTimestamp(storedData.end_user_daily_mining_timestamp || null);
        setShowBalanceChange(storedData.end_user_daily_mining_timestamp !== null);
        setCryptoCurrency(storedData.crypto_currency || 'btc');
        if (storedData.active_tasks && storedData.active_tasks.length > 0) {
            setSnackbarOpen(true);
        }
        if (storedData.end_user_daily_mining_timestamp !== null) {
            const currentTime = Math.floor(Date.now() / 1000);
            const remainingTime = storedData.end_user_daily_mining_timestamp - currentTime;
            setTimeRemaining(remainingTime > 0 ? remainingTime : 0);
        }
    };

    const onClickStartButton = async () => {
        await startMining('daily');
        const newData = await getMiningUserData();
        updateMiningData(newData);
        localStorage.setItem('miningUserData', JSON.stringify(newData.data));
    };

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

    return (
        <>
            <Box
                sx={{
                    minHeight: '90vh',
                    bgcolor: 'var(--tg-theme-bg-color)',
                    color: 'var(--tg-theme-text-color)',
                }}
            >
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
                        {!endUserMiningTimestamp && (
                            <StartButton
                                onClick={onClickStartButton}
                                isDisabled={activeTasks.length > 0 || !isMiningActive}
                                text={t('mining.pages.mainMining.start_btn')}
                            />
                        )}
                        {endUserMiningTimestamp !== null && (
                            <Timer timeRemaining={timeRemaining} cryptoCurrency={cryptoCurrency} />
                        )}
                    </Box>
                    <Balance
                        showBalanceChange={showBalanceChange}
                        randomIncrement={randomIncrement}
                        setRandomIncrement={setRandomIncrement}
                    />
                </Box>
                <TaskList activeTasks={activeTasks} />
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={null}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    severity="error"
                    sx={{
                        width: '100%' ,
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    action={
                        <IconButton onClick={() => setSnackbarOpen(false)}>
                            <CloseIcon/>
                        </IconButton>
                    }
                >
                    {t('mining.pages.mainMining.error_alert')}
                </Alert>
            </Snackbar>
        </>
    );
};

export default SecMining;
