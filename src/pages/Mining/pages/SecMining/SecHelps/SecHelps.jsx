import React, { useState } from 'react';
import { Box, Typography, Button, Checkbox } from "@mui/material";
import { useTranslation } from "react-i18next";

const Survey = ({ setIsDailyMiningActivated }) => {
    const { t } = useTranslation();

    const questions = [
        {
            question: `${t('mining.components.helps.survey.question_3')}`,
            answers: [`${t('mining.components.helps.survey.yes')}`, `${t('mining.components.helps.survey.no')}`],
            text: <><br/>{t('mining.components.helps.survey.text_3_1')}</>,
        },
    ];

    const handleFinalNext = () => {
        setIsDailyMiningActivated(true);
        localStorage.setItem('isDailyMiningActivated', JSON.stringify(true));
    };

    return (
                <Box
                    sx={{
                        position: 'relative',
                        color: "var(--tg-theme-text-color)",
                        width: "100vw",
                        padding: "20px",
                        bgcolor: 'var(--tg-theme-bg-color)'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            flexDirection: 'column',
                            width: '100%',
                        }}
                    >
                    </Box>
                        <>
                            <Typography
                                sx={{
                                    lineHeight: '21px'
                                }}
                            >
                                {t('mining.pages.secMining.gtrobot_alert_1')}
                                <br/>
                                <br/>
                                {t('mining.pages.secMining.gtrobot_alert_2')}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    width: '100%',
                                }}
                            >
                                <Button
                                    onClick={handleFinalNext()}
                                >
                                    {t('mining.components.helps.survey.next')}
                                </Button>
                            </Box>
                        </>
                </Box>
    );
};

export default Survey;
