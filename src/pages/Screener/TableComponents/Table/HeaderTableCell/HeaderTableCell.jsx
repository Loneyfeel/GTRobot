import React from "react";

import TableSortLabel from "@mui/material/TableSortLabel";
import TableCell from "@mui/material/TableCell";

const HeaderTableCell = ({ active, direction, onClick, children }) => {
  return (
    <TableCell
      sx={{
        minWidth: "65px",
        maxWidth: "65px",
        padding: "4px 2px",
        height: "30px",
        borderBottom: "none",
        fontSize: "12px",
      }}
    >
      <TableSortLabel
        active={active}
        direction={direction}
        onClick={onClick}
        sx={{
          "&:focus": {
            color: "var(--tg-theme-text-color)",
          },
          "&:hover": {
            color: "var(--tg-theme-text-color)",
          },
          "&:active": {
            color: "var(--tg-theme-text-color)",
          },
        }}
      >
        {children}
      </TableSortLabel>
    </TableCell>
  );
};

export default HeaderTableCell;
