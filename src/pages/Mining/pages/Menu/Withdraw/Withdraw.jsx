import React, {startTransition, useEffect, useState} from 'react';
import { Alert, Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import {useTranslation} from "react-i18next";

const Withdraw = ({ setIsSectionOpen }) => {
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [isWarningSnackbarOpen, setIsWarningSnackbarOpen] = useState(false);
    const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useState(false);
    const [daysUntilWithdrawal, setDaysUntilWithdrawal] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const minWithdrawAmount = 999999999999999999;

    useEffect(() => {
        setIsSectionOpen(true);
        return () => setIsSectionOpen(false);
    }, [setIsSectionOpen]);

    const handleWithdraw = () => {
        // Проверка на пустые поля
        if (!withdrawAmount || !walletAddress) {
            // Показываем Snackbar с ошибкой
            setIsErrorSnackbarOpen(true);
            return;
        }

        if (parseFloat(withdrawAmount) < minWithdrawAmount) {
            // Показываем предупреждение
            setIsWarningSnackbarOpen(true);
        } else {
            // Показываем уведомление об успешном выводе
            setIsSnackbarOpen(true);
        }

        // Закрываем Snackbar через 3 секунды
        setTimeout(() => {
            setIsSnackbarOpen(false);
            setIsWarningSnackbarOpen(false);
            setIsErrorSnackbarOpen(false);
        }, 3000);
    }

    const handleWithdrawAmountChange = (e) => {
        // Проверка на ввод только чисел
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value) || value === '') {
            setWithdrawAmount(value);
        }
    }

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

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const { t } = useTranslation();

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
                    <TextField
                        id="withdraw-amount"
                        label={t('mining.pages.menu.withdraw.textField_1')}
                        sx={{
                            width: '95%',
                            marginBlock: '10px 10px',
                            '& .MuiFormLabel-colorPrimary': {
                                color: 'var(--tg-theme-hint-color)'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--tg-theme-text-color)',
                                borderRadius: '7px',
                            },
                            '& .MuiFormHelperText-root': {
                                color: 'var(--tg-theme-hint-color)'
                            }
                        }}
                        value={withdrawAmount}
                        onChange={handleWithdrawAmountChange}
                    />
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
                            borderRadius: '7px'
                        }}
                    >
                        <Typography
                            sx={{
                                marginTop: '2px',
                                fontSize: '14px',
                                color: 'var(--tg-theme-text-color)'
                        }}>{t('mining.pages.menu.withdraw.main_btn')}</Typography>
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
                    onClose={handleCloseSnackbar}
                    message={`${t('mining.pages.mainMining.days_snackbar_1')} ${daysUntilWithdrawal} ${t('mining.pages.mainMining.days_snackbar_2')}`}
                />
            </Box>
        </>
    );
};

export default Withdraw;
