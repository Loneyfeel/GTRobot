import React, {Suspense, useCallback, useEffect, useRef, useState} from 'react';
import style from './bigCard.module.sass'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    Button, Dialog, IconButton,
    Snackbar,
    Typography
} from "@mui/material";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import verifiedImg from '../../assets/shared/checkmark.svg'
import {useCopyToClipboard} from "@uidotdev/usehooks";
import {useTranslation} from "react-i18next";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import CardChart from "../Chart/index.js";

import brokenCoin from '../../assets/bigCard/broken.svg'
import rename from '../../assets/bigCard/rename.svg'
import brokenPhoto from '../../assets/card/broken.svg'
import favorites_tab_active from '../../assets/main/favorites_tab_active.svg'
import favorites_tab_disabled from '../../assets/main/favorites_tab_disabled.svg'
import BuyDialog from "./BuyDialog/index.js";
import {getWhaleWalletData, getWhaleWallets, setWhaleWalletFollow, setWhaleWalletName} from "../../api/api.js";
import {useQueryClient} from "@tanstack/react-query";
import NoPremiumDialog from "../../../../shared/components/NoPremiumDialog/index.js";
import lock from '../../assets/shared/lockBlack.svg'
import {motion} from "framer-motion";
import MiniCard from "../MiniCard/index.js";
import {tg} from "../../../../shared/telegram/telegram.js";

const BigCard = ({
                     walletsData,
                     setTempWalletVisible,
                     setWalletsData,
                     leftPosition,
                     setLeftPosition,
                     photo,
                     verified,
                     address,
                     description,
                     balance,
                     walletId,
                     activeTab,
                     searchInputValueEmpty,
                     setIsBigCardOpened,
                     setIsVisible,
                     name,
                     gtrobotTheme
                 }) => {

    const [tempWalletVisible1, setTempWalletVisible1] = useState('')

    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.BackButton.isVisible = true;
    const handleBackButtonClick = useCallback(() => {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");
        document.body.style.overflow = '';
        setTimeout(() => {
            setBigCardStatesOne(prevState => ({
                ...prevState,
                [tempWalletVisible1]: false
            }));
        }, 200);
    }, [setLeftPosition]);

    useEffect(() => {
        window.Telegram.WebApp.BackButton.onClick(handleBackButtonClick);
        return () => {
            window.Telegram.WebApp.BackButton.offClick(handleBackButtonClick);
        };
    }, [handleBackButtonClick]);

    const {t, i18n} = useTranslation();
    const [isCopySnackbarOpen, setIsCopySnackbarOpen] = useState(false);
    const [copiedText, copyToClipboard] = useCopyToClipboard();
    const [bigCardStatesOne, setBigCardStatesOne] = useState({});

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

    const [oneWalletData, setOneWalletData] = useState()
    const [stocksData, setStocksData] = useState()
    const [chartData, setChartData] = useState([])
    const [favorite, setFavorite] = useState(false)

    const [inputValue, setInputValue] = useState('');

    const [isOpenRenameDialog, setIsOpenRenameDialog] = useState(false)
    const [isOpenPromtDialog, setIsOpenPromtDialog] = useState(false)

    const [inputValueRename, setInputValueRename] = useState('');
    const [inputValuePromt, setInputValuePromt] = useState('');

    function handleChangeRenameInputDialog(e){
        setInputValueRename(e.target.value)
    }

    function handleChangePromtInputDialog(e){
        setInputValuePromt(e.target.value)
    }

    function handleDialogClose(){
        setIsOpenRenameDialog(false)
        setIsOpenPromtDialog(false)
    }

    const handlePrompt = () => {
        if (inputValuePromt !== null && inputValuePromt !== '' && inputValuePromt !== ' ') {
            // пользователь ввел текст
            followClick(activeTab, inputValuePromt)
        }
    };

    function renameClick() {
        if (inputValueRename !== null && inputValueRename !== '' && inputValueRename !== ' ') {
            setWhaleWalletName(walletId, inputValueRename)
                .then(response => {
                    getBigCardData(walletId)
                    let type = searchInputValueEmpty ? 'all' : 'search'
                    let addressFollow = address
                    if (activeTab === 'follows') {
                        type = 'follows'
                        addressFollow = ''
                    }
                    getWhaleWallets(settempSet, type, '', '', [], '')
                        .then(response => {
                            if (activeTab === 'follows') {
                                document.body.style.overflow = ''
                            }
                            setWalletsData(response.data.data);
                        })
                        .catch(error => {
                            // Обрабатываем ошибку, если она возникла
                            console.error('Ошибка при получении данных о кошельках:', error);
                        });
                })
        }
    }

    function getBigCardData(walletId) {
        getWhaleWalletData(walletId)
            .then(response => {
                if (response.errorCode === 3006){
                    window.location.href = "/premium";
                }
                setOneWalletData(response.data)
                if (response.data.name) {
                    setInputValue(response.data.name)
                    setInputValueRename(response.data.name)
                    setInputValuePromt(response.data.name)
                }
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

    function followClick(activeTab, name) {
        let type = searchInputValueEmpty ? 'all' : 'search'
        let addressFollow = ''
        if (favorite) {
            addressFollow = ''
            setLeftPosition('200vw');
            document.body.style.overflow = '';
            setTimeout(() => {
                setIsVisible()
            }, 200);
            setIsBigCardOpened(false);
        }
        if (activeTab === 'follows') {
            type = 'follows'
        }
        if (type === 'search') {
            addressFollow = address
        }
        setWhaleWalletFollow(walletId, name)
            .then(() => {
                getWhaleWallets(settempSet, type, addressFollow, '', [], '')
                    .then(response => {
                        getBigCardData(walletId)
                        if (activeTab === 'follows') {
                            document.body.style.overflow = ''
                        }
                        setWalletsData(response.data.data);
                    })
                    .catch(error => {
                        // Обрабатываем ошибку, если она возникла
                        console.error('Ошибка при получении данных о кошельках:', error);
                    });
            })
            .catch(error => {
                console.error('Ошибка при получении данных о кошельке:', error);
            })
    }

    {
        setTempWalletVisible(address ? address : name)
    }
    useEffect(() => {
        getBigCardData(walletId)
    }, []);

    // Функция для фильтрации монет по условию precent > 0.00001 и формирования только первых 10 монет
    const filterAndSliceCoins = (data) => {
        const totalQuote = data.reduce((total, [, {quote}]) => total + quote, 0);
        const filteredCoins = data
            .filter(([, {quote}]) => (quote / totalQuote) * 100 >= 0)
            .sort(([, {quote: quoteA}], [, {quote: quoteB}]) => quoteB - quoteA)
            // .slice(0, 10)
            .map(([currency]) => currency);

        return filteredCoins;
    };


    const [coinsToCopy, setCoinsToCopy] = useState([])
    useEffect(() => {
        // Проверяем, что stocksData не равно undefined или null
        if (stocksData) {
            // Преобразование объекта в массив пар [ключ, значение]
            const currencyData = Object.entries(stocksData);
            // Вызываем функцию для фильтрации и формирования первых 10 монет
            const updatedCoinsToCopy = filterAndSliceCoins(currencyData);

            setCoinsToCopy(updatedCoinsToCopy);
        }
    }, [stocksData]);


    const [filteredCoinsData, setFilteredCoinsData] = useState([])

    const imageFolder = '/assets/cryptocurrencies/';
    // Отображение данных портфолио
    const renderPortfolioData = () => {
        // Преобразование объекта в массив пар [ключ, значение]
        const currencyData = Object.entries(stocksData);

        // Вычисляем общую сумму квот всех монет
        const totalQuote = currencyData.reduce((total, [, {quote}]) => total + quote, 0);

        // Вызываем функцию для фильтрации и формирования первых 10 монет
        const filteredCoins = filterAndSliceCoins(currencyData, totalQuote);

        setTimeout(()=>{
            setFilteredCoinsData(filteredCoins)
        },100)

        return filteredCoins.map((currency) => {
            const {balanceCoin, quote} = stocksData[currency];
            const mathBalance = quote.toFixed(0);
            const precent = ((quote / totalQuote) * 100).toFixed(2);
            const iconPath = `${imageFolder}/${currency.toLowerCase()}.png`; // Путь к изображению
            const formattedCurrency = currency.charAt(0).toUpperCase() + currency.slice(1);


            return (
                <>
                    {mathBalance >= 1 &&
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
                                    style={{
                                        filter: gtrobotTheme === 'gtrobot' ? '' : tg.colorScheme === 'dark' ? '' : 'invert(1)',
                                    }}
                                />
                            </Box>
                            <Box className={style.bigCard__content__portfolio__card__coin}>{formattedCurrency}</Box>
                            <Box className={style.bigCard__content__portfolio__card__amount}
                                 sx={{
                                     fontSize: mathBalance > 10000000 ? '14px' : mathBalance > 100000000 ? '13px' : mathBalance > 1000000000 ? '12px' : '14px'
                                 }}>$ {formatNumber(mathBalance)}</Box>
                        </Box>
                    }
                </>
            )
        });
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        if (userData.isPremiumUser) {
            setOpen(true);
        } else {
            setOpenNoPremiumDialog(true)
        }
    };

    const queryClient = useQueryClient()
    const [userData, setUserData] = useState([])
    const [openNoPremiumDialog, setOpenNoPremiumDialog] = useState(false)

    useEffect(() => {
        if (queryClient.getQueryData('userMainData')) {
            setUserData(queryClient.getQueryData('userMainData').data)
        }
    }, [queryClient.getQueryData('userMainData')])
    
    const [finalWallets, setFinalWallets] = useState([]);
    const [temp, setTemp] = useState(true)
    const [walletsSimilar, setWalletsSimilar] = useState([])
    useEffect(() => {
        getWhaleWallets(setTemp, 'all', '', '', [], '')
            .then(response => {
                setWalletsSimilar(response.data.data);
            })
            .catch(error => {
                // Обрабатываем ошибку, если она возникла
                console.error('Ошибка при получении данных о кошельках китов:', error);
            });
        if (oneWalletData && walletsSimilar) {
            const filtered = walletsSimilar
                // Фильтрация по walletNetwork
                .filter(wallet => wallet.network === oneWalletData.network)
                // Сортировка по максимальному количеству совпадений тегов
                .sort((a, b) => {
                    const aMatchCount = a.tags.filter(tag => oneWalletData.tags.includes(tag)).length;
                    const bMatchCount = b.tags.filter(tag => oneWalletData.tags.includes(tag)).length;
                    return bMatchCount - aMatchCount;
                })
                // Исключение кошелька с определенным адресом
                .filter(wallet => wallet.address !== address)
                // Выбор первых 6 результатов
                .slice(0, 6);

            const final = filtered.length < 6
                ? filtered.concat(walletsSimilar.filter(wallet => !filtered.includes(wallet)).slice(0, 6 - filtered.length))
                : filtered;

            setFinalWallets(final);
        }
    }, [oneWalletData, temp]);

    const [listIsOpen, setListIsOpen] = useState(false)
    const scrollableRef = useRef(null);

    const scrollToTop = () => {
        if (scrollableRef.current) {
            scrollableRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>

            <Box className={style.bigCard}
                 sx={{
                     left: leftPosition,
                 }}>
                {oneWalletData && <>
                    <Box className={style.bigCard__content}>
                        <Box className={style.bigCard__content__favorite}
                             onClick={() => {
                                 if (!favorite) {
                                     setIsOpenPromtDialog(true)
                                 } else {
                                     followClick(activeTab, oneWalletData.name)
                                 }
                             }}>
                            {favorite ?
                                <img src={favorites_tab_active} alt=''
                                     className={style.bigCard__content__favorite_img}
                                     style={{
                                         filter: gtrobotTheme === 'gtrobot' ? '' : tg.colorScheme === 'dark' ? '' : 'invert(1)',
                                     }}/>
                                :
                                <img src={favorites_tab_disabled} alt=''
                                     className={style.bigCard__content__favorite_img}/>
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
                            {oneWalletData.name && <Box className={style.bigCard__content__info__name}>
                                <Box className={style.bigCard__content__info__name_text}>
                                    {oneWalletData.name}
                                </Box>
                                {verified &&
                                    <Box className={style.bigCard__content__info__name_verified}>
                                        <img src={verifiedImg} alt={'verified'}
                                             className={style.bigCard__content__info__name_verified_img}/>
                                    </Box>
                                }
                                {favorite &&
                                    <>
                                        <Box>
                                            <IconButton
                                                onClick={() => {
                                                    setIsOpenRenameDialog(true)
                                                }}
                                                sx={{
                                                    color: 'var(--active-color)'
                                                }}>
                                                <img src={rename} alt={'Rename'}
                                                     style={{
                                                         width: '20px',
                                                         filter: gtrobotTheme === 'gtrobot' ? '' : tg.colorScheme === 'dark' ? '' : 'invert(1)',
                                                     }}/>
                                            </IconButton>
                                        </Box>
                                    </>
                                }
                            </Box>
                            }
                            <Dialog
                                open={isOpenRenameDialog}
                                onClose={handleDialogClose}
                                sx={{
                                    '& .MuiDialog-paper': {
                                        backgroundColor: 'unset',
                                        overflowY: 'unset'
                                    }
                                }}
                            >
                                <Box className={style.nameDialog__content}>
                                    <Box className={style.nameDialog__content__title}>
                                        <Box className={style.nameDialog__content__title_text}>
                                            {t("tracking.inputFollowName")}
                                        </Box>
                                    </Box>
                                    <input
                                        value={inputValueRename}
                                        onChange={(e) => handleChangeRenameInputDialog(e)}
                                        placeholder={' . . . '}
                                        className={style.nameDialog__content__input}
                                    />
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        width: '100%'
                                    }}>
                                        <Button
                                            className={style.nameDialog__content__button}
                                            onClick={handleDialogClose}
                                            sx={{
                                                backgroundColor: 'var(--button-color)',
                                                borderRadius: '50px',
                                                boxShadow: 'unset',
                                                padding: '10px',
                                                fontFamily: 'Gilroy, sans-serif',
                                                marginRight: '20px',
                                                ':hover': {
                                                    backgroundColor: 'var(--inactive-color)',
                                                    boxShadow: 'unset',
                                                }
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: 'var(--button-text-color)',
                                                    fontWeight: '600',
                                                    fontFamily: 'Gilroy, sans-serif'
                                                }}>
                                                {t("tracking.buyCard.confirmation_text_close")}
                                            </Typography>
                                        </Button>
                                        <Button
                                            className={style.nameDialog__content__button}
                                            onClick={()=>{
                                                renameClick()
                                                handleDialogClose()
                                            }}
                                            sx={{
                                                backgroundColor: '#fff',
                                                borderRadius: '50px',
                                                padding: '10px',
                                                boxShadow: '0px 0px 15px 3px rgba(0, 0, 255, 0.5)',
                                                fontFamily: 'Gilroy, sans-serif',
                                                ':hover': {
                                                    backgroundColor: 'rgba(255,255,255, 0.7)',
                                                    boxShadow: '0px 0px 10px 3px rgba(0, 0, 255, 0.5)',
                                                }
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: '#000',
                                                    fontWeight: '600',
                                                    fontFamily: 'Gilroy, sans-serif'
                                                }}>
                                                Ок
                                            </Typography>
                                        </Button>
                                    </Box>
                                </Box>
                            </Dialog>
                            <Dialog
                                className={style.nameDialog}
                                open={isOpenPromtDialog}
                                onClose={handleDialogClose}
                                sx={{
                                    '& .MuiDialog-paper': {
                                        backgroundColor: 'unset',
                                        overflowY: 'unset'
                                    }
                                }}
                            >
                                <Box className={style.nameDialog__content}>
                                    <Box className={style.nameDialog__content__title}>
                                        <Box className={style.nameDialog__content__title_text}>
                                            {t("tracking.inputFollowName")}
                                        </Box>
                                    </Box>
                                    <input
                                        value={inputValuePromt}
                                        onChange={(e) => handleChangePromtInputDialog(e)}
                                        placeholder={' . . . '}
                                        className={style.nameDialog__content__input}
                                    />
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        width: '100%'
                                    }}>
                                        <Button
                                            onClick={handleDialogClose}
                                            className={style.nameDialog__content__button}
                                            sx={{
                                                backgroundColor: 'var(--button-color)',
                                                borderRadius: '50px',
                                                boxShadow: 'unset',
                                                padding: '10px',
                                                fontFamily: 'Gilroy, sans-serif',
                                                marginRight: '20px',
                                                ':hover': {
                                                    backgroundColor: 'var(--inactive-color)',
                                                    boxShadow: 'unset',
                                                }
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: '#fff',
                                                    fontWeight: 'var(--button-text-color)',
                                                    fontFamily: 'Gilroy, sans-serif'
                                                }}>
                                                {t("tracking.buyCard.confirmation_text_close")}
                                            </Typography>
                                        </Button>
                                        <Button
                                            className={style.nameDialog__content__button}
                                            onClick={()=>{
                                                handlePrompt()
                                                handleDialogClose()
                                            }}
                                            sx={{
                                                backgroundColor: '#fff',
                                                borderRadius: '50px',
                                                padding: '10px',
                                                boxShadow: '0px 0px 15px 3px rgba(0, 0, 255, 0.5)',
                                                fontFamily: 'Gilroy, sans-serif',
                                                ':hover': {
                                                    backgroundColor: 'rgba(255,255,255, 0.7)',
                                                    boxShadow: '0px 0px 10px 3px rgba(0, 0, 255, 0.5)',
                                                }
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: '#000',
                                                    fontWeight: '600',
                                                    fontFamily: 'Gilroy, sans-serif'
                                                }}
                                            >
                                                Ок
                                            </Typography>
                                        </Button>
                                    </Box>
                                </Box>
                        </Dialog>
                            {address &&
                                <>
                                    <Box className={style.bigCard__content__info__address}
                                         onClick={handleCopyAddressButtonClick}
                                    >
                                        <Box className={style.bigCard__content__info__address__text}
                                             sx={{
                                                 fontSize: photo && oneWalletData.name ? '18px' : '24px'
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
                                                    backgroundImage: 'linear-gradient(to bottom left, var(--gradient-one), var(--gradient-two))'
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
                                        backgroundColor: 'var(--component-bg-color)',
                                        borderRadius: '20px',
                                        marginBottom: '10px',
                                        color: 'var(--text-color)',
                                        '&::before':{
                                            opacity: 0
                                        },
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
                                                color: 'var(--active-color)'
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
                                            borderTop: '1px solid var(--big-card-color)',
                                        }}/>
                                        {description}
                                    </AccordionDetails>
                                </Accordion>
                            </>
                        }
                        {balance > 0 && chartData.length > 0 && chartData &&
                            <>
                                <CardChart money={parseInt(balance)} chartData={chartData} gtrobotTheme={gtrobotTheme}/>
                            </>
                        }
                        {stocksData &&
                            <>
                                <Accordion
                                    square={true}
                                    defaultExpanded={true}
                                    sx={{
                                        backgroundColor: 'var(--component-bg-color)',
                                        borderRadius: '20px',
                                        marginBottom: '10px',
                                        color: 'var(--text-color)',
                                        '&::before':{
                                            opacity: 0
                                        },
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
                                                color: 'var(--active-color)'
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
                                            borderTop: '1px solid var(--big-card-color)',
                                        }}/>
                                        <Box className={style.bigCard__content__portfolio}>
                                            <div className={style.bigCard__content__portfolio__box}
                                                 ref={scrollableRef}
                                            style={{
                                                height: filteredCoinsData.length > 10 ? listIsOpen ? '495px' : '350px' : '',
                                                overflow: filteredCoinsData.length > 10 ? listIsOpen ? 'auto' : 'hidden' : '',
                                                transition: 'height 300ms ease'
                                            }}>
                                                <div className={style.bigCard__content__portfolio__box__cards}>
                                                    <div
                                                        className={style.bigCard__content__portfolio__box__cards__content}>
                                                        {renderPortfolioData()}
                                                    </div>
                                                </div>
                                            </div>
                                        </Box>
                                    </AccordionDetails>
                                    <Box className={style.bigCard__content__portfolio__button_box}>
                                        {filteredCoinsData.length > 10 &&
                                            <div className={style.bigCard__content__portfolio__button_box__listButton}
                                                 onClick={() => {
                                                     setListIsOpen(!listIsOpen)
                                                     scrollToTop()
                                                 }}
                                                 style={{
                                                     background: listIsOpen ? '' : 'linear-gradient(to top, var(--component-bg-color), rgba(0,0,0,0))'
                                                 }}
                                            >
                                                {listIsOpen ?
                                                    <span style={{cursor: 'pointer'}}>
                                                    {t("tracking.openListClose")}
                                                </span>
                                                    :
                                                    <span style={{cursor: 'pointer'}}>
                                                    {t("tracking.openListOpen")}
                                                </span>
                                                }
                                            </div>
                                        }
                                        <Button
                                            className={style.bigCard__content__portfolio__button}
                                            variant={'contained'}
                                            onClick={handleClickOpen}
                                            startIcon={
                                                !userData.isPremiumUser &&
                                                <img src={lock} alt={'lock'} style={{
                                                    width: '20px'
                                                }}/>
                                            }
                                            sx={{
                                                backgroundColor: '#fff',
                                                borderRadius: '15px',
                                                boxShadow: '0px 0px 15px 3px rgba(0, 0, 255, 0.5)',
                                                marginTop: '40px',
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
                                                {t("tracking.portfolio_btn")}
                                            </Typography>
                                        </Button>
                                    </Box>
                                </Accordion>
                                <Box sx={{height: '5px'}}/>
                            </>
                        }
                        <Box
                            sx={{
                                marginBottom: '10px',
                                fontSize: '16px'
                            }}>
                            {t("tracking.similarWallets")}
                        </Box>
                        <Box
                            sx={{
                                display: 'inline-block',
                                width: '100%',
                                overflow: 'scroll',
                                scrollbarWidth: 'none',
                            }}>
                            <Box sx={{
                               display: 'flex',
                                width: '100%',
                                position: 'relative'
                            }}>
                                {!userData.isPremiumUser &&
                                    <>
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '0',
                                                left: '0',
                                                width: '100%',
                                                backgroundColor: 'rgba(0,0,0,0.6)',
                                                height: '97%',
                                                zIndex: '100'
                                            }}
                                            onClick={()=>{
                                                setOpenNoPremiumDialog(true)
                                            }}
                                        />
                                    </>
                                }
                                {
                                    finalWallets
                                        .map((item, index) => {
                                            return (
                                                <>
                                                    <motion.div
                                                        key={index}
                                                        initial={{opacity: 0}}
                                                        animate={{opacity: 1}}
                                                        exit={{
                                                            opacity: 0,
                                                            transition: {duration: 0.2}
                                                        }}
                                                        transition={{delay: 0.2}}
                                                        style={{
                                                            maxHeight: '100%',
                                                            marginBlock: '3px 10px'
                                                        }}
                                                    >
                                                        <Box sx={{
                                                            marginRight: index !== finalWallets.length - 1 ? '12px' : '0',
                                                            height: '100%'
                                                        }}>
                                                        <MiniCard
                                                            activeTab={activeTab}
                                                            setIsBigCardOpened={setIsBigCardOpened}
                                                            setWalletsData={setWalletsData}
                                                            name={item.name}
                                                            address={item.address}
                                                            verified={item.isVerified}
                                                            mini_description={item.miniDescription[i18n.language]}
                                                            description={item.description[i18n.language]}
                                                            stocks={item.stocks}
                                                            photo={`/assets/whales/${item.walletId}.png`}
                                                            balance={item.balance.toFixed(0)}
                                                            favorite={item.isFollow}
                                                            walletId={item.walletId}
                                                            chart={item.chart}
                                                            isSimilar={true}
                                                            setIsVisible={() => {
                                                                setBigCardStatesOne({
                                                                    ...bigCardStatesOne,
                                                                    [item.address ? item.address : item.name]: true
                                                                })
                                                            }}
                                                            lock={!userData.isPremiumUser}
                                                        />
                                                        </Box>
                                                    </motion.div>
                                                    {bigCardStatesOne[item.address ? item.address : item.name] &&
                                                        <Suspense>
                                                            <BigCard
                                                                walletsData={walletsData}
                                                                setTempWalletVisible={setTempWalletVisible1}
                                                                setIsBigCardOpened={setIsBigCardOpened}
                                                                setWalletsData={setWalletsData}
                                                                leftPosition={leftPosition}
                                                                bigCardStatesOne={bigCardStatesOne}
                                                                setBigCardStatesOne={setBigCardStatesOne}
                                                                setIsVisible={() => setBigCardStatesOne({
                                                                    ...bigCardStatesOne,
                                                                    [item.address ? item.address : item.name]: false
                                                                })}
                                                                favorite={item.isFollow}
                                                                setLeftPosition={setLeftPosition}
                                                                photo={`/assets/whales/${item.walletId}.png`}
                                                                name={item.name}
                                                                verified={item.isVerified}
                                                                address={item.address}
                                                                description={item.description[i18n.language]}
                                                                balance={item.balance.toFixed(0)}
                                                                chart={item.chart}
                                                                stocks={item.stocks}
                                                                walletId={item.walletId}
                                                                activeTab={activeTab}
                                                                searchInputValueEmpty={searchInputValueEmpty}
                                                                gtrobotTheme={gtrobotTheme}
                                                            />
                                                        </Suspense>
                                                    }
                                                </>
                                            )

                                        })
                                }
                            </Box>
                        </Box>
                    </Box>
                </>}
            </Box>
            {stocksData &&
                <>
                    <BuyDialog
                        open={open}
                        setOpen={setOpen}
                        coins={coinsToCopy}
                        walletId={walletId}
                        imageFolder={imageFolder}
                        gtrobotTheme={gtrobotTheme}/>
                </>
            }
            <NoPremiumDialog open={openNoPremiumDialog} setOpen={setOpenNoPremiumDialog} gtrobotTheme={gtrobotTheme}/>
        </>
    );
}

export default BigCard;