import React, {useEffect, useRef, useState} from 'react';
import {Box, Typography} from "@mui/material";

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
            setValue(Math.abs(0.1 - (endTimerRef - startTimerRef.current) / 1000 * 0.000002));
        }
    }, [endTimerRef]); // Зависимость добавлена для пересчета значения при изменении endTimerRef

    // Функция для обновления счетчика
    const updateCounter = () => {
        // Увеличиваем значение
        setValue((prevValue) => prevValue + 0.000002);

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
            console.log(balance)
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
            console.log(balance)
            console.log('wadawd', value)
            console.log(balance+value)
            const displayedBalance = (balance + value);
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

export default Balance;