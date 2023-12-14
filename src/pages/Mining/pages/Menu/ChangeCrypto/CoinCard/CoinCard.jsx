import React from 'react';
import { Box, Card, CardContent, Checkbox, Typography } from '@mui/material';

const CoinCard = ({ icon, text, selected, onClick }) => {
    return (
        <Card
            sx={{
                display: 'flex',
                width: '170px',
                height: '70px',
                alignItems: 'center',
                border: selected ? '1px solid rgba(45, 176, 25, 0.8)' : '1px solid var(--tg-theme-hint-color)',
                transition: 'border 0.3s ease',
                cursor: 'pointer',
                margin: '10px',
            }}
            onClick={onClick}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '10px',
                    '&.MuiCardContent-root:last-child': {
                        paddingBottom: '10px'
                    }
                }}
            >
                <Box
                    component='img'
                    src={icon}
                    alt='Icon'
                    sx={{
                        width: '40px',
                        marginRight: '10px'
                    }}
                />
                <Typography variant="h6" component="div"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                >
                    {text}
                </Typography>
                <Checkbox
                    checked={selected}
                    sx={{
                        color: 'var(--tg-theme-hint-color)',
                        '&.Mui-checked': {
                            color: 'rgba(45, 176, 25, 0.8)',
                        },
                    }}
                />
            </CardContent>
        </Card>
    );
};

export default CoinCard;