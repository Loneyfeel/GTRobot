import React, {useState} from 'react';
import style from './gtrobotStartButton.module.sass'
import {Box} from "@mui/material";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import Lottie from "lottie-react";
import animationData from "../../../../assets/GTRobotMining/robot.json";
import {useTranslation} from "react-i18next";
import {getDailyPromoCode, startMining} from "../../../../api/api.js";
import {fetchDataAndUpdateLocalStorageInSession} from "../../../../helps/dataHelps.js";
import HalfCircleProgressBar from "../shared/HalfCircleProgressBar/index.js";
import CustomButton from "@components/CustomButton/index.js";
import {tg} from "../../../../../../shared/telegram/telegram.js";

const GTRobotStartButton = ({isDailyMiningActive, userGTRobotMiningBalance, userSubscription, setIsStartUserDailyMiningTimestamp, setIsEndUserDailyMiningTimestamp}) => {
    const {t} = useTranslation();
    const [promocode, setPromocode] = useState('');

    async function handeGTRobotStartButtonClick() {
        await startMining("daily")
        await fetchDataAndUpdateLocalStorageInSession().then(() => {
            const userDataStorage = JSON.parse(localStorage.getItem("miningUserData"));
            setIsStartUserDailyMiningTimestamp(userDataStorage.mining.startUserDailyMiningTimestamp);
            setIsEndUserDailyMiningTimestamp(userDataStorage.mining.endUserDailyMiningTimestamp);
        });
    }

    async function handleGetPromocode() {
        tg.showAlert(
            `${t('mining.pages.gtrobotMining.promoCode.alert_1')}`,
            async () => {
                try {
                    const response = await getDailyPromoCode();
                    if (response.data?.data?.promoCode) {
                        const promoCode = response.data.data.promoCode;
                        setPromocode(promoCode);
                        localStorage.setItem('promoCode', promoCode);
                        await fetchDataAndUpdateLocalStorageInSession();
                    } else if (response.data?.errorCode) {
                        const errorCode = response.data.errorCode;
                        if (errorCode === 2020) {
                            console.error('Ошибка 2020: У пользователя не достаточный баланс для вывода');
                            tg.showAlert(`${t('mining.pages.gtrobotMining.promoCode.alert_2')}`);
                        } else if (errorCode === 2021) {
                            console.error('Ошибка 2021: Ошибка отправки сообщения пользователю');
                        } else {
                            console.error('Неизвестная ошибка:', errorCode);
                        }
                    } else {
                        console.error('Ошибка получения промокода из ответа сервера');
                    }
                } catch (error) {
                    console.error('Ошибка при отправке запроса:', error);
                }
            }
        );
    }

    const [copiedText, copyToClipboard] = useCopyToClipboard();
    const openTelegramLink = (url) => {
        tg.openTelegramLink(url);
    };

    const handleUsePromocode = (promocode) => {
        window.Telegram.WebApp.showConfirm(
            `${t("mining.pages.gtrobotMining.promoCode.alert_3")}`,
            (confirm) => {
                if (confirm) {
                    copyToClipboard(promocode);
                    openTelegramLink("https://t.me/Granduzb");
                }
            },
        );
    };

    return (
        <>
            <Box className={style.gtrobotMining_startButton}>
                {isDailyMiningActive ? (
                    <>
                        <Box className={style.gtrobotMining__content__button_box}
                             onClick={() => {
                                 handeGTRobotStartButtonClick()
                             }}>
                            <Box className={style.gtrobotMining__content__button_box__circle}>
                                <div
                                    className={'gray'}>
                                    <Lottie
                                        animationData={animationData}
                                        style={{
                                            marginLeft: '15px'
                                        }}
                                    />
                                </div>
                                <Box className={style.gtrobotMining__content__button_box__circle_text}>
                                    {t("mining.pages.gtrobotMining.gtrobot_btn")}
                                </Box>
                            </Box>
                        </Box>
                    </>
                ) : (
                    <>
                        <HalfCircleProgressBar value={userGTRobotMiningBalance}
                                               max={userSubscription !== 'ultra' ? 100 : 300}/>
                        {promocode && promocode !== '' ? (
                            <>
                                <Box className={style.gtrobotMining__promoCode}>
                                    <Box className={style.gtrobotMining__promoCode__text}>
                                        {t("mining.pages.gtrobotMining.promoCode.text")}: {promocode}
                                    </Box>
                                    <CustomButton
                                        content={t("mining.pages.gtrobotMining.promoCode.useButton")}
                                        onClick={() => {
                                            handleUsePromocode(promocode)
                                        }}
                                        style={{
                                            marginInline: 'auto'
                                        }}
                                    />
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box className={style.gtrobotMining__promoCode}>
                                    <CustomButton
                                        content={t("mining.pages.gtrobotMining.promoCode.getButton")}
                                        onClick={() => {
                                            handleGetPromocode()
                                        }}
                                    />
                                </Box>
                            </>
                        )}
                    </>
                )}
            </Box>
        </>
    );
}

export default GTRobotStartButton;