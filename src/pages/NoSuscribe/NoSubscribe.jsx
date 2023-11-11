import React from 'react';
import {Box, Button, CardMedia, Typography} from "@mui/material";
import gif from './assets/AnimatedSticker.gif'

const NoSubscribe = () => {
    return (
        <>
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 'var(--tg-viewport-height)',
                backgroundColor: 'var(--tg-theme-bg-color)',
                color: 'var(--tg-theme-text-color)'
            }}>
                <Box>
                    <CardMedia
                        component="img"
                        height="170"
                        image={gif}
                        alt="Utya Grustya"
                        sx={{
                            margin: '40px 0'
                        }}
                    />
                </Box>
                <Box>
                    <Typography
                    sx={{
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: '500'
                    }}>Кажется, вы не купили подписку</Typography>
                    <Typography
                        sx={{
                            margin: '20px',
                            textAlign: 'center',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >Приобретите подписку, которая открывает такие функции, как Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur </Typography>
                </Box>
                <Box>
                    <Button
                    variant="contained">Приобрести подписку</Button>
                </Box>
            </Box>
        </>
    );
};

export default NoSubscribe;