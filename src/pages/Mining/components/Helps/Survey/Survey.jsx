import React, { useState } from 'react';
import { Box, Typography, Button, Checkbox } from "@mui/material";
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";

const CustomCheckbox = ({ answer, checked, onChange }) => (
    <Box
        key={answer}
        sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            marginBlock: '5px'
        }}
        onClick={() => onChange(answer)}
    >
        <Checkbox
            checked={checked}
            onChange={() => onChange(answer)}
            sx={{
                color: 'var(--tg-theme-text-color)'
            }}
        />
        {answer}
    </Box>
);

const Survey = ({ handleNextComponent }) => {
    const { t } = useTranslation();

    const questions = [
        {
            question: `1: ${t('mining.components.helps.survey.question_1')}`,
            answers: [`${t('mining.components.helps.survey.yes')}`, `${t('mining.components.helps.survey.no')}`],
            text: `${t('mining.components.helps.survey.text_1')}`,
        },
        {
            question: `2: ${t('mining.components.helps.survey.question_2')}`,
            answers: [`${t('mining.components.helps.survey.yes')}`, `${t('mining.components.helps.survey.no')}`],
            text: `${t('mining.components.helps.survey.text_2')}`,
        },
        {
            question: `3: ${t('mining.components.helps.survey.question_3')}`,
            answers: [`${t('mining.components.helps.survey.yes')}`, `${t('mining.components.helps.survey.no')}`],
            text: <><br/>{t('mining.components.helps.survey.text_3_1')}</>,
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNext = () => {
        setSelectedAnswer(null);
        setCurrentQuestion((prev) => prev + 1);
    };

    const handleFinalNext = () => {
        handleNextComponent();
    };
    const handleDetails = () => {
        setShowDetails(true);
    };

    const isNextButtonVisible = () => {
        return (
            (selectedAnswer === `${t('mining.components.helps.survey.no')}` && currentQuestion < questions.length - 1) ||
            selectedAnswer === `${t('mining.components.helps.survey.yes')}`
        );
    };

    const isFinalButtonVisible = () => {
        return currentQuestion === questions.length - 1 && selectedAnswer !== null;
    };

    return (
        <AnimatePresence exitBeforeEnter={false} mode="wait">
            <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: selectedAnswer === `${t('mining.components.helps.survey.yes')}` ? "-100%" : "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: selectedAnswer === `${t('mining.components.helps.survey.yes')}` ? "100%" : "-100%" }}
                transition={{ duration: 0.1 }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        color: "var(--tg-theme-text-color)",
                        width: "100vw",
                        padding: "20px",
                    }}
                >
                    {isFinalButtonVisible() ? (
                        <>
                            <Typography>{questions[currentQuestion].question}</Typography>
                            {showDetails && (
                                <>
                                    <Typography
                                        sx={{
                                            lineHeight: '21px'
                                        }}
                                    >
                                        {questions[currentQuestion].text}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            width: '100%',
                                        }}
                                    >
                                        <Button onClick={()=>{ window.Telegram.WebApp.showConfirm(
                                            t('mining.components.helps.survey.text_3_2'),
                                            (confirm) => {
                                                if (confirm) {
                                                    handleFinalNext()
                                                }
                                            }
                                        )}}>{t('mining.components.helps.survey.next')}</Button>
                                    </Box>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <Typography>{questions[currentQuestion].question}</Typography>
                            {currentQuestion === 2 ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        flexDirection: 'column',
                                        width: '100%',
                                    }}
                                >
                                    <Button
                                        onClick={() => {
                                            handleDetails();
                                            handleAnswer('');
                                        }}
                                    >
                                        {t('mining.components.helps.survey.details')}
                                    </Button>
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-around'
                                    }}
                                >
                                    <CustomCheckbox
                                        answer={questions[currentQuestion].answers[0]}
                                        checked={selectedAnswer === questions[currentQuestion].answers[0]}
                                        onChange={handleAnswer}
                                    />
                                    <CustomCheckbox
                                        answer={questions[currentQuestion].answers[1]}
                                        checked={selectedAnswer === questions[currentQuestion].answers[1]}
                                        onChange={handleAnswer}
                                    />
                                </Box>
                            )}
                            {selectedAnswer === `${t('mining.components.helps.survey.no')}` && (
                                <>
                                    <Typography
                                        sx={{
                                            lineHeight: '21px'
                                        }}
                                    >
                                        {selectedAnswer === `${t('mining.components.helps.survey.no')}` && (
                                            <>
                                                {questions[currentQuestion].text}
                                            </>
                                        )}
                                    </Typography>
                                    {isNextButtonVisible() && (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                width: '100%',
                                            }}
                                        >
                                            <Button onClick={handleNext}>{t('mining.components.helps.survey.next')}</Button>
                                        </Box>
                                    )}
                                </>
                            )}
                            {selectedAnswer === `${t('mining.components.helps.survey.yes')}` && (
                                <>
                                    {handleNext()}
                                </>
                            )}
                        </>
                    )}
                </Box>
            </motion.div>
        </AnimatePresence>
    );
};

export default Survey;