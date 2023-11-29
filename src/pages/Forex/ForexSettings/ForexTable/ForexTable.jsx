import React, { lazy, useState } from 'react';
import { Box } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';

import { useTranslation } from 'react-i18next';

const CustomTab = lazy(() => import('../../../../shared/components/Tabs/Tab/index.js'));
const ForexTabPanel = lazy(() => import('./ForexTabPanel'));

const ForexTable = ({ accountData }) => {
    const { t } = useTranslation();
    const [value, setValue] = useState('1');

    const [selected, setSelected] = useState(false)
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSelected(true)
    };

    const calculateTotalProfit = (interval) => {
        const currentDate = new Date();
        const filteredData = accountData?.data?.statistics?.filter((dataPoint) => {
            const timestamp = dataPoint.timestamp * 1000;
            const timeDifference = currentDate - timestamp;

            switch (interval) {
                case '24h':
                    return timeDifference < 24 * 60 * 60 * 1000;
                case '7d':
                    return timeDifference < 7 * 24 * 60 * 60 * 1000;
                case '30d':
                    return timeDifference < 30 * 24 * 60 * 60 * 1000;
                default:
                    return false;
            }
        });

        return filteredData.reduce((sum, dataPoint) => sum + (dataPoint?.profit || 0), 0);
    };

    return (
        <TabContext value={value}>
            <Box>
                <TabList>
                    <CustomTab label={`24 ${t('forex.settings.table.tab.hour')}`} value="1" selected={selected} handleChange={handleChange} />
                    <CustomTab label={`7 ${t('forex.settings.table.tab.day')}`} value="2" selected={selected} handleChange={handleChange} />
                    <CustomTab label={`30 ${t('forex.settings.table.tab.day')}`} value="3" selected={selected} handleChange={handleChange} />
                </TabList>
            </Box>
            <Box sx={{
                minHeight: '360px',
                paddingBlock: '5px',
            }}>
                <ForexTabPanel
                    value="1"
                    label={`${t('forex.settings.table.panel')}: ${calculateTotalProfit('24h')}`}
                    accountData={accountData}
                />
                <ForexTabPanel
                    value="2"
                    label={`${t('forex.settings.table.panel')}: ${calculateTotalProfit('7d')}`}
                    accountData={accountData}
                />
                <ForexTabPanel
                    value="3"
                    label={`${t('forex.settings.table.panel')}: ${calculateTotalProfit('30d')}`}
                    accountData={accountData}
                />
            </Box>
        </TabContext>
    );
};

export default ForexTable;
