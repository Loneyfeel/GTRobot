import React, { useEffect, useState } from 'react';
import style from './gtrobotMining.module.sass';
import PageTitle from "../../components/PageTitle/index.js";
import { Box } from "@mui/material";
import { GTRobotCard, GTRobotStartButton, GTRobotTimer } from './components';
import { motion } from "framer-motion";

const GtRobotMining = () => {
    const userDataStorage = JSON.parse(localStorage.getItem("miningUserData"))
    const [userGTRobotMiningBalance, setUserGTRobotMiningBalance] = useState(userDataStorage.dailyMiningBalance)
    const [isDailyMiningActive, setIsDailyMiningActive] = useState(userDataStorage.mining.isDailyMiningActive)
    const [isStartUserDailyMiningTimestamp, setIsStartUserDailyMiningTimestamp] = useState(userDataStorage.mining.startUserDailyMiningTimestamp)
    const [isEndUserDailyMiningTimestamp, setIsEndUserDailyMiningTimestamp] = useState(userDataStorage.mining.endUserDailyMiningTimestamp)
    const [userSubscription, setUserSubscription] = useState(userDataStorage.userSubscription)

    useEffect(() => {
        const userDataStorage = JSON.parse(localStorage.getItem("miningUserData"))
        setIsDailyMiningActive(userDataStorage.mining.isDailyMiningActive)
        setIsStartUserDailyMiningTimestamp(userDataStorage.mining.startUserDailyMiningTimestamp)
        setIsEndUserDailyMiningTimestamp(userDataStorage.mining.endUserDailyMiningTimestamp)
        setUserSubscription(userDataStorage.userSubscription)
    }, []);

    return (
        <>
            <motion.div
                className={style.gtrobotMining}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.2}}
                style={{
                    willChange: 'opacity'
                }}
            >
                <PageTitle text={'GTRobot Mining'}/>
                {isEndUserDailyMiningTimestamp ? (
                    <>
                        <GTRobotTimer
                            userGTRobotMiningBalance={userGTRobotMiningBalance}
                            setUserGTRobotMiningBalance={setUserGTRobotMiningBalance}
                            isEndUserDailyMiningTimestamp={isEndUserDailyMiningTimestamp}
                            isStartUserDailyMiningTimestamp={isStartUserDailyMiningTimestamp}
                            userSubscription={userSubscription}
                        />
                    </>
                ) : (
                    <>
                        <GTRobotStartButton
                            isDailyMiningActive={isDailyMiningActive}
                            userSubscription={userSubscription}
                            userGTRobotMiningBalance={userGTRobotMiningBalance}
                            setIsStartUserDailyMiningTimestamp={setIsStartUserDailyMiningTimestamp}
                            setIsEndUserDailyMiningTimestamp={setIsEndUserDailyMiningTimestamp}
                        />
                    </>
                )}
                <GTRobotCard userGTRobotMiningBalance={userGTRobotMiningBalance}/>
            </motion.div>

        </>
    );
}

export default GtRobotMining;
