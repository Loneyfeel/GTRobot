import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container, Typography } from '@mui/material';
import { useTrail, animated } from 'react-spring';
import { saveMiningUserTask } from '../Requests/Requests.js';

const TaskList = ({ activeTasks }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (activeTasks && activeTasks.length > 0) {
            // Преобразуем данные с сервера в формат заданий
            const formattedTasks = activeTasks.map((task) => ({
                id: task.task_id,
                title: task.task_text,
                description: task.task_link,
                link: task.task_link,
            }));

            setTasks(formattedTasks);
        }
    }, [activeTasks]);

    const trail = useTrail(tasks.length, {
        opacity: 1,
        transform: 'translateY(0)',
        from: { opacity: 0, transform: 'translateY(50px)' },
        config: { duration: 250, easing: (t) => t * (2 - t) },
    });

    const handleTaskClick = async (taskId) => {
        try {
            // Отправка запроса на сохранение задания
            await saveMiningUserTask(taskId);

            // Обновление local.storage
            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            localStorage.setItem('miningUserData', JSON.stringify({ ...JSON.parse(localStorage.getItem('miningUserData')), active_tasks: updatedTasks }));

            // Обновление списка задач после выполнения
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Ошибка при сохранении задания:', error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ maxHeight: '300px', overflowY: 'auto' }}>
            {trail.map((props, index) => (
                <animated.div key={tasks[index].id} style={props}>
                    <Card
                        onClick={() => {
                            window.open(tasks[index].link, '_blank');
                            handleTaskClick(tasks[index].id);
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
                            <Typography variant="h6">{tasks[index].title}</Typography>
                            <Typography variant="body2">{tasks[index].description}</Typography>
                        </CardContent>
                    </Card>
                </animated.div>
            ))}
        </Container>
    );
};

export default TaskList;