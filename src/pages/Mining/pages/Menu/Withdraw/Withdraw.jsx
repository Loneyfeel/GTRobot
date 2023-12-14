import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Snackbar, TextField, Typography } from "@mui/material";

const Withdraw = ({ setIsSectionOpen }) => {
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [isWarningSnackbarOpen, setIsWarningSnackbarOpen] = useState(false);
    const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useState(false);
    const minWithdrawAmount = 0.0025;

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

    return (
        <>
            <Box
                sx={{
                    bgcolor: 'var(--tg-theme-bg-color)',
                    color: 'var(--tg-theme-text-color)',
                    minHeight: '90vh',
                    width: '100%',
                    position: 'absolute',
                    top: '44px'
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
                        Вывод баланса
                    </Typography>
                    <TextField
                        id="withdraw-amount"
                        label={`Сумма вывода`}
                        helperText={`min= ${minWithdrawAmount}`}
                        sx={{
                            width: '95%',
                            marginBlock: '10px 10px',
                            '& .MuiFormLabel-colorPrimary': {
                                color: 'var(--tg-theme-hint-color)'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--tg-theme-text-color)'
                            },
                            '& .MuiFormHelperText-root': {
                                color: 'var(--tg-theme-hint-color)'
                            }
                        }}
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                    <TextField
                        id="wallet-address"
                        label="Адрес кошелька"
                        sx={{
                            width: '95%',
                            marginBlock: '15px 20px',
                            '& .MuiFormLabel-colorPrimary': {
                                color: 'var(--tg-theme-hint-color)'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'var(--tg-theme-text-color)'
                            },
                        }}
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                    />
                    <Button
                        variant='contained'
                        onClick={() => {
                            window.Telegram.WebApp.showConfirm(
                                `Сумма: ${withdrawAmount} \n` +
                                `Адрес: ${walletAddress}\n\n` +
                                'Все верно?',
                                (confirm) => {
                                    if (confirm) {
                                        handleWithdraw();
                                    }
                                }
                            );
                        }}
                    >
                        Вывести
                    </Button>
                </Box>
                {/* Snackbar для успешного вывода */}
                <Snackbar
                    open={isSnackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setIsSnackbarOpen(false)}
                >
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Успешный вывод
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={isWarningSnackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setIsWarningSnackbarOpen(false)}
                >
                    <Alert severity="error" sx={{ width: '100%' }}>
                        Сумма вывода меньше минимальной
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={isErrorSnackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setIsErrorSnackbarOpen(false)}
                >
                    <Alert severity="error" sx={{ width: '100%' }}>
                        Пожалуйста, заполните все поля
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
};

export default Withdraw;
