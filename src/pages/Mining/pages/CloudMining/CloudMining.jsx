import React, { useEffect, useState } from 'react';
import style from './cloudMining.module.sass';
import { Box } from "@mui/material";
import Lottie from "lottie-react";
import animationData_rocket from "../../assets/CloudMining/rocket.json";

import PageTitle from "../../components/PageTitle/index.js";
import { CloudCard, StartButton, Timer } from './components';
import CustomButton from "@components/CustomButton/index.js";
import { motion } from "framer-motion";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const CloudMining = () => {
    const {t} = useTranslation();
    const [userDataStorage, setUserDataStorage] = useState()
    const prices = JSON.parse(localStorage.getItem("prices")) //Получаем цены
    const [cryptoCurrency, setCryptoCurrency] = useState() //Получаем выбранную монету
    const [isMiningActive, setIsMiningActive] = useState() //Активен ли майнинг
    const [isStartUserMiningTimestamp, setIsStartUserMiningTimestamp] = useState()
    const [isEndUserMiningTimestamp, setIsEndUserMiningTimestamp] = useState()

    const [userSubscription, setUserSubscription] = useState() //Тариф пользователя
    const [isContentVisible, setContentVisible] = useState(true); // для анимации
    const [userCurrencyPrice, setUserCurrencyPrice] = useState(null); // Создаем состояние для цены криптовалюты пользователя
    const [userCloudMiningBalance, setUserCloudMiningBalance] = useState(); //Баланс

    const [userSubscriptionBoost, setUserSubscriptionBoost] = useState() //буст за подписку
    const [userReferralBoost, setUserReferralBoost] = useState() // буст с рефералов

    const [userCloudMiningRate, setUserCloudMiningRate] = useState() // Количество пользователей (3й спидометр)

    const [timerStarted, setTimerStarted] = useState(isMiningActive);

    useEffect(()=>{
        setUserDataStorage(JSON.parse(localStorage.getItem("miningUserData"))); //Получаем данные
    }, [])

    useEffect(() => {
        if (userDataStorage){
            setCryptoCurrency(userDataStorage.cryptoCurrency)
            setIsMiningActive(userDataStorage.mining.isMiningActive)
            setIsStartUserMiningTimestamp(userDataStorage.mining.startUserMiningTimestamp)
            setIsEndUserMiningTimestamp(userDataStorage.mining.endUserMiningTimestamp)
            setUserSubscription(userDataStorage.userSubscription)
            setUserCloudMiningBalance(userDataStorage.balance)
            setUserSubscriptionBoost(userDataStorage.userSubscriptionBonus)
            setUserReferralBoost(userDataStorage.referrals.referralBonus)
            setUserCloudMiningRate(userDataStorage.statistics.regularMiningRate)
            setTimerStarted(isMiningActive)
        }
    }, [userDataStorage]);

    useEffect(() => {
        // Обновляем состояние userCurrencyPrice с ценой, если объект найден, или null, если объект не найден
        setUserCurrencyPrice(prices[cryptoCurrency]);
    }, [cryptoCurrency, prices]);

    const navigate = useNavigate();

    // Условный рендеринг: рендерить только если есть данные в хранилище
    if (!userDataStorage) return null;

    return (
        <motion.div
            className={style.cloudMining}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.2}}
            style={{
                willChange: 'opacity'
            }}
        >
            <motion.div
                className={style.cloudMining__content}
                initial={{opacity: 1}} // Начальное состояние - видимый
                animate={{opacity: isContentVisible ? 1 : 0}} // Анимация по изменению видимости
                transition={{duration: 0.2}} // Длительность анимации
                style={{
                    willChange: 'opacity'
                }}
            >
                <Box className={style.cloudMining__content}>
                        <>
                            <PageTitle
                                text={`Cloud Mining${userSubscription === 'pro' ? ' Pro' : userSubscription === 'ultra' ? ' Ultra' : ''}`}/>
                            {cryptoCurrency &&
                                <CloudCard
                                    userCloudMiningBalance={userCloudMiningBalance}
                                    userCurrencyPrice={userCurrencyPrice}
                                    cryptoCurrency={cryptoCurrency}
                                />
                            }
                        </>
                    {isEndUserMiningTimestamp && isContentVisible ? (
                        <Timer
                            userCurrencyPrice={userCurrencyPrice}
                            userCloudMiningBalance={userCloudMiningBalance}
                            setUserCloudMiningBalance={setUserCloudMiningBalance}
                            userSubscription={userSubscription}
                            isStartUserMiningTimestamp={isStartUserMiningTimestamp}
                            isEndUserMiningTimestamp={isEndUserMiningTimestamp}
                            userSubscriptionBoost={userSubscriptionBoost}
                            userReferralBoost={userReferralBoost}
                            userCloudMiningRate={userCloudMiningRate}
                        />
                    ) : (
                        <StartButton
                            isMiningActive={isMiningActive}
                            setContentVisible={setContentVisible}
                            setIsStartUserMiningTimestamp={setIsStartUserMiningTimestamp}
                            setIsEndUserMiningTimestamp={setIsEndUserMiningTimestamp}
                        />
                    )}
                    {(timerStarted || isStartUserMiningTimestamp) && (
                        <CustomButton
                            content={t("mining.pages.menu.withdraw.main_btn")}
                            onClick={() => {
                                navigate('/menu/wallet');
                            }}
                            style={{
                                height: '40px',
                                fontSize: '16px',
                            }}
                        />
                    )}
                </Box>
            </motion.div>
            {!isContentVisible && (
                <motion.div
                    className={`gray`}
                    initial={{opacity: 0}} // Начальное состояние - невидимый
                    animate={{opacity: isContentVisible ? 0 : 1}} // Анимация по изменению видимости
                    transition={{duration: 0.2, delay: 1}} // Длительность анимации + задержка 1 сек
                    style={{
                        width: '100%',
                        height: '100vh',
                        position: 'absolute',
                        top: '15vh',
                        willChange: 'opacity'
                    }}
                >
                    <Lottie
                        animationData={animationData_rocket}
                        style={{
                            willChange: 'transform'
                        }}
                    />
                </motion.div>
            )}
        </motion.div>
    );
}

export default CloudMining;
