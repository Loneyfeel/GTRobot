import React from 'react';
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const ForexBalance = ({ tradeIsEnabled, handleToggle }) => {
    const { t } = useTranslation();

    return (
        <Box>
            <Typography
                sx={{
                    paddingBlock: '30px 10px',
                    width: '100%',
                    color: 'var(--tg-theme-hint-color)',
                }}
            >
                {t('forex.settings.balance')}
            </Typography>
            <Typography
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    paddingBlock: '0 30px',
                    width: '100%',
                    fontSize: '25px',
                    color: 'var(--tg-theme-text-color)',
                }}
            >
                23432,47
                <Typography
                    sx={{
                        paddingLeft: '5px',
                        fontSize: '25px',
                        color: 'var(--tg-theme-hint-color)',
                    }}
                >
                    $
                </Typography>
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Button
                    disabled={tradeIsEnabled}
                    onClick={() => {
                        handleToggle();
                    }}
                    sx={{
                        fontSize: '18px',
                        width: '85px',
                        height: '35px',
                        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.2)',
                        backgroundColor: 'var(--tg-theme-button-color)',
                        color: 'var(--tg-theme-text-color)',
                        borderRadius: '5px',
                        border: '1px solid var(--tg-theme-button-color)',
                        '&:disabled': {
                            backgroundColor: 'unset',
                            color: '#666',
                            border: '1px solid #666',
                            boxShadow: 'unset',
                        },
                        '&:active': {
                            boxShadow: 'unset',
                        },
                        marginBottom: '10px',
                    }}
                >
                    On
                </Button>
                <Button
                    disabled={!tradeIsEnabled}
                    onClick={() => {
                        handleToggle();
                    }}
                    sx={{
                        fontSize: '20px',
                        width: '85px',
                        height: '35px',
                        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.2)',
                        backgroundColor: 'var(--tg-theme-button-color)',
                        color: 'var(--tg-theme-text-color)',
                        borderRadius: '5px',
                        border: '1px solid var(--tg-theme-button-color)',
                        '&:disabled': {
                            backgroundColor: 'unset',
                            color: '#666',
                            border: '1px solid #666',
                            boxShadow: 'unset',
                        },
                        '&:active': {
                            boxShadow: 'unset',
                        },
                    }}
                >
                    Off
                </Button>
            </Box>
        </Box>
    );
};

export default ForexBalance;
