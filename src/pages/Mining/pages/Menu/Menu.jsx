import React, {useState} from 'react';
import { Link as RouterLink, Routes, Route } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import Info from './Info';
import Withdraw from './Withdraw';
import ChangeCrypto from './ChangeCrypto';

const Menu = () => {
    // Добавляем состояние для отслеживания открытого раздела
    const [isSectionOpen, setIsSectionOpen] = useState(false);

    return (
        <>
            <Box
                sx={{
                    bgcolor: 'var(--tg-theme-bg-color)',
                    color: 'var(--tg-theme-text-color)',
                }}>
                {!isSectionOpen && (
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}>
                        <Button component={RouterLink} to="/menu/info"
                        sx={{
                            color: 'var(--tg-theme-text-color)',
                            fontSize: '18px',
                            justifyContent: 'flex-start',
                            width: '100%'
                        }}>Информация</Button>
                        <Button component={RouterLink} to="/menu/withdraw"
                        sx={{
                            color: 'var(--tg-theme-text-color)',
                            fontSize: '18px',
                            justifyContent: 'flex-start',
                            width: '100%'
                        }}>Вывод</Button>
                        <Button component={RouterLink} to="/menu/change-crypto"
                        sx={{
                            color: 'var(--tg-theme-text-color)',
                            fontSize: '18px',
                            justifyContent: 'flex-start',
                            width: '100%'
                        }}>Смена криптовалюты</Button>
                    </Box>
                )}
            </Box>
            <Box>
                <Routes>
                    <Route
                        path="info"
                        element={<Info setIsSectionOpen={setIsSectionOpen} />}
                    />
                    <Route
                        path="withdraw"
                        element={<Withdraw setIsSectionOpen={setIsSectionOpen} />}
                    />
                    <Route
                        path="change-crypto"
                        element={<ChangeCrypto setIsSectionOpen={setIsSectionOpen} />}
                    />
                </Routes>
            </Box>
        </>
    );
}

export default Menu;
