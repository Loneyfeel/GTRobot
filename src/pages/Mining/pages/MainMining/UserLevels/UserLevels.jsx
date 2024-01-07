import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Box, LinearProgress, IconButton, Typography, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Lottie from 'lottie-react';
import animationData from '../../../assets/UserLevels/growth-chart.json';
import userAnimation from '../../../assets/UserLevels/userLevel.gif'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import wasd from '../../../assets/UserLevels/standarst_1704636965262.json'

const StoryComponent = ({ setUserLevelsVisible }) => {
    const [currentPart, setCurrentPart] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isStoryCompleted, setIsStoryCompleted] = useState(false);
    const [holdClick, setHoldClick] = useState(false);
    const [clickStartTime, setClickStartTime] = useState(0);

    useEffect(() => {
        let progressInterval;
        let partInterval;

        const startProgress = () => {
            setProgress(0);
            progressInterval = setInterval(() => {
                if (!holdClick) {
                    setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 1 : 100));
                }
            }, 100);
        };

        const switchPart = () => {
            setCurrentPart((prevPart) => (prevPart < 5 ? prevPart + 1 : 0));
            clearInterval(progressInterval);
            startProgress();
        };

        const completeStory = () => {
            setIsStoryCompleted(true);
            clearInterval(progressInterval);
            clearInterval(partInterval);
        };

        startProgress();

        partInterval = setInterval(() => {
            if (currentPart < 5 && !holdClick) {
                switchPart();
            } else if (currentPart === 5) {
                completeStory();
            }
        }, 10000000);

        return () => {
            clearInterval(progressInterval);
            clearInterval(partInterval);
        };
    }, [currentPart, holdClick]);

    const partsContent = [<Frame1 />, <Frame2 />, <Frame3 />,<Frame4 />, <Frame5 />, <Frame6 />];

    const handleLeftClick = () => {
        if (!holdClick && Date.now() - clickStartTime < 500) {
            if (currentPart > 0) {
                setCurrentPart((prevPart) => prevPart - 1);
            }
        }
        setClickStartTime(0);
    };

    const handleRightClick = () => {
        if (!holdClick && Date.now() - clickStartTime < 500) {
            if (currentPart < 5) {
                setCurrentPart((prevPart) => prevPart + 1);
            }
        }
        setClickStartTime(0);
    };

    const handleMouseDown = () => {
        setHoldClick(true);
        setClickStartTime(Date.now());
    };

    const handleMouseUp = () => {
        setHoldClick(false);
    };

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                bgcolor: 'var(--tg-theme-bg-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <Box sx={{
                position: 'relative',
                width: '100%',
                height: '100vh',
            }}>
                <Box
                    onClick={handleLeftClick}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '50%',
                        height: '100vh',
                        zIndex: 3,
                        cursor: 'pointer',
                        display: currentPart === 5 ? 'none' : 'block'
                    }}
                />
                <Box
                    onClick={handleRightClick}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '50%',
                        height: '100vh',
                        zIndex: 3,
                        cursor: 'pointer',
                        display: currentPart === 5 ? 'none' : 'block'
                    }}
                />
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '0 0 30px 0'
                }}>
                {partsContent.map((content, index) => (
                    <React.Fragment key={index}>
                        <motion.div
                            initial="hidden"
                            animate={index === currentPart ? 'visible' : 'hidden'}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1 },
                            }}
                            sx={{
                                height: '100%',
                                borderRadius: '30px',
                            }}
                        />
                        <Box
                            sx={{
                                zIndex: 1,
                                borderRadius: '30px',
                                width: '60px',
                            }}
                        >
                            <LinearProgress
                                variant="determinate"
                                value={index < currentPart ? 100 : index === currentPart ? progress : 0}
                                sx={{
                                    borderRadius: '50px',
                                    height: '3px',
                                    margin: '5px',
                                }}
                            />
                        </Box>
                    </React.Fragment>
                ))}
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'block',
                        zIndex: 2,
                    }}
                >
                    {isStoryCompleted && (
                        <IconButton
                            onClick={() => setUserLevelsVisible(false)}
                            sx={{
                                position: 'absolute',
                                top: '5px',
                                right: '0',
                                color: 'var(--tg-theme-text-color)',
                                marginRight: '10px',
                                zIndex: '3500'
                        }}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                    {partsContent[currentPart]}
                </Box>
            </Box>
        </Box>
    );
};

export default StoryComponent;

const Frame1 = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
            <Typography>
                Ускорение процесса майнинга криптовалюты — это не просто желание, это стратегическая необходимость для тех, кто хочет заработать больше до того как Bitcoin достигнет отметки в 100.000$
                <br/>
                <br/>
                Представьте себе ситуацию: вы уже майните криптовалюту с максимальной скоростью, но рынок не стоит на месте. Для того чтобы оставаться в игре и увеличивать свои доходы, необходимо повышать свою скорость.
            </Typography>
                <Lottie
                    animationData={animationData}
                    loop={false} // Отключаем зацикливание
                    style={{width: '100%', height: '300px'}} // Задаем стили для размеров анимации
                />
            </motion.div>
        </>
    )
}

const Frame2 = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
            <Typography
            sx={{
                fontSize: '14px'
            }}>
                GTRobot Cloud Mining предоставляет решения, которые не просто увеличивают вашу скорость, но и оптимизируют процесс майнинга. При использовании тарифов ваша скорость майнинга может вырастить в разы больше.
                <br/>
                Таким образом, если вы ищете способ ускорить свой майнинг,  тарифы GTRobot Cloud Mining станут идеальным решением для вас. С их помощью вы сможете максимизировать свои доходы и оставаться впереди всех пользователей майнинга.
            </Typography>
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                </Box>
            </motion.div>
        </>
    )
}

const Frame3 = () => {
    return (
        <>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 1}}
            >
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100px',
                            bgcolor: '#b87333'
                        }}>
                        <Typography
                            sx={{
                                fontWeight: '700',
                                fontSize: '30px'
                            }}>
                            Standard
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Box
                        sx={{
                            width: '80%',
                            margin: '20px'
                        }}>
                        <Typography
                            sx={{
                                marginBlock: '20px',
                                fontSize: '20px'
                            }}>
                            - 4 Сеанса майнинга (по 4 часа)
                        </Typography>
                        <Typography
                            sx={{
                                marginBlock: '20px',
                                fontSize: '20px'
                            }}>
                            - Есть задания
                        </Typography>
                        <Typography
                            sx={{
                                marginBlock: '20px',
                                fontSize: '20px'
                            }}>
                            - Обычная скорость майнинга
                        </Typography>
                        <Typography
                            sx={{
                                marginBlock: '20px',
                                fontSize: '20px'
                            }}>
                            - Лимит майнинга для тарифов GTRobot 100$.
                        </Typography>
                    </Box>
                    <Box
                    sx={{
                        width: '80%'
                    }}>
                        <Typography
                            sx={{
                                marginBlock: '20px',
                                fontSize: '20px'
                            }}>
                            Срок: Нет ограничений
                        </Typography>
                        <Typography
                            sx={{
                                marginBlock: '20px',
                                fontSize: '20px'
                            }}>
                            Цена: Бесплатно
                        </Typography>
                    </Box>
                </Box>
            </motion.div>
        </>
    )
}
const Frame4 = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100px',
                            bgcolor: '#B9B9B9'
                        }}>
                        <Typography
                            sx={{
                                fontWeight: '700',
                                fontSize: '30px'
                            }}>
                            PRO
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Box
                        sx={{
                            width: '80%',
                            margin: '20px'
                        }}>
                        <Typography
                            sx={{
                                marginBlock: '10px',
                                fontSize: '20px'
                            }}>
                            - 2 Сеанса вместо 4 (по 8 часов)
                        </Typography>
                        <Typography
                            sx={{
                                marginBlock: '20px',
                                fontSize: '20px'
                            }}>
                            - Освобождение от любых заданий
                        </Typography>
                        <Typography
                            sx={{
                                marginBlock: '20px',
                                fontSize: '20px'
                            }}>
                            - +50% к скорости майнинга
                        </Typography>
                        <Typography
                            sx={{
                                marginBlock: '10px',
                                fontSize: '20px'
                            }}>
                            - Возможность увеличение лимита майнинга для тарифов GTRobot до 200$ вместо 100$.
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: '80%'
                        }}>
                        <Typography
                            sx={{
                                marginBlock: '10px',
                                fontSize: '20px'
                            }}>
                            Срок: 30 Дней
                        </Typography>
                        <Typography
                            sx={{
                                marginBlock: '10px',
                                fontSize: '20px'
                            }}>
                            Цена: 5.9$
                        </Typography>
                    </Box>
                </Box>
            </motion.div>
        </>
    )
}
const Frame5 = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100px',
                            bgcolor: '#E1C00E'
                        }}>
                        <Typography
                            sx={{
                                fontWeight: '700',
                                fontSize: '30px'
                            }}>
                            ULTRA
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Box
                        sx={{
                            width: '80%',
                            margin: '20px'
                        }}>
                        <Typography
                            sx={{
                                marginBlock: '5px',
                                fontSize: '18px'
                            }}>
                            - 1 сеанс вместо 4
                        </Typography>
                        <Typography
                            sx={{
                                marginBlock: '5px',
                                 fontSize: '18px'
                            }}>
                            - Освобождение от любых заданий
                        </Typography>
                        <Typography
                            sx={{
                                marginBlock: '5px',
                               fontSize: '18px'
                            }}>
                            - +150% к скорости майнинга
                        </Typography>
                        <Typography
                            sx={{
                                marginBlock: '5px',
                                 fontSize: '18px'
                            }}>
                            - Возможность увеличение лимита майнинга для тарифов GTRobot до 300$ вместо 100$.
                        </Typography>
                        <Typography
                            sx={{
                                marginBlock: '5px',
                                fontSize: '18px'
                            }}>
                            - Возможность вывода каждые 10 дней.
                        </Typography>
                        <Typography
                            sx={{
                                marginBlock: '5px',
                                fontSize: '18px'
                            }}>
                            - Оповещение об окончании майнинга
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: '80%'
                        }}>
                        <Typography
                            sx={{
                                marginBlock: '20px',
                                fontSize: '18px'
                            }}>
                            Срок: 30 Дней
                        </Typography>
                        <Typography
                            sx={{
                                marginBlock: '20px',
                                fontSize: '18px'
                            }}>
                            Цена: 9.9$
                        </Typography>
                    </Box>
                </Box>
            </motion.div>
        </>
    )
}
const Frame6 = () => {
    const [selectedBox, setSelectedBox] = useState('right');

    const handleBoxClick = (box) => {
        setSelectedBox(box);
    };

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1}}
        >
            <Box
                sx={{
                    display:"flex",
                    justifyContent:'center'
                }}
            >
                <Box
                    onClick={() => handleBoxClick("left")}
                    sx={{
                        width: selectedBox === "left" ? '100%' : 100,
                        height: 80,
                        marginLeft: '10px',
                        marginRight: '3px',
                        cursor: 'pointer',
                        backgroundColor: '#B9B9B9',
                        transition: 'width 400ms',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '15px'
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: selectedBox === "left" ? '40px' : '20px',
                            fontWeight: selectedBox === "left" ? '700' : '500',
                            transition: 'all 400ms ease',
                        }}
                    >
                        PRO
                    </Typography>
                </Box>
                {(
                    <motion.div
                        initial={{ opacity: 0, y: '50%' }}
                        animate={{ opacity: 1, y: '0%', left: selectedBox === "left" ? 0 : '-100%' }}
                        exit={{ opacity: 1, y: '50%' }}
                        transition={{ duration: 0.4 }}
                        style={{
                            position: 'absolute',
                            top: 170,
                            transform: selectedBox === "right" ? 'translateX(50%)' : 'none',
                        }}
                    >
                        <Box
                        sx={{
                            width: '200vw',
                            height: '30px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100vw',
                            }}>
                                <Box
                                sx={{
                                    paddingInline: '20px',
                                    width: '300px',
                                }}>
                                    <Typography variant="h6">
                                        - 2 Сеанса вместо 4 (по 8 часов)
                                    </Typography>
                                    <Typography variant="h6">
                                        - Освобождение от любых заданий
                                    </Typography>
                                    <Typography variant="h6">
                                        - +50% к скорости майнинга
                                    </Typography>
                                    <Typography variant="h6">
                                        - Возможность увеличение лимита майнинга для тарифов GTRobot до 200$ вместо 100$.
                                    </Typography>
                                </Box>
                                <Button
                                    variant='contained'
                                    sx={{
                                        marginTop: '20px',
                                        color: 'var(--tg-theme-text-color)'
                                    }}>
                                    Поднять уровень
                                </Button>
                            </Box>
                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: '100vw',
                                    }}>
                                    <Box
                                        sx={{
                                            paddingInline: '20px',
                                            width: '300px',
                                        }}>
                                        <Typography
                                        sx={{
                                            fontSize: '18px'
                                        }}>
                                            - 1 сеанс вместо 4
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '18px'
                                            }}>
                                            - Освобождение от любых заданий
                                        </Typography>
                                        <Typography
                                        sx={{
                                            fontSize: '18px'
                                        }}>
                                            - +150% к скорости майнинга
                                        </Typography>
                                        <Typography
                                        sx={{
                                            fontSize: '18px'
                                        }}>
                                            - Возможность увеличение лимита майнинга для тарифов GTRobot до 300$ вместо 100$.
                                        </Typography>
                                        <Typography
                                        sx={{
                                            fontSize: '18px'
                                        }}>
                                            - Возможность вывода каждые 10 дней.
                                        </Typography>
                                        <Typography
                                        sx={{
                                            fontSize: '18px'
                                        }}>
                                            - Оповещение об окончании майнинга
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant='contained'
                                        sx={{
                                            marginTop: '20px',
                                            color: 'var(--tg-theme-text-color)'
                                        }}>
                                        Поднять уровень
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </motion.div>
                )}
                <Box
                    onClick={() => handleBoxClick("right")}
                    sx={{
                        width: selectedBox === "right" ? '100%' : 100,
                        height: 80,
                        marginLeft: '3px',
                        marginRight: '10px',
                        cursor: 'pointer',
                        backgroundColor: '#E1C00E',
                        transition: 'width 0.4s',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '15px'
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: selectedBox === "right" ? '40px' : '20px',
                            fontWeight: selectedBox === "right" ? '700' : '500',
                            transition: 'all 0.4s ease',
                        }}
                    >
                        ULTRA
                    </Typography>
                </Box>
            </Box>
        </motion.div>
    );
}
