import React from 'react';
import { Tab } from '@mui/material';

const ForexTab = ({ label, value, handleChange }) => {
    return (
        <Tab
            sx={{
                color: 'var(--tg-theme-text-color)',
            }}
            label={label}
            value={value}
            onClick={() => handleChange(null, value)}
        />
    );
};

export default ForexTab;
