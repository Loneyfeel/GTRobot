import React, {startTransition, useEffect, useMemo, useState} from 'react';
import {Box, Button, CircularProgress, IconButton, Snackbar, Typography} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import {getMiningUserData, startMining} from '../../components/Requests/Requests.js';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import { DateTime } from 'luxon';
import { motion, useAnimation } from 'framer-motion';
import Timer from './components/Timer'
import StartButton from './components/StartButton'
import Balance from './components/Balance'
import UserLevels from "./components/UserLevels/index.js";
import { WithSeeMore } from 'react-insta-stories';

import frame1 from '../../assets/UserLevels/laptop.mp4'
import frame2 from '../../assets/UserLevels/phone.mp4'
import frame3 from '../../assets/UserLevels/stas.png'
import frame4 from '../../assets/UserLevels/dsar.png'
import frame5_1 from '../../assets/UserLevels/Frame 1.png'
import frame5_2 from '../../assets/UserLevels/Frame 2.png'

const getRandomHashrate = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz01234567890123456789';
    const randomText = Array.from({ length: 15 }, () => characters[Math.floor(Math.random() * characters.length)]);
    return `${randomText.join('')}`;
};

const RandomTextComponent = () => {
    const [randomText, setRandomText] = useState(getRandomHashrate());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRandomText(getRandomHashrate());
        }, 1000);

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Typography
            sx={{
                marginBlock: '12px',
                textAlign: 'center',
                fontSize: '12px',
                color: 'var(--tg-theme-hint-color)'
            }}
        >
            {randomText}
        </Typography>
    );
};

const CountdownTimer = ({fetchDataAndUpdateLocalStorage}) => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    function calculateTimeRemaining() {
        const now = DateTime.local();
        const targetTime = setTargetTime(16, 0, 0, 0);

        const tashkentTimeZone = 'Asia/Tashkent';
        const nowInTashkent = now.setZone(tashkentTimeZone);

        const timeDiff = targetTime.diff(nowInTashkent, ['hours', 'minutes', 'seconds']).toObject();

        const hours = Math.max(0, Math.floor(timeDiff.hours));
        const minutes = Math.max(0, Math.floor(timeDiff.minutes));
        const seconds = Math.max(0, Math.floor(timeDiff.seconds));

        // Вызывайте вашу функцию при достижении нуля
        if (hours === 0 && minutes === 0 && seconds === 0) {
            fetchDataAndUpdateLocalStorage();
        }

        return { hours, minutes, seconds };
    }

    function setTargetTime(hours, minutes, seconds, milliseconds) {
        const targetTime = DateTime.local().set({ hours, minutes, seconds, milliseconds });
        const endOfDay = DateTime.fromObject({
            year: targetTime.year,
            month: targetTime.month,
            day: targetTime.day,
            hour: 23,
            minute: 59,
            second: 59,
            millisecond: 999,
        }, { zone: 'Asia/Tashkent' });

        return endOfDay;
    }

    return (
        <Typography>
            {`${timeRemaining.hours}:${String(timeRemaining.minutes).padStart(2, '0')}:${String(timeRemaining.seconds).padStart(2, '0')}`}
        </Typography>
    );
};


const MainMining = ({setValue, setActiveMenuSection, fetchDataAndUpdateLocalStorage}) => {
    const {t} = useTranslation();

    const [timeRemaining, setTimeRemaining] = useState(0);
    const [showBalanceChange, setShowBalanceChange] = useState(false);
    const [randomIncrement, setRandomIncrement] = useState(0);
    const [isMiningActive, setIsMiningActive] = useState(false);
    const [endUserMiningTimestamp, setEndUserMiningTimestamp] = useState(null);
    const [cryptoCurrency, setCryptoCurrency] = useState('');
    const [hasUpdatedMiningData, setHasUpdatedMiningData] = useState(false);
    const [daysUntilWithdrawal, setDaysUntilWithdrawal] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const updateMiningData = (data) => {
        const storedData = data ? data.data : JSON.parse(localStorage.getItem('miningUserData')) || {};
        setIsMiningActive(storedData.is_mining_active || false);
        setEndUserMiningTimestamp(storedData.end_user_mining_timestamp || null);
        setShowBalanceChange(storedData.end_user_mining_timestamp !== null);
        setCryptoCurrency(storedData.crypto_currency || 'btc');
        if (storedData.end_user_mining_timestamp !== null) {
            const currentTime = Math.floor(Date.now() / 1000);
            const remainingTime = storedData.end_user_mining_timestamp - currentTime;
            setTimeRemaining(remainingTime > 0 ? remainingTime : 0);
        }
    };

    const onClickStartButton = async () => {
        if (isMiningActive) {
            setIsLoading(true);
            let currentProgress = 0;

            const intervalId = setInterval(async () => {
                currentProgress += 20;
                setProgress(currentProgress);

                if (currentProgress >= 100) {
                    clearInterval(intervalId);
                    currentProgress = 0
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 100);

                    // Выполняйте вашу логику для начала майнинга (startMining) здесь
                    await startMining('regular');

                    // Загружайте новые данные для таймера
                    const newData = await getMiningUserData();
                    updateMiningData(newData);
                    localStorage.setItem('miningUserData', JSON.stringify(newData.data));
                }
            }, 1000);
        } else {
            window.Telegram.WebApp.showAlert(
                `${t('mining.pages.mainMining.alert_1')}\n\n${t('mining.pages.mainMining.alert_2')}`
            );
        }
    };


    // useEffect для сброса прогресса после монтирования компонента
    useEffect(() => {
        setProgress(0);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        // Функция возвращается из useEffect и будет вызвана при размонтировании компонента
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (!hasUpdatedMiningData) {
            updateMiningData();
            setHasUpdatedMiningData(true);
        }
    }, [hasUpdatedMiningData]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('miningUserData')) || {};
        const registrationDate = storedData.registration_date || 0;

        // Рассчитываем разницу в днях
        const currentDate = new Date();
        const registrationDateObject = new Date(registrationDate * 1000); // Преобразуем timestamp в объект Date
        const timeDifference = currentDate - registrationDateObject;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        setDaysUntilWithdrawal(20 - daysDifference);
    }, []);

    const handleWithdrawal = () => {
        if (daysUntilWithdrawal >= 0) {
            setSnackbarOpen(true);
        } else {
            startTransition(() => {
                setActiveMenuSection('withdraw');
                navigate('/menu');
                setValue(3);
            });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const navigate = useNavigate();

    const [level, setLevel]=useState('ultra')
    const [userLevelsVisible, setUserLevelsVisible] = useState(false);
    const controls = useAnimation();
    const handleButtonLevelClick = () => {
        setUserLevelsVisible(true);
    };

    useEffect(() => {
        let isMounted = true;

        const animateWithDelay = async () => {
            if (isMounted) {
                await controls.start({
                    y: [0, -8, 0, 0, -8, 0, 0, -8, 0],
                    transition: {
                        repeat: 0,
                        duration: 1.5,
                        delay: 1,
                        ease: "easeOut"
                    }
                });
                setTimeout(animateWithDelay, 5000);
            }
        };

        animateWithDelay();

        // Устанавливаем флаг isMounted в false при размонтировании компонента
        return () => {
            isMounted = false;

        };
    }, [99999999]);

    const customCollapsedComponent = ({ toggleMore, action }) =>
        <h2 onClick={() => {
            action('pause');
            window.open('https://mywebsite.url', '_blank');
        }}>
            Купить
        </h2>

    const CustomStoryContent = ({ story, action }) => {
        return <WithSeeMore
            story={story}
            action={action}
            customCollapsed={customCollapsedComponent}
        >
        </WithSeeMore>
    }

    const storyData = useMemo(() => [
        {
            duration: 15000,
            preloadResource: true,
            content: (props) => (
                <video
                    controls={false}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    poster="https://cdn.indiawealth.in/public/images/transparent-background-mini.png"
                    style={{
                        width: '100vw'
                    }}
                >
                    <source
                        src={frame1}
                        type="video/mp4"
                    />
                </video>
            ),
        },
        {
            duration: 15000,
            preloadResource: true,
            content: (props) => (
                <video
                    controls={false}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    poster="https://cdn.indiawealth.in/public/images/transparent-background-mini.png"
                    style={{
                        width: '100vw'
                    }}
                >
                    <source
                        src={frame2}
                        type="video/mp4"
                    />
                </video>
            ),
        },
        {
            url: frame1,
            type: 'video',
            duration: 5000,
            preloadResource: true,
            seeMore: CustomStoryContent, // when expanded
            seeMoreCollapsed: customCollapsedComponent, // when collapsed
        },
        { url: frame3, duration: 2000000, preloadResource: true },
        { url: frame4, duration: 2000000, preloadResource: true },
        {
            content: (props) => (
               <>

               </>
            ),
        },
    ], []);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '80vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'var(--tg-theme-bg-color)',
                    color: 'var(--tg-theme-text-color)',
                }}
            >
                {!isMiningActive && (
                    <Box
                        sx={{
                            margin: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                        <Typography>
                            {t('mining.pages.mainMining.deactiveTimer')}:
                        </Typography>
                        <CountdownTimer fetchDataAndUpdateLocalStorage={fetchDataAndUpdateLocalStorage}/>
                    </Box>
                )}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <IconButton
                        onClick={() => {
                            startTransition(() => {
                                setActiveMenuSection('mining')
                                navigate('/menu');
                                setValue(3);
                            });
                        }}
                        sx={{
                            position: 'absolute',
                            top: '44px',
                            right: '0',
                            color: 'var(--tg-theme-text-color)'
                        }}
                    >
                        <InfoIcon/>
                    </IconButton>
                    <Button
                        variant='contained'
                        sx={{
                            position: 'absolute',
                            top: '54px',
                            left: '0',
                            color: 'var(--tg-theme-text-color)',
                            backgroundColor: level === 'standard' ? '#b87333' : level === 'pro' ? '#B9B9B9' : level === 'ultra' ? '#E1C00E' : 'inherit',
                            borderRadius: '0 30px 30px 0',
                            width: '120px',
                            height: '25px'
                        }}
                        onClick={handleButtonLevelClick}
                    >
                        {level}
                    </Button>
                    {level !== 'ultra' && (
                        <motion.div
                            animate={controls}
                            style={{
                                position: 'absolute',
                                top: '85px',
                                left: '10px',
                                fontSize: '12px',
                                color: 'var(--tg-theme-hint-color)',
                            }}
                        >
                            поднять уровень
                        </motion.div>
                    )}
                    {userLevelsVisible && (
                        <Box
                        sx={{
                            position: 'fixed',
                            top: '0',
                            left: '0',
                            zIndex: '3000',
                        }}>
                            <UserLevels
                            setUserLevelsVisible={setUserLevelsVisible}
                            storyData={storyData}
                            />;
                        </Box>
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '44px',
                                cursor: 'default'
                            }}>
                            {endUserMiningTimestamp !== null && (
                                <RandomTextComponent/>
                            )}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            {isLoading &&
                                <Box
                                sx={{
                                    position: 'relative',
                                    height: '125px',
                                    width: '100vw',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <CircularProgress
                                        variant="determinate"
                                        value={progress}
                                        size={100}
                                        sx={{
                                            position: 'absolute',
                                            top: '0',
                                            left: '37%',
                                    }}
                                    />
                                    <Typography
                                    sx={{
                                        paddingBottom: '25px'
                                    }}>
                                        {progress}%
                                    </Typography>
                                </Box>
                            }
                            {!isLoading && !endUserMiningTimestamp && (
                                <StartButton
                                    onClick={onClickStartButton}
                                    text={t('mining.pages.mainMining.start_btn')}
                                />
                            )}
                            {!isLoading && endUserMiningTimestamp !== null && (
                                <Timer timeRemaining={timeRemaining} cryptoCurrency={cryptoCurrency} />
                            )}
                        </Box>
                        <Balance
                            showBalanceChange={showBalanceChange}
                            randomIncrement={randomIncrement}
                            setRandomIncrement={setRandomIncrement}
                            endUserMiningTimestamp={endUserMiningTimestamp}
                            t={t}
                        />
                    </Box>
                </Box>
                <Button
                    onClick={handleWithdrawal}
                    variant='contained'
                    sx={{
                        marginTop: '20px',
                        width: 'max-content',
                        borderRadius: '7px'
                    }}
                >
                    <Typography
                        sx={{
                            marginTop: '2px',
                            fontSize: '14px',
                            color: 'var(--tg-theme-text-color)'
                        }}
                    >
                        {t('mining.pages.menu.withdraw.main_btn')}
                    </Typography>
                </Button>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={`${t('mining.pages.mainMining.days_snackbar_1')} ${daysUntilWithdrawal} ${t('mining.pages.mainMining.days_snackbar_2')}`}
            />
        </>
    );
}

export default MainMining;