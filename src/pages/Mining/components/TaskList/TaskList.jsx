import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container, Typography } from '@mui/material';
import { useTrail, animated } from 'react-spring';
import { saveMiningUserTask } from '../Requests/Requests.js';

const TaskList = ({ activeTasks, setActiveTasks }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        console.log('www',activeTasks)
        if (activeTasks && activeTasks.length > 0) {
            setTasks(activeTasks);
        }
    }, [activeTasks]);

// Дополнительный useEffect для выполнения действий после обновления tasks
    useEffect(() => {
        // Здесь вы можете выполнить дополнительные действия после обновления tasks
        console.log('Updated tasks:', tasks);
    }, [tasks]);

    const trail = useTrail(tasks.length, {
        opacity: 1,
        transform: 'translateY(0)',
        from: {opacity: 0, transform: 'translateY(50px)'},
        config: {duration: 250, easing: (t) => t * (2 - t)},
    });

    const handleTaskClick = async (taskId) => {
        try {
            // Отправка запроса на сервер
            const response = await saveMiningUserTask(taskId);

            if (response.status === 200) {
                const updatedTasks = tasks.filter((task) => task.task_id !== taskId);
                setTasks(updatedTasks);
                setActiveTasks(updatedTasks)

                // Обновление локального хранилища
                const miningUserData = JSON.parse(localStorage.getItem('miningUserData')) || {};
                localStorage.setItem('miningUserData', JSON.stringify({
                    ...miningUserData,
                    active_tasks: updatedTasks,
                }));
            } else {
                if (response.status.response.data.errorCode === 2001)
                    console.error('Вы не подписались на канал');
                if (response.status.response.data.errorCode === 2000) {
                    console.error('Задание не найдено');
                    const updatedTasks = tasks.filter((task) => task.task_id !== taskId);
                    setTasks(updatedTasks);
                    setActiveTasks(updatedTasks)

                    // Обновление локального хранилища
                    localStorage.setItem('miningUserData', JSON.stringify({
                        ...JSON.parse(localStorage.getItem('miningUserData')),
                        active_tasks: updatedTasks,
                    }));
                }
            }
        } catch (error) {
            console.error('Ошибка при сохранении задания:', error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{overflowY: 'auto'}}>
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
                                cursor: 'pointer',
                                marginBottom: 10,
                                border: '1px solid var(--tg-theme-hint-color)',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '10px',
                                color: 'var(--tg-theme-text-color)',
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6">{tasks[index].task_text}</Typography>
                                <Typography variant="body2">{tasks[index].task_link}</Typography>
                            </CardContent>
                        </Card>
                    )}
                </animated.div>
            ))}
        </Container>
    );
}

export default TaskList;