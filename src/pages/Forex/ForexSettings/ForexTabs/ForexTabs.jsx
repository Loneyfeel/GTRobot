import React from 'react';
import { Tab, Box } from '@mui/material';
import TabList from '@mui/lab/TabList';

const ForexTabs = ({ value, handleChange }) => {
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
                onChange={handleChange}
                sx={{
                    color: 'var(--tg-theme-text-color)',
                }}
            >
                <Tab
                    sx={{
                        color: 'var(--tg-theme-text-color)',
                    }}
                    label="24 часа"
                    value="1"
                />
                <Tab
                    sx={{
                        color: 'var(--tg-theme-text-color)',
                    }}
                    label="7 дней"
                    value="2"
                />
                <Tab
                    sx={{
                        color: 'var(--tg-theme-text-color)',
                    }}
                    label="30 дней"
                    value="3"
                />
            </TabList>
        </Box>
    );
};

export default ForexTabs;
