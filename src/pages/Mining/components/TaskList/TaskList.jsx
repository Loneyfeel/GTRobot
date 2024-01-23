import React, { useState, useEffect, lazy } from 'react';
import { Alert, Box, Button, Card, CardContent, Container, Snackbar, Typography } from '@mui/material';
import { useTrail, animated } from 'react-spring';
import { saveMiningUserTask } from '../Requests/Requests.js';
import { useTranslation } from "react-i18next";

import telegramIcon from '../../assets/TaskList/telegram.svg';
import instagramIcon from '../../assets/TaskList/instagram.svg';
import youtubeIcon from '../../assets/TaskList/youTube.svg';
import tiktokIcon from '../../assets/TaskList/tikTok.svg';
const ArrowOutwardIcon = lazy(() => import('@mui/icons-material/ArrowOutward'));

const TaskList = ({ activeTasks, setActiveTasks }) => {
    const { t, i18n } = useTranslation();

    const locale = i18n.language;
    const translateVariables = {
        "subscribe_to": { "ru": "Подписаться на ", "uz": "ga obuna bo’ling" },
        "like_to": { "ru": "Поставить лайк в ", "uz": "ga layk qo'ying" }
    };

    const getIconForTask = (taskText) => {
        const lowerCaseTaskText = taskText.toLowerCase();

        if (lowerCaseTaskText.indexOf('telegram') !== -1) {
            return telegramIcon;
        } else if (lowerCaseTaskText.indexOf('instagram') !== -1) {
            return instagramIcon;
        } else if (lowerCaseTaskText.indexOf('youtube') !== -1) {
            return youtubeIcon;
        } else if (lowerCaseTaskText.indexOf('tiktok') !== -1) {
            return tiktokIcon;
        } else {
            return <ArrowOutwardIcon />;
        }
    };

    const translateText = (text) => {
        const textParts = text.split(" ", 2);

        if (translateVariables.hasOwnProperty(textParts[0])) {
            textParts[0] = translateVariables[textParts[0]][locale];
            if (locale === "uz") {
                textParts.reverse();
            }
            return textParts.join("");
        }
        return text;
    };

    const [tasks, setTasks] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        if (activeTasks && activeTasks.length > 0) {
            setTasks(activeTasks.filter(task => task.is_required === 1));
        }
    }, [activeTasks]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsButtonDisabled(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const trail = useTrail(tasks.length, {
        opacity: 1,
        transform: 'translateY(0)',
        from: { opacity: 0, transform: 'translateY(50px)' },
        config: { duration: 250, easing: (t) => t * (2 - t) },
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleTaskClick = async (taskId) => {
        try {
            const response = await saveMiningUserTask(taskId);

            if (response.status === 200) {
                setTimeout(() => {
                    const updatedTasks = tasks.filter((task) => task.task_id !== taskId);
                    setTasks(updatedTasks);
                    setActiveTasks(updatedTasks)

                    const miningUserData = JSON.parse(localStorage.getItem('miningUserData')) || {};
                    localStorage.setItem('miningUserData', JSON.stringify({
                        ...miningUserData,
                        activeTasks: updatedTasks,
                    }));

                    localStorage.setItem('taskClickCount', 0);
                }, 5000);
            } else {
                if (response.status.response.data.errorCode === 2001)
                    console.error('Вы не подписались на канал');
                if (response.status.response.data.errorCode === 2000) {
                    console.error('Задание не найдено');
                    const updatedTasks = tasks.filter((task) => task.task_id !== taskId);
                    setTasks(updatedTasks);
                    setActiveTasks(updatedTasks)

                    localStorage.setItem('miningUserData', JSON.stringify({
                        ...JSON.parse(localStorage.getItem('miningUserData')),
                        activeTasks: updatedTasks,
                    }));

                    localStorage.setItem('taskClickCount', 0);
                }
            }
        } catch (error) {
            console.error('Ошибка при сохранении задания:', error);
        }
    };

    return (
        <>
            <Container
                maxWidth="sm"
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '100%',
                    overflowY: 'auto'
                }}
            >
                {trail.map((props, index) => (
                    <animated.div key={`animated-div-${index}`} style={props}>
                        {tasks[index] && (
                            <Card
                                key={tasks[index].id}
                                onClick={() => {
                                    window.open(tasks[index].task_link, '_blank');
                                    handleTaskClick(tasks[index].task_id);
                                }}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    marginBottom: 10,
                                    border: '1px solid var(--tg-theme-hint-color)',
                                    borderRadius: '30px',
                                    color: 'var(--tg-theme-text-color)',
                                    height: '75px',
                                    background: 'rgba(255, 255, 255, 0.1)', // Добавляем полупрозрачный белый цвет для размытого фона
                                }}
                            >
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '0',
                                        '&.MuiCardContent-root:last-child': {
                                            padding: '0'
                                        }
                                    }}>
                                    <Box
                                        component='img'
                                        src={getIconForTask(tasks[index].task_text)}
                                        alt='icon'
                                        sx={{
                                            width: '35px',
                                            height: '35px',
                                            marginRight: '15px'
                                        }}
                                    />
                                    <Typography variant="h6">{translateText(tasks[index].task_text)}</Typography>
                                </CardContent>
                            </Card>
                        )}
                    </animated.div>
                ))}
            </Container>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '0',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Button
                    variant='contained'
                    onClick={() => {
                        tasks.forEach((task) => {
                            if (task.task_text.toLowerCase().includes('telegram')) {
                                handleTaskClick(task.task_id);
                            }
                        });
                        if (tasks.length > 0) {
                            setOpenSnackbar(true);
                        }
                    }}
                    sx={{
                        color: 'var(--tg-theme-text-color)',
                        margin: '40px',
                        '&.Mui-disabled':{
                            color: '#000',
                            bgcolor: isButtonDisabled && 'var(--tg-theme-hint-color)'
                        }
                    }}
                    disabled={isButtonDisabled} // Используем disabled, чтобы сделать кнопку неактивной
                >
                    {t('mining.components.taskList.check_btn')}
                </Button>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseSnackbar}
                    severity="error"
                >
                    {t('mining.components.taskList.incomplete_tasks_warning')}
                </Alert>
            </Snackbar>
        </>
    );
}

export default TaskList;
