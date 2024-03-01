import React from "react";
import { Pagination } from "@mui/material";

const Pages = ({ filteredData, rowsPerPage, page, setPage }) => {
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
        siblingCount={2}
        sx={{
          padding: "5px 0",
          backgroundColor: "var(--tg-theme-secondary-bg-color)",
          "& .MuiPaginationItem-root": {
            backgroundColor: "var(--tg-theme-bg-color)",
            padding: "2px",
            margin: "0 1px",
            minWidth: "25px",
            height: "30px",
            borderRadius: "5px",
          },
          "& .MuiPagination-ul": {
            display: "flex",
            justifyContent: "space-between",
          },
        }}
        color="primary"
      />
    </>
  );
};

export default Pages;
