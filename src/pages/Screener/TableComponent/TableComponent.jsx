import style from './tableComponent.module.sass'

import React, {useState} from 'react'
import TablePages from "./TablePages"
import ScreenTable from "./Table/index.js";
import TableFilters from "./TableFilters/index.js";

const TableComponent = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 10 // Количество видимых строк

    const [filteredData, setFilteredData] = useState(data);
    const updateFilteredData = (newData) => {
        setFilteredData(newData);
        setCurrentPage(1); // Сброс текущей страницы при изменении фильтров
    };

    return (
        <>
            <table className={style.table}>
                {/*<TableFilters*/}
                {/*    data={data}*/}
                {/*    setFilteredData={updateFilteredData}*/}
                {/*/>*/}
                <ScreenTable
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    rowsPerPage={rowsPerPage}
                    data={filteredData}
                />
                <TablePages
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    rowsPerPage={rowsPerPage}
                    data={filteredData}
                />
            </table>
        </>
    )
}

export default TableComponent

