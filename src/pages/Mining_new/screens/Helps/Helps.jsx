import React, {Suspense, useState} from 'react';
import style from './helps.module.sass';
import { motion } from "framer-motion";
import CustomButton from '../../../../components/CustomButton/index.js';
import { Box } from "@mui/material";

import { Start, Change, Referrals, Question, FunctionalChangeCrypto } from './content';
import arrowActive from '../../assets/Helps/arrowActive.svg';
import arrow from '../../assets/Helps/arrow.svg';
import question_1 from '../../assets/Helps/content/Question/question_1.json';
import question_2 from '../../assets/Helps/content/Question/question_2.json';

import { useTranslation } from "react-i18next";

const Helps = ({ setIsUserExists }) => {
    const {t} = useTranslation();

    const objects = [
        {
            text: <span><b>{t("mining.components.helps.start_1")}</b> {t("mining.components.helps.start_2")}
                <br/>{t("mining.components.helps.start_3")}</span>, component: <Start/>
        },
        {
            text: <span>{t("mining.components.helps.change-crypto_1")} <b>{t("mining.components.helps.change-crypto_2")}</b> {t("mining.components.helps.change-crypto_3")}</span>,
            component: <Change/>
        },
        {
            text: <span>{t("mining.components.helps.referrals_1")} <b>{t("mining.components.helps.referrals_2")}</b> {t("mining.components.helps.referrals_3")}</span>,
            component: <Referrals/>
        },
        {
            text: <span>{t("mining.components.helps.survey.question_1_1")} <br/>{t("mining.components.helps.survey.question_1_2")} <b>{t("mining.components.helps.survey.question_1_3")}</b>?</span>,
            component: <Question text={t("mining.components.helps.survey.text_1")} animation={question_1}/>
        },
        {
            text:
                <span>{t("mining.components.helps.survey.question_2_1")}<br/><b>{t("mining.components.helps.survey.question_2_2")}</b>?</span>,
            component: <Question text={t("mining.components.helps.survey.text_2")} animation={question_2}/>
        },
        {
            text: <span>{t("mining.components.helps.changeCrypto.changeCryptoTitle_1")} <b>{t("mining.components.helps.changeCrypto.changeCryptoTitle_2")}</b></span>,
            component: <FunctionalChangeCrypto setIsUserExists={setIsUserExists}/>
        }
    ];

    const [arrowSrc, setArrowSrc] = useState({left: arrow, right: arrow});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationKey, setAnimationKey] = useState(0); // Добавленное состояние для обновления ключа анимации

    const handleArrowMouseDown = direction => {
        setArrowSrc(prevState => ({...prevState, [direction]: arrowActive}));
    };

    const handleButtonClick = direction => {
        setArrowSrc({left: arrow, right: arrow});
        if ((direction === 'left' && currentIndex > 0) || (direction === 'right' && currentIndex < objects.length - 1)) {
            setCurrentIndex(prevIndex => prevIndex + (direction === 'left' ? -1 : 1));
            setAnimationKey(prevKey => prevKey + 1); // Обновляем ключ анимации
        }
    };

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {opacity: 1},
    };
    const transition = {duration: 0.5, ease: "easeInOut"};

    return (
        <Box className={style.helps}>
            <Box className={style.arrows}>
                <CustomButton
                    onClick={() => handleButtonClick('left')}
                    onMouseDown={() => handleArrowMouseDown('left')}
                    onTouchStart={() => handleArrowMouseDown('left')}
                    disabled={currentIndex === 0}
                    content={<img src={arrowSrc.left} alt="Arrow Left"
                                  className={currentIndex === 0 && style.arrows__disabled}/>}
                />
                <CustomButton
                    onClick={() => handleButtonClick('right')}
                    onMouseDown={() => handleArrowMouseDown('right')}
                    onTouchStart={() => handleArrowMouseDown('right')}
                    disabled={currentIndex === objects.length - 1}
                    content={<img src={arrowSrc.right} alt="Arrow Right"
                                  className={`${style.arrows__right} ${currentIndex === objects.length - 1 && style.arrows__disabled}`}/>}
                />
            </Box>
            <Box
                className={style.area}
                sx={{
                    display: currentIndex < 3 ? 'block' : 'none'
                }}
            >
                <Box className={`${style.area__half} ${style.area_left}`}
                     onClick={() => handleButtonClick('left')}
                />
                <Box className={`${style.area__half} ${style.area_right}`}
                     onClick={() => handleButtonClick('right')}
                />
            </Box>
            <motion.div
                key={animationKey} // Подключаем ключ анимации
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={transition}
                className={style.content}
            >
                {/*<Box className={style.content}>*/}
                <Suspense>
                    <Box className={style.content__title}>{objects[currentIndex].text}</Box>
                    <Box className={style.content__component}>{objects[currentIndex].component}</Box>
                </Suspense>
                {/*</Box>*/}
            </motion.div>
        </Box>
    )
}

export default Helps;
