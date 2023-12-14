import React, { useEffect } from 'react';
import {Box, Typography} from "@mui/material";

const Info = ({ setIsSectionOpen }) => {
    useEffect(() => {
        setIsSectionOpen(true);
        return () => setIsSectionOpen(false);
    }, [setIsSectionOpen]);

    return (
        <>
            <Box
                sx={{
                    bgcolor: 'var(--tg-theme-bg-color)',
                    color: 'var(--tg-theme-text-color)',
                    minHeight: '90vh',
                    width: '100%',
                    position: 'absolute',
                    top: '44px'
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
                        Информация
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default Info;
