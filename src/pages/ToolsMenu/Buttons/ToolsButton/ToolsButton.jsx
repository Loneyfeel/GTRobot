import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import {Box, Button, Typography} from "@mui/material";
import React from "react";

function ToolsButton({icon, text, url}) {

    // Открываем ссылку
    const handleClick = () => {
        window.location.href = url
    };
    return (
        <>
            <Button
                variant="contained"
                onClick={handleClick}
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    height: '60px',
                    width: '300px',
                    backgroundColor: 'var(--tg-theme-secondary-bg-color)',
                    borderRadius: '10px',
                    color: 'var(--tg-theme-text-color)',
                    padding: '0'
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '35px',
                        height: '35px',
                        borderRadius: '30px',
                        backgroundColor: 'var(--tg-theme-button-color)',
                        marginRight: '10px',
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'var(--tg-theme-text-color)',
                        }}>
                        {icon}
                    </Box>
                </Box>
                <Typography
                    sx={{
                        width: '180px',
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: '14px',
                        cursor: 'unset',
                        marginRight: '5px'
                    }}>
                    {text}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '35px',
                        color: 'var(--tg-theme-button-color)'
                    }}>
                    <KeyboardArrowRightOutlinedIcon/>
                </Box>
            </Button>
        </>
    )
}

export default ToolsButton