import React from 'react';
import style from './taskItem.module.sass';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useTaskParser from './helps/useTaxtParser.js';
import { useLocalStorage } from '@uidotdev/usehooks';

const TaskItem = ({ taskId, taskText, taskLink }) => {
    const { text, icon } = useTaskParser(taskText);

    // Используем хук useLocalStorage для сохранения информации о количестве нажатий на задание
    const [clickedTasks, setClickedTasks] = useLocalStorage("clickedTasks", {});

    function handleTaskItemClick() {
        // Увеличиваем счетчик нажатий на задание
        setClickedTasks(prevState => ({
            ...prevState,
            [taskId]: (prevState[taskId] || 0) + 1
        }));
        if (taskLink) {
            // window.open(taskLink, '_blank'); // Открывает ссылку в новой вкладке
        }
    }

    return (
        <Box className={style.taskItem} onClick={handleTaskItemClick}>
            <Box className={style.taskItem__box}>
                <Box className={style.taskItem__box_img}>
                    <img src={icon} alt="icon" className={style.taskItem__box_img__icon} />
                </Box>
                <Box className={style.taskItem__box__text} dangerouslySetInnerHTML={{ __html: text }}>
                </Box>
            </Box>
        </Box>
    );
};

export default TaskItem;
