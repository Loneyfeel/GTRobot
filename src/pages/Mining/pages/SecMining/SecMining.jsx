import React, { useState, useEffect } from 'react';
import {Box, Button, Typography, IconButton} from "@mui/material";
import Lottie from 'lottie-react';
import animationRobot1 from '../../assets/robot-mining-bitcoin.json';
import animationRobot2 from '../../assets/robot-mining-bitcoin_2.json';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import InfoIcon from '@mui/icons-material/Info';
import { startMining, getMiningTickersPrice, getMiningUserData } from '../../components/Requests/Requests.js';
import bitcoinIcon from '../../assets/bitcoin-btc-logo.svg';
import dogeIcon from '../../assets/dogecoin-doge-logo.svg';
import shibaIcon from '../../assets/shiba-inu-shib-logo.svg';
import tonIcon from '../../assets/ton_symbol.svg';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

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

    // Определяем, осталось ли менее 2 часов
    const isLessThanTwoHours = timeRemaining <= 7200;
    // Выбираем соответствующую анимацию
    const animationData = isLessThanTwoHours ? animationRobot2 : animationRobot1;

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
                        width: '200px',
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
                height: '60px'
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
                        {`+${randomIncrement.toFixed(7)} ${cryptoCurrency.toUpperCase()}`}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '12px',
                            color: 'rgba(45, 176, 25, 0.8)',
                            marginLeft: '10px'
                        }}>
                        Boost +0%
                    </Typography>
                </Box>
            )}
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

const MainMining = ({setValue}) => {
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
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <IconButton
                        onClick={() => {
                            navigate('/menu/mining')
                            setValue(3)
                        }}
                        sx={{
                            position: 'absolute',
                            top: '44px',
                            right: '0',
                            color: 'var(--tg-theme-text-color)'
                        }}
                    >
                        <InfoIcon />
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
                                <RandomTextComponent />
                            )}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
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
                </Box>
                <Button
                    onClick={() => {
                        navigate('/menu/withdraw')
                        setValue(3)
                    }}
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
                        }}>{t('mining.pages.menu.withdraw.main_btn')}</Typography>
                </Button>
            </Box>
        </>
    );
};

export default MainMining;