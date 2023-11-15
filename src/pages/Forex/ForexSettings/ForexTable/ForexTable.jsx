import React, {useState} from 'react';
import { Box } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';

import ForexTab from './ForexTab';
import ForexTabPanel from './ForexTabPanel';

const ForexTable = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box
            sx={{
                fontFamily: 'Roboto, sans-serif'
            }}>
                <TabList>
                    <ForexTab label="24 часа" value="1" handleChange={handleChange} />
                    <ForexTab label="7 дней" value="2" handleChange={handleChange} />
                    <ForexTab label="30 дней" value="3" handleChange={handleChange} />
                </TabList>
            </Box>
            <Box sx={{ minHeight: '360px', paddingBlock: '5px' }}>
                <ForexTabPanel value="1" label="Общий профит: 123" />
                <ForexTabPanel value="2" label="Общий профит: 121" />
                <ForexTabPanel value="3" label="Общий профит: 1212" />
            </Box>
        </TabContext>
    );
};

export default ForexTable;