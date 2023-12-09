import React, { useState } from 'react';
import { Card, CardContent, Checkbox, Container, FormControlLabel, Typography } from '@mui/material';
import { useTrail, animated } from 'react-spring';

const TaskList = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Задание 1', description: 'Описание задания 1', completed: false, link: '/task/1' },
        { id: 2, title: 'Задание 2', description: 'Описание задания 2', completed: false, link: '/task/2' },
        { id: 3, title: 'Задание 3', description: 'Описание задания 3', completed: false, link: '/task/2' },
        { id: 4, title: 'Задание 4', description: 'Описание задания 4', completed: false, link: '/task/2' },
        { id: 5, title: 'Задание 5', description: 'Описание задания 5', completed: false, link: '/task/2' },
        { id: 6, title: 'Задание 6', description: 'Описание задания 6', completed: false, link: '/task/2' },
        // Добавьте другие задания по аналогии
    ]);

    const handleTaskClick = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const trail = useTrail(tasks.length, {
        opacity: 1,
        transform: 'translateY(0)',
        from: { opacity: 0, transform: 'translateY(50px)' },
        config: { duration: 250, easing: (t) => t * (2 - t) },
    });

    return (
        <Container maxWidth="sm" sx={{ maxHeight: '300px', overflowY: 'auto' }}>
            {trail.map((props, index) => (
                <animated.div key={tasks[index].id} style={props}>
                    <Card
                        onClick={() => handleTaskClick(tasks[index].id)}
                        style={{
                            cursor: 'pointer',
                            marginBottom: 10,
                            border: tasks[index].completed
                                ? '1px solid rgba(45, 176, 25, 0.8)'
                                : '1px solid var(--tg-theme-hint-color)',
                            textDecoration: tasks[index].completed ? 'line-through' : 'none',
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
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={tasks[index].completed}
                                    sx={{
                                        color: 'var(--tg-theme-hint-color)',
                                        '&.Mui-checked': {
                                            color: 'rgba(45, 176, 25, 0.8)',
                                        },
                                    }}
                                />
                            }
                            label=""
                            labelPlacement="start"
                            sx={{
                                marginLeft: 'auto',
                                marginRight: 1,
                            }}
                        />
                    </Card>
                </animated.div>
            ))}
        </Container>
    );
};

export default TaskList;