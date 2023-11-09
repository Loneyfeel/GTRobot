import React from 'react';

import TableCell from "@mui/material/TableCell";

const BodyTableCell = ({ children }) => (
    <TableCell
        sx={{
            minWidth:'65px',
            maxWidth:'65px',
            padding: '4px 2px',
            height: '30px',
            borderBottom: 'none',
            fontSize: '14px',
        }}
    >
            {children}
    </TableCell>
);

export default BodyTableCell;