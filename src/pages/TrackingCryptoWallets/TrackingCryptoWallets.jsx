import React, {Suspense, useCallback, useEffect, useState} from 'react';
import style from './trackingCryptoWallets.module.sass';
import { useTranslation } from 'react-i18next';
import {Box, InputAdornment, Input, FormControl, MenuItem, Typography, Button} from '@mui/material'; // Import TextField and Autocomplete
import {tg} from '../../shared/telegram/telegram.js';
import { motion, AnimatePresence } from 'framer-motion';
import Tab from './components/Tab'
import Filters from './components/Filters'
import MiniCard from './components/MiniCard'
import { data } from './data.js'

import all_active from './assets/main/all_active.svg'
import all_disabled from './assets/main/all_disabled.svg'
import favorites_tab_active from './assets/main/favorites_tab_active.svg'
import favorites_tab_disabled from './assets/main/favorites_tab_disabled.svg'
import search from './assets/main/search.svg'
import {getWhaleNetworks, getWhaleTags, getWhaleWallets} from "./api/api.js";
import BigCard from "./components/BigCard/index.js";
import SearchCustomWallet from "./components/SearchCustomWallet/index.js";
import AddCustomWallet from "./components/AddCustomWallet/index.js";
import CircularProgress from "@mui/material/CircularProgress";

const TrackingCryptoWallets = () => {
    const {t, i18n} = useTranslation();

    tg.setHeaderColor('#000')
    const [isBigCardOpenened, setIsBigCardOpened] = useState(false)

    const [tempWalletVisible, setTempWalletVisible] = useState('')

    const [activeTab, setActiveTab] = useState('all');
    const [searchValue, setSearchValue] = useState('');
    const [searchValueVerified, setSearchValueVerified] = useState('');

    const [network, setNetwork] = useState('all');
    const [networkMenu, setNetworkMenu] = useState();

    const [backdropVisible, setBackdropVisible] = useState(true);

    const [walletsData, setWalletsData] = useState()

    const handleTabClick = (tab) => {
        setWalletsData([])
        setActiveTab(tab);
        getWhaleWallets(setBackdropVisible, tab, '', '', [], '')
            .then(response => {
                if (response.errorCode === 1006){
                    window.location.href = "/premium";
                }
                setWalletsData(response.data.data);
            })
            .catch(error => {
                // Обрабатываем ошибку, если она возникла
                console.error('Ошибка при получении данных о кошельках:', error);
            });
    };

    const handleChange = (event) => {
        if (event.target.value === null) {
            setNetwork('')
        } else {
            setNetwork(event.target.value);
        }
    };

    useEffect(() => {
        getWhaleWallets(setBackdropVisible, 'all', '', '', [], '')
            .then(response => {
                if (response.errorCode === 1006){
                    window.location.href = "/premium";
                }
                setWalletsData(response.data.data);
            })
            .catch(error => {
                // Обрабатываем ошибку, если она возникла
                console.error('Ошибка при получении данных о кошельках китов:', error);
            });

        getWhaleNetworks()
            .then(response => {
                // Convert networkMenu object to array of objects
                const networkArray = Object.keys(response.data).map(key => ({
                    value: response.data[key],
                    name: key
                }));
                if (response.errorCode === 1006){
                    window.location.href = "/premium";
                }
                networkArray.unshift({name: `${t("tracking.filter_network_all")}`, value: 'all'});
                setNetworkMenu(networkArray);
            })
            .catch(error => {
                // Обрабатываем ошибку, если она возникла
                console.error('Ошибка при получении данных о кошельках:', error);
            });

        const disableHorizontalScroll = (event) => {
            if (event.deltaX !== 0) {
                event.preventDefault();
            }
        };
        // Добавляем обработчик события колесика мыши
        window.addEventListener('wheel', disableHorizontalScroll, {passive: false});
        return () => {
            // Удаляем обработчик события при размонтировании компонента
            window.removeEventListener('wheel', disableHorizontalScroll);
        };

    }, []);

    useEffect(() => {
        // console.log(walletsData)
        // console.log(networkMenu)
    }, [walletsData]);

    const [leftPosition, setLeftPosition] = useState('200vw');

    const [bigCardStates, setBigCardStates] = useState({});

    const [loading, setLoading] = useState(false)
    const [searchResultsCount, setSearchResultsCount] = useState(0); // Добавляем состояние для отслеживания количества результатов поиска

    const [searchInputValueEmpty, setSearchInputValueEmpty]=useState(true)

    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.BackButton.isVisible = true;
    const handleBackButtonClick = useCallback(() => {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");
        if (!isBigCardOpenened) {
            window.location.href = "/";
        } else {
            setLeftPosition('200vw');
            document.body.style.overflow = '';
            setTimeout(() => {
                setBigCardStates(prevState => ({
                    ...prevState,
                    [tempWalletVisible]: false
                }));
            }, 200);
            setIsBigCardOpened(false);
        }
    }, [isBigCardOpenened, tempWalletVisible, setLeftPosition, setIsBigCardOpened, setBigCardStates]);

    useEffect(() => {
        window.Telegram.WebApp.BackButton.onClick(handleBackButtonClick);
        return () => {
            window.Telegram.WebApp.BackButton.offClick(handleBackButtonClick);
        };
    }, [handleBackButtonClick]);

    return (
        <>
            <Box className={style.trackingCryptoWallets}>
                <Box className={style.loader_box}
                     sx={{
                         display: backdropVisible ? 'flex' : 'none'
                     }}>
                    <Box className={style.loader}/>
                </Box>
                <Box className={style.trackingCryptoWallets__content}>
                    {/*коробка для двух поисков*/}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        width: '100%',
                        position: 'relative',
                        height: '60px'
                    }}
                    >
                        {/* поиск по сети + сеть */}
                        <SearchCustomWallet
                            setSearchResultsCount={setSearchResultsCount}
                            setSearchInputValueEmpty={setSearchInputValueEmpty}
                            activeTab={activeTab}
                            setSearchValue={setSearchValue}
                            searchValue={searchValue}
                            networkMenu={networkMenu}
                            network={network}
                            setWalletsData={setWalletsData}
                            handleChange={handleChange}
                            setLoading={setLoading}
                        />
                        {/* поиск верифицированных */}
                        <Input
                            placeholder={t('tracking.search')}
                            value={searchValueVerified}
                            disableUnderline={true}
                            defaultValue={''}
                            onChange={(e) => setSearchValueVerified(e.target.value)}
                            sx={{
                                position: 'absolute',
                                left: activeTab === 'all' ? '100vw' : '0',
                                transition: 'left 200ms ease',
                                color: 'var(--text_color)',
                                borderRadius: '50px',
                                bgcolor: '#1B1B1B',
                                padding: '10px 15px',
                                width: '100%',
                                height: '55px',
                                '& .MuiInput-input': {padding: '0', paddingTop: '1px', fontFamily: 'Gilroy'},
                            }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <img src={search} alt={'search'}/>
                                    </Box>
                                </InputAdornment>
                            }
                        />
                    </Box>
                    <Box className={style.trackingCryptoWallets__sticky} sx={{
                        height: '70px',
                        overflow: 'hidden',
                    }}>
                        <Box className={style.trackingCryptoWallets__content__pages}>
                            <Tab
                                name="all"
                                iconActive={all_active}
                                iconDisabled={all_disabled}
                                onClick={() => {
                                    handleTabClick('all')
                                    setSearchValueVerified('')
                                }}
                                activeTab={activeTab}
                                text={t('tracking.page_all')}/>
                            <Box sx={{width: '20px'}}/>
                            <Tab
                                name="follows"
                                iconActive={favorites_tab_active}
                                iconDisabled={favorites_tab_disabled}
                                onClick={() => {
                                    handleTabClick('follows')
                                    setSearchValue('')
                                }}
                                activeTab={activeTab}
                                text={t('tracking.page_verified')}/>
                        </Box>
                        <Filters setWalletsData={setWalletsData}/>
                    </Box>
                    <Box sx={{
                        position: 'absolute',
                        top: '155px',
                        width: '90%',
                        paddingBottom: '10px',
                        left: 'calc((100vw - 90%)/2)',
                        transition: 'left 200ms ease',
                    }}>
                        <Box className={style.trackingCryptoWallets__content__cards__verified}>
                            <AnimatePresence>
                                {walletsData &&
                                    <>
                                        {walletsData
                                            .slice() // Создаем копию массива, чтобы не изменять оригинал
                                            .sort((a, b) => b.balance - a.balance) // Сортируем по убыванию баланса
                                            .map((item, index) => {
                                                const matchesNetwork = network === item.network || network === 'all';
                                                if (
                                                    matchesNetwork
                                                ) {
                                                    return (
                                                        <>
                                                            {activeTab === 'follows' ?
                                                                <>
                                                                    {item.isFollow &&
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
                                                                                setIsVisible={() => setBigCardStates({
                                                                                    ...bigCardStates,
                                                                                    [item.address]: true
                                                                                })}
                                                                            />
                                                                        </motion.div>
                                                                    }
                                                                </> : <>
                                                                    <motion.div
                                                                        key={index}
                                                                        initial={{opacity: 0}}
                                                                        animate={{opacity: 1}}
                                                                        exit={{opacity: 0, transition: {duration: 0.2}}}
                                                                        transition={{delay: 0.2}}
                                                                        style={{
                                                                            maxHeight: '100%',
                                                                            marginBlock: '3px 10px'
                                                                        }}
                                                                    >
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
                                                                            setIsVisible={() => setBigCardStates({
                                                                                ...bigCardStates,
                                                                                [item.address]: true
                                                                            })}
                                                                        />
                                                                    </motion.div>
                                                                </>
                                                            }
                                                            {bigCardStates[item.address] &&
                                                                <Suspense>
                                                                    <BigCard
                                                                        setTempWalletVisible={setTempWalletVisible}
                                                                        setIsBigCardOpened={setIsBigCardOpened}
                                                                        isBigCardOpenened={isBigCardOpenened}
                                                                        setWalletsData={setWalletsData}
                                                                        leftPosition={leftPosition}
                                                                        bigCardStates={bigCardStates}
                                                                        setBigCardStates={setBigCardStates}
                                                                        setIsVisible={() => setBigCardStates({
                                                                            ...bigCardStates,
                                                                            [item.address]: false
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
                                                                    />
                                                                </Suspense>
                                                            }
                                                        </>
                                                    );
                                                }
                                                // return null;
                                            })
                                        }
                                    </>
                                }
                            </AnimatePresence>
                        </Box>
                        {loading ? (
                            <>
                                <Box
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'center',
                                    marginBlock: '10px'
                                }}>
                                    <CircularProgress
                                        sx={{
                                            color: '#fff'
                                        }}/>
                                </Box>
                            </>
                        ) : (
                            <>
                                {searchResultsCount === 0 && searchValue.trim() !== '' && (
                                    <>
                                        <AddCustomWallet
                                            setTempWalletVisible={setTempWalletVisible}
                                            setSearchResultsCount={setSearchResultsCount}
                                            setIsBigCardOpened={setIsBigCardOpened}
                                            setBigCardStates={setBigCardStates }
                                            searchValue={searchValue}
                                            display={searchResultsCount === 0 && searchValue.trim() !== ''}
                                            setWalletsData={setWalletsData}
                                            activeTab={activeTab}
                                            leftPosition={leftPosition}
                                            setLeftPosition={setLeftPosition}
                                            bigCardStates={bigCardStates}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default TrackingCryptoWallets;
