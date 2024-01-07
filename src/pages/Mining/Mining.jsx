// Imports
import React, { useEffect, lazy, useState } from 'react';
import { Link as RouterLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Backdrop, BottomNavigation, BottomNavigationAction, Box, CircularProgress, Typography } from '@mui/material';
import { miningUserExists, getMiningUserData, getMiningTickersPrice } from './components/Requests/Requests.js';
import MainMining from './pages/MainMining/index.js';
import SecMining from './pages/SecMining/index.js';
import Referrals from './pages/Referrals/index.js';
import Menu from './pages/Menu/index.js';
import Helps from "./components/Helps/index.js";
import { currentQueryId } from '../../shared/telegram/telegram.js';
import { useTranslation } from "react-i18next";
import TaskList from "./components/TaskList/index.js";

// Lazy-loaded icons
const PeopleIcon = lazy(() => import('@mui/icons-material/People'));
const MenuIcon = lazy(() => import('@mui/icons-material/Menu'));
const CurrencyExchangeIcon = lazy(() => import('@mui/icons-material/CurrencyExchange'));
const FilterDramaIcon = lazy(() => import('@mui/icons-material/FilterDrama'));

// Main component
const Mining = () => {
    const { t } = useTranslation();

    const [showBackdrop, setShowBackdrop] = useState(true);

    // Local state
    const [value, setValue] = React.useState(() => {
        const storedValue = localStorage.getItem('bottomNavigationValue');
        return storedValue ? parseInt(storedValue, 10) : 0;
    });
    const [isHelpsVisible, setIsHelpsVisible] = React.useState(false);
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    const [isComponentsLoaded, setIsComponentsLoaded] = React.useState(false);
    const [activeTasks, setActiveTasks] = useState([]);

    const [activeMenuSection, setActiveMenuSection] = useState(100);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserExists = async () => {
            try {
                const userExistsResponse = await miningUserExists();

                if (!userExistsResponse.status) {
                    setIsHelpsVisible(true);
                }
            } catch (error) {
                console.error('Error checking user existence:', error);
            }
        };

        checkUserExists(); // Выполняется только один раз
    }, []);

    const fetchDataAndUpdateLocalStorage = async () => {
        try {
            const storedQueryId = localStorage.getItem('miningQueryId');
            if (storedQueryId !== currentQueryId) {
                const response = await getMiningUserData();
                const userDataResponse = response.data;

                localStorage.setItem('miningQueryId', currentQueryId);
                localStorage.setItem('miningData', JSON.stringify(userDataResponse.data));
                localStorage.setItem('miningUserData', JSON.stringify(userDataResponse));
                localStorage.setItem('isDailyMiningActivated', JSON.stringify(userDataResponse.is_daily_mining_activated));
                setIsDataLoaded(true);
                // Вызываем fetchLocalStorageTasks после успешного получения данных из API
                await fetchLocalStorageTasks();
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

    const fetchLocalStorageTasks = async () => {
        try {
            const storedData = JSON.parse(localStorage.getItem('miningUserData')) || {};
            setActiveTasks(storedData.active_tasks || []);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchDataAndUpdateLocalStorage();

        fetchTickersPricesAndUpdateLocalStorage();

        const intervalId = setInterval(() => {
            fetchTickersPricesAndUpdateLocalStorage();
        }, 3 * 60 * 1000);

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId);

        // Добавление зависимостей, если это необходимо
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
        const bottomNavigationValue = JSON.parse(localStorage.getItem('bottomNavigationValue')) || {};

        const timeoutId = setTimeout(() => {
            setShowBackdrop(false);
            // Ваш существующий код, который выполняется после 1 секунды
            if (location.pathname === '/') {
                switch (bottomNavigationValue) {
                    case 0:
                        navigate('/main-mining');
                        break;
                    case 1:
                        navigate('/second-mining');
                        break;
                    case 2:
                        navigate('/referrals');
                        break;
                    case 3:
                        navigate('/menu');
                        break;
                    default:
                        navigate('/main-mining');
                        break;
                }
            }
        }, 1000);
        // Очистка таймаута при размонтировании компонента
        return () => clearTimeout(timeoutId);
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
            to: '/menu',
            component: Menu,
            title: `${t('mining.pages.menu.title')}`
        },
    ];

    const icons = [
        <FilterDramaIcon />,
        <CurrencyExchangeIcon />,
        <PeopleIcon />,
        <MenuIcon />,
    ];

    const currentMenuItem = menuItems.find(item => item.to === location.pathname);

    window.Telegram.WebApp.BackButton.isVisible = true;
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.BackButton.onClick(async () => {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');

        window.location.href = '/tools';
    });

    return (
        <>
            <Backdrop sx={{ zIndex: 999, color: '#fff', bgcolor: 'var(--tg-theme-bg-color)' }} open={showBackdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
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
                        {currentMenuItem ? currentMenuItem.title : `${t('mining.pages.menu.title')}`}
                    </Typography>
                </Box>
                {!isHelpsVisible && (
                    <Box
                        sx={{
                            marginBottom: '56px'
                        }}>
                        <Routes>
                            {menuItems.map((item, index) => (
                                <Route key={index} path={item.to} element={<item.component setValue={setValue} setActiveMenuSection={setActiveMenuSection} activeMenuSection={activeMenuSection} fetchDataAndUpdateLocalStorage={fetchDataAndUpdateLocalStorage}/>} />
                            ))}
                        </Routes>
                    </Box>
                )}
                <BottomNavigation
                    value={value}
                    onChange={handleChange}
                    sx={{
                        position: 'fixed',
                        bottom: '0',
                        width: '100%',
                        zIndex: '10',
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
            {isHelpsVisible && (
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
                    <Helps hideHelps={() => setIsHelpsVisible(false)} />
                </Box>
            )}
            {!isHelpsVisible && activeTasks.length > 0 && (
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
                    <Typography
                        sx={{
                            margin: '15px',
                            fontSize: '18px',
                            color: 'var(--tg-theme-text-color)'
                        }}
                    >
                        {t('mining.components.taskList.title')}:</Typography>
                    <TaskList activeTasks={activeTasks} setActiveTasks={setActiveTasks} />
                </Box>
            )}
        </>
    );
}

export default Mining;
