import React from 'react';
import { Box, Typography } from '@mui/material';
import { TabPanel } from '@mui/lab';
import { FixedSizeList } from 'react-window';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const ForexTabPanel = ({ value, label, accountData }) => {
    let renderFunction;
    let itemCount;
    const currentDate = new Date();

    switch (value) {
        case "1":
            renderFunction = () => renderTable(accountData, currentDate, (currentDate, timestamp) => currentDate - timestamp * 1000 < 24 * 60 * 60 * 1000);
            itemCount = renderFunction().length;
            break;
        case "2":
            renderFunction = () => renderTable(accountData, currentDate, (currentDate, timestamp) => currentDate - timestamp * 1000 < 7 * 24 * 60 * 60 * 1000);
            itemCount = renderFunction().length;
            break;
        case "3":
            renderFunction = () => renderTable(accountData, currentDate, (currentDate, timestamp) => currentDate - timestamp * 1000 < 30 * 24 * 60 * 60 * 1000);
            itemCount = renderFunction().length;
            break;
        default:
            renderFunction = () => [];
            itemCount = 0;
    }

    return (
        <TabPanel
            value={value}
            sx={{
                padding: '5px 0 5px 0',
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

export default ForexTabPanel;

const listItemStyles = {
    borderBottom: '1px solid var(--tg-theme-secondary-bg-color)',
    display: 'flex',
    alignItems: 'center',
};

const renderListItem = (timestamp, formattedDate, formattedTime, profit) => (
    <ListItem
        key={timestamp}
        component="div"
        disablePadding
        sx={{
            ...listItemStyles,
        }}
    >
        <div>
            <ListItemText primary={`${formattedDate} ${formattedTime}:`} />
        </div>
        <Typography
            sx={{
                ml: '15px',
            }}
        >
            {profit}
        </Typography>
        <Typography
            sx={{
                paddingLeft: '5px',
                color: 'var(--tg-theme-hint-color)',
            }}
        >
            $
        </Typography>
    </ListItem>
);

const renderTable = (accountData, currentDate, filterFunction) => {
    const filteredTimestamps = accountData?.data?.statistics
        ?.filter(dataPoint => filterFunction(currentDate, dataPoint.timestamp))
        .map(dataPoint => dataPoint.timestamp);

    return filteredTimestamps.map(timestamp => {
        const dataPoint = accountData?.data?.statistics?.find(point => point.timestamp === timestamp);
        const date = new Date(timestamp * 1000);
        const formattedDate = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}-${(date.getMonth() + 1) < 10 ? '0' : ''}${date.getMonth() + 1}`;
        const formattedTime = `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;

        return renderListItem(timestamp, formattedDate, formattedTime, dataPoint?.profit);
    });
};