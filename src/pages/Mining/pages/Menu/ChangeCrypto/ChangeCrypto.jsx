import React, { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";
import CoinCard from './CoinCard';
import { getMiningUserData, saveMiningUserCryptoCurrency } from '../../../components/Requests/Requests.js';
import bitcoinIcon from '../../../assets/bitcoin-btc-logo.svg';
import dogeIcon from '../../../assets/dogecoin-doge-logo.svg';
import shibaIcon from '../../../assets/shiba-inu-shib-logo.svg';
import tonIcon from '../../../assets/ton_symbol.svg';

const ChangeCrypto = ({ setIsSectionOpen }) => {
    const [selectedCrypto, setSelectedCrypto] = useState('');

    useEffect(() => {
        setIsSectionOpen(true);
        // Загрузка данных пользователя при монтировании компонента
        getMiningUserData().then(response => {
            const { crypto_currency } = response.data;
            setSelectedCrypto(crypto_currency);
        });

        return () => setIsSectionOpen(false);
    }, [setIsSectionOpen]);

    const handleCardClick = (crypto) => {
        // Обновление состояния выбранной криптовалюты
        setSelectedCrypto(crypto);
        // Отправка запроса на изменение криптовалюты
        saveMiningUserCryptoCurrency(crypto);
    };

    return (
        <>
            <Box
                sx={{
                    bgcolor: 'var(--tg-theme-bg-color)',
                    color: 'var(--tg-theme-text-color)',
                    minHeight: '90vh',
                    width: '100%',
                    position: 'absolute',
                    top: '44px'
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
                            margin: '20px',
                            color: 'var(--tg-theme-text-color)',
                            fontSize: '18px',
                            cursor: 'default'
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
                        <CoinCard icon={bitcoinIcon} text={'BTC'} selected={selectedCrypto === 'btc'} onClick={() => handleCardClick('btc')} />
                        <CoinCard icon={dogeIcon} text={'DOGE'} selected={selectedCrypto === 'doge'} onClick={() => handleCardClick('doge')} />
                        <CoinCard icon={tonIcon} text={'TON'} selected={selectedCrypto === 'ton'} onClick={() => handleCardClick('ton')} />
                        <CoinCard icon={shibaIcon} text={'SHIBA'} selected={selectedCrypto === 'shib'} onClick={() => handleCardClick('shib')} />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ChangeCrypto;