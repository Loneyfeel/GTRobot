import React, {useEffect, useState} from 'react';
import style from "./buyConfirmation.module.sass";
import {Box, Button, Typography} from "@mui/material";
import broken from "../../../../assets/bigCard/broken.svg";
import {useTranslation} from "react-i18next";
import {copyWhaleWallet, copyWhaleWalletFirst, sendMessage} from "../../../../api/api.js";
import {tg} from "../../../../../../shared/telegram/telegram.js";

const BuyConfirmation = ({
                             choiseAmount,
                             goToNextSlide,
                             coins,
                             missingAssets,
                             userPurchasedAssets,
                             walletId,
                             imageFolder
                         }) => {
    const {t} = useTranslation();
    const [finalAssets, setFinalAssets] = useState([]) // финальный массив монет к покупке
    const [finalAssetsToFetch, setFinalAssetsToFetch] = useState([]) // финальный массив монет к покупке

    const [backdropVisible, setBackdropVisible] = useState(false)

    // Отображение данных портфолио
    const renderPortfolioData = () => {
        const currencies = finalAssets;
        const imagePaths = currencies.map(currency => `${imageFolder}/${currency.toLowerCase()}.png`);

        return currencies.map((currency, index) => {
            const iconPath = imagePaths[index] || '/src/pages/TrackingCryptoWallets/bigCard/broken.svg'; // Путь к изображению

            return (
                <>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        width: 'max-content',
                        padding: '7px',
                        margin: '3px',
                        backgroundColor: '#32323BFF',
                        borderRadius: '7px',
                        overflow: 'hidden',
                    }}>
                        <img
                            src={iconPath}
                            alt={currency}
                            style={{
                                height: '25px',
                                marginRight: '5px',
                                borderRadius: '50px',
                                backgroundColor: '#fff',
                                overflow: 'hidden'
                            }}
                            onError={(e) => {
                                e.target.src = broken; // Устанавливаем альтернативное изображение в случае ошибки загрузки основного изображения
                            }}
                        />
                        {currency.charAt(0).toUpperCase() + currency.slice(1)}
                    </Box>
                </>
            );
        });
    }

    useEffect(() => {
        const combinedAssets = [...missingAssets, ...userPurchasedAssets];
        // Устанавливаем объединенный массив в состояние finalAssets
        setFinalAssets(combinedAssets);
    }, []);

    useEffect(() => {
        // монеты из coins, которых нет в finalAssets
        const assetsToFetch = coins.filter(coin => !finalAssets.includes(coin));
        setFinalAssetsToFetch(assetsToFetch);
    }, [finalAssets, coins]);

    const handleButtonConfirmClick = () => {
        if (finalAssets.length > 0) {
            setBackdropVisible(true)
            copyWhaleWalletFirst(finalAssetsToFetch, choiseAmount, walletId)
                .then(response => {
                    if (response.errorCode === 1006){
                        window.location.href = "/premium";
                    }
                    copyWhaleWalletUntilSuccess(response.taskId);
                })
                .catch(error => {
                    console.error('Ошибка при получении данных id задачи:', error);
                })
            const copyWhaleWalletUntilSuccess = (taskId) => {
                copyWhaleWallet(taskId)
                    .then(response => {
                        if (response.errorCode === 1006){
                            window.location.href = "/premium";
                        }
                        if (response.state === 'SUCCESS') {
                            goToNextSlide()
                            setBackdropVisible(false)
                        } else if (response.errorCode === 3002) {
                            tg.showPopup({
                                message: `${t("tracking.buyDialog.error3002")}`
                            })
                            setBackdropVisible(false)
                        } else if (response.errorCode === 3003) {
                            tg.showPopup({
                                message: `${t("tracking.buyDialog.error3003")}`
                            })
                            setBackdropVisible(false)
                        } else if (response.errorCode === 3004) {
                            tg.showPopup({
                                message: `${t("tracking.buyDialog.errorEmptyList")}`
                            })
                            setBackdropVisible(false)
                        } else if (response.state === 'FAILURE') {
                            tg.showPopup({
                                message: `${t("tracking.buyDialog.error")}`
                            })
                            setBackdropVisible(false)
                        } else {
                            setTimeout(() => {
                                copyWhaleWalletUntilSuccess(taskId);
                            }, 3000);
                        }
                    })
                    .catch(error => {
                        console.error('Ошибка при копировании после id задачи:', error);
                    })
            };
        } else {
            tg.showPopup({
                message: `${t("tracking.buyDialog.errorEmptyList")}`
            })
        }
    };

    return (
        <>
            <Box className={style.buyConfirmation}>
                <Box className={style.loader_box}
                     sx={{
                         display: backdropVisible ? 'flex' : 'none',
                         flexDirection: 'column',
                         justifyContent: 'center'
                     }}>
                    <Box className={style.loader}/>
                    <Typography sx={{
                        marginTop: '10px',
                        fontSize: '12px'
                    }}>{t("tracking.loadingCopy")}</Typography>
                </Box>
                <Box className={style.buyConfirmation__top}>
                    <Typography className={style.buyConfirmation__top__title}
                                sx={{
                                    fontSize: '24px',
                                    fontWeight: '600',
                                    fontFamily: 'Gilroy, sans-serif',
                                    textAlign: 'center'
                                }}>
                        {t("tracking.buyCard.confirmation")}
                    </Typography>
                </Box>
                <Box className={style.buyConfirmation__list}>
                    {t("tracking.buyDialog.message")}
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        width: '100%',
                        maxHeight: '100px',
                        overflow: 'auto',
                        marginBlock: '10px'
                    }}>
                        {renderPortfolioData()}
                    </Box>
                </Box>
                <Typography sx={{
                    fontSize: '16px',
                    fontFamily: 'Gilroy, sans-serif',
                }}>
                    {t("tracking.buyDialog.amount")} <span style={{fontWeight: '600'}}>{choiseAmount}$</span>
                </Typography>
                <Box className={style.buyConfirmation__button}>
                    <Button
                        variant={'contained'}
                        onClick={handleButtonConfirmClick}
                        sx={{
                            height: '50px',
                            width: '100%',
                            backgroundColor: '#fff',
                            boxShadow: '0px 0px 15px 3px rgba(0, 0, 255, 0.5)',
                            marginTop: '10px',
                            borderRadius: '15px',
                            ':hover': {
                                backgroundColor: 'rgba(255,255,255, 0.7)',
                                boxShadow: '0px 0px 10px 3px rgba(0, 0, 255, 0.5)',
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#000',
                                fontWeight: '700',
                                fontFamily: 'Gilroy, sans-serif'
                            }}>
                            {t("tracking.buyCard.confirmation_text")}
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default BuyConfirmation;