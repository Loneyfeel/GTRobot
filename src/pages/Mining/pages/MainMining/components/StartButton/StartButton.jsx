import React from 'react';
import {Button, Typography} from "@mui/material";
import TouchAppIcon from "@mui/icons-material/TouchApp.js";

const StartButton = ({ onClick, isDisabled, text }) => (
    <Button
        variant="contained"
        onClick={onClick}
        disabled={isDisabled}
        sx={{
            flexDirection: 'column',
            paddingTop: '12px',
            width: '125px',
            height: '125px',
            borderRadius: '100px',
            color: 'var(--tg-theme-text-color)',
        }}
    >
        <TouchAppIcon
            sx={{
                position: 'absolute',
                top: '30px',
                width: '40px',
                height: '40px',
            }}
        />
        <Typography
            sx={{
                fontSize: '12px',
                fontWeight: '600',
                marginTop: '40px'
            }}
        >
            {text}
        </Typography>
    </Button>
);

export default StartButton;