import React, {useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const ForexSettings = ({isVisibleForexSettings, handleForexSettingsVisible}) => {

    const [tradeIsEnabled, setTradeIsEnabled] = useState(false);

    const handleToggle = () => {
        setTradeIsEnabled((prev) => !prev);
    };

    const {t} = useTranslation()

    return (
        <>
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
                            variant={tradeIsEnabled ? 'contained' : 'outlined'}
                            disabled={!tradeIsEnabled}
                            onClick={handleToggle}
                            sx={{
                                fontSize: '20px',
                                width: '100px',
                                height: '50px',
                                marginRight: '20px'
                            }}
                        >
                            Off
                        </Button>
                        <Button
                            variant={tradeIsEnabled ? 'outlined' : 'contained'}
                            disabled={tradeIsEnabled}
                            onClick={handleToggle}
                            sx={{
                                fontSize: '20px',
                                width: '100px',
                                height: '50px',
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
        </>
    );
}

export default ForexSettings;