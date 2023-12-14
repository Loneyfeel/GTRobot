import React, { useEffect, lazy } from 'react';
import { Link as RouterLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Box, Typography } from '@mui/material';
import { miningUserExists, getMiningUserData } from './components/Requests/Requests.js';
import MainMining from './pages/MainMining/index.js';
import SecMining from './pages/SecMining/index.js';
import Referrals from './pages/Referrals/index.js';
import Menu from './pages/Menu/index.js';
import Helps from "./components/Helps/index.js";

const PeopleIcon = lazy(() => import('@mui/icons-material/People'));
const MenuIcon = lazy(() => import('@mui/icons-material/Menu'));
const CurrencyExchangeIcon = lazy(() => import('@mui/icons-material/CurrencyExchange'));
const SavingsIcon = lazy(() => import('@mui/icons-material/Savings'));

const Mining = () => {
    const [value, setValue] = React.useState(() => {
        const storedValue = localStorage.getItem('bottomNavigationValue');
        return storedValue ? parseInt(storedValue, 10) : 0;
    });
    const [isHelpsVisible, setIsHelpsVisible] = React.useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        miningUserExists().then((response) => {
            if (response.status === false) {
                setIsHelpsVisible(true);
            } else {
                // Если статус true, скрываем Helps и выполняем запрос getMiningUserData
                setIsHelpsVisible(false);
                getMiningUserData().then((userDataResponse) => {
                    console.log(userDataResponse);
                });
            }
        });
    }, []);

    useEffect(() => {
        localStorage.setItem('bottomNavigationValue', value.toString());
    }, [value]);

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/main-mining');
        }
    }, [location.pathname, navigate]);

    const handleHideHelps = () => {
        setIsHelpsVisible(false);
        // Выполняем запрос при скрытии Helps
        getMiningUserData().then((response) => {
            console.log(response)
        });
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const menuItems = [
        { label: '6 час', to: '/main-mining', component: MainMining, title: 'Облачный майнинг' },
        { label: 'More mining', to: '/second-mining', component: SecMining, title: 'Больше возможностей' },
        { label: 'Referrals', to: '/referrals', component: Referrals, title: 'Реферальная программа' },
        { label: 'Menu', to: '/menu', component: Menu, title: 'Меню' },
    ];

    const icons = [
        <CurrencyExchangeIcon />,
        <SavingsIcon />,
        <PeopleIcon />,
        <MenuIcon />,
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
                        {currentMenuItem ? currentMenuItem.title : 'Меню'}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        marginBottom: '60px'
                    }}>
                    <Routes>
                        {menuItems.map((item, index) => (
                            <Route key={index} path={item.to} element={<item.component />} />
                        ))}
                        <Route path="/menu/*" element={<Menu />} />
                    </Routes>
                </Box>
                <BottomNavigation
                    value={value}
                    onChange={handleChange}
                    sx={{
                        position: 'fixed',
                        bottom: '0',
                        width: '100%'
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
                                    fontSize: '12px',
                                },
                                '&.Mui-selected': {
                                    paddingInline: '3px'
                                },
                                '&.MuiBottomNavigationAction-iconOnly': {
                                    paddingInline: '3px'
                                }
                            }}
                        />
                    ))}
                </BottomNavigation>
            </Box>
            <Box
                sx={{
                    position: 'fixed',
                    top: '0',
                    height: '100%',
                    width: '100%',
                    bgcolor: 'var(--tg-theme-bg-color)',
                    zIndex: '1000',
                    display: isHelpsVisible ? 'block' : 'none',
                }}
            >
                {isHelpsVisible && <Helps hideHelps={handleHideHelps} />}
            </Box>
        </>
    );
};

export default Mining;
