import React, {useState} from 'react';
import style from './buyDialog.module.sass'
import {Box, Button, Dialog, IconButton, Typography} from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import {useTranslation} from "react-i18next";
import broken from "../../../assets/bigCard/broken.svg";
import like from '../../../assets/bigCard/like.svg'
const BuyDialog = ({open, setOpen, coins}) => {
    const {t} = useTranslation();
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [choiseAmount, setChoiseAmoin] = useState(0)
    const handleClose = () => {
        setOpen(false);
        setOpenSuccess(false)
        setOpenConfirm(false)
    };

    function handleButtonsItemClick(value) {
        setChoiseAmoin(value)
        setOpenSuccess(true)
    }

    const handleButtonConfirmClick = () => {
        setOpenSuccess(false)
        setOpenConfirm(true)
    };

    const imageFolder = '/src/pages/TrackingCryptoWallets/assets/bigCard/iconsCrypto';
    // Отображение данных портфолио
    const renderPortfolioData = () => {
        const currencies = coins;
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
                        overflow: 'hidden',
                    }}>
                        <img
                            src={iconPath}
                            alt={currency}
                            style={{
                                height: '25px',
                                marginRight: '5px'
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

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: '#000'
                    }
                }}
            >
                <Box className={style.buyDialog}>
                    <Box className={style.buyDialog__content}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            sx={{
                                position: 'absolute',
                                top: '30%',
                                right: '5vw',
                                width: '40px',
                                height: '40px',
                                zIndex: '100'
                            }}
                        >
                            <CloseRoundedIcon/>
                        </IconButton>
                        <Box sx={{
                            display: 'flex',
                            position: 'absolute',
                            left: openSuccess ? '-95vw' : openConfirm ? '-195vw' : '5vw',
                            transition: 'left 200ms ease'
                        }}>
                            <Box className={style.buyDialog__content__choice}>
                                <Box className={style.buyDialog__content__choice__top}>
                                    <Typography className={style.buyDialog__content__choice__top__title}
                                                sx={{
                                                    fontSize: '24px',
                                                    fontWeight: '600',
                                                    fontFamily: 'Gilroy, sans-serif',
                                                    textAlign: 'center'
                                                }}>
                                        {t("tracking.buyCard.title")}
                                    </Typography>
                                </Box>
                                <Box className={style.buyDialog__content__choice__buttons}>
                                    <Box
                                        onClick={() => {
                                            handleButtonsItemClick(100)
                                        }}
                                        className={style.buyDialog__content__choice__buttons_item}
                                    >100$
                                    </Box>
                                    <Box
                                        onClick={() => {
                                            handleButtonsItemClick(200)
                                        }}
                                        className={style.buyDialog__content__choice__buttons_item}
                                    >200$
                                    </Box>
                                    <Box
                                        onClick={() => {
                                            handleButtonsItemClick(400)
                                        }}
                                        className={style.buyDialog__content__choice__buttons_item}
                                    >400$
                                    </Box>
                                    <Box
                                        onClick={() => {
                                            handleButtonsItemClick(600)
                                        }}
                                        className={style.buyDialog__content__choice__buttons_item}
                                    >600$
                                    </Box>
                                    <Box
                                        onClick={() => {
                                            handleButtonsItemClick(800)
                                        }}
                                        className={style.buyDialog__content__choice__buttons_item}
                                    >800$
                                    </Box>
                                    <Box
                                        onClick={() => {
                                            handleButtonsItemClick(1000)
                                        }}
                                        className={style.buyDialog__content__choice__buttons_item}
                                    >1000$
                                    </Box>
                                </Box>
                            </Box>
                            <Box className={style.buyDialog__content__confirmation}>
                                <Box className={style.buyDialog__content__choice__top}>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={() => {
                                            setOpenSuccess(false)
                                        }}
                                        aria-label="close"
                                        sx={{
                                            position: 'absolute',
                                            left: '0',
                                            width: '40px',
                                            height: '40px',
                                            pointerEvents: openSuccess ? 'auto' : 'none',
                                            cursor: openSuccess ? '' : 'default',
                                            opacity: openSuccess ? 1 : 0,
                                            transition: 'opacity 200ms ease',
                                            zIndex: '100'
                                        }}
                                    >
                                        <ArrowBackRoundedIcon/>
                                    </IconButton>
                                    <Typography className={style.buyDialog__content__choice__top__title}
                                                sx={{
                                                    fontSize: '24px',
                                                    fontWeight: '600',
                                                    fontFamily: 'Gilroy, sans-serif',
                                                    textAlign: 'center'
                                                }}>
                                        {t("tracking.buyCard.confirmation")}
                                    </Typography>
                                </Box>
                                <Box className={style.buyDialog__content__confirmation__list}
                                sx={{
                                    overflow: 'hidden'
                                }}>
                                    Вы копируете инвестиционный портфель, включающий в себя
                                    активы: {renderPortfolioData()}
                                </Box>
                                <Typography sx={{
                                    fontSize: '16px',
                                    fontFamily: 'Gilroy, sans-serif',
                                }}>
                                    на сумму: <span style={{fontWeight: '600'}}>{choiseAmount}$</span>
                                </Typography>
                                <Box className={style.buyDialog__content__confirmation__button}>
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
                            <Box className={style.buyDialog__content__success}>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={() => {
                                        setOpenSuccess(true)
                                        setOpenConfirm(false)
                                    }}
                                    aria-label="close"
                                    sx={{
                                        width: '40px',
                                        height: '40px',
                                        pointerEvents: openConfirm ? 'auto' : 'none',
                                        cursor: openConfirm ? '' : 'default',
                                        opacity: openConfirm ? 1 : 0,
                                        transition: 'opacity 200ms ease',
                                        zIndex: '110'
                                    }}
                                >
                                    <ArrowBackRoundedIcon/>
                                </IconButton>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: '100%',
                                    marginBottom: '10px'
                                }}>
                                    <Box>
                                        <img src={like} alt={"Like"} style={{
                                            width: '100px'
                                        }}/>
                                    </Box>
                                    <Box>
                                        Портфель успешно скопирован!
                                    </Box>
                                </Box>
                                <Box className={style.buyDialog__content__confirmation__button}>
                                    <Button
                                        variant={'contained'}
                                        onClick={handleClose}
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
                                            {t("tracking.buyCard.confirmation_text_close")}
                                        </Typography>
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}

export default BuyDialog;