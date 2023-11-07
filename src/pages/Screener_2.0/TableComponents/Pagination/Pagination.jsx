
import TablePagination from "@mui/material/TablePagination";

const Pagination = ({filteredData, page, setPage, rowsPerPage, setRowsPerPage}) => {


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TablePagination
            rowsPerPageOptions={[5, 10, 25, 65, { label: 'All', value: -1 }]}
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={false}
            sx={{
                '& .MuiTablePagination-actions': {
                    display: 'none'
                },
                '& .MuiTablePagination-displayedRows': {
                    display: 'none'
                }
            }}
        />
    );
}

export default Pagination;
