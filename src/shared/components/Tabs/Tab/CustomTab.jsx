import React from 'react';
import { Tab } from '@mui/material';

const CustomTab = ({ label, value, selected, handleChange }) => {
    return (
        <Tab
            selected={selected}
            sx={{
                color: 'var(--tg-theme-text-color)',
                padding: '8px',
                '&.Mui-selected': {
                    color: 'var(--tg-theme-text-color)',
                },
            }}
            label={label}
            value={value}
            onClick={() => handleChange(null, value)}
            wrapped
        />
    );
};

export default CustomTab;
