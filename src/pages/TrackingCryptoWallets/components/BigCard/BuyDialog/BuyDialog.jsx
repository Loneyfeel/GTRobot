import React, {useEffect, useState} from 'react';
import style from './buyDialog.module.sass'
import {Box, Dialog, IconButton} from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {useTranslation} from "react-i18next";
import {getUserPurchasedAssets, sendMessage} from "../../../api/api.js";
import Final from "./Final/index.js";
import BuyConfirmation from "./BuyConfirmation/index.js";
import { motion, AnimatePresence } from 'framer-motion';
import ChangeAmount from "./ChangeAmount/index.js";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded.js";
import CoinsChangeList from "./CoinsChangeList/index.js";
import {tg} from "../../../../../shared/telegram/telegram.js";
const BuyDialog = ({
                       open,
                       setOpen,
                       coins,
                       walletId,
                       imageFolder,
                       gtrobotTheme
}) => {
    const {t} = useTranslation();

    const [first10Coins, setFirst10Coins] = useState([])

    useEffect(() => {
        // Проверяем, есть ли массив coins и он содержит хотя бы 10 элементов
        if (Array.isArray(coins) && coins.length >= 10) {
            // Получаем только первые 10 элементов из массива coins
            const first10 = coins.slice(0, 10);
            // Обновляем состояние first10Coins
            setFirst10Coins(first10);
        } else {
            const firstAll = coins.slice(); // Копируем весь массив coins
            setFirst10Coins(firstAll);
        }
    }, [coins]);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const goToNextSlide = () => {
        setIsVisible(false);
        setTimeout(() => {
            setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? prevSlide : prevSlide + 1));
            setIsVisible(true);
        }, 50); // Задержка в 0.1 секунды
    };

    const goToPrevSlide = () => {
        setAnswerPurchasedAssets(false)
        setIsVisible(false);
        setTimeout(() => {
            setCurrentSlide((prevSlide) => (prevSlide === 0 ? prevSlide : prevSlide - 1));
            setIsVisible(true);
        }, 50); // Задержка в 0.1 секунды
    };


    const [choiseAmount, setChoiseAmoin] = useState(0)

    const [answerPurchasedAssets, setAnswerPurchasedAssets] = useState(false)
    const [userPurchasedAssets, setUserPurchasedAssets] = useState([]) //монеты, которых нет у пользователя и они докупаются 100%
    const [missingAssetsQuestion, setMissingAssetsQuestion] = useState([]) // тут монеты которые надо предложить докупить
    const [missingAssets, setMissingAssets] = useState([]) // монеты, которые одобрил польз. и их надо докупить


    const handleClose = () => {
        setOpen(false);
    };

    function getPurchasedAssets(){
        getUserPurchasedAssets()
            .then(response => {
                if (response.errorCode === 3001) {
                    sendMessage()
                        .catch(error => {
                            console.error('Ошибка отправки сообщения whale_menu', error);
                        });
                    tg.showAlert(t("tracking.buyDialog.errorAPI"))
                    handleClose()
                }
                if (response.errorCode === 1006){
                    window.location.href = "/premium";
                }
                setUserPurchasedAssets(first10Coins.filter(coin => !response.data.includes(coin)))
                setMissingAssetsQuestion(first10Coins.filter(coin => response.data.includes(coin)))
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            })
            .finally(() => {
                setAnswerPurchasedAssets(true)
            })
    }

    const slides = missingAssetsQuestion.length > 0 ? [
        <Slide key={1}>
            <ChangeAmount
                setChoiseAmoin={setChoiseAmoin}
                answerPurchasedAssets={answerPurchasedAssets}
                goToNextSlide={goToNextSlide}
                getPurchasedAssets={getPurchasedAssets}
            />
        </Slide>,
        <Slide key={2}>
            <CoinsChangeList
                missingAssets={missingAssets}
                missingAssetsQuestion={missingAssetsQuestion}
                setMissingAssets={setMissingAssets}
                goToNextSlide={goToNextSlide}
            />
        </Slide>,
        <Slide key={3}>
            <BuyConfirmation
                missingAssets={missingAssets}
                userPurchasedAssets={userPurchasedAssets}
                choiseAmount={choiseAmount}
                coins={first10Coins}
                goToNextSlide={goToNextSlide}
                walletId={walletId}
                imageFolder={imageFolder}
            />
        </Slide>,
        <Slide key={4}>
            <Final
                handleClose={handleClose}
                gtrobotTheme={gtrobotTheme}
            />
        </Slide>,
    ] : [
        <Slide key={1}>
            <ChangeAmount
                setChoiseAmoin={setChoiseAmoin}
                answerPurchasedAssets={answerPurchasedAssets}
                goToNextSlide={goToNextSlide}
                getPurchasedAssets={getPurchasedAssets}
            />
        </Slide>,
        <Slide key={2}>
            <BuyConfirmation
                missingAssets={missingAssets}
                userPurchasedAssets={userPurchasedAssets}
                choiseAmount={choiseAmount}
                coins={first10Coins}
                goToNextSlide={goToNextSlide}
                walletId={walletId}
                imageFolder={imageFolder}
            />
        </Slide>,
        <Slide key={3}>
            <Final
                handleClose={handleClose}
                gtrobotTheme={gtrobotTheme}
            />
        </Slide>,
    ]

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: 'var(--main-bg-color)'
                    }
                }}
            >
                <Box className={style.buyDialog}>
                    <Box className={style.buyDialog__content}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={goToPrevSlide}
                            disabled={currentSlide === 0}
                            aria-label="close"
                            sx={{
                                position: 'absolute',
                                top: '30%',
                                left: '5vw',
                                width: '40px',
                                height: '40px',
                                transition: 'opacity 200ms ease',
                                zIndex: '100'
                            }}
                        >
                            <ArrowBackRoundedIcon/>
                        </IconButton>
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
                        }}>
                            <Slider
                                slides={slides}
                                currentSlide={currentSlide}
                                isVisible={isVisible}
                                goToNextSlide={goToNextSlide}
                                goToPrevSlide={goToPrevSlide}
                            />
                        </Box>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}

export default BuyDialog;

const Slider = ({ slides, currentSlide, isVisible, goToNextSlide, goToPrevSlide }) => {

    return (
        <div className="slider">
            <AnimatePresence initial={false} custom={currentSlide}>
                <motion.div
                    key={currentSlide}
                    custom={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                    className="slide"
                    style={{
                        display: isVisible ? 'flex' : 'none',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: '100vw'
                    }}
                >
                    {slides[currentSlide]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const Slide = ({ children }) => {
    return <>{children}</>;
};