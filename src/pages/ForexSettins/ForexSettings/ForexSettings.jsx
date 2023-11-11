import React, {useState} from 'react';
import {Alert, Backdrop, Box, Button, CircularProgress, Snackbar, Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const ForexSettings = ({isVisibleForexSettings, handleForexSettingsVisible}) => {

    //ТУТ НАДО БУДЕТ ДОБАВИТЬ ЗАГРУЗКУ СТРАНИЦЫ, ПОКА НЕ ПРИЙДЕТ ОТВЕТ ОТ СЕРВЕРА И АЛЕРТЫ УЖЕ ПОСЛЕ ЗАГРУЗКИ
    // добавить случай, если что-то пойдет не так (отобраить алерт, поставить кнопку в офф)
    // и кстати его можно добавить и в регистрацию

    const [isLoading, setIsLoding] = useState(false)
    const isLodaingFalse = () => {
        setIsLoding(false);
    };
    const isLodaingTrue = () => {
        setIsLoding(true);
    };

    const [tradeIsEnabled, setTradeIsEnabled] = useState(false);
    const handleToggle = () => {
        setTradeIsEnabled((prev) => !prev);
    };


    const [openSnackOn, setOpenSnackOn] = React.useState(false);
    const [openSnackOff, setOpenSnackOff] = React.useState(false);

    const handleSnackOnClick = () => {
        setOpenSnackOn(true);
    };
    const handleSnackOnClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackOn(false);
    };
    const handleSnackOffClick = () => {
        setOpenSnackOff(true);
    };
    const handleSnackOffClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackOff(false);
    };


    const {t} = useTranslation()

    return (
        <>
            <Stack>
                <Box
                    sx={{
                        display: `${isVisibleForexSettings ? '' : 'none'}`,
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        height: 'var(--tg-viewport-height)',
                        width: '100%',
                        backgroundColor: 'var(--tg-theme-bg-color)',
                        color: 'var(--tg-theme-text-color)',
                        zIndex: '10'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                        }}>
                        <Typography
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                paddingBlock: '20px 40px',
                                width: '100%'
                            }}>
                            {t('forex.settings.title')}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%'
                            }}>
                            <Button
                                disabled={!tradeIsEnabled}
                                onClick={() => {
                                    handleToggle()
                                    handleSnackOffClick()
                                }}
                                sx={{
                                    fontSize: '20px',
                                    width: '85px',
                                    height: '35px',
                                    marginRight: '18px',
                                    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.2)',
                                    backgroundColor: 'var(--tg-theme-button-color)',
                                    color: 'var(--tg-theme-text-color)',
                                    border: '1px solid var(--tg-theme-button-color)',
                                    '&:disabled': {
                                        backgroundColor: 'unset',
                                        color: '#666',
                                        border: '1px solid #666',
                                        boxShadow: 'unset'
                                    },
                                    '&:active': {
                                        boxShadow: 'unset'
                                    }
                                }}
                            >
                                Off
                            </Button>
                            <Button
                                disabled={tradeIsEnabled}
                                onClick={() => {
                                    handleToggle()
                                    handleSnackOnClick()
                                }}
                                sx={{
                                    fontSize: '18px',
                                    width: '85px',
                                    height: '35px',
                                    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.2)',
                                    backgroundColor: 'var(--tg-theme-button-color)',
                                    color: 'var(--tg-theme-text-color)',
                                    border: '1px solid var(--tg-theme-button-color)',
                                    '&:disabled': {
                                        backgroundColor: 'unset',
                                        color: '#666',
                                        border: '1px solid #666',
                                        boxShadow: 'unset'
                                    },
                                    '&:active': {
                                        boxShadow: 'unset'
                                    }
                                }}
                            >
                                On
                            </Button>
                        </Box>
                        <Button
                            onClick={() => {
                                setTradeIsEnabled(false);
                                handleForexSettingsVisible();
                            }}
                            variant="contained"
                            sx={{
                                width: '100px',
                                marginTop: '220px',
                                marginRight: '20px'
                            }}
                        >{t('forex.auth.button_logOut')}</Button>
                    </Box>
                </Box>
                <Snackbar
                    open={openSnackOn}
                    autoHideDuration={3000}
                    onClose={handleSnackOnClose}
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Alert onClose={handleSnackOnClose} severity="success"
                           sx={{
                               width: '100%',
                               backgroundColor: 'var(--tg-theme-secondary-bg-color)',
                               color: 'var(--tg-theme-text-color)'
                    }}>
                        {t('forex.settings.alerts.success')}
                    </Alert>
                </Snackbar>
                <Snackbar open={openSnackOff} autoHideDuration={3000} onClose={handleSnackOffClose}
                          sx={{
                              display: 'flex',
                              justifyContent: 'center'
                          }}>
                    <Alert onClose={handleSnackOffClose} severity="info"
                           sx={{
                               width: '100%',
                               backgroundColor: 'var(--tg-theme-secondary-bg-color)',
                               color: 'var(--tg-theme-text-color)'
                           }}>
                        {t('forex.settings.alerts.info')}
                    </Alert>
                </Snackbar>
            </Stack>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
                onClick={isLodaingFalse}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default ForexSettings;