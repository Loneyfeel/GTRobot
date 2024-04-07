import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import style from './yesNo.module.sass';
import circle from '../../../../../assets/Helps/content/Question/circle.svg';
import { useTranslation } from "react-i18next";
import arrow from "../../../../../assets/Helps/arrow.svg";

const YesNo = ({ setIsText, text, setIsCheckVisible, setArrowSrc, currentIndex, setCurrentIndex, setAnimationKey }) => {
    const { t } = useTranslation();
    const [selectedOption, setSelectedOption] = useState(null);

    function handleButtonNextClick (direction){
        setArrowSrc({left: arrow, right: arrow});
            setCurrentIndex(prevIndex => prevIndex + (direction === 'left' ? -1 : 1));
            setAnimationKey(prevKey => prevKey + 1); // Обновляем ключ анимации
    }

    useEffect(() => {
        setIsCheckVisible(true);
        setSelectedOption(null);
    }, [text]);

    function handleYesNoButtonClick(option){
        setIsText(option === "yes" ? "" : text);
        setIsCheckVisible(option === "no");
        setSelectedOption(option);
        if (option === "yes"){
            setTimeout(() => {
                handleButtonNextClick('right');
            }, 300);
        }
    };

    return (
        <Box className={style.yesNo}>
            {["yes", "no"].map((option) => (
                <Box
                    key={option}
                    className={style.yesNo__button}
                    onClick={() => handleYesNoButtonClick(option)}
                >
                    <Box className={style.yesNo__button__circle}>
                        <img src={circle} alt={'circle'} className={style.yesNo__button__circle_img}/>
                        <Box
                            className={style.yesNo__button__circle_selected}
                            sx={{
                                display: selectedOption === option ? 'block' : 'none'
                            }}
                        />
                    </Box>
                    <Box className={style.yesNo__button__text}>
                        {t(`mining.components.helps.survey.${option}`)}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default YesNo