import React, { useEffect, useState } from 'react';
import {Alert, Box, Button, Snackbar, TextField, Typography} from "@mui/material";
import SwapVerticalCircleOutlinedIcon from '@mui/icons-material/SwapVerticalCircleOutlined';
import {miningWithdraw} from '../../../components/Requests/Requests.js'

import btcIcon from '../../../assets/bitcoin-btc-logo.svg';
import tonIcon from '../../../assets/ton_symbol.svg';
import dogeIcon from '../../../assets/dogecoin-doge-logo.svg';
import shibIcon from '../../../assets/shiba-inu-shib-logo.svg';
import tether from '../../../assets/tether.svg';
import {useTranslation} from "react-i18next";

const Withdraw = ({ setIsSectionOpen }) => {
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [daysUntilWithdrawal, setDaysUntilWithdrawal] = useState(null);
    const [amountInCoin, setAmountInCoin] = useState('');
    const [trueAmount, setTrueAmount] = useState()
    const minWithdrawAmount = 1;

    const [isDaysErrorSnackbarOpen, setDaysErrorSnackbarOpen] = useState(false);
    const [isSuccessSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [isAmountErrorSnackbarOpen, setAmountErrorSnackbarOpen] = useState(false);
    const [isEmptyFieldsErrorSnackbarOpen, setEmptyFieldsErrorSnackbarOpen] = useState(false);
    const [isWithdrawError404SnackbarOpen, setIsWithdrawError404SnackbarOpen] = useState(false);
    const [isWithdrawError2010SnackbarOpen, setIsWithdrawError2010SnackbarOpen] = useState(false);
    const [isWithdrawError2011SnackbarOpen, setIsWithdrawError2011SnackbarOpen] = useState(false);
    const [isWithdrawError2012SnackbarOpen, setIsWithdrawError2012SnackbarOpen] = useState(false);
    const [isWithdrawError2013SnackbarOpen, setIsWithdrawError2013SnackbarOpen] = useState(false);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('miningUserData')) || {};
        const registrationDate = storedData.registrationDate || 0;
        const withdrawNotAvailableDays = 20;

        // Рассчитываем разницу в днях
        const currentDate = new Date();
        const registrationDateObject = new Date(registrationDate * 1000);
        const timeDifference = currentDate - registrationDateObject;

        // Рассчитываем, сколько периодов по 20 дней прошло с момента регистрации
        const periodsPassed = Math.floor(timeDifference / (withdrawNotAvailableDays * 24 * 60 * 60 * 1000));

        // Рассчитываем дату начала следующего периода вывода
        const nextWithdrawalStartDate = new Date(registrationDateObject.getTime() + ((periodsPassed + 1) * withdrawNotAvailableDays * 24 * 60 * 60 * 1000));

        // Рассчитываем дату окончания периода вывода (2 дня после начала)
        const nextWithdrawalEndDate = new Date(nextWithdrawalStartDate);
        nextWithdrawalEndDate.setDate(nextWithdrawalStartDate.getDate() + 2);

        const daysDifference = Math.floor((nextWithdrawalStartDate - currentDate) / (24 * 60 * 60 * 1000));

        setDaysUntilWithdrawal(daysDifference)
    }, []);


    useEffect(() => {
        setIsSectionOpen(true);
        return () => setIsSectionOpen(false);
    }, [setIsSectionOpen]);

    const handleWithdrawal = async () => {
        // if (daysUntilWithdrawal >= 0) {
        if (daysUntilWithdrawal >= 21) {
            setDaysErrorSnackbarOpen(true);
        } else {
            window.Telegram.WebApp.showConfirm(
                `${t('mining.pages.menu.withdraw.btn_helps.balance')}: ${withdrawAmount} \n` +
                `${t('mining.pages.menu.withdraw.btn_helps.address')}: ${walletAddress}\n\n` +
                `${t('mining.pages.menu.withdraw.btn_helps.question')}?`,
                async (confirm) => {
                    if (confirm) {
                        handleWithdraw();
                        try {
                            const withdrawalResponse = await miningWithdraw(parseFloat(withdrawAmount), walletAddress);
                            if (withdrawalResponse && withdrawalResponse.errorCode) {
                                switch (withdrawalResponse.errorCode) {
                                    case 404:
                                        setIsWithdrawError404SnackbarOpen(true);
                                        break;
                                    case 2010:
                                        setIsWithdrawError2010SnackbarOpen(true);
                                        break;
                                    case 2011:
                                        setIsWithdrawError2011SnackbarOpen(true);
                                        break;
                                    case 2012:
                                        setIsWithdrawError2012SnackbarOpen(true);
                                        break;
                                    case 2013:
                                        setIsWithdrawError2013SnackbarOpen(true);
                                        break;
                                    default:
                                        setIsWithdrawError404SnackbarOpen(true);
                                        console.log(`Unexpected error: ${withdrawalResponse.errorCode}`);
                                        break;
                                }
                            } else {
                                setSuccessSnackbarOpen(true);
                            }
                        } catch (error) {
                            console.error('Ошибка при выполнении miningWithdraw:', error);
                        }
                    }
                }
            );
        }
    };

    const handleWithdraw = () => {
        if (!withdrawAmount || !walletAddress) {
            setEmptyFieldsErrorSnackbarOpen(true);
            return;
        }

        const withdrawAmountFloat = parseFloat(trueAmount);

        if (withdrawAmountFloat < minWithdrawAmount || withdrawAmountFloat > balance) {
            setAmountErrorSnackbarOpen(true);
            return;
        }

        setTimeout(() => {
            setSuccessSnackbarOpen(false);
            setAmountErrorSnackbarOpen(false);
            setEmptyFieldsErrorSnackbarOpen(false);
        }, 3000);
    }

    const handleAmountChange = (e, inputType) => {
        const value = e.target.value;

        if (isNaN(value) || value < 0) {
            return;
        }

        if (inputType === 'withdraw-amount') {
            setWithdrawAmount(value);
            const calculatedAmount = parseFloat(value) * pricePerCoin;
            setAmountInCoin(calculatedAmount.toFixed(7));
        } else {
            setAmountInCoin(value);
            const calculatedAmount = parseFloat(value) / pricePerCoin;
            setWithdrawAmount(calculatedAmount.toFixed(7));
        }
    }

    const handleTrueAmountChange = (e, inputType) => {
        const value = e.target.value;
        setTrueAmount(value)
    }

    const handleMaxAmount = () => {
        setWithdrawAmount(balance.toString());
        const calculatedAmount = parseFloat(balance) * pricePerCoin;
        setAmountInCoin(calculatedAmount.toFixed(7));
    }

    const { t } = useTranslation();

    const icons = {
        btc: btcIcon,
        ton: tonIcon,
        doge: dogeIcon,
        shib: shibIcon,
    };

    const [balance, setBalance] = useState(0);
    const [cryptoCurrency, setCryptoCurrency] = useState('');

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('miningUserData')) || {};
        setBalance(storedData.balance || 0);
        setCryptoCurrency(storedData.cryptoCurrency || 'btc');
    }, []);

    const prices = JSON.parse(localStorage.getItem('prices')) || {};
    const pricePerCoin = prices[cryptoCurrency];

    return (
        <>
            <Box
                sx={{
                    bgcolor: 'var(--tg-theme-bg-color)',
                    color: 'var(--tg-theme-text-color)',
                    minHeight: '50vh',
                    width: '100%',
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <Typography
                        sx={{
                            margin: '20px',
                            color: 'var(--tg-theme-text-color)',
                            fontSize: '18px',
                            cursor: 'default'
                        }}>
                        {t('mining.pages.menu.withdraw.title')}
                    </Typography>
                    <Box
                        sx={{
                            width: '95%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            bgcolor: 'var(--tg-theme-secondary-bg-color)',
                            borderRadius: '7px',
                            padding: '5px'
                        }}>
                        <Box
                            sx={{
                                width: '100%',
                                padding: '5px'
                            }}>
                            <Typography>
                                {t('mining.pages.menu.withdraw.send')}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%'
                            }}>
                            <input
                                id="withdraw-amount"
                                type="number"
                                inputMode="numeric"
                                placeholder={t('mining.pages.menu.withdraw.textField_1')}
                                value={withdrawAmount}
                                onChange={(e) => handleAmountChange(e, 'withdraw-amount')}
                                style={{
                                    padding: '5px',
                                    borderColor: 'var(--tg-theme-bg-color)',
                                    borderRadius: '7px',
                                    border: 'none',
                                    height: '50px',
                                    backgroundColor: 'var(--tg-theme-bg-color)',
                                    width: '220px',
                                    outline: 'none',
                                    color: 'var(--tg-theme-text-color)',
                                }}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                <img
                                    src={icons[cryptoCurrency]}
                                    alt={cryptoCurrency}
                                    style={{
                                        height: '30px',
                                        width: '30px',
                                        marginInline: '10px 5px'
                                    }}
                                />
                                {cryptoCurrency.toUpperCase()}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                            <Button onClick={handleMaxAmount}>
                                {t('mining.pages.menu.withdraw.max')}
                            </Button>
                            <Typography
                                sx={{
                                    fontSize: '12px'
                                }}>
                                min = {(1/pricePerCoin).toFixed(7)}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Typography
                        sx={{
                            fontSize: '14px'
                        }}>
                            1 {cryptoCurrency.toUpperCase()} = {pricePerCoin}$
                        </Typography>
                    <SwapVerticalCircleOutlinedIcon
                        sx={{
                            color: 'var(--tg-theme-text-color)',
                            width: '30px',
                            height: '30px',
                            margin: '5px'
                        }} />
                    </Box>
                    <Box
                        sx={{
                            width: '95%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            bgcolor: 'var(--tg-theme-secondary-bg-color)',
                            borderRadius: '7px',
                            padding: '5px'
                        }}>
                        <Box
                            sx={{
                                width: '100%',
                                padding: '5px'
                            }}>
                            <Typography>
                                {t('mining.pages.menu.withdraw.receive')}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%'
                            }}>
                            <input
                                id="withdraw-amount-coin"
                                type="number"
                                placeholder={t('mining.pages.menu.withdraw.textField_1')}
                                value={amountInCoin}
                                onChange={(e) => {
                                    handleAmountChange(e, 'withdraw-amount-coin')
                                    handleTrueAmountChange(e, 'withdraw-amount-coin')
                                }
                            }
                                style={{
                                    width: '220px',
                                    padding: '5px',
                                    borderColor: 'var(--tg-theme-bg-color)',
                                    borderRadius: '7px',
                                    border: 'none',
                                    height: '50px',
                                    backgroundColor: 'var(--tg-theme-bg-color)',
                                    outline: 'none',
                                    color: 'var(--tg-theme-text-color)'
                                }}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                <img
                                    src={tether}
                                    alt={'TRC20'}
                                    style={{
                                        height: '30px',
                                        width: '30px',
                                        marginInline: '10px 5px'
                                    }}
                                />
                                USDT
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                            <Button onClick={handleMaxAmount}>
                                {t('mining.pages.menu.withdraw.max')}
                            </Button>
                        </Box>
                    </Box>
                    <TextField
                        id="wallet-address"
                        label={t('mining.pages.menu.withdraw.textField_2')}
                        sx={{
                            borderRadius: '7px',
                            width: '95%',
                            marginBlock: '15px 20px',
                            '& .MuiFormLabel-colorPrimary': {
                                color: 'var(--tg-theme-hint-color)'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--tg-theme-text-color)',
                                borderRadius: '7px',
                            },
                        }}
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                    />
                    <Button
                        variant='contained'
                        onClick={handleWithdrawal}
                        sx={{
                            borderRadius: '7px',
                            margin: '20px'
                        }}
                    >
                        <Typography
                            sx={{
                                marginTop: '2px',
                                fontSize: '14px',
                                color: 'var(--tg-theme-text-color)'
                            }}>{t('mining.pages.menu.withdraw.menu_btn')}
                        </Typography>
                    </Button>
                </Box>
                <Snackbar
                    open={isSuccessSnackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSuccessSnackbarOpen(false)}
                >
                    <Alert severity="success" sx={{ width: '100%' }}>
                        {t('mining.pages.menu.withdraw.snackbars.success')}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={isAmountErrorSnackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setAmountErrorSnackbarOpen(false)}
                >
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {t('mining.pages.menu.withdraw.snackbars.error_balance')}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={isEmptyFieldsErrorSnackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setEmptyFieldsErrorSnackbarOpen(false)}
                >
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {t('mining.pages.menu.withdraw.snackbars.error_full')}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={isDaysErrorSnackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setDaysErrorSnackbarOpen(false)}
                    message={`${t('mining.pages.mainMining.days_snackbar_1')} ${daysUntilWithdrawal} ${t('mining.pages.mainMining.days_snackbar_2')}`}
                />
                <Snackbar
                    open={isWithdrawError404SnackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setIsWithdrawError404SnackbarOpen(false)}
                >
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {t('mining.pages.menu.withdraw.snackbars.error404')}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={isWithdrawError2010SnackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setIsWithdrawError2010SnackbarOpen(false)}
                >
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {t('mining.pages.menu.withdraw.snackbars.error404')}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={isWithdrawError2011SnackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setIsWithdrawError2011SnackbarOpen(false)}
                >
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {t('mining.pages.menu.withdraw.snackbars.error404')}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={isWithdrawError2012SnackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setIsWithdrawError2012SnackbarOpen(false)}
                >
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {t('mining.pages.menu.withdraw.snackbars.error404')}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={isWithdrawError2013SnackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setIsWithdrawError2013SnackbarOpen(false)}
                >
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {t('mining.pages.menu.withdraw.snackbars.error404')}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
};

export default Withdraw;
