import React from 'react';
import { Box, Typography } from '@mui/material';
import AutoButton from './AutoButton';

const BalancePanel = ({ balance, tradeIsEnabled, onToggle, onSnackClick, onSnackOffClick }) => {
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
                        Баланс
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
                        {balance}
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
                        onSnackClick={onSnackClick}
                        label="ON"
                        fontSize="18px"
                        width="85px"
                        height="35px"
                    />
                    <AutoButton
                        isEnabled={!tradeIsEnabled}
                        onClick={onToggle}
                        onSnackClick={onSnackOffClick}
                        label="OFF"
                        fontSize="18px"
                        width="85px"
                        height="35px"
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default BalancePanel;
