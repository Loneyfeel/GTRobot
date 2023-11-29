import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';

const CustomTableHead = ({ selectedPeriod, onSelectPeriod, onTableChange }) => {
    const [highlightStyle, setHighlightStyle] = useState({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        transition: 'none',
    });

    const handleMouseEnter = (index) => {
        const button = document.getElementById(`button-${index}`);
        if (button) {
            const rect = button.getBoundingClientRect();
            setHighlightStyle((prevStyle) => ({
                ...prevStyle,
                width: rect.width,
                height: rect.height,
                top: rect.top,
                left: rect.left,
                transition: 'width 0.35s ease-in-out, height 0.35s ease-in-out, top 0.35s ease-in-out, left 0.35s ease-in-out',
            }));
        }
    };

    const menuItemStyles = {
        bgcolor: 'var(--tg-theme-bg-color)',
        "&:hover": {
            bgcolor: 'var(--tg-theme-hint-color)',
        },
    };

    const selectStyles = {
        width: '100px',
        height: '30px',
        fontSize: '12px',
        color: 'var(--tg-theme-text-color)',
        border: '1px solid var(--tg-theme-button-color)',
        '& .MuiSelect-icon': {
            color: 'var(--tg-theme-button-color)',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
    };

    const buttonStyles = {
        position: 'relative',
        fontSize: '12px',
        fontWeight: '500',
    };

    return (
        <TableRow>
            <Grid container spacing={1} alignItems="center" sx={{ paddingBlock: '5px' }}>
                <Grid item>
                    <Select
                        value={selectedPeriod}
                        onChange={(e) => onSelectPeriod(e.target.value)}
                        sx={selectStyles}
                    >
                        <MenuItem value="1day" sx={menuItemStyles}>1 Day</MenuItem>
                        <MenuItem value="7days" sx={menuItemStyles}>7 Days</MenuItem>
                        <MenuItem value="30days" sx={menuItemStyles}>30 Days</MenuItem>
                        <MenuItem value="all" sx={menuItemStyles}>All Time</MenuItem>
                    </Select>
                </Grid>
                {['ROI', 'PNL', 'Subscribers'].map((label, index) => (
                    <Grid item key={index}>
                        <Button
                            disableRipple
                            id={`button-${index}`}
                            onClick={() => {
                                onTableChange(label.toLowerCase());
                                handleMouseEnter(index);
                            }}
                            sx={buttonStyles}
                        >
                            {label}
                        </Button>
                    </Grid>
                ))}
            </Grid>
            <div
                style={{
                    position: 'absolute',
                    background: 'rgba(150, 150, 150, 0.2)',
                    borderRadius: '4px',
                    ...highlightStyle,
                }}
            ></div>
        </TableRow>
    );
};

export default CustomTableHead;
