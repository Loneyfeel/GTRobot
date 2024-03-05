import React, { useEffect, lazy, useState, Suspense } from 'react';
import style from './mining.module.sass';
import bgImg from './assets/shared/background.png';

import { Routes, Route } from 'react-router-dom';
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useUserExists, useFetchDataAndUpdateLocalStorage, useUserTasks, useTickersPrice } from './hooks';
import BottomNavigationMenu from "./components/BottomNavigationMenu/index.js";
import { CloudMining, GTRobotMining, Referrals, Menu } from './pages';
import {fetchDataAndUpdateLocalStorage} from "./helps/dataHelps.js";
import {miningUserExists} from "../Mining/components/Requests/Requests.js";
import {tg} from "../../shared/telegram/telegram.js";
const Helps = lazy(() => import('./screens/Helps'));
const Tasks = lazy(() => import('./screens/Tasks'));

const Mining = () => {

    tg.setHeaderColor('#000')

    const { t } = useTranslation();

    const [selectedTab, setSelectedTab] = useState(0);
    const [backdropVisible, setBackdropVisible] = useState(false);

    const handleTabChange = (index) => {
        setSelectedTab(index);
        localStorage.setItem('selectedTab', index);
    };

    const [isUserExists, setIsUserExists] = useState(false)
    const [userTasks, setUserTasks] = useState([]);

    useTickersPrice()

    const fetchLocalStorageTasks = () => {
        try {
            const storedDataString = localStorage.getItem("miningUserData");
            if (storedDataString) {
                const storedData = JSON.parse(storedDataString);
                setUserTasks(storedData.activeTasks);
            } else {
                console.log('No data found in miningUserData');
            }
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    const checkUserExists = async () => {
        try {
            const userExistsResponse = await miningUserExists();

            if (!userExistsResponse.status) {
                setIsUserExists(false);
            } else {
                setIsUserExists(userExistsResponse.status)
            }
        } catch (error) {
            console.error('Error checking user existence:', error);
        }
    };

    useEffect(() => {

        checkUserExists()

        const savedTab = localStorage.getItem('selectedTab');
        if (savedTab !== null) {
            setSelectedTab(parseInt(savedTab, 10));
        } else {
            setSelectedTab(0); // Установите первоначальное значение selectedTab
            localStorage.setItem('selectedTab', "0");
        }

        setBackdropVisible(true);
        const timeout = setTimeout(() => {
            setBackdropVisible(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, []);


    useEffect(() => {
        if (isUserExists) {
            fetchDataAndUpdateLocalStorage()
                .then(() => {
                    fetchLocalStorageTasks(); // Вызываем fetchLocalStorageTasks только после успешного получения данных из fetchDataAndUpdateLocalStorage
                })
                .catch(error => {
                    console.error('Error fetching data and updating localStorage:', error);
                });
        }
    }, [isUserExists]);

    return (
        <>
            <Backdrop open={backdropVisible} sx={{ zIndex: 9999, bgcolor: '#000' }}>
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
