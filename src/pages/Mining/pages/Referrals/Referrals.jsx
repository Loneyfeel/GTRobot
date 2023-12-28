import React, { lazy, useEffect, useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Snackbar,
    IconButton,
    SnackbarContent,
} from '@mui/material';
import {useTranslation} from "react-i18next";
import ReferralsChart from "./ReferralsChart/index.js";

const CloseIcon = lazy(() => import('@mui/icons-material/Close'));

const Referrals = () => {
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [referralBonus, setReferralBonus] = useState(0);
    const [referralCode, setReferralCode] = useState('');
    const [referrals, setReferrals] = useState([]);
    const referralLink = `https://t.me/UZBCommunityBot?start=${referralCode}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Получаем данные из local.storage
                const storedData = JSON.parse(localStorage.getItem('miningUserData')) || {};
                setReferralBonus(storedData.referral_bonus || 0);
                setReferralCode(storedData.referral_code || '');
                setReferrals(storedData.referrals || []);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const handleInviteClick = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            setIsSnackbarOpen(true)
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSnackbarOpen(false);
    };

    const {t} = useTranslation();

    return (
        <>
            <Box
                sx={{
                    minHeight: '90vh',
                    bgcolor: 'var(--tg-theme-bg-color)',
                    color: 'var(--tg-theme-text-color)',
                }}
            >
                <Box
                    sx={{
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        color: 'var(--tg-theme-text-color)',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '18px',
                            color: 'var(--tg-theme-text-color)',
                            cursor: 'default',
                        }}
                    >
                        {t('mining.pages.ref.bonus')}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '22px',
                            color: 'var(--tg-theme-text-color)',
                            cursor: 'default',
                        }}
                    >
                        + {referralBonus}%
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBlock: '10px',
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={handleInviteClick}
                        sx={{
                            color: 'var(--tg-theme-text-color)',
                        }}
                    >
                        <Typography
                            sx={{
                                marginTop: '2px',
                                fontSize: '14px',
                            }}>{t('mining.pages.ref.btn')}</Typography>
                    </Button>
                </Box>
                <Typography
                sx={{
                    margin: '40px 0 10px 20px'
                }}>
                    {t('mining.pages.ref.graphic')}:
                </Typography>
                <ReferralsChart/>
                <Box>
                    <Typography
                        sx={{
                            margin: '0 15px',
                            cursor: 'default',
                        }}
                    >
                        {t('mining.pages.ref.list')}:
                    </Typography>
                    {referrals.length > 0 ? (
                        <ul
                            style={{
                                marginLeft: '15px',
                                marginBottom: '20px'
                            }}>
                            {referrals.map((user, index) => (
                                <li key={index}>
                                    {user.user_name == null ? 'Пользователь' : user.user_name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Typography
                            sx={{
                                marginTop: '70px',
                                marginBottom: '100px',
                                textAlign: 'center',
                            }}
                        >
                            {t('mining.pages.ref.no_referrals')}
                        </Typography>
                    )}
                </Box>
            </Box>
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                sx={{
                    marginBottom: '56px',
                }}
            >
                <SnackbarContent
                    message={t('mining.pages.ref.snackbar_text')}
                    action={
                        <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
                            <CloseIcon fontSize="small"/>
                        </IconButton>
                    }
                />
            </Snackbar>
        </>
    );
}

export default Referrals;
