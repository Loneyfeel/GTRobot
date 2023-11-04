import React from "react";
import style from './pagination.module.sass';

const Pagination = ({ setPage, rowsPerPage, setRowsPerPage, totalRows }) => {
    const handleRowsPerPageChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };

    return (
        <div className={style.pagination}>
            <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                {[10, 20, 45, totalRows].map((value) => (
                    <option key={value} value={value}>
                        {value === totalRows ? "Все" : value}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Pagination;
