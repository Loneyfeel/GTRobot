import React from 'react';
import {Box, Button, CardMedia, Typography} from "@mui/material";
import gif from './assets/AnimatedSticker.gif'
import {useTranslation} from "react-i18next";

const NoSubscribe = () => {
    window.Telegram.WebApp.BackButton.isVisible = true;
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.BackButton.onClick(async () => {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');

        window.location.href = '/';
    });

    const { t } = useTranslation();
    return (
        <>
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 'var(--tg-viewport-height)',
                backgroundColor: 'var(--tg-theme-bg-color)',
                color: 'var(--tg-theme-text-color)',
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
                    }}>{t('noSubscribe.title')}</Typography>
                    <Typography
                        sx={{
                            margin: '20px',
                            textAlign: 'center',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >{t('noSubscribe.text')}</Typography>
                </Box>
                <Box>
                    <Button
                        onClick={() => {
                            window.Telegram.WebApp.openTelegramLink('https://t.me/UZBCommunityBot?start=cGxhbg')
                            window.Telegram.WebApp.close()
                        }}
                    variant="contained"
                    sx={{
                        color: 'var(--tg-theme-text-color)'
                    }}>{t('noSubscribe.button')}</Button>
                </Box>
            </Box>
        </>
    );
};

export default NoSubscribe;