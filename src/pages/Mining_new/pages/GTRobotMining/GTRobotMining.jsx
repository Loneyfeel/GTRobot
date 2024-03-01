import React, { useEffect, useState } from 'react';
import style from './gtrobotMining.module.sass';
import PageTitle from "../../components/PageTitle/index.js";
import { Box } from "@mui/material";
import { GTRobotCard, GTRobotStartButton, GTRobotTimer } from './components';
import { motion } from "framer-motion";

const GtRobotMining = () => {
    const userDataStorage = JSON.parse(localStorage.getItem("miningUserData"));
    const [userGTRobotMiningBalance, setUserGTRobotMiningBalance] = useState(userDataStorage.dailyMiningBalance);
    const [isDailyMiningActive, setIsDailyMiningActive] = useState(userDataStorage.mining.isDailyMiningActive);
    const [isStartUserDailyMiningTimestamp, setIsStartUserDailyMiningTimestamp] = useState(userDataStorage.mining.startUserDailyMiningTimestamp)
    const [isEndUserDailyMiningTimestamp, setIsEndUserDailyMiningTimestamp] = useState(userDataStorage.mining.endUserDailyMiningTimestamp)
    const [userSubscription, setUserSubscription] = useState(userDataStorage.userSubscription)

    return (
        <>
            <Box className={style.gtrobotMining}>
                <PageTitle text={'GTRobot Mining'}/>
                    {isEndUserDailyMiningTimestamp ? (
                        <>
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 1}}
                            >
                                <GTRobotTimer
                                    userGTRobotMiningBalance={userGTRobotMiningBalance}
                                    setUserGTRobotMiningBalance={setUserGTRobotMiningBalance}
                                    isEndUserDailyMiningTimestamp={isEndUserDailyMiningTimestamp}
                                    isStartUserDailyMiningTimestamp={isStartUserDailyMiningTimestamp}
                                    userSubscription={userSubscription}
                                />
                            </motion.div>
                        </>
                    ) : (
                        <>
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 1}}
                            >
                                <GTRobotStartButton
                                    isDailyMiningActive={isDailyMiningActive}
                                    userSubscription={userSubscription}
                                    userGTRobotMiningBalance={userGTRobotMiningBalance}
                                />
                            </motion.div>
                        </>
                    )}
                    <GTRobotCard userGTRobotMiningBalance={userGTRobotMiningBalance}/>
            </Box>
        </>
    );
}

export default GtRobotMining;
