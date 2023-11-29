import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CopyTableBodyCell from './CopyTableBodyCell';
import CopyTableContainer from './CopyTableContainer';
import CustomTableHead from './CustomTableHead';

const generateRandomData = () => {
    const randomData = [];
    for (let i = 1; i <= 1000; i++) {
        const trader = `Trader ${i}`;
        const roi = Math.random() * 10000;
        const pnl = Math.random() * 10000;
        const subscribers = `${i}`;
        randomData.push({ trader, roi, pnl, subscribers });
    }
    return randomData;
};
const tableOrder = ['roi', 'pnl', 'subscribers'];

const CopyTradersTable = () => {
    const [data] = useState(generateRandomData());
    const [visibleTable, setVisibleTable] = useState('roi');
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const [rowsToShow, setRowsToShow] = useState(15);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            setRowsToShow((prevRows) => prevRows + 10);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [slideDirection, setSlideDirection] = useState('left');
    const updateVisibleTable = (table) => {
        // Установите видимую таблицу
        setVisibleTable(table);

        // Определите, с какой стороны находится новая таблица относительно текущей
        const currentIndex = tableOrder.indexOf(visibleTable);
        const newIndex = tableOrder.indexOf(table);
        const isTableOnLeft = visibleTable && newIndex < currentIndex;

        // Установите направление анимации в зависимости от расположения таблицы
        setSlideDirection(isTableOnLeft ? 'left' : 'right');
    };

    return (
        <CopyTableContainer>
            <Grid container justifyContent="center">
                <Grid item>
                    <CustomTableHead
                        selectedPeriod={selectedPeriod}
                        onSelectPeriod={(period) => setSelectedPeriod(period)}
                        onTableChange={updateVisibleTable}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={visibleTable}
                        initial={{ x: slideDirection === 'left' ? -200 : 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: slideDirection === 'left' ? -200 : 200, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        style={{ position: 'absolute', width: '100%' }}
                    >
                        {visibleTable === 'roi' && (
                            data.slice(0, rowsToShow).map((row, index) => (
                                <CopyTableBodyCell key={index} data={row} />
                            ))
                        )}
                        {visibleTable === 'pnl' && (
                            data.slice(0, rowsToShow).map((row, index) => (
                                <CopyTableBodyCell key={index} data={row} />
                            ))
                        )}
                        {visibleTable === 'subscribers' && (
                            data.slice(0, rowsToShow).map((row, index) => (
                                <CopyTableBodyCell key={index} data={row} />
                            ))
                        )}
                    </motion.div>
                </AnimatePresence>
            </Grid>
        </CopyTableContainer>
    );
};

export default CopyTradersTable;