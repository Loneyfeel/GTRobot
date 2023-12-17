// Imports
import React, { useEffect, lazy, useState } from 'react';
import { Link as RouterLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Box, Typography } from '@mui/material';
import {miningUserExists, getMiningUserData, getMiningTickersPrice} from './components/Requests/Requests.js';
import MainMining from './pages/MainMining/index.js';
import SecMining from './pages/SecMining/index.js';
import Referrals from './pages/Referrals/index.js';
import Menu from './pages/Menu/index.js';
import Helps from "./components/Helps/index.js";
import { currentQueryId } from '../../shared/telegram/telegram.js';
import { useTranslation } from "react-i18next";

// Lazy-loaded icons
const PeopleIcon = lazy(() => import('@mui/icons-material/People'));
const MenuIcon = lazy(() => import('@mui/icons-material/Menu'));
const CurrencyExchangeIcon = lazy(() => import('@mui/icons-material/CurrencyExchange'));
const SavingsIcon = lazy(() => import('@mui/icons-material/Savings'));

// Main component
const Mining = () => {
    const {t} = useTranslation();

    // Local state
    const [value, setValue] = React.useState(() => {
        const storedValue = localStorage.getItem('bottomNavigationValue');
        return storedValue ? parseInt(storedValue, 10) : 0;
    });
    const [isHelpsVisible, setIsHelpsVisible] = React.useState(false);
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    const [isComponentsLoaded, setIsComponentsLoaded] = React.useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDataAndUpdateLocalStorage = async () => {
            try {

                const storedQueryId = localStorage.getItem('miningQueryId');
                if (storedQueryId !== currentQueryId) {
                    const response = await getMiningUserData();

                    const userDataResponse = response.data;

                    localStorage.setItem('miningQueryId', currentQueryId);
                    localStorage.setItem('miningData', JSON.stringify(userDataResponse.data));
                    localStorage.setItem('miningUserData', JSON.stringify(userDataResponse));
                    setIsDataLoaded(true);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        const fetchTickersPricesAndUpdateLocalStorage = async () => {
            try {
                const prices = await getMiningTickersPrice();
                const tickersPrices = prices.data;

                localStorage.setItem('prices', JSON.stringify(tickersPrices));
            } catch (error) {
                console.error('Error fetching tickers prices:', error);
            }
        };
        fetchTickersPricesAndUpdateLocalStorage();
        fetchDataAndUpdateLocalStorage();

        const intervalId = setInterval(() => {
            fetchTickersPricesAndUpdateLocalStorage();
        }, 3 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [location]);

    useEffect(() => {
        const checkUserExists = async () => {
            try {
                const userExistsResponse = await miningUserExists();

                // Проверяем, есть ли флаг в localStorage
                const userExistsFlag = localStorage.getItem('miningUserExistsFlag');

                if (!userExistsResponse.status && !userExistsFlag) {
                    setIsHelpsVisible(true);

                    // Устанавливаем флаг в localStorage
                    localStorage.setItem('miningUserExistsFlag', 'true');
                }
            } catch (error) {
                console.error('Error checking user existence:', error);
            }
        };

        checkUserExists(); // Выполняется только один раз
    }, []);

    useEffect(() => {
        if (isComponentsLoaded && value === null) {
            setValue(0);
        }
    }, [isComponentsLoaded, value]);

    useEffect(() => {
        if (isDataLoaded && !isComponentsLoaded) {
            setIsComponentsLoaded(true);
        }
    }, [isDataLoaded, isComponentsLoaded]);

    useEffect(() => {
        localStorage.setItem('bottomNavigationValue', value.toString());
    }, [value]);

    useEffect(() => {
        if (location.pathname === '/' && isComponentsLoaded) {
            navigate('/main-mining');
        }
    }, [location.pathname, navigate, isComponentsLoaded]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const menuItems = [
        {
            label: `${t('mining.buttons.mainMining')}`,
            to: '/main-mining',
            component: MainMining,
            title: `${t('mining.pages.mainMining.title')}`
        },
        {
            label: `${t('mining.buttons.secMining')}`,
            to: '/second-mining',
            component: SecMining,
            title: `${t('mining.pages.secMining.title')}`
        },
        {
            label: `${t('mining.buttons.referrals')}`,
            to: '/referrals',
            component: Referrals,
            title: `${t('mining.pages.ref.title')}`
        },
        {
            label: `${t('mining.buttons.menu')}`,
            to: '/menu/*',
            component: Menu,
            title: `${t('mining.pages.menu.title')}`
        },
    ];

    const icons = [
        <CurrencyExchangeIcon/>,
        <SavingsIcon/>,
        <PeopleIcon/>,
        <MenuIcon/>,
    ];

    const currentMenuItem = menuItems.find(item => item.to === location.pathname);

    return (
        <>
            <Box>
                <Box
                    sx={{
                        width: '100%',
                        textAlign: 'center',
                        bgcolor: 'var(--tg-theme-secondary-bg-color)',
                    }}
                >
                    <Typography
                        sx={{
                            color: 'var(--tg-theme-text-color)',
                            fontSize: '16px',
                            padding: '10px',
                            cursor: 'default'
                        }}
                    >
                        {currentMenuItem ? currentMenuItem.title : `${t('mining.pages.mainMining.title')}` }
                    </Typography>
                </Box>
                <Box
                    sx={{
                        marginBottom: '60px'
                    }}>
                    <Routes>
                        {menuItems.map((item, index) => (
                            <Route key={index} path={item.to} element={<item.component/>}/>
                        ))}
                        <Route path="/menu/*" element={<Menu/>}/>
                    </Routes>
                </Box>
                <BottomNavigation
                    value={value}
                    onChange={handleChange}
                    sx={{
                        position: 'fixed',
                        bottom: '0',
                        width: '100%',
                    }}
                >
                    {menuItems.map((item, index) => (
                        <BottomNavigationAction
                            key={index}
                            label={item.label}
                            icon={icons[index]}
                            component={RouterLink}
                            to={item.to}
                            sx={{
                                color: 'var(--tg-theme-text-color)',
                                '& .MuiBottomNavigationAction-label': {
                                    fontSize: '11px',
                                },
                                '& .MuiBottomNavigationAction-label.Mui-selected': {
                                    fontSize: '11px',
                                },
                                '&.Mui-selected': {
                                    paddingInline: '3px',
                                },
                                '&.MuiBottomNavigationAction-iconOnly': {
                                    paddingInline: '3px'
                                }
                            }}
                        />
                    ))}
                </BottomNavigation>
            </Box>
            {!!isHelpsVisible && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: '0',
                        height: '100%',
                        width: '100%',
                        bgcolor: 'var(--tg-theme-bg-color)',
                        zIndex: '3000',
                        display: 'block',
                    }}
                >
                    <Helps hideHelps={() => setIsHelpsVisible(false)}/>
                </Box>
            )}
        </>
    );
}

export default Mining;
