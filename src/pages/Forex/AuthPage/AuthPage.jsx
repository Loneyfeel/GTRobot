import React, {lazy, useEffect, useState} from 'react';
import {Backdrop, Box, Button, CircularProgress, Paper, Typography} from "@mui/material";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import ForexAuthTextField from "./ForexAuthTextField";
import ForexServerAutocomplete from "./ForexServerAutocomplete/index.js";
import CustomAlert from "../CustomAlert/index.js";

const ForexSettings = lazy(() => import('../ForexSettings'));

const AuthPage = () => {

    const [isVisibleForexSettings, setVisibleForexSettings] = useState(false);
    const [invalidData, setInvalidData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
    const proxy = 'https://corsproxy.io/?';


    useEffect(() => {
        const fetchDataExists = async () => {
            try {
                const response = await axios.post(
                    `${proxy}https://ad7ab0c42e73.ngrok.app/api/forex-data-exists`,
                    {
                        userId,
                    }
                );
                console.log(response, 'при загрузке страницы');
                if (response.data.errorCode === 1006) {
                    // Перенаправление на другую страницу
                    window.location.href = '#';
                }
                if (response.data.status === true) {
                    // Перенаправление на другую страницу
                    setVisibleForexSettings(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                // Set loading to false after data fetching is complete
                setIsLoading(false);
            }
        };
        fetchDataExists();
    }, []);

// Состояния для полей ввода
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userServer, setUserServer] = useState('');
    const [error400Alert, setError400Alert] = useState(false);

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            setInvalidData(false);
            console.log('log)', userLogin, '  pas)', userPassword, '  ser)', userServer)
            const response = await axios.post(`${proxy}https://ad7ab0c42e73.ngrok.app/api/save-forex-data`, {
                userId,
                userLogin,
                userPassword,
                userServer,
            });
            console.log(response, 'если нужна регистрация')
            if (response.data.errorCode === 1001) {
                setInvalidData(true);
                setTimeout(() => {
                    setInvalidData(false);
                }, 3000);
            } else {
                // Успешная обработка
                handleForexSettingsVisible();
            }
        } catch (error) {
            console.error('Error updating forex status:', error);

            if (error.response && error.response.status === 400) {
                // Обработка ошибки 400 (некорректные данные запроса)
                console.error('Invalid request data:', error.response.data);
                setError400Alert(true);
                setTimeout(() => setError400Alert(false), 3000);
            } else {
                // Обработка других ошибок
                console.error('Other error:', error);
                setErrorAlert(true);
                Z
                setTimeout(() => setErrorAlert(false), 3000);
            }
        } finally {
            setIsLoading(false);
        }
    }


    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleForexSettingsVisible = () => {
        setVisibleForexSettings(!isVisibleForexSettings)
    }

    const {t} = useTranslation()

    return (
        <>
            <Backdrop
                sx={{
                    color: 'var(--tg-theme-text-color)',
                    backgroundColor: 'var(--tg-theme-bg-color)',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            {(isVisibleForexSettings || !isLoading) && (
                isVisibleForexSettings ? (
                    <ForexSettings
                        isVisibleForexSettings={isVisibleForexSettings}
                        handleForexSettingsVisible={handleForexSettingsVisible}
                    />
                ) : (
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 'var(--tg-viewport-height)',
                            backgroundColor: 'var(--tg-theme-secondary-bg-color)'
                        }}>
                        <Box
                            component={Paper}
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                backgroundColor: 'var(--tg-theme-bg-color)',
                                padding: '20px 25px'
                            }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around',
                                    width: '100%',
                                }}>
                                <Typography
                                    sx={{
                                        padding: '10px 0'
                                    }}>
                                    {t('forex.auth.title')}
                                </Typography>
                                <ForexAuthTextField
                                    label={t('forex.auth.form.login')}
                                    type="text"
                                    value={userLogin}
                                    onChange={(e) => setUserLogin(e.target.value)}
                                />
                                <ForexAuthTextField
                                    label={t('forex.auth.form.password')}
                                    type="password"
                                    showPassword={showPassword}
                                    handleTogglePassword={handleTogglePassword}
                                    value={userPassword}
                                    onChange={(e) => setUserPassword(e.target.value)}
                                />
                                <ForexServerAutocomplete
                                    value={userServer}
                                    onChange={(value) => setUserServer(value)}/>
                            </Box>
                            <Button
                                onClick={handleLogin}
                                variant="contained"
                                sx={{
                                    minWidth: '100px',
                                    margin: '10px 0',
                                    backgroundColor: invalidData ? 'rgba(227, 45, 45, 0.8)' : undefined,
                                }}
                            >{t('forex.auth.button_logIn')}</Button>
                            {invalidData && (
                                <Typography sx={{color: 'rgba(227, 45, 45, 0.8)', marginTop: '5px'}}>
                                    {t('forex.auth.error')}
                                </Typography>
                            )}
                        </Box>
                        <CustomAlert
                            open={error400Alert}
                            onClose={() => setError400Alert(false)}
                            severity="error"
                            message={t('forex.settings.alerts.error400')}
                        />
                    </Box>
                ))}
        </>
    );
}

export default AuthPage;
