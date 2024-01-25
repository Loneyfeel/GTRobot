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

    const handleTaskClick = async (taskId, task_group_id) => {
        const taskClickCountKey = `taskClickCounts`;
        const taskClickCounts = JSON.parse(localStorage.getItem(taskClickCountKey)) || {};

        // Проверяем, есть ли такое задание в localStorage
        if (!taskClickCounts.hasOwnProperty(taskId)) {
            taskClickCounts[taskId] = 0; // Если нет, устанавливаем количество нажатий на 0
        }

        const currentClickCount = taskClickCounts[taskId];

        // Увеличиваем количество нажатий
        if (task_group_id) {
            taskClickCounts[taskId] = currentClickCount + 2;
        }
        else {

            taskClickCounts[taskId] = currentClickCount + 1;
        }
        localStorage.setItem(taskClickCountKey, JSON.stringify(taskClickCounts));

        // Открываем ссылку в новой вкладке
        window.open(tasks.find(task => task.task_id === taskId).task_link, '_blank');

        console.log(localStorage)

    };

    const handleButtonClick = async () => {

        const taskClickCountKey = `taskClickCounts`;
        const taskClickCounts = JSON.parse(localStorage.getItem(taskClickCountKey)) || {};

        try {
            let updatedTasks = [...tasks];

            for (const task of updatedTasks) {
                if (taskClickCounts[task.task_id] >= 2 && task.is_required === 1) {
                    const response = await saveMiningUserTask(task.task_id);

                    delete taskClickCounts[task.task_id];
                    if (response.status === 200) {
                        // Удалить выполненное задание из массива заданий
                        updatedTasks = updatedTasks.filter(t => t.task_id !== task.task_id);
                        localStorage.setItem(taskClickCountKey, JSON.stringify(taskClickCounts));
                    } else {
                        console.error(`Ошибка при сохранении задания ${task.task_id}: ${response.status}`);
                        if (response.status.response?.data?.errorCode === 2001) {
                            console.error('Вы не подписались на канал');
                        }
                        if (response.status.response?.data?.errorCode === 2000) {
                            console.error('Задание не найдено');
                        }
                    }
                }
            }

            const miningUserData = JSON.parse(localStorage.getItem('miningUserData')) || {};
            // Обновить состояние activeTasks в соответствии с выполненными заданиями
            const updatedActiveTasks = miningUserData.activeTasks.filter(t => {
                const clickCount = taskClickCounts[t.task_id] || 0;
                const isClickCountValid = clickCount < 2;
                return isClickCountValid && t.is_required === 1;
            });

            localStorage.setItem('miningUserData', JSON.stringify({
                ...miningUserData,
                activeTasks: updatedActiveTasks,
            }));

            setTasks(updatedTasks);
            setActiveTasks(updatedTasks);

            if (updatedTasks.length > 0) {
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Ошибка при обработке нажатия на кнопку проверки заданий:', error);
        }
        console.log(localStorage);
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
                                onClick={() => handleTaskClick(tasks[index].task_id, tasks[index].task_group_id)}
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
                                    background: 'rgba(255, 255, 255, 0.1)',
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
                    onClick={handleButtonClick}
                    sx={{
                        color: 'var(--tg-theme-text-color)',
                        margin: '40px',
                        '&.Mui-disabled': {
                            color: '#000',
                            bgcolor: isButtonDisabled && 'var(--tg-theme-hint-color)'
                        }
                    }}
                    disabled={isButtonDisabled}
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