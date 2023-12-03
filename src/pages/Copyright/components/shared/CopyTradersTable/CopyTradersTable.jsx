import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import CopyTableBodyCell from './CopyTableBodyCell';
import CopyTableHeader from './CustomTableHead';
import CopyTableContainer from './CopyTableContainer';

const generateRandomData = () => {
    return Array.from({ length: 1000 }, (_, i) => ({
        trader: `Trader ${i + 1}`,
        roi: Math.random() * 10000,
        pnl: Math.random() * 10000,
        subscribers: `${i + 1}`,
    }));
};

const CopyTradersTable = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const [tables, setTables] = useState([[], [], []]);
    const [animProps, set] = useSpring(() => ({ opacity: 1, transform: 'translateX(0%)' }));

    const handleTabChange = (event, newValue) => {
        set({ opacity: 0, display: 'none' });
        setTimeout(() => {
            setSelectedTab(newValue);
            set({ opacity: 1, display: 'block' });
        }, 300);
    };

    const handlePeriodChange = (event) => {
        setSelectedPeriod(event.target.value);
    };

    useEffect(() => {
        const tablesData = Array(3).fill().map(generateRandomData);
        const sortedTables = tablesData.map((data, index) => sortData(data, index));
        setTables(sortedTables);
    }, []);

    const sortData = (data, tabIndex) => data.slice().sort((a, b) => b[getSortKey(tabIndex)] - a[getSortKey(tabIndex)]);

    const getVisibleData = () => tables[selectedTab].slice(0, 15);

    const renderAnimatedDiv = (tabIndex) => (
        <animated.div style={{ ...animProps, display: selectedTab === tabIndex ? 'block' : 'none', width: '100%' }}>
            {getVisibleData().map((row, rowIndex) => (
                <Grid item key={rowIndex} sx={{ width: '100%' }}>
                    <CopyTableBodyCell data={row} />
                </Grid>
            ))}
        </animated.div>
    );

    return (
        <CopyTableContainer>
            <CopyTableHeader
                selectedPeriod={selectedPeriod}
                handlePeriodChange={handlePeriodChange}
                selectedTab={selectedTab}
                handleTabChange={handleTabChange}
            />
            <Grid container>
                {[0, 1, 2].map((tabIndex) => renderAnimatedDiv(tabIndex))}
            </Grid>
        </CopyTableContainer>
    );
};

const getSortKey = (tabIndex) => {
    const keys = ['roi', 'pnl', 'subscribers'];
    return keys[tabIndex] || 'roi';
};

export default CopyTradersTable;
