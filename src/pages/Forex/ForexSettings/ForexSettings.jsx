import React, {lazy, useEffect, useState} from 'react';
import { Backdrop, Box, Button, CircularProgress, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import axios from 'axios';
import CustomAlert from "../CustomAlert/index.js";
import {initData, userId} from '../../../shared/telegram/telegram.js'
import {host} from "../../../shared/host/host.js";

const BalancePanel = lazy(() => import('./BalancePanel'));
const ForexTable = lazy(() => import('./ForexTable'));

const ForexSettings = ({ isVisibleForexSettings, handleForexSettingsVisible }) => {
    const [accountData, setAccountData] = useState({
        data: {
            balance: 0,
            status: false,
            statistics: [{timestamp: 0, profit: 0}]
        }
    }); // добавляем состояние для хранения данных об аккаунте


    useEffect(() => {
        fetchAccountData();
    }, []);

    const fetchAccountData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${host}/api/get-forex-data`,
                {
                    initData,
                    userId,
                }
            )
                if (response.data && response.data.data && response.data.data.status !== undefined) {
                    // Если запрос успешен, обновляем состояние accountData
                    setAccountData(response.data);
                    // Обновляем tradeIsEnabled с использованием безопасной проверки наличия свойства
                    setTradeIsEnabled(response.data.data.status || false);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setErrorAlert(true);
                    setTimeout(() => setErrorAlert(false), 3000);
                }
        } catch (error) {
            console.error('Error fetching account data:', error);
            if (error.response.data.errorCode === 1006) {
                // Перенаправление на другую страницу
                window.location.href = '/premium';
            }
            setErrorAlert(true);
            setTimeout(() => setErrorAlert(false), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    const [isLoading, setIsLoading] = useState(false);
    const [tradeIsEnabled, setTradeIsEnabled] = useState(accountData?.data?.status || false);
    const [errorAlert, setErrorAlert] = useState(false);

    const [openSnackOn, setOpenSnackOn] = useState(false);
    const [openSnackOff, setOpenSnackOff] = useState(false);

    const handleSnackOnClose = () => setOpenSnackOn(false);
    const handleSnackOffClose = () => setOpenSnackOff(false);
    const handleErrorAlertClose = () => setErrorAlert(false);

    const handleToggle = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${host}/api/update-forex-status`,
                {
                    initData,
                    userId,
                    userStatus: !tradeIsEnabled,
                }
            );
            if (response.data.errorCode) {
                console.error('Error updating forex status:', response.data.errorCode);
                setErrorAlert(true);
                setTimeout(() => setErrorAlert(false), 3000);
            } else {
                // Сначала устанавливаем состояние tradeIsEnabled
                setTradeIsEnabled(!tradeIsEnabled);

                // Затем открываем соответствующий алерт
                if (!tradeIsEnabled) {
                    setOpenSnackOn(true);
                } else {
                    setOpenSnackOff(true);
                }
            }
        } catch (error) {
            if (error.response.data.errorCode === 1006) {
                // Перенаправление на другую страницу
                window.location.href = '/premium';
            }
            console.error('Error updating forex status:', error);
            setErrorAlert(true);
            setTimeout(() => setErrorAlert(false), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${host}/api/delete-forex-data`,
                {
                    initData,
                    userId,
                }
            );
            if (response.data.errorCode) {
                console.error('Error during logout:', response.data.errorCode);
                setErrorAlert(true);
                setTimeout(() => setErrorAlert(false), 3000);
            } else {
                setTradeIsEnabled(false);
                // Вызываем handleForexSettingsVisible только при успешном выходе
                handleForexSettingsVisible();
            }
        } catch (error) {
            console.error('Error during logout:', error);
            if (error.response.data.errorCode === 1006) {
                // Перенаправление на другую страницу
                window.location.href = '/premium';
            }
            setErrorAlert(true);
            setTimeout(() => setErrorAlert(false), 3000);
        } finally {
            setIsLoading(false);
        }
    };


    const {t} = useTranslation();

    return (
        <>
            <Stack>
                <Box
                    sx={{
                        display: `${isVisibleForexSettings ? 'flex' : 'none'}`,
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        backgroundColor: 'var(--tg-theme-secondary-bg-color)',
                        color: 'var(--tg-theme-text-color)',
                        zIndex: '10',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            width: '100%',
                        }}
                    >
                        <BalancePanel
                            balance={accountData.data.balance}
                            tradeIsEnabled={tradeIsEnabled}
                            onToggle={handleToggle}
                        />
                        <Box
                            sx={{
                                width: '100%',
                                bgcolor: 'var(--tg-theme-bg-color)',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Box
                            sx={{
                                width: '360px'
                            }}>
                                <ForexTable accountData={accountData}/>
                            </Box>
                        </Box>
                        <Button
                            onClick={() => {
                                window.Telegram.WebApp.showConfirm(
                                       t('forex.settings.logOut_message'),
                                    (confirm) => {
                                        if (confirm) {
                                            setTradeIsEnabled(false);
                                            handleLogout();
                                        }
                                    }
                                );
                            }}
                            variant="contained"
                            sx={{
                                borderRadius: '5px',
                                width: '100px',
                                margin: '10px',
                            }}
                        >
                            {t('forex.auth.button_logOut')}
                        </Button>
                    </Box>
                </Box>
                <CustomAlert
                    open={openSnackOn}
                    onClose={handleSnackOnClose}
                    severity="success"
                    message={t('forex.settings.alerts.success')}
                />
                <CustomAlert
                    open={openSnackOff}
                    onClose={handleSnackOffClose}
                    severity="info"
                    message={t('forex.settings.alerts.info')}
                />
                <CustomAlert
                    open={errorAlert}
                    onClose={handleErrorAlertClose}
                    severity="error"
                    message={t('forex.settings.alerts.error')}
                />
            </Stack>
            <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={isLoading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    );
}

export default ForexSettings;
