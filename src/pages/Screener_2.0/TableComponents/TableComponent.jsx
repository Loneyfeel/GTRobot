import React, {useEffect, useState} from 'react';
import Pagination from "./Pagination/index.js";
import Filters from "./Filters/index.js";
import Pages from "./Pages/index.js";
import Table from "./Table/index.js";
import {Box, Paper, Typography} from "@mui/material";
import MainTVW from "../Widgets/Main-TVwidget";
import MiniTVW from "../Widgets/Mini-TVwidget";
import {useTranslation} from "react-i18next";

const TableComponent = ({ data }) => {
    const [filteredData, setFilteredData] = useState(data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [filters, setFilters] = useState({raz: '', cd: '', dal: '', name: ''});

    // какие точно нужны сверху

    const applyFiltersAndSorting = () => {
        let filteredItems = [...data];

        if (filters.name) {
            filteredItems = filteredItems.filter(item =>
                item.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }

        if (filters.raz) {
            filteredItems = filteredItems.filter(item => item.raz >= filters.raz);
        }

        if (filters.cd) {
            filteredItems = filteredItems.filter(item => item.cd >= filters.cd);
        }

        if (filters.dal) {
            filteredItems = filteredItems.filter(item => item.dal >= filters.dal);
        }

        if (orderBy) {
            const column = orderBy;
            const sortingOrder = order === 'asc' ? 1 : -1;
            filteredItems.sort((a, b) => {
                if (column === 'name') {
                    return sortingOrder * a.name.localeCompare(b.name);
                } else {
                    return sortingOrder * (a[column] - b[column]);
                }
            });
        }

        setFilteredData(filteredItems);
    };
    useEffect(() => {
        applyFiltersAndSorting();
    }, [filters, order, orderBy, data]);



    // состояние для отображения/скрытия MiniTVwidget
    const [isMiniTVwidgetVisible, setIsMiniTVwidgetVisible] = useState(false)

    // Состояние для хранения выбранного символа
    const [selectedSymbol, setSelectedSymbol] = useState("")

    // Функция для открытия MiniTVwidget и передачи выбранного символа
    const openMiniTVwidget = (symbol) => {
        setSelectedSymbol(symbol);
        setIsMiniTVwidgetVisible(true);
    };

    // Функция для закрытия MiniTVwidget
    const closeMiniTVwidget = () => {
        setIsMiniTVwidgetVisible(false)
    };

    const {t, i18n} = useTranslation()

    return (
        <>
            <Paper
                sx={{
                    backgroundColor: 'var(--tg-theme-bg-color)',
                    borderRadius: '0'
                }}>
                <Box>
                    {isMiniTVwidgetVisible &&
                        <MiniTVW
                            symbol={selectedSymbol}
                            onClose={closeMiniTVwidget}
                        />}
                    <MainTVW/>
                </Box>
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    height: '40px',
                }}>
                    <Typography>
                        {t('screener.table_title')}:
                    </Typography>
                    <Pagination
                        filteredData={filteredData}
                        page={page}
                        setPage={setPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                    />
                </Box>
                <Filters
                    filteredData={filteredData}
                    filters={filters}
                    setFilters={setFilters}
                />
                <Table
                    filteredData={filteredData}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                    order={order}
                    setOrder={setOrder}
                    openMiniTVwidget={openMiniTVwidget}
                    onClose={closeMiniTVwidget}
                />
                <Pages
                    filteredData={filteredData}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    setPage={setPage}
                />
            </Paper>
        </>
    );
}

export default TableComponent;