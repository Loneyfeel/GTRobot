
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
            rowsPerPageOptions={[10, 15, 25, 65, { label: 'All', value: -1 }]}
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={false}
            sx={{
                backgroundColor: 'var(--tg-theme-secondary-bg-color)',
                minWidth:'0',
                width: '45px',
                height: '25px',
                paddingTop: '10px',
                borderRadius: '5px',
                border: '1px solid var(--tg-theme-button-color)',
                overflow: 'hidden',
                '& .MuiTablePagination-actions': {
                    display: 'none'
                },
                '& .MuiTablePagination-displayedRows': {
                    display: 'none'
                },
                '& .MuiTablePagination-toolbar': {
                    padding: '0',
                    minHeight: '0',
                    width: '40px',
                    height: '25px'
                },
                '& .MuiTablePagination-input': {
                    margin: '0',
                    width: '44px',
                },
                "& .MuiSelect-icon": {
                    paddingBottom: '1px',
                    color: "var(--tg-theme-button-color)",
                },
            }}
        />
    );
}

export default Pagination;
