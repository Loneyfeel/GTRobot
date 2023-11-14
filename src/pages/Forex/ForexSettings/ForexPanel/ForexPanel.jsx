// ForexPanel.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import { FixedSizeList } from 'react-window';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const ForexPanel = ({ value }) => {
    const renderRow = (props) => {
        const { index, style } = props;

        return (
            <ListItem
                style={style}
                key={index}
                component="div"
                disablePadding
                sx={{
                    borderBottom: '1px solid var(--tg-theme-secondary-bg-color)',
                }}
            >
                <ListItemText
                    primary={`День ${index + 1}:`}
                    sx={{
                        maxWidth: '25%',
                    }}
                />
                <Typography>{index * 7}$</Typography>
            </ListItem>
        );
    };

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
                <Typography>Общий профит: {value === '1' ? 123 : value === '2' ? 121 : 1212}</Typography>
                <Typography
                    sx={{
                        paddingLeft: '5px',
                        color: 'var(--tg-theme-hint-color)',
                    }}
                >
                    $
                </Typography>
            </Box>
            <FixedSizeList height={300} itemSize={46} itemCount={200} overscanCount={5}>
                {renderRow}
            </FixedSizeList>
        </TabPanel>
    );
};

export default ForexPanel;
