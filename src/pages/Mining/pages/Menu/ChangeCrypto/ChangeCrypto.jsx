import React, { useEffect, useState } from "react";
import style from './changeCrypto.module.sass'
import {Backdrop, CircularProgress, IconButton, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {
  getMiningUserData,
  saveMiningUserCryptoCurrency,
} from "../../../api/api.js";
import { useTranslation } from "react-i18next";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import ton from '../../../assets/shared/cryptoCoins/toncoin.svg'
import not from '../../../assets/shared/cryptoCoins/notcoin.svg'
import btc from '../../../assets/shared/cryptoCoins/bitcoin.svg'
import doge from '../../../assets/shared/cryptoCoins/dogecoin.svg'
import shib from '../../../assets/shared/cryptoCoins/shibacoin.svg'

import {tg} from "../../../../../shared/telegram/telegram.js";
import {fetchDataAndUpdateLocalStorageInSession} from "../../../helps/dataHelps.js";

const ChangeCrypto = () => {
    const [isFunctionLocked, setIsFunctionLocked] = useState(false)
    const [cryptoCurrency, setCryptoCurrency] = useState('ton')

    useEffect(() => {
        // Загрузка данных пользователя из local.storage при монтировании компонента
        const storedData = JSON.parse(localStorage.getItem("miningUserData")) || {};
        setCryptoCurrency(storedData.cryptoCurrency || "btc");
    }, []);

    const handleCardClick = async (crypto) => {
        window.Telegram.WebApp.showConfirm(
            `${t("mining.pages.menu.changeCrypto.alert_1")}`,
            (confirm) => {
                if (confirm) {
                    // Сохранение данных в local.storage
                    const storedData = JSON.parse(localStorage.getItem("miningUserData")) || {};
                    storedData.cryptoCurrency = crypto;
                    localStorage.setItem("miningUserData", JSON.stringify(storedData));

                    // Отправка запроса на изменение криптовалюты
                    try {
                        saveMiningUserCryptoCurrency(crypto)
                            .then(()=>{
                                fetchDataAndUpdateLocalStorageInSession();
                                setCryptoCurrency(storedData.cryptoCurrency);
                            })
                    } catch (error) {
                        console.error("An error occurred:", error);
                    }
                }
            },
        );
    };

    const {t} = useTranslation();

    const handleChangeCrypto = (event, newAlignment) => {
        if (isFunctionLocked) {
            return;
        }

        if (newAlignment !== null) {
            setIsFunctionLocked(true)

            handleCardClick(newAlignment)
        }

        setTimeout(() => {
            setIsFunctionLocked(false)
        }, 800)
    }

    return (
        <>
            {isFunctionLocked &&
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000}}
                    open={true}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
            }
            <div className={style.changeCrypto}>
                <div className={style.changeCrypto__content}>
                    {cryptoCurrency !== undefined && cryptoCurrency !== '' &&
                        <>
                            <ToggleButtonGroup
                                value={cryptoCurrency}
                                exclusive
                                onChange={handleChangeCrypto}
                                aria-label="Platform"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                }}
                            >
                                <ToggleButton
                                    value="btc"
                                    sx={toggleButtonStyle}
                                    className={style.changeCrypto__content__toggleBtn}
                                >
                                    <img src={btc} alt={'btc'}
                                         className={style.changeCrypto__content__toggleBtn__icon_img}
                                         style={{
                                             border: '1px solid #fff',
                                             borderRadius: '50px'
                                         }}/>
                                    BTC
                                </ToggleButton>
                                <ToggleButton
                                    value="doge"
                                    sx={toggleButtonStyle}
                                    className={style.changeCrypto__content__toggleBtn}
                                >
                                    <img src={doge} alt={'doge'}
                                         className={style.changeCrypto__content__toggleBtn__icon_img}
                                         style={{
                                             border: '1px solid #fff',
                                             borderRadius: '50px'
                                         }}/>
                                    DOGE
                                </ToggleButton>
                                <ToggleButton
                                    value="ton"
                                    sx={toggleButtonStyle}
                                    className={style.changeCrypto__content__toggleBtn}
                                >
                                    <img src={ton} alt={'ton'}
                                         className={style.changeCrypto__content__toggleBtn__icon_img}/>
                                    TON
                                </ToggleButton>
                                <ToggleButton
                                    value="shib"
                                    sx={toggleButtonStyle}
                                    className={style.changeCrypto__content__toggleBtn}
                                >
                                    <img src={shib} alt={'shib'}
                                         className={style.changeCrypto__content__toggleBtn__icon_img}
                                         style={{
                                             border: '1px solid #fff',
                                             borderRadius: '50px'
                                         }}/>
                                    SHIB
                                </ToggleButton>
                                <ToggleButton
                                    value="not"
                                    sx={toggleButtonStyle}
                                    className={style.changeCrypto__content__toggleBtn}
                                >
                                    <img src={not} alt={'not'}
                                         className={style.changeCrypto__content__toggleBtn__icon_img}
                                         style={{
                                             border: '1px solid #fff',
                                             borderRadius: '50px'
                                         }}/>
                                    NOT
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default ChangeCrypto;

const toggleButtonStyle = {
    color: 'var(--text-color-light)',
    border: '1px solid var(--component-stroke-color)',
    borderTopRightRadius: '14px !important',
    borderTopLeftRadius: '14px !important',
    borderBottomRightRadius: '14px !important',
    borderBottomLeftRadius: '14px !important',
    backgroundColor: 'var(--settings-inactive-color)',
    margin: '7px',
    marginTop: '0',
    '&.Mui-selected': {
        color: 'var(--button-text-color)',
        backgroundColor: 'var(--menu-button-color)',
    },
    '&.MuiToggleButton-root:hover': {
        backgroundColor: 'var(--menu-button-color)'
    }
};