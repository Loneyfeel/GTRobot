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

const CloudMining = () => {
    const userDataStorage = JSON.parse(localStorage.getItem("miningUserData")); //Получаем данные
    const prices = JSON.parse(localStorage.getItem("prices")) //Получаем цены
    const [cryptoCurrency, setCryptoCurrency] = useState(userDataStorage.cryptoCurrency) //Получаем выбранную монету
    const [isMiningActive, setIsMiningActive] = useState(userDataStorage.mining.isMiningActive) //Активен ли майнинг
    const [isStartUserMiningTimestamp, setIsStartUserMiningTimestamp] = useState(userDataStorage.mining.startUserMiningTimestamp)
    const [isEndUserMiningTimestamp, setIsEndUserMiningTimestamp] = useState(userDataStorage.mining.endUserMiningTimestamp)

    const [userSubscription, setUserSubscription] = useState(userDataStorage.userSubscription) //Тариф пользователя
    const [isContentVisible, setContentVisible] = useState(true); // для анимации
    const [userCurrencyPrice, setUserCurrencyPrice] = useState(null); // Создаем состояние для цены криптовалюты пользователя
    const [userCloudMiningBalance, setUserCloudMiningBalance] = useState(userDataStorage.balance); //Баланс

    const [userSubscriptionBoost, setUserSubscriptionBoost] = useState(userDataStorage.userSubscriptionBonus) //буст за подписку
    const [userReferralBoost, setUserReferralBoost] = useState(userDataStorage.referrals.referralBonus) // буст с рефералов

    const [userCloudMiningRate, setUserCloudMiningRate] = useState(userDataStorage.statistics.regularMiningRate) // Количество пользователей (3й спидометр)

    useEffect(() => {
        // Находим объект цены для криптовалюты пользователя
        const currencyPrice = prices.find(price => Object.keys(price)[0] === cryptoCurrency);
        // Обновляем состояние userCurrencyPrice с ценой, если объект найден, или null, если объект не найден
        setUserCurrencyPrice(currencyPrice ? Object.values(currencyPrice)[0] : null);
    }, [cryptoCurrency, prices]);

    const navigate = useNavigate();

    return (
        <>
            <Box className={style.cloudMining}>
                <PageTitle text={'Cloud Mining'}/>
                <motion.div
                    className={style.cloudMining__content}
                    initial={{opacity: 1}} // Начальное состояние - видимый
                    animate={{opacity: isContentVisible ? 1 : 0}} // Анимация по изменению видимости
                    transition={{duration: 1}} // Длительность анимации
                >
                    <Box className={style.cloudMining__content}>
                        <CloudCard
                            userCloudMiningBalance={userCloudMiningBalance}
                            userCurrencyPrice={userCurrencyPrice}
                            cryptoCurrency={cryptoCurrency}
                        />
                        {isEndUserMiningTimestamp ? (
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
                            />
                        )}
                        <CustomButton
                            content={"Вывести"}
                            onClick={() => {
                                navigate('/menu/wallet');
                            }}
                        />
                    </Box>
                </motion.div>
                {!isContentVisible && (
                    <motion.div
                        className={`gray`}
                        initial={{opacity: 0}} // Начальное состояние - невидимый
                        animate={{opacity: isContentVisible ? 0 : 1}} // Анимация по изменению видимости
                        transition={{duration: 1, delay: 1}} // Длительность анимации + задержка 1 сек
                        style={{
                            width: '100%',
                            height: '100vh',
                            position: 'absolute',
                            top: '15vh',
                        }}
                    >
                        <Lottie
                            animationData={animationData_rocket}
                        />
                    </motion.div>
                )}
            </Box>
        </>
    );
}

export default CloudMining;
