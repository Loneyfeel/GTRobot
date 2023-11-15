import React, {useEffect, useState} from 'react';
import {Backdrop, Box, Button, CircularProgress, Paper, Typography} from "@mui/material";
import { useTranslation } from "react-i18next";
import ForexSettings from "../ForexSettings/index.js";
import ForexAuthTextField from "./ForexAuthTextField";
import axios from 'axios';

const AuthPage = () => {

    const [isVisibleForexSettings, setVisibleForexSettings] = useState(false);
    const [invalidData, setInvalidData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [forexDataExists, setForexDataExists] = useState(null);

    const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
    const proxy = 'https://corsproxy.io/?';


    useEffect(() => {
        const fetchDataExists = async () => {
            try {
                const response = await axios.post(`${proxy}https://gtrobot.ngrok.dev/api/forex-data-exists`, {
                    userId,
                });
                setForexDataExists(response.data);
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
            }
        };
        fetchDataExists();
    }, []);

// Состояния для полей ввода
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userServer, setUserServer] = useState('');

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            setInvalidData(false);

            const response = await axios.post('https://corsproxy.io/https://gtrobot.ngrok.dev/api/login', {
                userId,
                userLogin,
                userPassword,
                userServer,
            });

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
            console.error('Error during login:', error);
        } finally {
            setIsLoading(false);
        }
    };



    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleForexSettingsVisible = () => {
        setVisibleForexSettings(!isVisibleForexSettings)
    }

    const { t } = useTranslation()

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <ForexSettings isVisibleForexSettings={isVisibleForexSettings} handleForexSettingsVisible={handleForexSettingsVisible}/>
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
                            label="Login"
                            type="text"
                            value={userLogin}
                            onChange={(e) => setUserLogin(e.target.value)}
                        />
                        <ForexAuthTextField
                            label="Password"
                            type="password"
                            showPassword={showPassword}
                            handleTogglePassword={handleTogglePassword}
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                        <ForexAuthTextField
                            label="Server"
                            type="text"
                            value={userServer}
                            onChange={(e) => setUserServer(e.target.value)}
                        />
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
                        <Typography sx={{ color: 'rgba(227, 45, 45, 0.8)', marginTop: '5px' }}>
                            Invalid data
                        </Typography>
                    )}
                </Box>
            </Box>
        </>
    );
}

export default AuthPage;
