import React, { useEffect, useState } from 'react';
import style from './tasks.module.sass';
import { Box } from '@mui/material';
import TaskItem from './TaskItem';
import { useTranslation } from "react-i18next";
import CustomButton from "@components/CustomButton/index.js";
import { useTrail, animated } from 'react-spring';
import {saveMiningUserTask} from "../../api/api.js";
import {useLocalStorage} from "@uidotdev/usehooks";
import CustomSnackBar from "../../components/CustomSnackBar/index.js";

const Tasks = ({ userTasks, setUserTasks }) => {
    const { t } = useTranslation();

    const [openSnackBar, setIsOpenSnackBar] = useState(false)

    const [currentTasks, setCurrentTasks] = useState([]);
    const [taskText, setTaskText] = useState(`${t("mining.components.taskList.title")}:`);
    const [clickedTasks, setClickedTasks] = useLocalStorage('clickedTasks', {}); // Храним нажатия в локальном хранилище

    useEffect(() => {
        // Фильтрация заданий по is_required при монтировании компонента
        if (userTasks) {
            const requiredTasks = userTasks.filter(task => task.is_required === 1);
            if (requiredTasks.length > 0) {
                // Если есть задания с is_required: 1, отобразить их
                setCurrentTasks(requiredTasks);
                setTaskText(`${t("mining.components.taskList.title")}:`);
            } else {
                const optionalTasks = userTasks.filter(task => task.is_required === 0);
                if (optionalTasks.length > 0 && currentTasks.length === 0) {
                    // Если есть задания с is_required: 0 и они еще не были отображены, отобразить их
                    setTaskText(`${t("mining.components.taskList.new_title")}:`);
                    setCurrentTasks(optionalTasks);
                }
            }
        }
    }, [userTasks, currentTasks.length]); // Обновление currentTasks при изменении userTasks или currentTasks.length

    //Стили анимации появления заданий
    const trail = useTrail(currentTasks.length, {
        opacity: 1,
        transform: "translateY(0)",
        from: { opacity: 0, transform: "translateY(70px)" },
        config: { duration: 300, easing: (t) => t * (2 - t) }, //чтобы под конец замедлялись
        delay: 500
    });

    async function handleButtonClick() {
        let newTasks = [...currentTasks]; // Создаем копию массива задач
        let newClickedTasks = { ...clickedTasks }; // Создаем копию объекта с кликами

        for (const task of userTasks) {
            const clicks = clickedTasks[task.task_id] || 0;
            if (clicks >= 2) {
                newTasks = newTasks.filter(item => item.task_id !== task.task_id); // Фильтруем задачи
                delete newClickedTasks[task.task_id]; // Удаляем клики для данной задачи
                setUserTasks(prevUserTasks => prevUserTasks.filter(item => item.task_id !== task.task_id)); // Удаляем задачу из userTasks
                const response = await saveMiningUserTask(task.task_id);
                if (response.status === 200) {
                    // newTasks = newTasks.filter(item => item.task_id !== task.task_id); // Фильтруем задачи
                    // delete newClickedTasks[task.task_id]; // Удаляем клики для данной задачи
                    // setUserTasks(prevUserTasks => prevUserTasks.filter(item => item.task_id !== task.task_id)); // Удаляем задачу из userTasks
                } else {
                    console.error("Error:", response.status);
                    if (response.status.response?.data?.errorCode === 2001) {
                        console.error("Вы не подписались на канал");
                    }
                    if (response.status.response?.data?.errorCode === 2000) {
                        console.error("Задание не найдено");
                    }
                }
            }
        }

        setCurrentTasks(newTasks); // Устанавливаем новые задачи
        setClickedTasks(newClickedTasks); // Устанавливаем новые клики

        if (userTasks){
            setIsOpenSnackBar(true)
        }
    }


    return (
        <>
            <Box className={style.tasks}>
                <Box className={style.tasks__title}>
                    {taskText}
                </Box>
                <Box className={style.tasks__list}>
                    {trail.map((props, index) => (
                        <animated.div key={index} style={props}>
                            <TaskItem taskId={currentTasks[index].task_id} taskText={currentTasks[index].task_text} taskLink={currentTasks[index].task_link} />
                        </animated.div>
                    ))}
                </Box>
                <CustomButton
                    content={t("mining.components.taskList.check_btn")}
                    onClick={handleButtonClick}
                />
            </Box>
            <CustomSnackBar
                text={t("mining.components.taskList.incomplete_tasks_warning")}
                severity={'info'}
                setIsFunction={setIsOpenSnackBar}
                openState={openSnackBar}
            />
        </>
    );
};

export default Tasks;