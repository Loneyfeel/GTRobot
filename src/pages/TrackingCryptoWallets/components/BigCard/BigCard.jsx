import React, {useEffect, useState} from 'react';
import style from './bigCard.module.sass'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton,
    Snackbar,
    Typography
} from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import verifiedImg from '../../assets/shared/checkmark.svg'
import {useCopyToClipboard} from "@uidotdev/usehooks";
import {useTranslation} from "react-i18next";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import CardChart from "../Chart/index.js";

import brokenCoin from '../../assets/bigCard/broken.svg'
import brokenPhoto from '../../assets/card/broken.svg'
import favorites_tab_active from '../../assets/main/favorites_tab_active.svg'
import favorites_tab_disabled from '../../assets/main/favorites_tab_disabled.svg'
// import BuyDialog from "./BuyDialog/index.js";
import {getWhaleWalletData, getWhaleWallets, setWhaleWalletFollow} from "../../api/api.js";

const BigCard = ({
                     setWalletsData,
                     leftPosition,
                     setLeftPosition,
                     setIsVisible,
                     photo,
                     name,
                     verified,
                     address,
                     description,
                     balance,
                     chart,
                     stocks,
                     // favorite,
                     walletId,
                     activeTab
}) => {

    const {t, i18n} = useTranslation();
    const [isCopySnackbarOpen, setIsCopySnackbarOpen] = useState(false);
    const [copiedText, copyToClipboard] = useCopyToClipboard();

    function handleCopyAddressButtonClick() {
        copyToClipboard(address)
        setIsCopySnackbarOpen(true)
        setTimeout(() => {
            setIsCopySnackbarOpen(false);
        }, 2000)
    }

    // Функция для форматирования числа
    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const [stocksData, setStocksData] = useState()
    const [chartData, setChartData] = useState([])
    const [favorite, setFavorite] = useState(false)

    function getBigCardData(){
        getWhaleWalletData(walletId)
            .then(response => {
                setStocksData(response.data.stocks);
                setFavorite(response.data.isFollow)
                setChartData(response.data.chart)
                setLeftPosition('0')
            })
            .catch(error => {
                // Обрабатываем ошибку, если она возникла
                console.error('Ошибка при получении данных о кошельках:', error);
            });
    }

    const [tempSet, settempSet] = useState(false)
    function followClick(activeTab){
        setWhaleWalletFollow(walletId)
            .then (() =>{
                getBigCardData()
                getWhaleWallets(settempSet, "all", '', '', [], '')
                    .then(response => {
                        setWalletsData(response.data.data);
                    })
                    .catch(error => {
                        // Обрабатываем ошибку, если она возникла
                        console.error('Ошибка при получении данных о кошельках:', error);
                    });
            })
            .catch(error =>{
                console.error('Ошибка при получении данных о кошельке:', error);
            })
    }

    useEffect(() => {
        getBigCardData()
    }, []);

    const imageFolder  = '/assets/cryptocurrencies/';
    // Отображение данных портфолио
    const renderPortfolioData = () => {
        const currencyData = Object.entries(stocksData); // Преобразование объекта в массив пар [ключ, значение]
        const totalQuote = currencyData.reduce((total, [currency, data]) => {
            return total + data.quote;
        }, 0);

        // Сортировка данных по убыванию значения mathBalance
        currencyData.sort(([, dataA], [, dataB]) => {
            return dataB.quote - dataA.quote;
        });

        return currencyData.map(([currency, data]) => {
            const {balanceCoin, quote} = data;
            const mathBalance = (quote).toFixed(3);
            const precent = ((quote / totalQuote) * 100).toFixed(4);
            const iconPath = `${imageFolder}/${currency.toLowerCase()}.png`; // Путь к изображению
            const formattedCurrency = currency.charAt(0).toUpperCase() + currency.slice(1);

            return (
                <>
                    {precent > 0.00001 &&

                        <Box key={currency} className={style.bigCard__content__portfolio__card}>
                            <Box className={style.bigCard__content__portfolio__card__percent}>{precent}%</Box>
                            <Box className={style.bigCard__content__portfolio__card__coinIcon}>
                                <img
                                    src={iconPath}
                                    alt={currency}
                                    className={style.bigCard__content__portfolio__card__coinIcon_img}
                                    onError={(e) => {
                                        e.target.src = brokenCoin; // Устанавливаем альтернативное изображение в случае ошибки загрузки основного изображения
                                    }}
                                />
                            </Box>
                            <Box className={style.bigCard__content__portfolio__card__coin}>{formattedCurrency}</Box>
                            <Box className={style.bigCard__content__portfolio__card__amount}
                                 sx={{
                                     fontSize: mathBalance > 10000000 ? '12px' : mathBalance > 100000000 ? '11px' : mathBalance > 1000000000 ? '10px' : '14px'
                                 }}>$ {formatNumber(mathBalance)}</Box>
                        </Box>

                    }
                </>
            )
        });
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const randomParam = Math.random().toString(36).substring(7); // Генерация случайного параметра
    const imageUrl = `${photo}?cache=${randomParam}`;

    return (
        <>
            <Box className={style.bigCard}
                 sx={{
                     left: leftPosition,
                 }}>
                <Box className={style.bigCard__content}>
                    <Box className={style.bigCard__content__arrow}>
                        <IconButton
                            onClick={() => {
                                setLeftPosition('200vw')
                                document.body.style.overflow = ''
                                setTimeout(() => {
                                    setIsVisible()
                                }, 200);
                            }}
                            sx={{
                                color: '#fff'
                            }}>
                            <ArrowBackRoundedIcon/>
                        </IconButton>
                    </Box>
                    <Box className={style.bigCard__content__favorite}
                    onClick={()=>{
                        followClick(activeTab)
                    }}>
                        {favorite ?
                                <img src={favorites_tab_active} alt='' className={style.bigCard__content__favorite_img}/>
                            :
                                <img src={favorites_tab_disabled} alt='' className={style.bigCard__content__favorite_img}/>
                        }

                    </Box>
                    <Box className={style.bigCard__content__info}>
                        {photo &&
                            <Box className={style.bigCard__content__info__photo}>
                            <img
                                src={photo}
                                alt={'Photo'}
                                className={style.bigCard__content__info__photo_img}
                                onError={(e) => {
                                    e.target.src = brokenPhoto; // Устанавливаем альтернативное изображение в случае ошибки загрузки основного изображения
                                }}
                            />
                        </Box>
                        }
                        {name && <Box className={style.bigCard__content__info__name}>
                            <Box className={style.bigCard__content__info__name_text}>
                                {name}
                            </Box>
                            {verified &&
                                <Box className={style.bigCard__content__info__name_verified}>
                                    <img src={verifiedImg} alt={'verified'}
                                         className={style.bigCard__content__info__name_verified_img}/>
                                </Box>
                            }
                        </Box>
                        }
                        {address &&
                            <>
                                <Box className={style.bigCard__content__info__address}
                                     onClick={handleCopyAddressButtonClick}
                                >
                                    <Box className={style.bigCard__content__info__address__text}
                                         sx={{
                                             fontSize: photo && name ? '18px' : '24px'
                                         }}>
                                        {address}
                                    </Box>
                                    <ContentCopyRoundedIcon/>
                                    <Snackbar
                                        open={isCopySnackbarOpen}>
                                        <Alert
                                            severity="success"
                                            variant="filled"
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginInline: 'auto',
                                                width: '50%',
                                                borderRadius: '50px',
                                                backgroundImage: 'linear-gradient(to bottom left, rgba(152, 152, 152, 1), rgba(62, 62, 62, 1))'
                                            }}
                                        >
                                            {t("tracking.copyAddress")}
                                        </Alert>
                                    </Snackbar>
                                </Box>
                            </>
                        }
                    </Box>
                    {description &&
                        <>
                            <Accordion
                                square={true}
                                sx={{
                                    backgroundColor: 'var(--component_bg_color)',
                                    borderRadius: '20px',
                                    marginBottom: '10px',
                                    color: 'var(--text_color)'
                                }}>
                                <AccordionSummary
                                    expandIcon={<ArrowBackIosNewRoundedIcon sx={{transform: 'rotate(-90deg)'}}/>}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    sx={{
                                        borderRadius: '20px',
                                        fontWeight: '600',
                                        fontSize: '18px',
                                        '& .MuiSvgIcon-root': {
                                            color: '#fff'
                                        },
                                        '&.Mui-expanded': {
                                            minHeight: '0'
                                        }
                                    }}
                                >
                                    {t("tracking.info")}
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={{
                                        overflowWrap: 'break-word'
                                    }}>
                                    <Box sx={{
                                        marginBlock: '-7px 15px',
                                        borderTop: '1px solid #35383F',
                                    }}/>
                                    {description}
                                </AccordionDetails>
                            </Accordion>
                        </>
                    }
                    {balance > 0 && chartData.length > 0 && chartData &&
                        <>
                            <CardChart money={parseInt(balance)} chartData={chartData}/>
                        </>
                    }
                    {stocksData &&
                        <>
                            <Accordion
                                square={true}
                                defaultExpanded={true}
                                sx={{
                                    backgroundColor: 'var(--component_bg_color)',
                                    borderRadius: '20px',
                                    marginBottom: '10px',
                                    color: 'var(--text_color)'
                                }}>
                                <AccordionSummary
                                    expandIcon={<ArrowBackIosNewRoundedIcon sx={{transform: 'rotate(-90deg)'}}/>}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    sx={{
                                        borderRadius: '20px',
                                        fontWeight: '600',
                                        fontSize: '18px',
                                        '& .MuiSvgIcon-root': {
                                            color: '#fff'
                                        },
                                        '&.Mui-expanded': {
                                            minHeight: '0'
                                        }
                                    }}
                                >
                                    {t("tracking.portfolio")}
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={{
                                        overflowWrap: 'break-word',
                                        paddingBottom: '5px'
                                    }}>
                                    <Box sx={{
                                        marginBlock: '-7px 15px',
                                        borderTop: '1px solid #35383F',
                                    }}/>
                                    <Box className={style.bigCard__content__portfolio}>
                                        {renderPortfolioData()}
                                    </Box>
                                </AccordionDetails>
                                {/*<Box className={style.bigCard__content__portfolio__button_box}>*/}
                                {/*    <Button*/}
                                {/*        className={style.bigCard__content__portfolio__button}*/}
                                {/*        variant={'contained'}*/}
                                {/*        onClick={handleClickOpen}*/}
                                {/*        sx={{*/}
                                {/*            backgroundColor: '#fff',*/}
                                {/*            borderRadius: '15px',*/}
                                {/*            boxShadow: '0px 0px 15px 3px rgba(0, 0, 255, 0.5)',*/}
                                {/*            ':hover':{*/}
                                {/*                backgroundColor: 'rgba(255,255,255, 0.7)',*/}
                                {/*                boxShadow: '0px 0px 10px 3px rgba(0, 0, 255, 0.5)',*/}
                                {/*            }*/}
                                {/*        }}*/}
                                {/*    >*/}
                                {/*        <Typography*/}
                                {/*        sx={{*/}
                                {/*            color: '#000',*/}
                                {/*            fontWeight: '700',*/}
                                {/*            fontFamily: 'Gilroy, sans-serif'*/}
                                {/*        }}>*/}
                                {/*            {t("tracking.portfolio_btn")}*/}
                                {/*        </Typography>*/}
                                {/*    </Button>*/}
                                {/*</Box>*/}
                            </Accordion>
                            <Box sx={{height: '5px'}}/>
                        </>
                    }
                </Box>
            </Box>
            {/*<BuyDialog open={open} setOpen={setOpen} coins={Object.keys(stocks)}/>*/}
        </>
    );
}

export default BigCard;