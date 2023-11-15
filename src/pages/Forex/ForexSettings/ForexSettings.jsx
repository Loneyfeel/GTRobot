import React, {useState} from 'react';
import {Alert, Backdrop, Box, Button, CircularProgress, Snackbar, Stack} from "@mui/material";
import {useTranslation} from "react-i18next";

import BalancePanel from './BalancePanel';
import ForexTable from './ForexTable';

import axios from 'axios';

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
                        }}>
                        <BalancePanel
                            balance="23432,47"
                            tradeIsEnabled={tradeIsEnabled}
                            onToggle={handleToggle}
                            onSnackClick={handleSnackOnClick}
                            onSnackOffClick={handleSnackOffClick}
                        />
                        <Box
                            sx={{
                                width: '100%',
                                bgcolor: 'var(--tg-theme-bg-color)',
                            }}>
                            <ForexTable />
                        </Box>
                        <Button
                            onClick={() => {
                                setTradeIsEnabled(false);
                                handleForexSettingsVisible();
                            }}
                            variant="contained"
                            sx={{
                                borderRadius: '5px',
                                width: '100px',
                                margin: '10px'
                            }}
                        >
                            {t('forex.auth.button_logOut')}
                        </Button>
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
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isLoading}
                onClick={isLodaingFalse}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    );
}
export default ForexSettings;