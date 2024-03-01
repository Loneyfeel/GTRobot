import React, { useState } from 'react';
import { Box } from "@mui/material";
import style from './functionalChangeCrypto.module.sass';
import CustomButton from "@components/CustomButton/index.js";
import { useTranslation } from "react-i18next";
import CoinCard from './CoinCard';
import DescriptionCard from "./DescriptionCard/index.js";
import { saveMiningUserCryptoCurrency } from '../../../../api/api.js';

import btc from '../../../../assets/shared/cryptoCoins/bitcoin.svg';
import doge from '../../../../assets/shared/cryptoCoins/dogecoin.svg';
import shib from '../../../../assets/shared/cryptoCoins/shibacoin.svg';
import ton from '../../../../assets/shared/cryptoCoins/toncoin.svg';

const FunctionalChangeCrypto = ({setIsUserExists}) => {
    const { t } = useTranslation();
    const [selectedCoin, setSelectedCoin] = useState('btc');
    const [selectedCoinImg, setSelectedCoinImg] = useState(btc);

    function handleCoinClick (coinName, coinImg){
        setSelectedCoin(coinName);
        setSelectedCoinImg(coinImg);
    }

    function handleButtonChangeCryptoClick(selectedCoin) {
        saveMiningUserCryptoCurrency(selectedCoin)
            .then(() => {
            })
            .catch(error => {
                console.error('Error saving crypto currency:', error);
            });
        setIsUserExists(true)
    }

    const coinData = {
        btc: { name: "Bitcoin", description: <p><b>{t("mining.pages.menu.coins.text_btc_1")}</b> {t("mining.pages.menu.coins.text_btc_2")}</p> },
        doge: { name: "Dogecoin", description: <p><b>{t("mining.pages.menu.coins.text_ton_1")}</b> {t("mining.pages.menu.coins.text_ton_2")}</p> },
        ton: { name: "Toncoin", description: <p><b>{t("mining.pages.menu.coins.text_shib_1")}</b> {t("mining.pages.menu.coins.text_shib_2")}</p> },
        shib: { name: "Shiba Inu", description: <p><b>{t("mining.pages.menu.coins.text_doge_1")}</b> {t("mining.pages.menu.coins.text_doge_2")}</p> }
    };

    return (
        <Box className={style.changeBox}>
            <Box className={style.changeBox__coins}>
                <Box className={style.changeBox__coins__cards}>
                    {Object.entries({ btc, doge, ton, shib }).map(([coinName, coinImg]) => (
                        <CoinCard
                            key={coinName}
                            coin={coinImg}
                            name={coinData[coinName].name}
                            isSelected={selectedCoin === coinName}
                            onClick={() => handleCoinClick(coinName, coinImg)}
                        />
                    ))}
                </Box>
            </Box>
            <Box className={style.changeBox__coins__description}>
                <DescriptionCard coin={selectedCoinImg} text={coinData[selectedCoin].description} />
            </Box>
            <CustomButton
                content={`${t("mining.components.helps.changeCrypto.change")}`}
                onClick={() => handleButtonChangeCryptoClick(selectedCoin)}
                variant={'contained'}
                style={{ margin: '20px' }}
            />
        </Box>
    );
};

export default FunctionalChangeCrypto;
