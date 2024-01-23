import React, { useEffect, useState } from 'react';
import {Alert, Box, Button, Snackbar, TextField, Typography} from "@mui/material";
import SwapVerticalCircleOutlinedIcon from '@mui/icons-material/SwapVerticalCircleOutlined';

import btcIcon from '../../../assets/bitcoin-btc-logo.svg';
import tonIcon from '../../../assets/ton_symbol.svg';
import dogeIcon from '../../../assets/dogecoin-doge-logo.svg';
import shibIcon from '../../../assets/shiba-inu-shib-logo.svg';
import tether from '../../../assets/tether.svg';
import {useTranslation} from "react-i18next";

const Withdraw = ({ setIsSectionOpen }) => {
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [isWarningSnackbarOpen, setIsWarningSnackbarOpen] = useState(false);
    const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useState(false);
    const [daysUntilWithdrawal, setDaysUntilWithdrawal] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [amountInCoin, setAmountInCoin] = useState('');
    const minWithdrawAmount = 1;

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('miningUserData')) || {};
        const registrationDate = storedData.registrationDate || 0;

        // Рассчитываем разницу в днях
        const currentDate = new Date();
        const registrationDateObject = new Date(registrationDate * 1000); // Преобразуем timestamp в объект Date
        const timeDifference = currentDate - registrationDateObject;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        setDaysUntilWithdrawal(20 - daysDifference);
    }, []);


    useEffect(() => {
        setIsSectionOpen(true);
        return () => setIsSectionOpen(false);
    }, [setIsSectionOpen]);

    const handleWithdrawal = () => {
        if (daysUntilWithdrawal >= 0) {
            setSnackbarOpen(true);
        } else {
            window.Telegram.WebApp.showConfirm(
                `${t('mining.pages.menu.withdraw.btn_helps.balance')}: ${withdrawAmount} \n` +
                `${t('mining.pages.menu.withdraw.btn_helps.address')}: ${walletAddress}\n\n` +
                `${t('mining.pages.menu.withdraw.btn_helps.question')}?`,
                (confirm) => {
                    if (confirm) {
                        handleWithdraw();
                    }
                }
            );
        }
    }

    const handleWithdraw = () => {
        if (!withdrawAmount || !walletAddress) {
            setIsErrorSnackbarOpen(true);
            return;
        }

        const withdrawAmountFloat = parseFloat(withdrawAmount);

        if (withdrawAmountFloat < minWithdrawAmount || withdrawAmountFloat > balance) {
            setIsWarningSnackbarOpen(true);
            return;
        }

        // Логика вывода средств
        setIsSnackbarOpen(true);

        setTimeout(() => {
            setIsSnackbarOpen(false);
            setIsWarningSnackbarOpen(false);
            setIsErrorSnackbarOpen(false);
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
                                width: '100%'
                            }}>
                            <Button onClick={handleMaxAmount}>
                                {t('mining.pages.menu.withdraw.max')}
                            </Button>
                        </Box>
                    </Box>
                    <SwapVerticalCircleOutlinedIcon
                        sx={{
                            color: 'var(--tg-theme-text-color)',
                            width: '30px',
                            height: '30px',
                            margin: '5px'
                        }} />
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
                                onChange={(e) => handleAmountChange(e, 'withdraw-amount-coin')}
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
                                TRC20
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: '100%'
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
                            }}>{t('mining.pages.menu.withdraw.menu_btn')}</Typography>
                    </Button>
                </Box>
                <Snackbar
                    open={isSnackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setIsSnackbarOpen(false)}
                >
                    <Alert severity="success" sx={{ width: '100%' }}>
                        {t('mining.pages.menu.withdraw.snackbars.success')}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={isWarningSnackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setIsWarningSnackbarOpen(false)}
                >
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {t('mining.pages.menu.withdraw.snackbars.error_balance')}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={isErrorSnackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setIsErrorSnackbarOpen(false)}
                >
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {t('mining.pages.menu.withdraw.snackbars.error_full')}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    message={`${t('mining.pages.mainMining.days_snackbar_1')} ${daysUntilWithdrawal} ${t('mining.pages.mainMining.days_snackbar_2')}`}
                />
            </Box>
        </>
    );
};

export default Withdraw;
