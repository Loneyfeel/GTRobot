import React from 'react';
import { Grid, Select, MenuItem, Tabs, Tab } from '@mui/material';

const CopyTableHeader = ({ selectedPeriod, handlePeriodChange, selectedTab, handleTabChange }) => {
    return (
        <Grid container alignItems="center" justifyContent="center" height={50}>
            <Grid item>
                <Select
                    value={selectedPeriod}
                    onChange={handlePeriodChange}
                    sx={{
                        fontSize: '14px',
                        minWidth: '60px',
                        height: '30px',
                        marginRight: '10px',
                        color: 'var(--tg-theme-text-color)',
                        border: '1px solid var(--tg-theme-button-color)',
                        '& .MuiSelect-icon': {
                            color: 'var(--tg-theme-button-color)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                    }}
                >
                    <MenuItem value="1day">1 Day</MenuItem>
                    <MenuItem value="7days">7 Days</MenuItem>
                    <MenuItem value="30days">30 Days</MenuItem>
                    <MenuItem value="all">All Time</MenuItem>
                </Select>
            </Grid>
            <Grid item>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    centered
                    sx={{
                        minHeight: '30px',
                        height: '30px',
                        '& .MuiTabs-indicator': {
                            backgroundColor: 'transparent',
                        },
                        '& .Mui-selected': {
                            backgroundColor: 'var(--tg-theme-bg-color)',
                        },
                    }}
                >
                    {['ROI', 'PNL', 'Subscribers'].map((label, index) => (
                        <Tab
                            key={index}
                            label={label}
                            sx={{
                                paddingInline: '5px',
                                marginInline: '3px',
                                fontSize: '12px',
                                minWidth: '60px',
                                minHeight: '30px',
                                height: '30px',
                                color: 'var(--tg-theme-text-color)',
                            }}
                        />
                    ))}
                </Tabs>
            </Grid>
        </Grid>
    );
};

export default CopyTableHeader;