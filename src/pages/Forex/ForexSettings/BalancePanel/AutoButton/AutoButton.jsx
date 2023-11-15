import React from 'react';
import { Button } from '@mui/material';

const AutoButton = ({ isEnabled, onClick, onSnackClick, label, fontSize, width, height }) => {
    return (
        <Button
            disabled={isEnabled}
            onClick={() => {
                onClick();
                onSnackClick();
            }}
            sx={{
                fontSize: fontSize,
                width: width,
                height: height,
                boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.2)',
                backgroundColor: 'var(--tg-theme-button-color)',
                color: 'var(--tg-theme-text-color)',
                borderRadius: '5px',
                border: '1px solid var(--tg-theme-button-color)',
                marginBlock: '5px',
                '&:disabled': {
                    backgroundColor: 'unset',
                    color: '#666',
                    border: '1px solid #666',
                    boxShadow: 'unset',
                },
                '&:active': {
                    boxShadow: 'unset',
                },
            }}
        >
            {label}
        </Button>
    );
};

export default AutoButton;