import React, { useEffect, lazy, useState, Suspense } from 'react';
import style from './mining.module.sass';
import bgImg from './assets/shared/background.png';

import { Routes, Route } from 'react-router-dom';
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useUserExists, useFetchDataAndUpdateLocalStorage, useUserTasks, useTickersPrice } from './hooks';
import BottomNavigationMenu from "./components/BottomNavigationMenu/index.js";
import { CloudMining, GTRobotMining, Referrals, Menu } from './pages';
const Helps = lazy(() => import('./screens/Helps'));
const Tasks = lazy(() => import('./screens/Tasks'));

const Mining = () => {
    const { t } = useTranslation();

    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (index) => {
        setSelectedTab(index);
        localStorage.setItem('selectedTab', index);
    };

    const { isUserExists, isLoading, setIsUserExists } = useUserExists();
    const { userDataLoading } = useFetchDataAndUpdateLocalStorage();
    const [userTasks, setUserTasks] = useState([]);
    useTickersPrice()

    useEffect(() => {
        if (userDataLoading) {
            setUserTasks(useUserTasks());
        }
        const savedTab = localStorage.getItem('selectedTab');
        if (savedTab !== null) {
            setSelectedTab(parseInt(savedTab, 10));
        } else {
            setSelectedTab(0); // Установите первоначальное значение selectedTab
            localStorage.setItem('selectedTab', "0");
        }
    }, [userDataLoading]); // Удалите selectedTab из зависимостей

    useEffect(() => {
        const savedTab = localStorage.getItem('selectedTab');
        if (savedTab !== null) {
            setSelectedTab(parseInt(savedTab, 10));
        } else {
            setSelectedTab(0); // Установите первоначальное значение selectedTab
            localStorage.setItem('selectedTab', "0");
        }
        setUserTasks(useUserTasks());

        console.log('Найти это в Mining.jsx isUserExists', isUserExists)
    }, []); // Пустой массив зависимостей для выполнения только один раз

    return (
        <>
            <Backdrop open={isLoading} sx={{ zIndex: 9999, bgcolor: '#000' }}>
                <CircularProgress sx={{ color: '#fff' }} />
            </Backdrop>
            <Box className={style.mining}>
                <img
                    className={`${style.mining__background} gray`}
                    src={bgImg}
                    alt={"background"}
                />
                <Box className={style.mining}>
                    {isUserExists ? (
                        <>
                            {userTasks.length > 0 ? (
                                <>
                                    <Suspense fallback={null}>
                                        <Tasks userTasks={userTasks} setUserTasks={setUserTasks} />
                                    </Suspense>
                                </>
                            ) : (
                                <>
                                    <Suspense>
                                        <Routes>
                                            <Route path="/cloud-mining" element={<CloudMining />} />
                                            <Route path="/gtrobot-mining" element={<GTRobotMining />} />
                                            <Route path="/referrals" element={<Referrals />} />
                                            <Route path="/menu/:item?" element={<Menu onTabChange={handleTabChange}/>} />
                                        </Routes>
                                    </Suspense>
                                    <Suspense>
                                        <BottomNavigationMenu selectedTab={selectedTab} onTabChange={handleTabChange} />
                                    </Suspense>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <Suspense fallback={null}>
                                <Helps setIsUserExists={setIsUserExists} />
                            </Suspense>
                        </>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Mining;
