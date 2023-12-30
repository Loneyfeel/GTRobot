import React, { useEffect } from 'react';
import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const GTRobotMining = ({ setIsSectionOpen }) => {
    useEffect(() => {
        setIsSectionOpen(true);
        return () => setIsSectionOpen(false);
    }, [setIsSectionOpen]);
    const {t} = useTranslation();
    return (
        <>
            <Box
                sx={{
                    bgcolor: 'var(--tg-theme-bg-color)',
                    color: 'var(--tg-theme-text-color)',
                    width: '100%',
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Box>
                        <Typography
                        sx={{
                            margin: '10px 10px 20px 10px',
                        }}>
                            ⚙️{t('mining.pages.menu.gtrobot-mining.text_gtr_2')}
                        </Typography>
                        <Typography
                        sx={{
                            margin: '10px',
                        }}>
                            💰{t('mining.pages.menu.gtrobot-mining.text_gtr_3')}
                        </Typography>
                        <Typography
                        sx={{
                            margin: '10px',
                        }}>
                            {t('mining.pages.menu.gtrobot-mining.text_gtr_4')}
                        </Typography>
                        <Typography
                        sx={{
                            margin: '10px',
                        }}>
                            ❗ {t('mining.pages.menu.gtrobot-mining.text_gtr_5')}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default GTRobotMining;
