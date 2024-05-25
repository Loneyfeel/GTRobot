import React, { useEffect, lazy, useState, Suspense } from 'react';
import style from './mining.module.sass';
import bgImg from './assets/shared/background.png';

import { Routes, Route } from 'react-router-dom';
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTickersPrice } from './hooks';
import BottomNavigationMenu from "./components/BottomNavigationMenu/index.js";
import { CloudMining, GTRobotMining, Referrals, Menu } from './pages';
import {fetchDataAndUpdateLocalStorage} from "./helps/dataHelps.js";
import {miningUserExists} from "./api/api.js";
import {tg} from "../../shared/telegram/telegram.js";
import {testData} from "./testData/testData.js";
const Helps = lazy(() => import('./screens/Helps'));
const Tasks = lazy(() => import('./screens/Tasks'));

const Mining = () => {

    window.Telegram.WebApp.BackButton.isVisible = true;
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.BackButton.onClick(async () => {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");

        window.location.href = "/";
    });

    const [gtrobotTheme, setGtrobotTheme] = useState(false)

    const root = document.documentElement; // Получение элемента root
    useEffect(() => {
        switch (gtrobotTheme) {
            case 'gtrobot':
                root.classList.add('gtrobot-theme'); // Добавление класса gtrsobot-theme к :root
                tg.setHeaderColor('#000');
                tg.setBackgroundColor('#000');
                break;
            case 'telegram':
                root.classList.add('telegram-theme'); // Добавление класса telegram-theme к :root
                tg.setHeaderColor('bg_color');
                tg.setBackgroundColor('bg_color');
                break;
            default:
                break;
        }
    }, [gtrobotTheme]);

    useEffect(() => {
        tg.CloudStorage.getItem('gtrobotSettings', (error, value) => {
            if (error) {
                // Handle error
                console.error("Error:", error);
            } else if (value !== '' && value !== null && value !== undefined){
                setGtrobotTheme(JSON.parse(value).theme);
            }
        });
    }, [])

    const { t } = useTranslation();

    const [selectedTab, setSelectedTab] = useState(0);
    const [backdropVisible, setBackdropVisible] = useState(true);

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
                setIsUserExists(testData.userExits);
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

        const timeout = setTimeout(() => {
            setBackdropVisible(false);
        }, 5000);

        return () => clearTimeout(timeout);

    }, []);


    useEffect(() => {
        if (isUserExists) {
            fetchDataAndUpdateLocalStorage(setBackdropVisible)
                .then(() => {
                    fetchLocalStorageTasks(); // Вызываем fetchLocalStorageTasks только после успешного получения данных из fetchDataAndUpdateLocalStorage
                })
                .catch(error => {
                    console.error('Error fetching data and updating localStorage:', error);
                })
        }
    }, [isUserExists]);

    return (
        <>
            <Box className={style.loader_box}
            sx={{
                display: backdropVisible ? 'flex' : 'none'
            }}>
                <Box className={style.loader}/>
            </Box>
            <Box className={style.mining}>
                <img
                    className={`${style.mining__background} gray`}
                    src={bgImg}
                    alt={"background"}
                />
                {!backdropVisible && (
                    <Box className={style.mining}>
                        {isUserExists ? (
                            <>
                                {userTasks.length > 0 ? (
                                    <>
                                        <Suspense fallback={null}>
                                            <Tasks userTasks={userTasks} setUserTasks={setUserTasks} gtrobotTheme={gtrobotTheme}/>
                                        </Suspense>
                                    </>
                                ) : (
                                    <>
                                        <Suspense>
                                            <Routes>
                                                <Route path="/cloud-mining" element={<CloudMining  gtrobotTheme={gtrobotTheme}/>} />
                                                <Route path="/gtrobot-mining" element={<GTRobotMining  gtrobotTheme={gtrobotTheme}/>} />
                                                <Route path="/referrals" element={<Referrals  gtrobotTheme={gtrobotTheme}/>} />
                                                <Route path="/menu/:item?" element={<Menu onTabChange={handleTabChange} gtrobotTheme={gtrobotTheme}/>} />
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
                )}
            </Box>
        </>
    );
};

export default Mining;
