import React from 'react';
import { Box, Typography } from '@mui/material';
import { TabPanel } from '@mui/lab';
import { FixedSizeList } from 'react-window';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const ForexTabPanel = ({ value, label }) => {
    let renderFunction;
    let itemCount;

    switch (value) {
        case "1":
            renderFunction = renderHourlyTable;
            itemCount = 24; // 24 часа
            break;
        case "2":
            renderFunction = renderWeeklyTable;
            itemCount = 7; // 7 дней
            break;
        case "3":
            renderFunction = renderMonthlyTable;
            itemCount = 30; // 30 дней
            break;
        default:
            renderFunction = () => null;
            itemCount = 0;
    }

    return (
        <TabPanel
            value={value}
            sx={{
                padding: '5px',
                paddingBottom: '0',
                bgcolor: 'var(--tg-theme-bg-color)',
                borderRadius: '5px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    paddingBlock: '5px 10px',
                    borderBottom: '1px solid var(--tg-theme-button-color)',
                }}
            >
                <Typography>{label}</Typography>
                <Typography
                    sx={{
                        paddingLeft: '5px',
                        color: 'var(--tg-theme-hint-color)',
                    }}
                >
                    $
                </Typography>
            </Box>
            <FixedSizeList height={300} itemSize={40} itemCount={itemCount} overscanCount={5}>
                {({ index, style }) => (
                    <div style={style}>
                        {renderFunction()[index]}
                    </div>
                )}
            </FixedSizeList>
        </TabPanel>
    );
};

export default ForexTabPanel

function renderHourlyTable() {
    const currentHour = new Date().getHours();
    const hours = Array.from({ length: 24 }, (_, i) => (currentHour - i - 1 + 24) % 24);

    return hours.map((hour) => (
        <ListItem
            key={hour}
            component="div"
            disablePadding
            sx={{
                borderBottom: '1px solid var(--tg-theme-secondary-bg-color)',
            }}
        >
            <ListItemText primary={`${hour < 10 ? '0' : ''}${hour}.00:`} sx={{ maxWidth: '20%' }} />
            <Typography>text</Typography>
        </ListItem>
    ));
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}`;
}

function renderWeeklyTable() {
    const currentDate = new Date();
    const days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(currentDate.getDate() - i - 1); // уменьшаем на 1, чтобы получить предыдущий день
        return date;
    });

    return days.map((date) => (
        <ListItem
            key={date}
            component="div"
            disablePadding
            sx={{
                borderBottom: '1px solid var(--tg-theme-secondary-bg-color)',
            }}
        >
            <ListItemText primary={formatDate(date)} sx={{ maxWidth: '20%' }} />
            <Typography>text</Typography>
        </ListItem>
    ));
}

function renderMonthlyTable() {
    const currentDate = new Date();
    const days = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(currentDate.getDate() - i - 1); // уменьшаем на 1, чтобы получить предыдущий день
        return date;
    });

    return days.map((date) => (
        <ListItem
            key={date}
            component="div"
            disablePadding
            sx={{
                borderBottom: '1px solid var(--tg-theme-secondary-bg-color)',
            }}
        >
            <ListItemText primary={formatDate(date)} sx={{ maxWidth: '20%' }} />
            <Typography>text</Typography>
        </ListItem>
    ));
}
