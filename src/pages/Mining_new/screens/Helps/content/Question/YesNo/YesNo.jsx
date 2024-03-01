import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import style from './yesNo.module.sass';
import circle from '../../../../../assets/Helps/content/Question/circle.svg';
import { useTranslation } from "react-i18next";

const YesNo = ({ setIsText, text, setIsCheckVisible }) => {
    const { t } = useTranslation();
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        setIsCheckVisible(true);
        setSelectedOption(null);
    }, [text]);

    const handleButtonClick = (option) => {
        setIsText(option === "yes" ? "" : text);
        setIsCheckVisible(option === "no");
        setSelectedOption(option);
    };

    return (
        <Box className={style.yesNo}>
            {["yes", "no"].map((option) => (
                <Box
                    key={option}
                    className={style.yesNo__button}
                    onClick={() => handleButtonClick(option)}
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