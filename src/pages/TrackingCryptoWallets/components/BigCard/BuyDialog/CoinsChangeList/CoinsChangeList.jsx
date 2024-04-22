import React, {useEffect, useState} from 'react';
import style from './coinsChangeList.module.sass'
import {Box, Button, Typography} from "@mui/material";
import {AnimatePresence, motion} from "framer-motion";
import {useTranslation} from "react-i18next";
import brokenCoin from '../../../../assets/bigCard/broken.svg'

const CoinsChangeList = ({
                             missingAssets,
                             missingAssetsQuestion,
                             setMissingAssets,
                             goToNextSlide

}) => {
    const {t} = useTranslation();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const goToNextSlideCoins = () => {
        setIsVisible(false);
        setTimeout(() => {
            setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? prevSlide : prevSlide + 1));
            setIsVisible(true);
        }, 50); // Задержка в 0.1 секунды
    };

    const slides = missingAssetsQuestion.map((question, index) => (
        <Slide key={index}
               handleClickYes={handleClickYes}
               handleClickNo={handleClickNo}
        >{question}</Slide>
    ))

    function handleClickYes(coin) {
        // Проверяем, есть ли монета уже в массиве missingAssets
        if (!missingAssets.includes(coin)) {
            // Если монеты нет в массиве, добавляем её
            setMissingAssets((prevMissingAssets) => [...prevMissingAssets, coin]);
        }

        // Проверяем, достигнут ли конец массива slides
        if (currentSlide === slides.length - 1) {
            goToNextSlide(); // Если достигнут конец массива, вызываем функцию для перехода на следующий слайд
        } else {
            goToNextSlideCoins(); // Иначе переходим к следующему слайду вопросов
        }
    }

    function handleClickNo(coin) {
        // Проверяем, есть ли монета уже в массиве missingAssets
        if (missingAssets.includes(coin)) {
            // Если монета есть в массиве, удаляем её
            setMissingAssets((prevMissingAssets) => prevMissingAssets.filter((item) => item !== coin));
        }

        // Проверяем, достигнут ли конец массива slides
        if (currentSlide === slides.length - 1) {
            goToNextSlide(); // Если достигнут конец массива, вызываем функцию для перехода на следующий слайд
        } else {
            goToNextSlideCoins(); // Иначе переходим к следующему слайду вопросов
        }
    }


    return (
        <>
            <Box className={style.coinsChangeList}>
                <Typography
                    sx={{
                        fontSize: '20px',
                        marginBottom: '5px'
                    }}>
                    {t("tracking.buyDialog.changeBuyMissingCoins.text")}
                </Typography>
                <Slider
                    slides={slides}
                    currentSlide={currentSlide}
                    isVisible={isVisible}
                />
            </Box>
        </>
    );
};

export default CoinsChangeList;

const Slider = ({ slides, currentSlide, isVisible, goToNextSlideCoins, goToPrevSlideCoins }) => {

    return (
        <div className="slider">
            <AnimatePresence initial={false} custom={currentSlide}>
                <motion.div
                    key={currentSlide}
                    custom={currentSlide}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2, delay: 0.1}}
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

const Slide = ({children, handleClickYes, handleClickNo}) => {
    const {t} = useTranslation();
    const renderPortfolioData = (currency) => {
        const imageFolder = '/assets/cryptocurrencies/'; // Папка с изображениями
        const iconPath =  `${imageFolder}/${currency.toLowerCase()}.png` || '/src/pages/TrackingCryptoWallets/bigCard/broken.svg'; // Путь к изображению

        return (
            <Box sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: 'max-content',
                padding: '15px',
                margin: '5px',
                backgroundColor: '#32323BFF',
                borderRadius: '15px',
                overflow: 'hidden',
            }}>
                <img
                    src={iconPath}
                    alt={currency}
                    style={{
                        height: '50px',
                        width: '50px',
                        marginRight: '5px',
                        borderRadius: '50px',
                        backgroundColor: '#fff',
                        overflow: 'hidden'
                    }}
                    onError={(e) => {
                         e.target.src = brokenCoin;
                    }}
                />
                <Typography
                sx={{
                    fontSize: '20px'
                }}>
                    {currency && currency.charAt(0).toUpperCase() + currency.slice(1)}
                </Typography>
            </Box>
                <Typography
                    sx={{
                        fontSize: '20px'
                    }}>
                    {t("tracking.buyDialog.changeBuyMissingCoins.text2")}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    <Button
                        variant={'contained'}
                        onClick={()=>{
                            handleClickNo(currency)
                        }}
                        sx={{
                            height: '50px',
                            width: '30%',
                            backgroundColor: '#fff',
                            boxShadow: '0px 0px 15px 3px rgba(0, 0, 255, 0.5)',
                            marginTop: '10px',
                            marginRight: '15px',
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
                            {t("tracking.no")}
                        </Typography>
                    </Button>
                    <Button
                        variant={'contained'}
                        onClick={()=>{
                            handleClickYes(currency)
                        }}
                        sx={{
                            height: '50px',
                            width: '30%',
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
                            {t("tracking.yes")}
                        </Typography>
                    </Button>
                </Box>
            </Box>
        );
    }
    return <>{renderPortfolioData(children)}</>;
};