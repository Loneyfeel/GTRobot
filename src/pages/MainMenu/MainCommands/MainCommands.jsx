import React, {useEffect, useState} from 'react';
import style from './mainCommands.module.sass'
import {Box} from "@mui/material";

import close from '../assets/close.svg'
import CustomButton from "@components/CustomButton/index.js";
import MainCommandItem from "./MainCommandItem/index.js";

import start from '../assets/Commands/start.svg'
import language from '../assets/Commands/language.svg'
import id from '../assets/Commands/id.svg'
import kurs from '../assets/Commands/kurs.svg'
import {useTranslation} from "react-i18next";
import axios from "axios";
import {initData} from "../../../shared/telegram/telegram.js";

const MainCommands = ({commandsX, setCommandsX}) => {
    const {t} = useTranslation()

    const [assets, setAssets] = useState([]);
    const getAssets = async () => {
        try {
            const response = await axios.post("/api/get-assets", {
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
        if (isTimeToUpdate()){
            getAssets();
            saveUpdateTime();
        } else {
            const tempData = JSON.parse(localStorage.getItem('assetsCoinNames'))
            setAssets(tempData.data);
        }
    }, [])

    useEffect(() => {
        console.log(assets)
    }, [assets]);

    return (
        <>
            <Box className={style.menuCommands}
                 sx={{
                     top: commandsX,
                 }}>
                <Box className={style.menuCommands__list}>
                    <MainCommandItem command={'start'} description={t("mainMenu.buttons.start")} icon={start}/>
                    <MainCommandItem command={'language'} description={t("mainMenu.buttons.language")} icon={language}/>
                    <MainCommandItem command={'getid'} description={t("mainMenu.buttons.getid")} icon={id}/>
                    <MainCommandItem command={'kurs'} description={t("mainMenu.buttons.kurs")} textInput={true} icon={kurs} assets={assets}/>
                </Box>
                <Box className={style.menuCommands__close}
                     onClick={() => {
                         setCommandsX('100vh')
                     }}
                >
                    <CustomButton
                        content={<img src={close} alt={'close'} className={style.menuCommands__close_img}/>}
                        style={{
                            color: 'var(--text_color)',
                            margin: '10px'
                        }}
                    />
                </Box>
            </Box>
        </>
    );
};

export default MainCommands;