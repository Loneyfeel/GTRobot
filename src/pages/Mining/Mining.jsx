import React, { useEffect } from 'react';
import { Link as RouterLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Box, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import MenuIcon from '@mui/icons-material/Menu';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SavingsIcon from '@mui/icons-material/Savings';
import MainMining from './pages/MainMining/index.js';
import SecMining from './pages/SecMining/index.js';
import Referrals from './pages/Referrals/index.js';
import Menu from './pages/Menu/index.js';
import Helps from "./components/Helps/index.js";

const menuItems = [
    { label: '6 час', icon: <CurrencyExchangeIcon />, to: '/main-mining', component: MainMining, title: 'Облачный майнинг' },
    { label: 'More mining', icon: <SavingsIcon />, to: '/second-mining', component: SecMining, title: 'Больше возможностей' },
    { label: 'Referrals', icon: <PeopleIcon />, to: '/referrals', component: Referrals, title: 'Реферальная программа' },
    { label: 'Menu', icon: <MenuIcon />, to: '/menu', component: Menu, title: 'Меню' },
];

const Mining = () => {
    const [value, setValue] = React.useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Перенаправление на /main-mining при загрузке страницы
        if (location.pathname === '/') {
            navigate('/main-mining');
        }
    }, [location.pathname, navigate]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const currentMenuItem = menuItems.find(item => item.to === location.pathname);

    return (
        <>
            <Box>
                <Box
                    sx={{
                        width: '100%',
                        textAlign: 'center',
                        padding: '10px',
                        bgcolor: 'var(--tg-theme-secondary-bg-color)',
                    }}>
                    <Typography
                        sx={{
                            color: 'var(--tg-theme-text-color)',
                            fontSize: '16px'
                        }}
                    >
                        {currentMenuItem ? currentMenuItem.title : ''}
                    </Typography>
                </Box>
                <Box>
                    <Routes>
                        {menuItems.map((item, index) => (
                            <Route key={index} path={item.to} element={<item.component/>}/>
                        ))}
                    </Routes>
                </Box>
                <BottomNavigation
                    value={value}
                    onChange={handleChange}
                    sx={{
                        position: 'sticky',
                        bottom: '0',
                        width: '100%'
                    }}
                >
                    {menuItems.map((item, index) => (
                        <BottomNavigationAction
                            key={index}
                            label={item.label}
                            icon={item.icon}
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
                bgcolor: '#555',
                zIndex: '1000'
            }}>
                <Helps/>
            </Box>
        </>
    );
}

export default Mining;
