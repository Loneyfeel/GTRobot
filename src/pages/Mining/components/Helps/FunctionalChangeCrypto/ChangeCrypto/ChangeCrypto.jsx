import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Alert, Box, Button, Snackbar, SnackbarContent, Typography} from "@mui/material";
import CoinCard from './CoinCard';
import { saveMiningUserCryptoCurrency } from '../../../Requests/Requests.js';
import bitcoinIcon from '../../../../assets/bitcoin-btc-logo.svg';
import dogeIcon from '../../../../assets/dogecoin-doge-logo.svg';
import shibaIcon from '../../../../assets/shiba-inu-shib-logo.svg';
import tonIcon from '../../../../assets/ton_symbol.svg';
import {useTranslation} from "react-i18next";

const ChangeCrypto = ({handleNextComponent}) => {
    const { t } = useTranslation();
    const [selectedCrypto, setSelectedCrypto] = useState('');
    const [buttonState, setButtonState] = useState({
        selected: false,
        text: `${t('mining.components.helps.functionalChangeCrypto.change')}`,
    });
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('miningUserData')) || {};
        setSelectedCrypto(storedData.crypto_currency || 'btc');
    }, []);

    const handleCardClick = (crypto) => {
        setSelectedCrypto(crypto);
        const storedData = JSON.parse(localStorage.getItem('miningUserData')) || {};
        storedData.crypto_currency = crypto;
        localStorage.setItem('miningUserData', JSON.stringify(storedData));
        saveMiningUserCryptoCurrency(crypto);

        // Сброс состояния кнопки
        setButtonState({
            selected: false,
            text: `${t('mining.components.helps.functionalChangeCrypto.change')}`,
        });
    };

    const handleButtonClick = () => {
        // Изменение состояния кнопки при нажатии, только если она не была выбрана
        if (!buttonState.selected) {
            setButtonState({
                selected: true,
                text: `${t('mining.components.helps.functionalChangeCrypto.success')}`,
            });
            setTimeout(() => {
                handleNextComponent();
            }, 700);
        }
    };
    const handleBoxClick = () => {
        if (!buttonState.selected) {
            setIsSnackbarOpen(true);
        }
    };

    const coinData = [
        { crypto: 'btc', icon: bitcoinIcon, text: `${t('mining.pages.menu.coins.text_btc')}` },
        { crypto: 'doge', icon: dogeIcon, text: `${t('mining.pages.menu.coins.text_doge')}` },
        { crypto: 'ton', icon: tonIcon, text: `${t('mining.pages.menu.coins.text_ton')}` },
        { crypto: 'shib', icon: shibaIcon, text: `${t('mining.pages.menu.coins.text_shib')}` },
    ];

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
            >
                <Box
                    sx={{
                        bgcolor: 'var(--tg-theme-bg-color)',
                        color: 'var(--tg-theme-text-color)',
                        minHeight: '90vh',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                margin: '10px',
                                color: 'var(--tg-theme-text-color)',
                                fontSize: '18px',
                                cursor: 'default',
                            }}
                        >
                            Выбор монеты
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                            }}
                        >
                            <CoinCard
                                icon={bitcoinIcon}
                                text={'BTC'}
                                selected={selectedCrypto === 'btc'}
                                onClick={() => handleCardClick('btc')}
                            />
                            <CoinCard
                                icon={dogeIcon}
                                text={'DOGE'}
                                selected={selectedCrypto === 'doge'}
                                onClick={() => handleCardClick('doge')}
                            />
                            <CoinCard
                                icon={tonIcon}
                                text={'TON'}
                                selected={selectedCrypto === 'ton'}
                                onClick={() => handleCardClick('ton')}
                            />
                            <CoinCard
                                icon={shibaIcon}
                                text={'SHIBA'}
                                selected={selectedCrypto === 'shib'}
                                onClick={() => handleCardClick('shib')}
                            />
                        </Box>
                    </Box>
                    <Box
                    sx={{
                        height: '240px'
                    }}>
                        <AnimatePresence mode="wait">
                            {coinData.map((coin) => (
                                selectedCrypto === coin.crypto && (
                                    <motion.div
                                        key={coin.crypto}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Box
                                            sx={{
                                                margin: '50px 15px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-around',
                                                height: '100%',
                                            }}
                                        >
                                            <Box
                                                component='img'
                                                src={coin.icon}
                                                sx={{
                                                    height: '100px',
                                                    marginRight: '20px',
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontSize: '12px',
                                                }}
                                            >
                                                {coin.text}
                                            </Typography>
                                        </Box>
                                    </motion.div>
                                )
                            ))}
                        </AnimatePresence>
                    </Box>
                    <Box sx={{
                        marginTop: '10px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Button
                            variant='contained'
                            onClick={handleButtonClick}
                            sx={{
                                backgroundColor: buttonState.selected ? '#269926' : 'var(--tg-theme-button-color)',
                                color: 'var(--tg-theme-text-color)',
                                border: 'none',
                                padding: '10px',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                outline: 'none',
                                marginTop: '10px',
                                '&.MuiButtonBase-root:focus':{
                                    backgroundColor: buttonState.selected ? '#269926' : 'var(--tg-theme-button-color)',
                                }
                            }}
                        >
                            <Typography
                            sx={{
                                paddingTop: '3px'
                            }}>{buttonState.text}</Typography>
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        display: buttonState.selected ? 'none' : 'block',
                        top: '-40px',
                        right: '0',
                        width: '50px',
                        height: '40px',
                    }}
                    onClick={handleBoxClick}
                />
                <Snackbar
                    open={isSnackbarOpen}
                    autoHideDuration={2000}
                    onClose={() => setIsSnackbarOpen(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        severity="error"
                        sx={{
                            width: '95%'
                        }}
                    >
                        {t('mining.components.helps.functionalChangeCrypto.error')}
                    </Alert>
                </Snackbar>
            </motion.div>
        </>
    );
};

export default ChangeCrypto;