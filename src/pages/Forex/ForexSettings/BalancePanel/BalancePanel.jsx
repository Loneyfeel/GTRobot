import React, {lazy} from 'react';
import { Box, Typography } from '@mui/material';
import {useTranslation} from "react-i18next";

const AutoButton = lazy(() => import('./AutoButton'));

const BalancePanel = ({ balance, tradeIsEnabled, onToggle }) => {
    const {t} = useTranslation();
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                bgcolor: 'var(--tg-theme-bg-color)',
                marginBottom: '15px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '90%',
                }}
            >
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
                    <Box
                    sx={{
                        display: 'flex'
                    }}>
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
                        {balance}
                    </Typography>
                            <Typography
                                sx={{
                                    paddingLeft: '5px',
                                    fontSize: '25px',
                                    color: 'var(--tg-theme-hint-color)',
                                }}
                            >
                                $
                            </Typography>
                        </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <AutoButton
                        isEnabled={tradeIsEnabled}
                        onClick={onToggle}
                        label="ON"
                        fontSize="18px"
                        width="85px"
                        height="35px"
                    />
                    <AutoButton
                        isEnabled={!tradeIsEnabled}
                        onClick={onToggle}
                        label="OFF"
                        fontSize="18px"
                        width="85px"
                        height="35px"
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default BalancePanel;
