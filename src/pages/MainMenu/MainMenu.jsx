import React, {useEffect, useState} from 'react';
import style from './mainMenu.module.sass'
import {initData, tg} from "../../shared/telegram/telegram.js";
import GTRobotTitle from "@components/GTRobotTitle/index.js";
import {Backdrop, Box, CircularProgress} from "@mui/material";
import MenuChart from "./Chart/index.js";
import MenuButtons from "./MenuButtons/index.js";
import MainCommands from "./MainCommands/index.js";
import axios from "axios";

const MainMenu = () => {
    tg.setHeaderColor('#000')
    tg.BackButton.isVisible = false;

    const [commandsX, setCommandsX] = useState('300vh')

    const [assets, setAssets] = useState([]);
    const getAssets = async () => {
        try {
            const response = await axios.post("https://corsproxy.io/?https:/grandtrade.space/api/get-assets", {
                initData,
            });
            setAssets(response.data.data);
            localStorage.setItem('assetsCoinNames', JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        }
    };

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

    useEffect(() => {
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

        const interval = setInterval(fetchData, 5000); // Вызываем функцию fetchData каждые 5 секунд

        return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
    }, []);

    useEffect(() => {
        console.log(assets)
    }, [assets]);

    return (
        <>

            <Box className={style.mainMenu}>
                <GTRobotTitle/>
                <MenuChart/>
                <MenuButtons setCommandsX={setCommandsX}/>
                {assets.length > 0 && <MainCommands commandsX={commandsX} setCommandsX={setCommandsX} assets={assets}/>}
            </Box>
        </>
    );
};

export default MainMenu;