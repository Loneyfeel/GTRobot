import React, {useEffect, useState} from 'react';
import Pagination from "./Pagination/index.js";
import Filters from "./Filters/index.js";
import Pages from "./Pages/index.js";
import Table from "./Table/index.js";

const TableComponent = ({ data }) => {
    const [filteredData, setFilteredData] = useState(data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [filters, setFilters] = useState({ raz: '', cd: '', dal: '', name: '' });
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
    return (
        <>
            <Pagination
                filteredData={filteredData}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
            <Filters
                filteredData={filteredData}
                filters={filters}
                setFilters={setFilters}
            />
            <Table
                filteredData={filteredData}
                page={0}
                rowsPerPage={10}
                orderBy={''}
                setOrderBy={setOrderBy}
                order={order}
                setOrder={setOrder}
            />
            <Pages
                filteredData={filteredData}
                rowsPerPage={rowsPerPage}
                page={page}
                setPage={setPage}
            />
        </>
    );
};

export default TableComponent;