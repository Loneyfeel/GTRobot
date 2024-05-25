import React, {useEffect, useState} from 'react';
import style from './mainMenu.module.sass'
import {initData, tg} from "../../shared/telegram/telegram.js";
import GTRobotTitle from "@components/GTRobotTitle/index.js";
import {Box, Dialog} from "@mui/material";
import MenuChart from "./Chart/index.js";
import MenuButtons from "./MenuButtons/index.js";
import MainCommands from "./MainCommands/index.js";
import axios from "axios";
import {host} from "../../shared/host/host.js";
import {getTutorialsData} from "./api/api.js";
import {useQuery} from "@tanstack/react-query";
import SettingsDialog from "./SettingsDialog/index.js";
import UserAccount from "./UserAccount/index.js";

const MainMenu = () => {

    useEffect(() => {
        tg.SettingsButton.isVisible = true
        tg.expand()
    }, []);
    const [settigsDialogVisible, setSettigsDialogVisible] = useState(false)

    tg.SettingsButton.onClick(()=>{
        setSettigsDialogVisible(true)
    })

    // const [commandsX, setCommandsX] = useState('300vh')

    // const [assets, setAssets] = useState([1]);
    // const getAssets = async () => {
    //     try {
    //         const response = await axios.post(`${host}/api/get-assets`, {
    //             initData,
    //         });
    //         setAssets(response.data.data);
    //         localStorage.setItem('assetsCoinNames', JSON.stringify(response.data));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const gtrobotTutorialsCheck = {
        analytics: false,
        monitoring: false,
        mining: false,
        topWhales: false,
        commands: false,
    }

    const { tutorialLinksData, isLoading, isError, isSuccess } = useQuery({
        queryKey: 'tutorialLinks',
        queryFn: getTutorialsData,
        config: {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        }
    });

    const isTimeToUpdate = () => {
        const lastUpdateTime = localStorage.getItem('lastUpdateTime');
        if (!lastUpdateTime) return true; // Если время не было сохранено, нужно обновить список

        const oneDay = 24 * 60 * 60 * 1000; // Время в миллисекундах за один день
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - parseInt(lastUpdateTime, 10);

        return timeDiff > oneDay;
    };

    const saveUpdateTime = () => {
        const currentTime = new Date().getTime();
        localStorage.setItem('lastUpdateTime', currentTime);
    };

    const [gtrobotTheme, setGtrobotTheme] = useState(null)
    const [gtrobotSettings, setGtrobotSettings] = useState(null)

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

    const gtrobotSettingsData = {
        theme: 'gtrobot',
        chartCoin: 'BTCUSDT',
        mining: {
            withdraw: 'ton'
        }
    }

    function tgCloudSettings(){
        tg.CloudStorage.getItem('gtrobotSettings', (error, value) => {
            if (error) {
                // Handle error
                console.error("Error:", error);
            } else {
                if (!value) {
                    // Если значение отсутствует, установите его в облаке хранения
                    tg.CloudStorage.setItem('gtrobotSettings',  JSON.stringify(gtrobotSettingsData))
                    setTimeout(()=>{
                        setSettigsDialogVisible(true)
                    }, 1000)
                    tgCloudSettings()
                }
                if (value !== '' && value !== null && value !== undefined) {
                    if (JSON.stringify(value) !== JSON.stringify(gtrobotSettingsData)) {
                        // Обновляем данные в облачном хранилище, если они отличаются
                        tg.CloudStorage.setItem('gtrobotSettings', JSON.stringify(gtrobotSettingsData));
                    }
                    setGtrobotTheme(JSON.parse(value).theme);
                    setGtrobotSettings(JSON.parse(value));
                }
            }
        });
    }

    function tgCloudTutorialCheck(){
        tg.CloudStorage.getItem('gtrobotTutorialsCheck', (error, value) => {
            if (error) {
                // Handle error
                console.error("Error:", error);
            } else {
                const keys = Object.keys(JSON.parse(value));
                const defaultKeys = Object.keys(gtrobotTutorialsCheck);
                const shouldUpdate = defaultKeys.some(key => !keys.includes(key));
                if (shouldUpdate) {
                    tg.CloudStorage.setItem('gtrobotTutorialsCheck', JSON.stringify(gtrobotTutorialsCheck), (error, success) => {
                        if (error) {
                            console.error("Ошибка обновления cloud storage:", error);
                        }
                    });
                }
            }
        })
        tg.CloudStorage.getItem('gtrobotTutorialsCheck', (error, value) => {
            if (error) {
                // Handle error
                console.error("Error:", error);
            } else {
                if (!value) {
                    // Если значение отсутствует, установите его в облаке хранения
                    tg.CloudStorage.setItem('gtrobotTutorialsCheck',  JSON.stringify(gtrobotTutorialsCheck))
                }
            }
        });
        tg.CloudStorage.getItem('gtrobotTutorialsCheck', (error, value) => {
            if (error) {
                // Handle error
                console.error("Error:", error);
            } else {
                const keys = Object.keys(JSON.parse(value));
                const defaultKeys = Object.keys(gtrobotTutorialsCheck);
                const shouldUpdate = defaultKeys.some(key => !keys.includes(key));
                if (shouldUpdate) {
                    tg.CloudStorage.setItem('gtrobotTutorialsCheck', JSON.stringify(gtrobotTutorialsCheck), (error, success) => {
                        if (error) {
                            console.error("Ошибка обновления cloud storage:", error);
                        }
                    });
                }
            }
        })
    }

    useEffect(() => {

        tgCloudSettings()
        tgCloudTutorialCheck()

        const fetchData = async () => {
            if (isTimeToUpdate() || !localStorage.getItem('assetsCoinNames')) {
                getAssets();
                saveUpdateTime();
            } else {
                const tempData = JSON.parse(localStorage.getItem('assetsCoinNames'));
                setAssets(tempData.data);
            }
        };

        fetchData(); // Вызываем функцию fetchData сразу после монтирования компонента

        const interval = setInterval(fetchData, 1000); // Вызываем функцию fetchData каждые 1 секунд

        return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
    }, []);

    const [useAccountMenuOpenTemp, setUseAccountMenuOpenTemp] = useState(false)
    const [openAccountMenu, setOpenAccountMenu] = useState(false)


    return (
        <>
            {
                gtrobotTheme && gtrobotSettings &&
                <>
                    <Box className={style.mainMenu}>
                        <UserAccount
                            openAccountMenu={openAccountMenu}
                            setOpenAccountMenu={setOpenAccountMenu}
                            setOpen={setSettigsDialogVisible}
                            gtrobotTheme={gtrobotTheme}
                            useAccountMenuOpenTemp={useAccountMenuOpenTemp}
                            setUseAccountMenuOpenTemp={setUseAccountMenuOpenTemp}
                        />
                        <MenuChart gtrobotTheme={gtrobotTheme} gtrobotSettings={gtrobotSettings}/>
                        {/*<MenuButtons setCommandsX={setCommandsX}/>*/}
                        <MenuButtons/>
                        {/*{assets && assets.length > 0 &&*/}
                        {/*    <MainCommands*/}
                        {/*        commandsX={commandsX}*/}
                        {/*        setCommandsX={setCommandsX}*/}
                        {/*        assets={assets}*/}
                        {/*        assetsLength={assets.length}*/}
                        {/*        gtrobotTheme={gtrobotTheme}*/}
                        {/*    />*/}
                        {/*}*/}
                    </Box>
                    <SettingsDialog
                        setOpenAccountMenu={setOpenAccountMenu}
                        useAccountMenuOpenTemp={useAccountMenuOpenTemp}
                        open={settigsDialogVisible}
                        setOpen={setSettigsDialogVisible}
                        gtrobotTheme={gtrobotTheme}
                        setGtrobotTheme={setGtrobotTheme}
                        gtrobotSettings={gtrobotSettings}
                        setGtrobotSettings={setGtrobotSettings}
                        gtrobotTutorialsCheck={gtrobotTutorialsCheck}
                    />
                </>
            }

        </>
    );
};

export default MainMenu;