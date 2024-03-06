import React, {useState} from 'react';
import style from './question.module.sass'
import {Box} from "@mui/material";
import Lottie from "lottie-react";
import DescriptionTextBox from "../../../../components/DescriptionTextBox/index.js";
import YesNo from "./YesNo/index.js";
import CustomSnackBar from "../../../../components/CustomSnackBar/index.js";
import {useTranslation} from "react-i18next";

const Question = ({text, animation, setArrowSrc, currentIndex, setCurrentIndex, setAnimationKey}) => {
    const { t } = useTranslation();

    const [isText, setIsText] = useState('')
    const [isCheckVisible, setIsCheckVisible] = useState(true)
    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false)

    function handleCheckButtonClick(){
        setIsSnackBarOpen(true)
    }

    return (
        <>
            <Box
                className={style.check_button}
                onClick={() => handleCheckButtonClick()}
                style={{
                    display: isCheckVisible ? 'block' : 'none'
                }}
            />
            <Box
                className={style.question}>
                <DescriptionTextBox
                    text={isText}
                    width={'90vw'}
                    borderRadius={'21px'}
                    component={
                        <YesNo
                            setIsText={setIsText}
                            text={text}
                            setIsCheckVisible={setIsCheckVisible}
                            setArrowSrc={setArrowSrc}
                            currentIndex={currentIndex}
                            setCurrentIndex={setCurrentIndex}
                            setAnimationKey={setAnimationKey}
                        />
                    }
                    style={{
                        marginInline: 'auto',
                        bgcolor: 'var(--menu_button_color)',
                        border: '2px solid var(--component_stroke_color_light)'
                    }}
                />
            </Box>
            <div className={'gray'}
                 style={{
                     position: 'absolute',
                     bottom: '0'
                 }}
            >
                <Lottie
                    animationData={animation}
                />
            </div>
            <CustomSnackBar
                text={t("mining.components.helps.survey.snackbar")}
                openState={isSnackBarOpen}
                severity={'info'}
                setIsFunction={setIsSnackBarOpen}/>
        </>
    );
}

export default Question;