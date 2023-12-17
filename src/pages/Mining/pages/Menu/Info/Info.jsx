import React, { useEffect } from 'react';
import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const Info = ({ setIsSectionOpen }) => {
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
                    minHeight: '90vh',
                    width: '100%',
                    position: 'absolute',
                    top: '44px',
                    paddingBottom: '56px'
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Typography
                        sx={{
                            margin: '20px',
                            color: 'var(--tg-theme-text-color)',
                            fontSize: '18px',
                            cursor: 'default'
                        }}>
                        {t('mining.pages.menu.info.title')}
                    </Typography>
                    <Box
                    sx={{
                        width: '100%',
                    }}>
                        <Box
                        sx={{
                            bgcolor: 'var(--tg-theme-secondary-bg-color)',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            width: '100%',
                        }}>
                            <Typography
                            sx={{
                                margin: '10px',
                            }}>
                                {t('mining.pages.menu.info.text_coin')}
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography
                        sx={{
                            margin: '10px 10px 20px 10px',
                        }}>
                            {t('mining.pages.menu.info.text_btc')}
                        </Typography>
                        <Typography
                        sx={{
                            margin: '10px',
                        }}>
                            {t('mining.pages.menu.info.text_ton')}
                        </Typography>
                        <Typography
                        sx={{
                            margin: '10px',
                        }}>
                            {t('mining.pages.menu.info.text_shib')}
                        </Typography>
                        <Typography
                        sx={{
                            margin: '10px',
                        }}>
                            {t('mining.pages.menu.info.text_doge')}
                        </Typography>

                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                        }}>
                        <Box
                            sx={{
                                bgcolor: 'var(--tg-theme-secondary-bg-color)',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                width: '100%',
                            }}>
                            <Typography
                                sx={{
                                    margin: '10px',
                                }}>
                                {t('mining.pages.menu.info.text_mining_1')}
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                margin: '10px 10px 20px 10px',
                            }}>
                            {t('mining.pages.menu.info.text_mining_2')}
                        </Typography>
                        <Typography
                            sx={{
                                margin: '10px 10px 20px 10px',
                            }}>
                            {t('mining.pages.menu.info.text_mining_3')}
                        </Typography>
                        <Typography
                            sx={{
                                margin: '10px 10px 20px 10px',
                            }}>
                            {t('mining.pages.menu.info.text_mining_4')}
                        </Typography>
                        <Typography
                            sx={{
                                margin: '10px 10px 20px 10px',
                            }}>
                            {t('mining.pages.menu.info.text_mining_5')}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                        }}>
                        <Box
                            sx={{
                                bgcolor: 'var(--tg-theme-secondary-bg-color)',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                width: '100%',
                            }}>
                            <Typography
                                sx={{
                                    margin: '10px',
                                }}>
                                {t('mining.pages.menu.info.text_ref_1')}
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                margin: '10px 10px 20px 10px',
                            }}>
                            {t('mining.pages.menu.info.text_ref_2')}
                        </Typography>
                        <Typography
                            sx={{
                                margin: '10px 10px 20px 10px',
                            }}>
                            {t('mining.pages.menu.info.text_ref_3')}
                        </Typography>
                        <Typography
                            sx={{
                                margin: '10px 10px 20px 10px',
                            }}>
                            {t('mining.pages.menu.info.text_ref_4')}
                        </Typography>
                        <Typography
                            sx={{
                                margin: '10px 10px 20px 10px',
                            }}>
                            {t('mining.pages.menu.info.text_ref_5')}
                        </Typography>
                        <Typography
                            sx={{
                                margin: '10px 10px 20px 10px',
                            }}>
                            {t('mining.pages.menu.info.text_ref_6')}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                        }}>
                        <Box
                            sx={{
                                bgcolor: 'var(--tg-theme-secondary-bg-color)',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                width: '100%',
                            }}>
                            <Typography
                                sx={{
                                    margin: '10px',
                                }}>
                                {t('mining.pages.menu.info.text_gtr_1')}
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                margin: '10px 10px 20px 10px',
                            }}>
                            {t('mining.pages.menu.info.text_gtr_2')}
                        </Typography>
                        <Typography
                            sx={{
                                margin: '10px 10px 20px 10px',
                            }}>
                            {t('mining.pages.menu.info.text_gtr_3')}
                        </Typography>
                        <Typography
                            sx={{
                                margin: '10px 10px 20px 10px',
                            }}>
                            {t('mining.pages.menu.info.text_gtr_4')}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Info;
