
import React, { useEffect } from "react"
import {Pagination} from "@mui/material";

const Pages = ({filteredData, rowsPerPage, page, setPage}) => {
    // Рассчитываем общее количество страниц
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    return (
        <>
            <Pagination
                count={totalPages}
                page={page + 1}
                onChange={(event, value) => {
                    // При изменении страницы, устанавливаем новое значение для page
                    setPage(value - 1);
                }}
                variant="outlined"
                shape="rounded"
                showFirstButton
                showLastButton
                siblingCount={2}
            />
        </>
    );
};

export default Pages;

